export interface Task {
    id: number;
    title: string;
    description: string;
  }
  
  export interface Tasks {
    upcoming: Task[];
    todo: Task[];
    done: Task[];
  }
  