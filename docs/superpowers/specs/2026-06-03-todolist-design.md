# TodoList Design

## Goal

Build a small TodoList app that works by opening `index.html` directly in a browser.

## Scope

- Create a single `index.html` file with HTML, CSS, and JavaScript.
- Support adding tasks, toggling completion, deleting tasks, filtering tasks, and clearing completed tasks.
- Store tasks in browser `localStorage` so they persist after refresh.
- Use a clean Chinese UI suitable for a small personal productivity tool.

## Architecture

The page owns all behavior in one file because the repository is currently minimal and does not need a build step. The JavaScript keeps an in-memory `todos` array, writes it to `localStorage` after mutations, and re-renders the list from state.

## Components

- Header: app title and remaining task summary.
- Input form: text input and add button.
- Task list: checkbox, task text, and delete button per item.
- Footer controls: filter buttons for all, active, completed, plus a clear-completed action.
- Empty state: shown when the active filter has no matching items.

## Data Flow

1. On load, read saved tasks from `localStorage`.
2. User actions update the `todos` array.
3. The app saves the array back to `localStorage`.
4. The list is re-rendered from the latest state and selected filter.

## Error Handling

- Empty input is ignored.
- Invalid stored data falls back to an empty list.
- Deleting or toggling an unknown item has no visible effect.

## Verification

- Add a lightweight Node test that checks the expected single-file structure and key behavior hooks.
- Manually verify the rendered UI in the in-app browser after implementation.
