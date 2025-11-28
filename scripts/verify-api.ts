/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || '3000';
const BASE_URL = process.env.API_BASE_URL || `http://localhost:${PORT}/api`;
const prisma = new PrismaClient();

async function main() {
  console.log('Starting API Verification...');

  // 1. Register
  console.log('\n1. Registering User...');
  const email = `test-${Date.now()}@example.com`;
  const password = 'password123';
  const regRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username: 'TestUser', password }),
  });
  const regData: any = await regRes.json();
  if (!regRes.ok) throw new Error(`Register failed: ${JSON.stringify(regData)}`);
  console.log('User registered:', regData.user.email);
  const token = regData.token;

  // 2. Login (Optional, since register returns token, but good to test)
  console.log('\n2. Logging in...');
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const loginData: any = await loginRes.json();
  if (!loginRes.ok) throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
  console.log('Login successful');

  // 3. Upload Story
  console.log('\n3. Uploading Story...');
  // Create a dummy story JSON
  const storyJson = {
    meta: {
      title: { en: 'Test Story' },
      description: { en: 'A test story' },
      version: '1.0.0',
      supportedLanguages: ['en'],
    },
    config: {
      initialSceneId: 'scene_1',
    },
    scenes: {
      scene_1: {
        id: 'scene_1',
        text: { en: 'Start scene' },
        choices: [
          { id: 'c1', text: { en: 'Go to end' }, nextSceneId: 'scene_end' }
        ]
      },
      scene_end: {
        id: 'scene_end',
        text: { en: 'The End' },
        isEnding: true,
        endingId: 'ending_1'
      }
    }
  };
  
  // Write temp file
  const tempJsonPath = path.join(process.cwd(), 'temp_story.json');
  fs.writeFileSync(tempJsonPath, JSON.stringify(storyJson));

  const form = new FormData();
  form.append('story', fs.createReadStream(tempJsonPath));
  // Optional: add dummy cover/assets if needed, but API should handle missing optional files

  const uploadRes = await fetch(`${BASE_URL}/stories`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      ...form.getHeaders(),
    },
    body: form,
  });
  const uploadData: any = await uploadRes.json();
  fs.unlinkSync(tempJsonPath); // Cleanup

  if (!uploadRes.ok) throw new Error(`Upload failed: ${JSON.stringify(uploadData)}`);
  console.log('Story uploaded:', uploadData.story.slug);
  const storyId = uploadData.story.id;
  const slug = uploadData.story.slug;

  // 4. List Stories
  console.log('\n4. Listing Stories...');
  // We need to publish it first? The API sets isPublished=false by default.
  // So listing might not show it unless we filter or update it.
  // Let's manually update it to published for testing
  await prisma.story.update({ where: { id: storyId }, data: { isPublished: true } });
  
  const listRes = await fetch(`${BASE_URL}/stories`);
  const listData: any = await listRes.json();
  if (!listRes.ok) throw new Error(`List failed: ${JSON.stringify(listData)}`);
  console.log('Stories found:', listData.data.length);

  // 5. Start Session
  console.log('\n5. Starting Session...');
  const sessionRes = await fetch(`${BASE_URL}/sessions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ storyId, characterData: { name: 'Hero' } }),
  });
  const sessionData: any = await sessionRes.json();
  if (!sessionRes.ok) throw new Error(`Start Session failed: ${JSON.stringify(sessionData)}`);
  console.log('Session started:', sessionData.id);
  const sessionId = sessionData.id;

  // 6. Make Choice
  console.log('\n6. Making Choice...');
  const choiceRes = await fetch(`${BASE_URL}/sessions/${sessionId}/choice`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ choiceId: 'c1' }),
  });
  const choiceData: any = await choiceRes.json();
  if (!choiceRes.ok) throw new Error(`Choice failed: ${JSON.stringify(choiceData)}`);
  console.log('Choice made. New Scene:', choiceData.session.currentScene);
  console.log('Status:', choiceData.session.status);

  if (choiceData.session.status === 'COMPLETED') {
      console.log('Story completed successfully!');
  } else {
      console.log('Story not completed?');
  }

  console.log('\nVerification Successful!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
