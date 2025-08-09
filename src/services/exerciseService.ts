import prisma from '@/lib/prisma'

// Create a new exercise
export async function createExercise(data: {
  name: string
  duration: number
  rest?: number
  link?: string
  routineId?: number
}) {
  return prisma.exercise.create({
    data,
  })
}

// Delete an exercise by id
export async function deleteExercise(id: number) {
  return prisma.exercise.delete({
    where: { id },
  })
}

// Update exercise fields
export async function updateExercise(
  id: number,
  data: {
    name?: string
    duration?: number
    rest?: number
    link?: string
    routineId?: number
  }
) {
  return prisma.exercise.update({
    where: { id },
    data,
  })
}
