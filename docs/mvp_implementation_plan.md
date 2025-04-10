Below is a lean, self-contained implementation plan you can save in your project. It’s designed for incremental, story-by-story coding and can be copy/pasted to an AI for further guidance on each feature.
# MVP Implementation Plan

## Overview

- **Project:** Imagination Todo App MVP
- **Approach:** Domain-driven design with user stories, delivered one at a time in a Kanban-style flow.
- **Goal:** Incrementally code and test features without external tools—this document serves as your progress status and guide.

---

## Development Process Guidelines

---

## Domain Model

**Task Entity:**

```typescript
type TShirt = "XS" | "S" | "M" | "L" | "XL";

interface Task {
  uuid: string;
  title: string;
  description: description; // Defaults to empty
  value: TShirt; // Defaults to M
  effort: TShirt; // Defaults to M
  position: number; // Ordering, defaults to last
  status: "pending" | "in_progress" | "done";
  created_at: string;
  updated_at: string;
  is_blocked: boolean; // Computed from dependent tasks (not a stored field)
}
```

- **Storage:** Use local storage (localStorage or IndexedDB) via a TaskStore service with CRUD operations.

---

## User Stories by Priority

### **Epic 1: Core Task Management**

- [x] **US-00: View Task List**
  - **Description:**
    As a user, I want to view all my current tasks in a clear list so that I can quickly see what needs my attention.
  - **Acceptance Criteria:**
    - A main task list view displays all tasks with their title, status, and key attributes (value, effort).
    - Tasks are sorted by position.
    - The view refreshes automatically as tasks are added or updated.
  - **Implementation Tasks:**
    - Create a TaskList component to render tasks from local storage.
    - Write tests to verify that the task list updates correctly.

- [x] **US-01: Task Creation**
  - **Description:**
    - As a user, I want to create tasks with title, description, value, and effort.
  - **Acceptance Criteria:**
    - A form (TaskForm) is available for task creation.
    - Tasks are saved in local storage with a generated UUID.
    - Basic validations (e.g., non-empty title) are enforced.
  - **Implementation Tasks:**
    - Build the TaskForm component.
    - Integrate with TaskStore.create.
    - Write unit tests for task creation.

- **US-02: Task Status Update**
  - **Description:**
    - As a user, I want to update a task’s status (pending, in_progress, done).
  - **Acceptance Criteria:**
    - UI controls allow status updates.
    - TaskStore.update correctly modifies the status.
  - **Implementation Tasks:**
    - Add status control buttons/inputs to TaskList.
    - Implement update logic.
    - Write tests for status changes.

- **US-03: Local Storage Integration**
  - **Description:**
    - As a user, I want my tasks stored locally so I can work offline.
  - **Acceptance Criteria:**
    - Tasks persist across browser sessions.
    - All CRUD operations function as expected.
  - **Implementation Tasks:**
    - Build a local storage adapter.
    - Integrate the adapter with TaskStore.
    - Write persistence tests.

- **US-04: Task Reordering**
  - **Description:**
    - As a user (Mike), I want to reorder tasks using the position field.
  - **Acceptance Criteria:**
    - The UI supports drag-and-drop or keyboard-based reordering.
    - The order is updated in TaskStore and persists between sessions.
  - **Implementation Tasks:**
    - Implement reordering (drag-and-drop or keyboard shortcuts).
    - Update the `position` field.
    - Write tests for reordering logic.

- **US-05: Task Edit & Delete**
  - **Description:**
    - As a user, I want to edit or delete tasks.
  - **Acceptance Criteria:**
    - A task can be edited via an updated TaskForm.
    - Task deletion requires a confirmation.
  - **Implementation Tasks:**
    - Extend TaskForm for editing.
    - Implement delete functionality.
    - Write tests for both edit and delete flows.

---

### **Epic 2: Keyboard-Friendly Interface**

- **US-06: Keyboard Shortcuts**
  - **Description:**
    - As a user, I want keyboard shortcuts for common actions:
      - `n`: New task
      - `e`: Edit selected task
      - `d`: Delete/mark done
      - `j/k`: Navigate tasks
      - `/`: Focus search
  - **Acceptance Criteria:**
    - Keyboard shortcuts trigger the correct actions.
    - Visual focus indication is updated accordingly.
  - **Implementation Tasks:**
    - Implement global key listeners (e.g., using a custom hook).
    - Map keys to actions in TaskList and TaskForm.
    - Write tests for keyboard functionality.

---

### **Epic 3: Visual Feedback & Computed Properties**

- **US-07: Task Completion Visuals**
  - **Description:**
    - As a user, I want a visual cue (animation) when I complete a task.
  - **Acceptance Criteria:**
    - A CSS animation (e.g., fade-out, strike-through) plays when a task is marked done.
  - **Implementation Tasks:**
    - Implement animations in TaskList.
    - Integrate animations with status changes.
    - Validate via UI tests.

- **US-08: Computed Blocked Status**
  - **Description:**
    - As a user, I want tasks to display a computed `is_blocked` state if they have dependent tasks that aren’t complete.
  - **Acceptance Criteria:**
    - The UI indicates blocked tasks (e.g., with a lock icon or dimming effect).
  - **Implementation Tasks:**
    - Build a BlockedStatusCalculator service.
    - Update Task UI to show blocked indicators.
    - Write tests for the blocked status computation.

---

## Execution Process

1. **Select a Story:**
   - Copy the section for the next user story (e.g., US-01: Task Creation) to work on.
2. **Develop:**
   - Code the feature in a dedicated branch.
   - Commit incremental changes with clear messages.
3. **Test:**
   - Write and run tests (unit/UI) to verify functionality.
4. **Update Progress:**
   - Mark the story as complete in this document before moving on.
5. **Repeat:**
   - Continue with the next highest-priority story.

---

## Usage

- **Progress Status:**
  - This document is your project progress tracker. Update each user story’s status as you complete them.
- **Copy/Paste to AI:**
  - To get guidance or code samples, copy the relevant user story section into your AI tool.
- **Adjust as Needed:**
  - Feel free to add more details or modify tasks as you progress.

---

This plan is designed for a solo dev working incrementally without a formal timeline. Use it as your living document to guide your coding sessions and maintain clear progress toward the end result.

Let me know if you need further modifications or additional details!
