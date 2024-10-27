import { Filter } from '@mui/icons-material';
import { Tasks, Task,TaskStatus} from '../../domain/models/Task';

export class TaskRepository {
  private tasks: Task[] =  [
      { id: 1, title: 'Task 1', description: 'Description for Task 1', status: TaskStatus.UPCOMING},
      { id: 2, title: 'Task 2', description: 'Description for Task 2',status:TaskStatus.UPCOMING},
      { id: 3, title: 'Task 3', description: 'Description for Task 3',status: TaskStatus.TODO},
      { id: 5, title: 'Task 5', description: 'Description for Task 5',status:TaskStatus.DONE},
    ];

    getTasks(): Tasks {
      const upcomingTasks = this.tasks.filter(task => task.status === TaskStatus.UPCOMING);
      const todoTasks = this.tasks.filter(task => task.status === TaskStatus.TODO);
      const doneTasks = this.tasks.filter(task => task.status === TaskStatus.DONE);
  
      return {
        upcoming: upcomingTasks,
        todo: todoTasks,
        done: doneTasks
      };   
  }
  // Add a new task to the repository
  addTask(task: Task): void {
    this.tasks.push(task);
  }

  // Delete a task by id
  deleteTask(id: number): boolean {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true; // Return true if deletion was successful
    }
    return false; // Return false if no task with the given id was found
  }


  editTask(id: number, updatedFields: Partial<Task>): boolean {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      Object.assign(task, updatedFields);
      return true; // Return true if edit was successful
    }
    return false; // Return false if task with given id is not found
  }
}