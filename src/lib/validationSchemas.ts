//src/lib/validationSchemas.ts
import * as z from "zod";

export const exerciseSchema = z.object({
  id: z.string().optional(), // Add optional id field
  name: z.string().min(1, "El nombre del ejercicio es requerido"),
  restTime: z.number().min(0, "El tiempo de descanso no puede ser negativo"),
  duration: z.number().min(1, "La duración del ejercicio debe ser al menos 1 segundo"),
});

export const routineSchema = z.object({
  routineName: z.string().min(1, "El nombre de la rutina es requerido"),
  exercises: z.array(exerciseSchema).min(2, "Debe agregar al menos dos ejercicios"),
  cycles: z.number().min(1, "El número de ciclos debe ser al menos 1"),
  newExercise: exerciseSchema.partial().optional(), // Add newExercise as an optional partial exercise
});

export type RoutineFormValues = z.infer<typeof routineSchema>;