export const tasksStorageKey = "tasks";

export interface AddResourceParams<T> {
  newResource: T;
  existingResources: T[];
}

export const storage = {
  getResource: (resourceStorageKey: string) => {
    const stored = localStorage.getItem(resourceStorageKey);
    return JSON.parse(stored || "[]");
  },
  addResource: <T>(
    resourceStorageKey: string,
    { newResource, existingResources }: AddResourceParams<T>,
  ) =>
    localStorage.setItem(
      resourceStorageKey,
      JSON.stringify([newResource, ...existingResources]),
    ),
};
