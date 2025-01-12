import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";

type UseExercisePlanBuilderProps = {
  form: any;
  exercisesPath: string;
};

export default function useExercisePlanBuilder({
  form,
  exercisesPath,
}: UseExercisePlanBuilderProps) {
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<
    number | null
  >(null);
  const { fields, remove } = useFieldArray({
    control: form.control,
    name: `${exercisesPath}`,
  });

  const handleSelectExercise = (item: any) => {
    console.log("Item", item);
    form.setValue(exercisesPath, [...form.getValues(exercisesPath), item]);
    setSelectedExerciseIndex(form.getValues(exercisesPath).length - 1);
  };

  const handleRemoveExercise = (index: number) => {
    const currentExercises = form.getValues(exercisesPath);
    const updatedExercises = currentExercises.filter(
      (_: any, i: any) => i !== index
    );

    const unregisterSets = (index: number) =>
      form.unregister(`${exercisesPath}.${index}.sets`);

    unregisterSets(index);
    remove(index);
    unregisterSets(fields.length - 1);

    form.setValue(exercisesPath, updatedExercises);

    if (selectedExerciseIndex === index) {
      setSelectedExerciseIndex(null);
    } else if (
      selectedExerciseIndex !== null &&
      selectedExerciseIndex > index
    ) {
      setSelectedExerciseIndex(selectedExerciseIndex - 1);
    }

    console.log(form.getValues(exercisesPath));
  };

  const handleDragStart = (e: React.DragEvent, draggedIndex: number) => {
    e.dataTransfer.setData("draggedIndex", String(draggedIndex));
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));

    if (draggedIndex === targetIndex) return;

    const exercises = form.getValues(exercisesPath);

    const [draggedItem] = exercises.splice(draggedIndex, 1);

    exercises.splice(targetIndex, 0, draggedItem);

    form.setValue(exercisesPath, exercises);
    setSelectedExerciseIndex(targetIndex);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onChangeSelectedExerciseIndex = (index: number | null) => {
    if (index == null) {
      setSelectedExerciseIndex(null);
      return;
    }
    selectedExerciseIndex !== null
      ? selectedExerciseIndex === index
        ? setSelectedExerciseIndex(null)
        : setSelectedExerciseIndex(index)
      : setSelectedExerciseIndex(index);
  };

  return {
    selectedExerciseIndex,
    onChangeSelectedExerciseIndex,
    onSelectExercise: handleSelectExercise,
    onRemoveExercise: handleRemoveExercise,
    onExerciseDragStart: handleDragStart,
    onExerciseDragDrop: handleDrop,
    onExerciseDragOver: handleDragOver,
  };
}
