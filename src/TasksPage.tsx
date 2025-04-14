import { FC, useState, useEffect } from "react";
import { storage, tasksStorageKey } from "./helpers/storage";
import { isImportantTask, Task } from "./tasks";
import { TaskForm } from "./TaskForm";
import { ConfirmableAction } from "./components/ConfirmableAction";

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
      // TODO: confident code: either all tags are strings or all are arrays
      tags: Array.isArray(taskData.tags) ? taskData.tags : String(taskData.tags).split(',').map((t: string) => t.trim()),
    };
    storage.addResource(tasksStorageKey, {
      newResource: newTask,
      existingResources: tasks,
    });
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (uuid: string) => {
    const updatedTasks = storage.deleteResource<Task>(tasksStorageKey, uuid);
    setTasks(updatedTasks);
  };

  const sortedTasks = [...tasks].sort((a, b) => a.position - b.position);

  return { sortedTasks, addTask, deleteTask };
};

const MaybeStartedLabel: FC<{ task: Task }> = ({ task }) => {
  return task.status === "started" && (
    <span className="text-orange-500 text-sm">
      <i>Started... </i>
    </span>)
  }

export const TaskListPage: FC = () => {
  const { sortedTasks, addTask, deleteTask } = useTaskStore();

  return (
    <div>
      <ul className="space-y-2">
        {sortedTasks.map((task) => (
          <li key={task.uuid} className="border rounded-md p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center flex-1">
                <input
                  type="checkbox"
                  checked={task.status === "done"}
                  readOnly
                  className="h-5 w-5"
                />
                <span
                  className={isImportantTask(task) ? "text-xl font-semibold" : ""}
                >
                  {task.title}
                </span>
                <MaybeStartedLabel task={task} />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm">V: {task.value}</span>
                <span className="text-sm">E: {task.effort}</span>
                <div className="flex gap-1">
                  {task.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <ConfirmableAction onConfirm={() => deleteTask(task.uuid)} />
              </div>
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
