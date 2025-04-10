import { describe, it, expect, beforeEach, vi } from "vitest";
import { storage, tasksStorageKey, AddResourceParams } from "./storage";

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
      const existingResources = [{ id: 1, name: "Task 1" }];
      const newResource = { id: 2, name: "Task 2" };
      const params: AddResourceParams<typeof newResource> = {
        newResource,
        existingResources,
      };

      storage.addResource(tasksStorageKey, params);

      const storedData = JSON.parse(localStorage.getItem(tasksStorageKey) || "[]");
      expect(storedData).toEqual([newResource, ...existingResources]);
    });

    it("overwrites localStorage with only the new resource if existing resources are empty", () => {
      const newResource = { id: 1, name: "Task 1" };
      const params: AddResourceParams<typeof newResource> = {
        newResource,
        existingResources: [],
      };

      storage.addResource(tasksStorageKey, params);

      const storedData = JSON.parse(localStorage.getItem(tasksStorageKey) || "[]");
      expect(storedData).toEqual([newResource]);
    });
  });
});
