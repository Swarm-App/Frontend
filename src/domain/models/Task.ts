export enum TaskStatus {
  UPCOMING = "upcoming",
  TODO = "todo",
  DONE = "done"
}



export interface Task {
    id: number;
    title: string;
    description: string;
    status:TaskStatus;
  }

export interface Tasks {
  upcoming: Task[];
  todo: Task[];
  done: Task[];
}