import { describe, it, expect } from "vitest";
import { isImportantTask, Task } from "./index";

describe("isImportantTask", () => {
  it("returns true for tasks with value 'L'", () => {
    const task: Task = {
      uuid: "1",
      title: "Important Task",
      description: "This is an important task",
      value: "L",
      effort: "M",
      position: 1,
      status: "todo",
      is_blocked: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: [],
    };

    expect(isImportantTask(task)).toBe(true);
  });

  it("returns true for tasks with value 'XL'", () => {
    const task: Task = {
      uuid: "2",
      title: "Very Important Task",
      description: "This is a very important task",
      value: "XL",
      effort: "M",
      position: 2,
      status: "started",
      is_blocked: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: [],
    };

    expect(isImportantTask(task)).toBe(true);
  });

  it("returns false for tasks with value other than 'L' or 'XL'", () => {
    const task: Task = {
      uuid: "3",
      title: "Regular Task",
      description: "This is a regular task",
      value: "M",
      effort: "M",
      position: 3,
      status: "done",
      is_blocked: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: [],
    };

    expect(isImportantTask(task)).toBe(false);
  });
});
