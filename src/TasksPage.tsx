import { FC, useState, useEffect } from "react";
import { storage, tasksStorageKey } from "./helpers/storage";
import { isImportantTask, Task } from "./tasks";

const useTaskStore = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(storage.getResource(tasksStorageKey));
  }, []);

  // New tasks at the bottom
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
    storage.addResource(tasksStorageKey, {
      newResource: newTask,
      existingResources: tasks,
    });
    setTasks([...tasks, newTask]);
  };

  const sortedTasks = [...tasks].sort((a, b) => a.position - b.position);

  return { sortedTasks, addTask };
};

export const TaskListPage: FC = () => {
  const { sortedTasks, addTask } = useTaskStore();

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
              <span
                style={{ fontSize: isImportantTask(task) ? "2rem" : "inherit" }}
              >
                {task.title}
              </span>
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
