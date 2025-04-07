# MVP implementation plan

Below is a plain-text, self-contained implementation plan you can save in your project and copy/paste sections into an AI tool to progress feature by feature. It’s structured by user stories and organized into Epics with clear tasks and acceptance criteria, without relying on external tools.

---

## Solo Dev Incremental Implementation Plan

### **Overview**
- **Approach:** Implement one user story at a time with incremental, agile progress.
- **Purpose:** This plan serves as a progress status document to guide feature-by-feature development.
- **Focus:** Domain-driven design with core task management, keyboard-friendly UI, and visual feedback.

---

### **Epic 1: Core Task Management**

#### **US-01: Task Creation**
- **Description:**
  - As a user, I want to create tasks with a title, description, value (instead of priority), and effort (t-shirt sizes).
- **Acceptance Criteria:**
  - A TaskForm is available to create new tasks.
  - Tasks are saved locally with a unique UUID.
  - The form validates that the title is non-empty.
- **Tasks:**
  - Build the TaskForm component.
  - Implement TaskStore.create to save tasks in local storage.
  - Write basic unit tests for task creation.

---

#### **US-02: Task Status Update**
- **Description:**
  - As a user, I want to update a task’s status among "pending", "in_progress", and "done".
- **Acceptance Criteria:**
  - Users can update a task’s status via a UI control or keyboard action.
  - The UI reflects the updated status immediately.
- **Tasks:**
  - Add status update controls in the TaskList.
  - Integrate status update functionality in TaskStore.
  - Test status change behavior.

---

#### **US-03: Local Storage Integration**
- **Description:**
  - As a user, I want my tasks to persist locally so I can work offline.
- **Acceptance Criteria:**
  - Tasks persist across sessions using local storage (or IndexedDB).
  - CRUD operations (create, read, update, delete) work correctly.
- **Tasks:**
  - Implement a local storage adapter.
  - Connect the adapter with TaskStore.
  - Write tests for persistence functions.

---

#### **US-04: Task Reordering**
- **Description:**
  - As a user (Mike), I want to reorder tasks manually using the position field.
- **Acceptance Criteria:**
  - Users can reorder tasks (via drag-and-drop or keyboard shortcuts).
  - The updated order persists between sessions.
- **Tasks:**
  - Implement reordering UI (drag-and-drop or keyboard-based).
  - Update the TaskStore to save the new position.
  - Test task ordering and persistence.

---

#### **US-05: Task Edit & Delete**
- **Description:**
  - As a user, I want to edit or delete tasks.
- **Acceptance Criteria:**
  - Task edit form pre-populated with existing data works correctly.
  - Deleting a task asks for confirmation before removal.
- **Tasks:**
  - Enhance TaskForm for editing.
  - Implement deletion with confirmation.
  - Validate with unit tests.

---

### **Epic 2: Keyboard-Friendly Interface**

#### **US-06: Keyboard Shortcuts**
- **Description:**
  - As a user, I want to use keyboard shortcuts for actions like creating, editing, deleting, updating status, and navigating tasks.
- **Acceptance Criteria:**
  - Global key listeners trigger corresponding actions (e.g., `n` for new, `e` for edit, `d` for marking as done, `j/k` for navigation, `/` for search).
  - Visual focus indicators show the selected task.
- **Tasks:**
  - Set up key listener hooks (or use a library like `react-hotkeys-hook`).
  - Map shortcuts to actions in TaskList and TaskForm.
  - Test shortcut behavior and UI feedback.

---

### **Epic 3: Visual Feedback & Computed Properties**

#### **US-07: Task Completion Visuals**
- **Description:**
  - As a user, I want to see satisfying visual cues when I complete a task.
- **Acceptance Criteria:**
  - CSS animations (e.g., fade-out, strike-through) activate upon task completion.
  - A visual indicator (badge/icon) appears to confirm completion.
- **Tasks:**
  - Implement CSS animations in the TaskList.
  - Integrate visual feedback with status update logic.
  - Verify visually and with UI tests.

---

#### **US-08: Computed Blocked Status**
- **Description:**
  - As a user, I want tasks to display a computed `is_blocked` state if dependent tasks aren’t completed.
- **Acceptance Criteria:**
  - The UI shows a visual indicator (e.g., a lock icon or dimmed effect) for blocked tasks.
  - The `is_blocked` property is computed based on dependent task statuses.
- **Tasks:**
  - Build a BlockedStatusCalculator service.
  - Update the Task UI to display the blocked indicator.
  - Test the computation using sample dependency data.

---

### **Execution Strategy**
1. **Copy-Paste & Focus:**
   - Copy a single story (with its description, criteria, and tasks) into your coding environment or prompt for the next incremental step.
2. **Code, Test, and Commit:**
   - Implement the feature, run tests, and commit changes before moving to the next story.
3. **Incremental Progress:**
   - Progress story-by-story in the order listed. Once one is done, copy the next story details to ensure clear focus.
4. **Status Documentation:**
   - Update this document with progress notes and any adjustments as you develop each feature.

---

This document can be saved in your project and used as a living guide to incrementally develop your app. Copy and paste the relevant story sections into your workflow or an AI assistant for targeted coding help as you progress.

Let me know if you need further adjustments or additional details for any specific story!
