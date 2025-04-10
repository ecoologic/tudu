import { describe, it, expect, beforeEach, vi } from "vitest";
import { storage, tasksStorageKey, AddResourceParams } from "./storage";

interface TestResource {
  uuid: string;
  name: string;
  position?: number;
}

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe("getResource", () => {
    it("returns an empty array if no data is stored", () => {
      const result = storage.getResource(tasksStorageKey);
      expect(result).toEqual([]);
    });

    it("returns parsed data from localStorage if data exists", () => {
      const mockData = [{ id: 1, name: "Task 1" }];
      localStorage.setItem(tasksStorageKey, JSON.stringify(mockData));

      const result = storage.getResource(tasksStorageKey);
      expect(result).toEqual(mockData);
    });
  });

  describe("addResource", () => {
    it("adds a new resource to the existing resources and stores them in localStorage", () => {
      const existingResources = [{ uuid: "1", name: "Task 1" }];
      const newResource = { uuid: "2", name: "Task 2" };
      const params: AddResourceParams<typeof newResource> = {
        newResource,
        existingResources,
      };

      storage.addResource(tasksStorageKey, params);

      const storedData = JSON.parse(localStorage.getItem(tasksStorageKey) || "[]");
      expect(storedData).toEqual([...existingResources, newResource]);
    });

    it("overwrites localStorage with only the new resource if existing resources are empty", () => {
      const newResource = { uuid: "1", name: "Task 1" };
      const params: AddResourceParams<typeof newResource> = {
        newResource,
        existingResources: [],
      };

      storage.addResource(tasksStorageKey, params);

      const storedData = JSON.parse(localStorage.getItem(tasksStorageKey) || "[]");
      expect(storedData).toEqual([newResource]);
    });
  });

  describe("deleteResource", () => {
    it("removes a resource by uuid and returns updated resources", () => {
      const resources: TestResource[] = [
        { uuid: "1", name: "Task 1" },
        { uuid: "2", name: "Task 2" },
        { uuid: "3", name: "Task 3" }
      ];
      localStorage.setItem(tasksStorageKey, JSON.stringify(resources));

      const result = storage.deleteResource<TestResource>(tasksStorageKey, "2");

      // Check returned value
      expect(result).toEqual([
        { uuid: "1", name: "Task 1" },
        { uuid: "3", name: "Task 3" }
      ]);

      // Check localStorage was updated
      const storedData = JSON.parse(localStorage.getItem(tasksStorageKey) || "[]");
      expect(storedData).toEqual([
        { uuid: "1", name: "Task 1" },
        { uuid: "3", name: "Task 3" }
      ]);
    });

    it("recalculates positions if resources have position property", () => {
      const resources: TestResource[] = [
        { uuid: "1", name: "Task 1", position: 0 },
        { uuid: "2", name: "Task 2", position: 1 },
        { uuid: "3", name: "Task 3", position: 2 }
      ];
      localStorage.setItem(tasksStorageKey, JSON.stringify(resources));

      const result = storage.deleteResource<TestResource>(tasksStorageKey, "2");

      // Check positions were recalculated
      expect(result).toEqual([
        { uuid: "1", name: "Task 1", position: 0 },
        { uuid: "3", name: "Task 3", position: 1 }
      ]);
    });

    it("returns empty array if no resources match the criteria", () => {
      const resources: TestResource[] = [];
      localStorage.setItem(tasksStorageKey, JSON.stringify(resources));

      const result = storage.deleteResource<TestResource>(tasksStorageKey, "nonexistent");

      expect(result).toEqual([]);
    });
  });
});
