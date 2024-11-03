# React Native Trello App

A simple Trello-like task management application built with React Native. This app allows users to create, edit, delete, and drag-and-drop tasks across different columns (Upcoming, To Do, Done).

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/Swarm-App/Frontend.git
   ```
2. **Navigate to the project directory:**
3. **Install the dependencies:**
   ```
   npm install
   ```
4. **Run the app:**
   ```
    npx expo start
   ```

## Features

- Task Creation: Add new tasks with a title and description.
- Task Editing: Modify existing tasks using modals.
- Task Deletion: Remove tasks easily with confirmation modals.
- Drag-and-Drop: Reorganize tasks by dragging and dropping between columns.
- Responsive UI: The app adapts to different screen sizes.

## Folder Structure

The source code for the app is organized as follows:

```
├── src                          # Main source directory
│   ├── app                      # Application components and layout
│   │   ├── +html.tsx            # HTML-like component
│   │   ├── _layout.tsx          # Main layout component
│   │   ├── modal.tsx            # Modal component
│   │   ├── +not-found.tsx       # 404 Not Found component
│   │   └── (tabs)               # Tab navigation components
│   │       ├── index.tsx        # Tab index
│   │       └── _layout.tsx      # Layout for tabs
│   ├── components                # Reusable components
│   │   ├── Buttons               # Button components
│   │   │   └── AddTaskButton.tsx # Button to add tasks
│   │   ├── Modals                # Modal components
│   │   │   ├── AddTaskModal.tsx   # Modal for adding tasks
│   │   │   ├── DeleteTaskModal.tsx# Modal for deleting tasks
│   │   │   └── EditTaskModal.tsx  # Modal for editing tasks
│   │   ├── TaskBoard.tsx         # Component for task board layout
│   │   └── Task.tsx              # Component for individual tasks
│   ├── constants                  # Constants used in the app
│   │   └── Colors.ts             # Color constants
│   ├── data                       # Data management
│   │   └── repositories           # Repository classes
│   │       └── TaskRepository.ts  # Repository for task data
│   └── domain                     # Domain logic
│       ├── models                 # Data models
│       │   └── Task.ts            # Task model
│       └── useCases               # Use case logic
│           └── handleDrop.ts      # Logic for handling task drops


```

## Usage

- Creating a Task: Click the "Add Task" button to open a modal, fill in the task details, and save it.
- Editing a Task: Tap the edit icon on a task to modify its details.
- Deleting a Task: Tap the trash icon on a task to remove it with confirmation.
- Reorganizing Tasks: Drag tasks across columns (Upcoming, To Do, Done) to update their status.

## Technologies Used

- React Native: For building the mobile application.
- TypeScript: For type safety and improved developer experience.
