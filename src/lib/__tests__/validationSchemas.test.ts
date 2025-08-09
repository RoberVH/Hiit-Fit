import { test } from 'node:test';
import assert from 'node:assert';
import { exerciseSchema, routineSchema } from '../validationSchemas';

test('exercise restTime cannot be negative', () => {
  const invalidExercise = { name: 'Jumping Jacks', restTime: -5, duration: 10 };
  assert.throws(() => exerciseSchema.parse(invalidExercise), {
    message: /El tiempo de descanso no puede ser negativo/
  });
});

test('exercise duration must be at least 1 second', () => {
  const invalidExercise = { name: 'Push Ups', restTime: 5, duration: 0 };
  assert.throws(() => exerciseSchema.parse(invalidExercise), {
    message: /La duración del ejercicio debe ser al menos 1 segundo/
  });
});

test('routine must contain at least two exercises', () => {
  const routineWithOneExercise = {
    routineName: 'Morning Routine',
    exercises: [{ name: 'Squats', restTime: 5, duration: 10 }],
    cycles: 1,
  };
  assert.throws(() => routineSchema.parse(routineWithOneExercise), {
    message: /Debe agregar al menos dos ejercicios/
  });
});
