// src/domain/useCases/handleDrop.ts
import { Tasks } from '../models/Task';
import {Dimensions } from 'react-native';


export function handleDrop(
  tasks: Tasks,
  dropZoneId: string,
  taskId: number
): Tasks {
  const updatedTasks = {
    upcoming: tasks.upcoming.filter((task) => task.id !== taskId),
    todo: tasks.todo.filter((task) => task.id !== taskId),
    done: tasks.done.filter((task) => task.id !== taskId),
  };

  const movedTask = [...tasks.upcoming, ...tasks.todo, ...tasks.done].find(
    (task) => task.id === taskId
  );

  if (movedTask) {
    updatedTasks[dropZoneId as keyof Tasks].push(movedTask);
  }

  return updatedTasks;
}

export function checkDropZone(x: number, taskContainerMinWidth: number): string {
  const screenWidth = Math.max(Dimensions.get('window').width, taskContainerMinWidth * 3);
  const columnWidth = screenWidth / 3;

  if (x < columnWidth) {
    return 'upcoming'; // Left column
  } else if (x < columnWidth * 2) {
    return 'todo'; // Middle column
  } else {
    return 'done'; // Right column
  }
}
