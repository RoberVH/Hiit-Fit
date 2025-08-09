import prisma from '@/lib/prisma'
import { Difficulty_Level } from '@prisma/client'

// Create a new routine
export async function createRoutine(data: {
  name: string
  descripcion?: string
  difficultyLevel: Difficulty_Level
  exerciseIds?: number[]
}) {
  return prisma.routine.create({
    data: {
      name: data.name,
      descripcion: data.descripcion,
      difficultyLevel: data.difficultyLevel,
      exercises: data.exerciseIds
        ? { connect: data.exerciseIds.map(id => ({ id })) }
        : undefined,
    },
  })
}

// Delete a routine by id
export async function deleteRoutine(id: number) {
  return prisma.routine.delete({
    where: { id },
  })
}

// Update routine fields
export async function updateRoutine(
  id: number,
  data: {
    name?: string
    descripcion?: string
    difficultyLevel?: Difficulty_Level
    exerciseIds?: number[]
  }
) {
  return prisma.routine.update({
    where: { id },
    data: {
      name: data.name,
      descripcion: data.descripcion,
      difficultyLevel: data.difficultyLevel,
      exercises: data.exerciseIds
        ? { set: data.exerciseIds.map(id => ({ id })) }
        : undefined,
    },
  })
}
