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
      JSON.stringify([...existingResources, newResource]),
    ),
  deleteResource: <T extends { uuid: string }>(resourceStorageKey: string, uuid: string) => {
    const resources = JSON.parse(localStorage.getItem(resourceStorageKey) || "[]") as T[];
    const updatedResources = resources.filter(resource => resource.uuid !== uuid);
    
    // Recalculate positions if resources have a position property
    const reorderedResources = updatedResources.map((resource, index) => {
      if ('position' in resource) {
        return { ...resource, position: index };
      }
      return resource;
    });
    
    localStorage.setItem(resourceStorageKey, JSON.stringify(reorderedResources));
    return reorderedResources;
  },
};
