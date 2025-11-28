import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // 1. Create System User (Author for legacy stories)
  const systemUser = await prisma.user.upsert({
    where: { email: 'system@talebuilder.com' },
    update: {},
    create: {
      email: 'system@talebuilder.com',
      username: 'System',
      passwordHash: 'hashed_placeholder', // In real app, use bcrypt
    },
  });

  console.log(`Created system user: ${systemUser.username}`);

  // 2. Scan src/data/game-content for legacy stories
  const gamesDir = path.join(process.cwd(), 'src', 'data', 'game-content');
  
  try {
    const gameDirs = await fs.readdir(gamesDir);

    for (const slug of gameDirs) {
      if (slug.startsWith('.') || slug === 'index.ts') continue; // Skip .DS_Store and index.ts

      const gamePath = path.join(gamesDir, slug);
      const stat = await fs.stat(gamePath);
      
      if (!stat.isDirectory()) continue;

      // Look for [slug].json
      const jsonFile = `${slug}.json`;
      const jsonPath = path.join(gamePath, jsonFile);
      
      try {
        await fs.access(jsonPath);
      } catch {
        console.warn(`No JSON file found for game: ${slug} at ${jsonPath}`);
        continue;
      }

      const content = await fs.readFile(jsonPath, 'utf-8');
      const storyJson = JSON.parse(content);
      console.log(`Processing ${slug}:`, JSON.stringify(storyJson.metadata, null, 2));

      // Extract metadata
      const meta = storyJson.metadata || {};
      const supportedLang = meta.supported_languages || ['en'];
      
      // Handle title: if string, wrap in object using first supported lang
      let title = meta.title || { en: slug };
      if (typeof title === 'string') {
        title = { [supportedLang[0]]: title };
      }

      // Handle description
      let description = meta.description || { en: 'A legacy story.' };
      if (typeof description === 'string') {
        description = { [supportedLang[0]]: description };
      }

      const genre = meta.genre || 'Adventure';
      
      // Construct public URL for the JSON
      // Since these are in src/data, they are NOT publicly accessible via URL directly unless we expose them.
      // However, the requirement says "All existing stories (JSON + assets in public folder)".
      // But we found them in src/data.
      // For now, we will assume the API will serve them or we need to copy them to public.
      // Or maybe the existing app imports them directly.
      // For the seed, we'll set storyJsonUrl to a special prefix or just the path, and handle it in the API.
      // Let's use a special prefix "local://" to indicate it's a local file in src/data.
      const storyJsonUrl = `local://${slug}`;
      
      // Cover image - assuming it's in public/assets/games/[slug]/cover.png or similar
      // We need to check public folder for assets
      const publicAssetsDir = path.join(process.cwd(), 'public', 'assets', 'games', slug);
      let coverImageUrl = '/assets/game-scene-placeholder.jpg';
      
      try {
        const assets = await fs.readdir(publicAssetsDir);
        const coverFile = assets.find(f => f.match(/^cover\.(jpg|png|webp)$/));
        if (coverFile) {
          coverImageUrl = `/assets/games/${slug}/${coverFile}`;
        }
      } catch (e) {
        // Assets dir might not exist
      }

      // Create or Update Story
      const story = await prisma.story.upsert({
        where: { slug },
        update: {
          storyJsonUrl,
          coverImageUrl,
          title,
          description,
          genre,
          supportedLang,
        },
        create: {
          slug,
          authorId: systemUser.id,
          version: '1.0.0',
          isPublished: true,
          isActive: true,
          supportedLang,
          genre,
          title,
          description,
          storyJsonUrl,
          coverImageUrl,
        },
      });

      // Create Initial Version Entry
      await prisma.storyVersion.create({
        data: {
          storyId: story.id,
          version: '1.0.0',
          storyJsonUrl,
          createdBy: systemUser.id,
        },
      });

      console.log(`Seeded story: ${slug}`);
    }
  } catch (error) {
    console.error('Error scanning games directory:', error);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
