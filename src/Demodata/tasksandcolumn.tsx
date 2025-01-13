import { Column, Task } from "../types";

export const defaultTasks: Task[] = [
  { id: "task-1", columnId: "column-1", content: "Learn React" },
  { id: "task-2", columnId: "column-1", content: "Understand TypeScript" },
  { id: "task-3", columnId: "column-2", content: "Build a Kanban Board" },
  { id: "task-4", columnId: "column-3", content: "Fix drag-and-drop issues" },
  { id: "task-5", columnId: "column-4", content: "Write unit tests" },
  { id: "task-6", columnId: "column-4", content: "Optimize performance" },
];

export const defaultColumns: Column[] = [
  { id: "column-1", title: "To Do" },
  { id: "column-2", title: "In Progress" },
  { id: "column-3", title: "Review" },
  { id: "column-4", title: "Done" },
];