import { createId } from '@paralleldrive/cuid2'
import { User } from '@prisma/client'

export const usersData: User[] = [
  {
    id: createId(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'user.doe.john@yopmail.com',
    password: 'admin123',
    status: 'VERIFIED',
    createdAt: new Date(),
    profilePhotoUrl: null,
    updatedAt: null
  }
]
