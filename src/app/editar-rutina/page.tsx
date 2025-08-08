import EditRoutine from "@/components/edit-routines";

export default function EditManitalRoutinePage() {
  const initialRoutineData = {
    routineName: "Manital Routine",
    cycles: 1,
    exercises: [
      { name: "burpees", duration: 10, restTime: 10 },
      { name: "zancadotas", duration: 10, restTime: 10 },
      { name: "jumping jacks", duration: 10, restTime: 10 },
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