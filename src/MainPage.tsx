import { FC } from "react";

type TaskStatus = "pending" | "progressing" | "completed";
type TShirt = "XS" | "S" | "M" | "L" | "XL";

interface Task {
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

const tasks: Task[] = [
  {
    uuid: "1",
    title: "evict ants from the kitchen",
    description: "",
    effort: "S",
    position: 0,
    status: "pending",
    value: "S",
    is_blocked: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [],
  },
  {
    uuid: "2",
    title: "shower whistling",
    description: "",
    effort: "L",
    position: 1,
    status: "pending",
    value: "M",
    is_blocked: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [],
  },
  {
    uuid: "3",
    title: "model content protocol (MCT)",
    description: "",
    effort: "M",
    position: 2,
    status: "pending",
    value: "S",
    is_blocked: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [],
  },
  {
    uuid: "4",
    title: "prep EM interview",
    description: "",
    effort: "M",
    position: 3,
    status: "pending",
    value: "L",
    is_blocked: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [],
  },
  {
    uuid: "5",
    title: "linkedin detailed history",
    description: "",
    effort: "M",
    position: 4,
    status: "pending",
    value: "L",
    is_blocked: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [],
  },
];

export const MainPage: FC = () => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.uuid}>{task.title}</li>
      ))}
    </ul>
  );
};
