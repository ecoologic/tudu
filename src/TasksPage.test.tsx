import { render, screen, fireEvent } from "@testing-library/react";
import { TaskListPage } from "./TasksPage";
import { storage, tasksStorageKey } from "./helpers/storage";
import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("./helpers/storage", () => ({
  storage: {
    getResource: vi.fn(),
    addResource: vi.fn(),
  },
  tasksStorageKey: "tasks",
}));

describe("TaskListPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders tasks from storage", () => {
    const mockTasks = [
      {
        uuid: "1",
        title: "Task 1",
        description: "",
        effort: "M",
        position: 0,
        status: "todo",
        value: "M",
        is_blocked: false,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
        tags: ["tag1"],
      },
    ];
    vi.mocked(storage.getResource).mockReturnValue(mockTasks);

    render(<TaskListPage />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Effort: M")).toBeInTheDocument();
    expect(screen.getByText("Value: M")).toBeInTheDocument();
    expect(screen.getByText("tag1")).toBeInTheDocument();
  });

  it("adds a new task when the add button is clicked", () => {
    vi.mocked(storage.getResource).mockReturnValue([]);
    render(<TaskListPage />);

    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    expect(storage.addResource).toHaveBeenCalledWith(tasksStorageKey, {
      newResource: expect.objectContaining({
        title: "New Task",
        status: "todo",
      }),
      existingResources: [],
    });
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  it("displays tasks in sorted order by position", () => {
    const mockTasks = [
      {
        uuid: "2",
        title: "Task 2",
        description: "",
        effort: "M",
        position: 1,
        status: "todo",
        value: "M",
        is_blocked: false,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
        tags: [],
      },
      {
        uuid: "1",
        title: "Task 1",
        description: "",
        effort: "M",
        position: 0,
        status: "todo",
        value: "M",
        is_blocked: false,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
        tags: [],
      },
    ];
    vi.mocked(storage.getResource).mockReturnValue(mockTasks);

    render(<TaskListPage />);

    const taskTitles = screen.getAllByText(/Task \d/).map((el) => el.textContent);
    expect(taskTitles).toEqual(["Task 1", "Task 2"]);
  });

  it("renders important tasks with larger font size", () => {
    const mockTasks = [
      {
        uuid: "1",
        title: "Important Task",
        description: "",
        effort: "M",
        position: 0,
        status: "todo",
        value: "M",
        is_blocked: false,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
        tags: [],
      },
    ];
    vi.mocked(storage.getResource).mockReturnValue(mockTasks);
    vi.mock("./tasks", () => ({
      isImportantTask: () => true,
    }));

    render(<TaskListPage />);

    const importantTask = screen.getByText("Important Task");
    expect(importantTask).toHaveStyle("font-size: 2rem");
  });
});
