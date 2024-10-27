import { Tasks, Task, TaskStatus } from '../../domain/models/Task';

export class TaskRepository {
  private static instance: TaskRepository;
  private tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', status: TaskStatus.UPCOMING },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', status: TaskStatus.UPCOMING },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', status: TaskStatus.TODO },
    { id: 5, title: 'Task 5', description: 'Description for Task 5', status: TaskStatus.DONE },
  ];

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Static method to get the singleton instance
  public static getInstance(): TaskRepository {
    if (!TaskRepository.instance) {
      TaskRepository.instance = new TaskRepository();
    }
    return TaskRepository.instance;
  }

  getTasks(): Tasks {
    const upcomingTasks = this.tasks.filter(task => task.status === TaskStatus.UPCOMING);
    const todoTasks = this.tasks.filter(task => task.status === TaskStatus.TODO);
    const doneTasks = this.tasks.filter(task => task.status === TaskStatus.DONE);

    return { upcoming: upcomingTasks, todo: todoTasks, done: doneTasks };
  }

  // Add a new task to the repository
  addTask(task: Task): void {
    if (!this.tasks.some(existingTask => existingTask.id === task.id)) {
      this.tasks.push(task);
    } else {
      console.warn(`Task with ID ${task.id} already exists and was not added.`);
    }
  }

  deleteTask(id: number): boolean {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }

  editTask(id: number, updatedFields: Partial<Task>): boolean {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      Object.assign(task, updatedFields);
      return true;
    }
    return false;
  }
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }
}
