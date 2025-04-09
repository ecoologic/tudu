import { FC, useState, useEffect } from "react";

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

const STORAGE_KEY = "tasks";

const useTaskStore = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setTasks(JSON.parse(stored || "[]"));
  }, []);

  const addTask = () => {
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
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  };

  return { tasks, addTask };
};

const taskSizeFor = (task: Task) =>
  task.value === "L" || task.value === "XL" ? "2rem" : "inherit";

export const MainPage: FC = () => {
  const { tasks, addTask } = useTaskStore();
  const sortedTasks = [...tasks].sort((a, b) => a.position - b.position);

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
        onClick={addTask}
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
