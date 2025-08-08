import EditRoutine from "@/components/edit-routines";
import { v4 as uuidv4 } from 'uuid'

export default function EditManitalRoutinePage() {
  const initialRoutineData = {
    routineName: "Matinal Routine",
    cycles: 1,
    exercises: [
      { id: uuidv4(), name: 'burpees', duration: 10, restTime: 10 },
      { id: uuidv4(), name: 'zancadotas', duration: 10, restTime: 10 },
      { id: uuidv4(), name: 'jumping jacks', duration: 10, restTime: 10 }
    ],
    newExercise: { name: "", duration: 0, restTime: 0 },
  };

  return (
    <EditRoutine
      isNewRoutine={false}
      initialRoutineData={initialRoutineData}
    />
  );
}