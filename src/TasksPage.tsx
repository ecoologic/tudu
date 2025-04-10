import { FC, useState, useEffect } from "react";
import { storage, tasksStorageKey } from "./helpers/storage";
import { isImportantTask, Task } from "./tasks";
import { TaskForm } from "./TaskForm";

const useTaskStore = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(storage.getResource(tasksStorageKey));
  }, []);

  // New tasks at the bottom
  const addTask = (taskData: Omit<Task, 'uuid' | 'created_at' | 'updated_at' | 'position'> & { tags: string[] | string }) => {
    const newTask: Task = {
      ...taskData,
      uuid: crypto.randomUUID(),
      position: tasks.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: Array.isArray(taskData.tags) ? taskData.tags : String(taskData.tags).split(',').map((t: string) => t.trim()),
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
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">New task</h2>
        <TaskForm onSubmit={addTask} />
      </div>
    </div>
  );
};
