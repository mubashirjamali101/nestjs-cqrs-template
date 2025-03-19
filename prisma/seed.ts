import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

// Seed data
import { usersData } from './seed_data'

const prisma = new PrismaClient()

async function seed() {
  try {
    // Seed users
    for (const user of Object.values(usersData)) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: {
          ...user,
          password: await bcrypt.hash(user.password, 10)
        }
      })
    }
    console.log('Users seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed().catch(console.error)
