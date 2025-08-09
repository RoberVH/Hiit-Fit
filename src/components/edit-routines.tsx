"use client"

import { useState, useEffect, useMemo } from "react"
// useEffect sets initial readiness; useMemo memoizes default values
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { routineSchema, RoutineFormValues } from "@/lib/validationSchemas"
import Input from "@/components/forms/Input"
import NumberInput from "@/components/forms/NumberInput"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd"
import { v4 as uuidv4 } from "uuid"

interface EditRoutineProps {
  isNewRoutine: boolean
  initialRoutineData?: RoutineFormValues
}

export default function EditRoutine({
  isNewRoutine,
  initialRoutineData,
}: EditRoutineProps) {
  const defaultFormValues = useMemo(() => {
    if (!isNewRoutine && initialRoutineData) {
      return {
        routineName: initialRoutineData.routineName,
        cycles: initialRoutineData.cycles,
        exercises: initialRoutineData.exercises,
        newExercise: { name: "", duration: 0, restTime: 0 },
      }
    }
    return {
      routineName: "",
      exercises: [],
      cycles: 1,
      newExercise: { name: "", restTime: 0, duration: 0 },
    }
  }, [isNewRoutine, initialRoutineData])

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    resetField,
    reset,
    trigger,
  } = useForm<RoutineFormValues>({
    resolver: zodResolver(routineSchema),
    defaultValues: defaultFormValues,
  })

  const { fields, append, remove, move, update } = useFieldArray<
    RoutineFormValues,
    "exercises",
    "fieldKey"
  >({
    control,
    name: "exercises",
    keyName: "fieldKey",
  })

  console.log("fields con ids generados:", fields)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    move(result.source.index, result.destination.index)
  }

  const handleAddOrUpdateExercise = async () => {
    const isValid = await trigger([
      "newExercise.name",
      "newExercise.restTime",
      "newExercise.duration",
    ])
    if (!isValid) return

    const d = getValues("newExercise")
    const id =
      d?.id ??
      (crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2))
    const exerciseToSave = {
      id,
      name: d?.name ?? "",
      restTime: d?.restTime ?? 0,
      duration: d?.duration ?? 0,
    }

    if (editingIndex !== null) {
      update(editingIndex, exerciseToSave)
      setEditingIndex(null)
    } else {
      append(exerciseToSave)
    }
    resetField("newExercise.name")
    resetField("newExercise.restTime")
    resetField("newExercise.duration")
    resetField("newExercise.id")
  }

  const handleEditExercise = (index: number) => {
    const exerciseToEdit = fields[index]
    setValue("newExercise.name", exerciseToEdit.name)
    setValue("newExercise.restTime", exerciseToEdit.restTime)
    setValue("newExercise.duration", exerciseToEdit.duration)
    setValue("newExercise.id", exerciseToEdit.id) // Set the ID when editing
    setEditingIndex(index)
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    resetField("newExercise.name")
    resetField("newExercise.restTime")
    resetField("newExercise.duration")
    resetField("newExercise.id")
  }

  const onSubmit = (data: RoutineFormValues) => {
    console.log("Form data submitted!:", data)
  }

  return (
    <div className="p-8 mx-auto">
      <h1 className="mb-6 text-center">
        {isNewRoutine ? "Crear Nueva Rutina" : "Editar Rutina"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="flex flex-col gap-4">
          <Input
            id="routineName"
            label="Nombre de la Rutina:"
            name="routineName"
            register={register}
            error={errors.routineName?.message}
          />

          <NumberInput
            id="cycles"
            label="Número de Ciclos:"
            name="cycles"
            register={register}
            error={errors.cycles?.message}
          />

          <h2 className="mt-6 mb-4">
            {editingIndex !== null
              ? `Editando Ejercicio No. ${editingIndex + 1}`
              : "Agregar Ejercicio"}
          </h2>
          <div className="border border-gray-300 p-4 rounded-md flex flex-col gap-2">
            <Input
              id="newExerciseName"
              label="Nombre:"
              name="newExercise.name"
              register={register}
              error={errors.newExercise?.name?.message}
              placeholder="Nombre del ejercicio"
            />

            <NumberInput
              id="newExerciseDuration"
              label="Duración (segundos):"
              name="newExercise.duration"
              register={register}
              error={errors.newExercise?.duration?.message}
              placeholder="Duración del ejercicio"
            />

            <NumberInput
              id="newExerciseRestTime"
              label="Descanso (segundos):"
              name="newExercise.restTime"
              register={register}
              error={errors.newExercise?.restTime?.message}
              placeholder="Tiempo de descanso"
            />
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleAddOrUpdateExercise}
                className="bg-button-primary text-white py-2 px-4 border-none rounded-md cursor-pointer self-start"
              >
                {editingIndex !== null ? "Guardar Cambios" : "Agregar"}
              </button>
              {editingIndex !== null && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-button-secondary text-white py-2 px-4 border-none rounded-md cursor-pointer self-start"
                >
                  Cancelar Edición
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-8 justify-end">
            <button
              type="button"
              className="bg-button-secondary text-white py-3 px-6 border-none rounded-md cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white py-3 px-6 border-none rounded-md cursor-pointer"
            >
              Guardar Rutina
            </button>
          </div>
        </div>
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="exercises"
              isDropDisabled={editingIndex !== null}
            >
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="list-none p-0"
                >
                  <h2>Ejercicios Agregados</h2>
                  {fields.map((field, index) => (
                    <Draggable
                      key={field.fieldKey}
                      draggableId={String(field.id)}
                      index={index}
                      isDragDisabled={editingIndex !== null}
                    >
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            cursor:
                              editingIndex !== null
                                ? "not-allowed"
                                : snapshot.isDragging
                                ? "grabbing"
                                : "grab",
                            touchAction: "none", // better mobile DnD, avoids scroll grab
                          }}
                          className="border border-gray-300 p-3 mb-2 rounded-md flex justify-between items-center bg-gray-700 text-white select-none"
                          {...provided.dragHandleProps}
                        >
                          <span className="text-white">{`${index + 1}: ${
                            field.name
                          } (Duración: ${field.duration}s, Descanso: ${
                            field.restTime
                          }s)`}</span>
                          <div>
                            <button
                              type="button"
                              onClick={() => handleEditExercise(index)}
                              className="bg-button-warning text-white py-1.5 px-3 border-none rounded-md cursor-pointer mr-2"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="bg-button-danger text-white py-1.5 px-3 border-none rounded-md cursor-pointer"
                            >
                              Eliminar
                            </button>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </form>
    </div>
  )
}
