# PRD

## Imagination Todo App: Product Requirements Document (PRD)

### 1. Overview

- **Product Concept:**
  A modern todo app designed for busy adults, combining task management with gamification and optional AI-driven insights.

- **Core Appeal:**
  Gamification of task completion, easy linking of dependent tasks, and seamless integration with external apps (e.g., calendars).

- **Tech Requirements:**
  - Browser and mobile support (including lightweight versions like Lynx)
  - Optional AI integration
  - Local storage for the MVP

---

### 2. Target Audience

- **Who:**
  Adults juggling multiple personal and professional tasks.

- **Needs:**
  - Efficient task management
  - Integration with calendars and other productivity tools
  - Motivation through gamification elements

---

### 3. Product Stages

Sure — here’s the **"Product Stages"** section from the PRD in bullet point format:

---

### 🔄 Product Stages

- **MVP**
  - Tasks with priority, effort, status, and dates (`due_by`)
  - Local storage (no backend required)
  - No AI integration
  - Keyboard shortcuts

- **Stage 2 – Incremental Delivery**
  1. Add `tags`
  2. Link dependent tasks using a join table (no nested subtasks)
  3. Add `due_by`
  4. Gamification system:
     - Points
     - Visual completion effects
     - Daily graph
     - Badges
  5. Optional AI integration:
     - Contextual suggestions
     - Adaptive effort scoring
  6. Integrations (e.g., calendars)

---

### 4. Functional Requirements

#### A. Core Task Management (MVP)
- **Task Model Fields:**
  - **id:** Unique identifier
  - **title, description:** Text fields
  - **status:** Enum (_pending_, _in_progress_, _done_)
  - **is_blocked:** boolean computed
  - **value:** Enum (t-shirt sizing)
  - **effort:** Enum (t-shirt sizing)
  - **due_by:** DateTime
  - **created_at, updated_at:** Timestamps
  - **position:** Order within a serial chain

- **Dependencies:**
  - Use a join table to manage relationships for linked dependent tasks (fields: task_id, dependent_task_id)

#### B. Stage 2 Features

- **Tags:**
  - Allow users to add one or more tags to tasks for filtering and categorization.

- **Linked Dependent Tasks:**
  - Enable linking tasks via a join table rather than nested subtasks.

- **Enhanced _due_by_ Field:**
  - Improve due date management with clear UI indicators for urgency.

- **Gamification:**
  - **Points System:** Award points based on priority, effort, and timely completion.
  - **Visual Elements:**
    - Daily graph showing points/effort (_on dates_)
    - Visual cues for final vs. intermediate tasks
    - Special visual rewards for high-priority or final dependent tasks
  - **Badges & Achievements:** Display on user dashboards to encourage consistency.

- **Optional AI Integration:**
  - Provide contextual recommendations and insights based on task history and user behavior.
  - Enhance gamification by adapting point multipliers or suggesting optimal task orders.

- **Other Integrations (e.g., Calendar):**
  - **Integration Approach:**
    - Use a composite field (or a dedicated integrations table) to store external IDs for each integration type.
  - **Functional Goals:**
    - Sync tasks with calendar events (e.g., Google Calendar, Outlook)
    - Enable bi-directional updates for due_by dates and reminders

---

### 5. Non-Functional Requirements

- **Performance:**
  - Fast, responsive UI on both browsers and mobile.

- **Scalability:**
  - Use join tables for dependencies to support many-to-many relationships.

- **Security:**
  - Secure storage of user data and integration credentials.

- **Usability:**
  - Intuitive interface with clear visual indicators for gamification and task dependencies.

- **Optional AI:**
  - Modular design to add or remove AI functionality without disrupting core task management.

---
