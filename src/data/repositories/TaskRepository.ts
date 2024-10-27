import { Tasks } from '../../domain/models/Task';

export class TaskRepository {
  private tasks: Tasks = {
    upcoming: [
      { id: 1, title: 'Task 1', description: 'Description for Task 1' },
      { id: 2, title: 'Task 2', description: 'Description for Task 2' },
    ],
    todo: [
      { id: 3, title: 'Task 3', description: 'Description for Task 3' },
    ],
    done: [
      { id: 5, title: 'Task 5', description: 'Description for Task 5' },
    ],
  };

  getTasks(): Tasks {
    return this.tasks;
  }
}
