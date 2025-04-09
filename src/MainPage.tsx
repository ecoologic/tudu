import { FC } from "react";

type TaskStatus = "pending" | "progressing" | "completed";
type TShirt = "XS" | "S" | "M" | "L" | "XL";

interface Task {
  id: number;
  title: string;
  tags: string[];
  status: TaskStatus;
  priority: TShirt;
  difficulty: TShirt;
  createdAt: Date;
  updatedAt: Date;
}

const tasks: Task[] = [
  {
    id: 1,
    title: "evict ants from the kitchen",
    tags: ["house", "rent"],
    status: "pending" as const,
    priority: "S" as const,
    difficulty: "S" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "shower whisteling",
    tags: ["house", "rent"],
    status: "pending" as const,
    priority: "M" as const,
    difficulty: "L" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "model content protocol (MCT)",
    tags: ["pc", "job"],
    status: "pending" as const,
    priority: "S" as const,
    difficulty: "M" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: "prep EM interview",
    tags: ["pc", "job"],
    status: "pending" as const,
    priority: "L" as const,
    difficulty: "M" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: "linkedin detailed history",
    tags: ["pc", "job"],
    status: "pending" as const,
    priority: "L" as const,
    difficulty: "M" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const MainPage: FC = () => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
};
