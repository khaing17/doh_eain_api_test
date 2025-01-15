import { PrismaService } from '../src/prisma/prisma.service';
import { faker } from '@faker-js/faker';

const prismaService = new PrismaService();
const prisma = prismaService;

async function seed() {
  try {
    const eventsToCreate = Array.from({ length: 20 }, () => ({
      title: faker.lorem.sentence({ min: 3, max: 7 }),
      description: faker.lorem.paragraph(),
      location: faker.location.city(),
      categories: faker.helpers.arrayElements(
        [
          'Technology',
          'Music',
          'Art',
          'Science',
          'Culture',
          'Sports',
          'Food',
          'Health',
          'Education',
        ],
        { min: 1, max: 3 },
      ),
      eventDate: faker.date.future(),
    }));

    for (const eventData of eventsToCreate) {
      const eventExists = await prisma.event.findFirst({
        where: { title: eventData.title },
      });
      if (!eventExists) {
        await prisma.event.create({ data: eventData });
      }
    }

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
