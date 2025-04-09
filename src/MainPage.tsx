import { FC, useState } from "react";

type TaskStatus = "todo" | "started" | "done";
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

const initialTasks: Task[] = [
  {
    uuid: crypto.randomUUID(),
    title: "evict ants from the kitchen",
    description: "",
    effort: "S",
    position: 0,
    status: "started",
    value: "S",
    is_blocked: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [],
  },
  {
    uuid: crypto.randomUUID(),
    title: "shower whistling",
    description: "",
    effort: "L",
    position: 1,
    status: "done",
    value: "M",
    is_blocked: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [],
  },
  {
    uuid: crypto.randomUUID(),
    title: "model content protocol (MCT)",
    description: "",
    effort: "M",
    position: 2,
    status: "todo",
    value: "S",
    is_blocked: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [],
  },
  {
    uuid: crypto.randomUUID(),
    title: "prep EM interview",
    description: "",
    effort: "M",
    position: 3,
    status: "todo",
    value: "L",
    is_blocked: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [],
  },
  {
    uuid: crypto.randomUUID(),
    title: "linkedin detailed history",
    description: "",
    effort: "M",
    position: 4,
    status: "started",
    value: "L",
    is_blocked: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [],
  },
];

const taskSizeFor = (task: Task) =>
  task.value === "L" || task.value === "XL" ? "2rem" : "inherit";

export const MainPage: FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const sortedTasks = [...tasks].sort((a, b) => a.position - b.position);

  const handleAddTask = () => {
    const newTask: Task = {
      uuid: crypto.randomUUID(),
      title: "New Task",
      description: "",
      effort: "M",
      position: tasks.length,
      status: "todo",
      value: "M",
      is_blocked: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: [],
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <ul>
        {sortedTasks.map((task) => (
          <li key={task.uuid}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={task.status === "done"}
                readOnly
              />
              <span style={{ fontSize: taskSizeFor(task) }}>{task.title}</span>
              {task.status === "started" && (
                <span>
                  <i>{task.status}</i>
                </span>
              )}
              <span>Effort: {task.effort}</span>
              <span>Value: {task.value}</span>
              <span>{task.tags.join(", ")}</span>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddTask}
        style={{
          padding: "0.5rem 1rem",
          marginBottom: "1rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </div>
  );
};
