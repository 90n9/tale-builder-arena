import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const stories = await prisma.story.findMany();
  console.log('Stories in DB:');
  for (const story of stories) {
    console.log(`- Slug: ${story.slug}`);
    console.log(`  Title: ${JSON.stringify(story.title)}`);

  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
