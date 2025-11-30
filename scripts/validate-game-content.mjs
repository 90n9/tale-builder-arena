#!/usr/bin/env node
/* eslint-env node */
/* globals process, console */

import fs from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';

const attributeMap = z.record(z.number());

const requirementSchema = z
  .object({
    classes: z.array(z.string()).optional(),
    min_attributes: attributeMap.optional(),
  })
  .strict();

const choiceSchema = z
  .object({
    text: z.string(),
    next: z.string(),
    on_fail_next: z.string().optional(),
    requirements: requirementSchema.optional(),
    reward_attributes: attributeMap.optional(),
  })
  .strict();

const sceneSchema = z
  .object({
    scene_id: z.string(),
    type: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    image_prompt: z.string(),
    choices: z.array(choiceSchema).min(1),
  })
  .strict();

const endingSchema = z
  .object({
    ending_id: z.string(),
    title: z.string(),
    summary: z.string(),
    result: z.string(),
    image: z.string(),
    image_prompt: z.string(),
    conditions: z
      .object({
        min_attributes: attributeMap,
        flags_required: z.array(z.string()),
      })
      .strict(),
  })
  .strict();

const gameContentSchema = z
  .object({
    game_id: z.string(),
    version: z.string(),
    metadata: z
      .object({
        title: z.string(),
        subtitle: z.string(),
        genre: z.string(),
        description: z.string(),
        cover_image: z.string(),
        author: z.string(),
      })
      .strict(),
    config: z
      .object({
        starting_attributes: z
          .object({
            points_to_distribute: z.number(),
            base_values: attributeMap,
          })
          .strict(),
        asset_paths: z
          .object({
            images: z.string(),
            videos: z.string(),
          })
          .strict(),
        ui: z
          .object({
            theme_color: z.string(),
            text_speed: z.string(),
          })
          .strict(),
      })
      .strict(),
    races: z.array(
      z
        .object({
          id: z.string(),
          name: z.string(),
          description: z.string(),
          attribute_bonus: attributeMap.optional(),
        })
        .strict()
    ),
    classes: z.array(
      z
        .object({
          id: z.string(),
          name: z.string(),
          description: z.string(),
          starting_bonus: attributeMap.optional(),
        })
        .strict()
    ),
    attributes: z.array(
      z
        .object({
          id: z.string(),
          name: z.string(),
        })
        .strict()
    ),
    backgrounds: z.array(
      z
        .object({
          id: z.string(),
          name: z.string(),
          description: z.string(),
          bonus_attributes: attributeMap.optional(),
        })
        .strict()
    ),
    global_flags: z
      .object({
        enable_attribute_rewards: z.boolean(),
        enable_fail_scenes: z.boolean(),
      })
      .strict(),
    scenes: z.record(sceneSchema),
    endings: z.record(endingSchema),
  })
  .strict();

const GAME_CONTENT_DIR = path.join(process.cwd(), 'src', 'data', 'game-content');
const wildcardParents = new Set([
  'scenes',
  'endings',
  'attribute_bonus',
  'starting_bonus',
  'bonus_attributes',
  'min_attributes',
  'reward_attributes',
  'base_values',
]);

async function findGameFiles() {
  const entries = await fs.readdir(GAME_CONTENT_DIR, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(GAME_CONTENT_DIR, entry.name);
    if (entry.isDirectory()) {
      const nested = await fs.readdir(entryPath);
      for (const name of nested) {
        if (name.endsWith('.json')) {
          files.push(path.join(entryPath, name));
        }
      }
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(entryPath);
    }
  }

  return files.sort();
}

function buildShapeSignature(value) {
  const paths = new Set();

  function walk(current, pathLabel, parentKey) {
    if (Array.isArray(current)) {
      paths.add(`${pathLabel}:array`);
      current.forEach((item) => walk(item, `${pathLabel}[]`, parentKey));
      return;
    }

    if (current && typeof current === 'object') {
      paths.add(`${pathLabel}:object`);
      for (const [key, val] of Object.entries(current)) {
        const segment = wildcardParents.has(parentKey ?? '') ? '*' : key;
        const nextPath = pathLabel ? `${pathLabel}.${segment}` : segment;
        walk(val, nextPath, key);
      }
      return;
    }

    paths.add(`${pathLabel}:${typeof current}`);
  }

  walk(value, 'root', 'root');
  return Array.from(paths).sort();
}

function diffSignatures(reference, candidate) {
  const refSet = new Set(reference);
  const candSet = new Set(candidate);

  const missing = reference.filter((path) => !candSet.has(path));
  const extra = candidate.filter((path) => !refSet.has(path));

  return { missing, extra };
}

async function validateFile(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = JSON.parse(raw);

  const parsedResult = gameContentSchema.safeParse(parsed);
  if (!parsedResult.success) {
    return {
      ok: false,
      filePath,
      errors: parsedResult.error.errors.map(
        (err) => `${err.path.join('.') || '<root>'}: ${err.message}`
      ),
    };
  }

  return {
    ok: true,
    filePath,
    data: parsedResult.data,
    signature: buildShapeSignature(parsedResult.data),
  };
}

async function main() {
  const files = await findGameFiles();
  if (files.length === 0) {
    console.error('No game content JSON files found.');
    process.exit(1);
  }

  const results = [];
  for (const file of files) {
    try {
      results.push(await validateFile(file));
    } catch (error) {
      results.push({ ok: false, filePath: file, errors: [error.message] });
    }
  }

  const failures = results.filter((result) => !result.ok);
  if (failures.length > 0) {
    console.error('Schema validation failed:');
    for (const failure of failures) {
      console.error(`- ${path.relative(process.cwd(), failure.filePath)}`);
      failure.errors.forEach((err) => console.error(`  • ${err}`));
    }
    process.exit(1);
  }

  const reference = results[0];
  const divergences = [];
  for (const result of results.slice(1)) {
    const { missing, extra } = diffSignatures(reference.signature, result.signature);
    if (missing.length || extra.length) {
      divergences.push({ filePath: result.filePath, missing, extra });
    }
  }

  if (divergences.length > 0) {
    console.error('Structural differences detected between game files:');
    for (const diff of divergences) {
      console.error(`- ${path.relative(process.cwd(), diff.filePath)}`);
      if (diff.missing.length) {
        console.error('  Missing structure:');
        diff.missing.forEach((p) => console.error(`    • ${p}`));
      }
      if (diff.extra.length) {
        console.error('  Extra structure:');
        diff.extra.forEach((p) => console.error(`    • ${p}`));
      }
    }
    process.exit(1);
  }

  console.log('All game content files match the schema and share the same structure:');
  results.forEach((result) => {
    console.log(`- ${path.relative(process.cwd(), result.filePath)}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
