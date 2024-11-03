// src/domain/useCases/handleDrop.ts
import { Tasks,Task,TaskStatus } from '../models/Task';
import {Dimensions } from 'react-native';
import { TaskRepository } from '../../data/repositories/TaskRepository';



const taskRepository =TaskRepository.getInstance();

export function handleDrop(status: TaskStatus,taskId: number)
  {
  const task=taskRepository.getTaskById(taskId);
  if(task)
    {
      task.status=status
      taskRepository.editTask(taskId,task)
    }
  }


export function checkDropZone(x: number, taskContainerMinWidth: number): TaskStatus {
  const screenWidth = Math.max(Dimensions.get('window').width, taskContainerMinWidth * 3);
  const columnWidth = screenWidth / 3;

  if (x < columnWidth) {
    return TaskStatus.UPCOMING; // Left column
  } else if (x < columnWidth * 2) {
    return TaskStatus.TODO; // Middle column
  } else {
    return TaskStatus.DONE; // Right column
  }
}
