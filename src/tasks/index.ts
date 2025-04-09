import { TShirt } from "../helpers/types";

export type TaskStatus = "todo" | "started" | "done";

export interface Task {
  uuid: string;
  title: string;
  description: string;
  value: TShirt;
  effort: TShirt;
  position: number;
  status: TaskStatus;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
  tags: string[];
}

export const isImportantTask = (task: Task) =>
  task.value === "L" || task.value === "XL";
