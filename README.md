# Todo List Widget

A Mendix pluggable widget that provides a fully functional todo list interface with add, toggle, and display
capabilities.

## Features

-   **Display Todo Items**: Shows a list of todo items from a Mendix data source
-   **Add New Items**: Allows users to add new todo items with a simple input interface
-   **Toggle Completion**: Users can check/uncheck items to mark them as completed
-   **Edit Items**: Edit button for each todo item to trigger custom edit actions
-   **Delete Items**: Delete button for each todo item with hover-to-reveal UI
-   **Responsive Design**: Mobile-friendly interface that adapts to different screen sizes
-   **Modern UI**: Clean, card-based design with hover effects and smooth transitions
-   **Customizable**: Configurable placeholder text and comprehensive action system

## Configuration

### Data Source Properties

1. **Todo Items** (required)

    - Type: Data source (list)
    - Description: The data source containing your todo items

2. **Title Attribute** (required)

    - Type: String attribute
    - Description: The attribute that contains the todo item text/title

3. **Completed Attribute** (required)

    - Type: Boolean attribute
    - Description: The attribute that tracks whether the item is completed

4. **New Item Text Attribute** (optional)
    - Type: String attribute
    - Description: Attribute to store the new item text before executing the add action

### Action Properties

5. **On Add Action** (optional)

    - Type: Action
    - Description: Action to execute when adding a new todo item

6. **On Toggle Action** (optional)

    - Type: Action (with data source)
    - Description: Action to execute when toggling a todo item's completion status

7. **On Edit Action** (optional)

    - Type: Action (with data source)
    - Description: Action to execute when editing a todo item (triggered by edit button)

8. **On Delete Action** (optional)
    - Type: Action (with data source)
    - Description: Action to execute when deleting a todo item

### Appearance Properties

9. **Show Add Button** (default: true)

    - Type: Boolean
    - Description: Whether to show the input field and add button for new items

10. **New Item Placeholder** (optional)
    - Type: String
    - Description: Placeholder text for the new todo item input field

## Domain Model Requirements

To use this widget, your domain model should include an entity with at least:

-   A **string attribute** for the todo item title/text
-   A **boolean attribute** to track completion status

Example entity structure:

```
Entity: TodoItem
- Title (String) - The todo item text
- IsCompleted (Boolean) - Whether the item is completed
- CreatedDate (DateTime) - When the item was created (optional)
- Priority (Enumeration) - Item priority level (optional)
```

## Important Notes

### Action Context

-   **Toggle, Edit, and Delete actions** are configured with a data source, meaning they automatically receive the
    specific TodoItem as a parameter
-   **Add action** works at the entity level and uses the New Item Text Attribute to get the user input
-   The widget handles passing the correct object context to each action

### Attribute Handling

-   The widget **does not directly modify attributes** linked to data sources (this is a Mendix platform limitation)
-   All attribute changes must be handled in your microflows/nanoflows
-   The New Item Text Attribute is used to pass user input to the Add action

## Actions Setup

### Adding New Items

Create a microflow or nanoflow that:

1. Creates a new TodoItem object
2. Gets the Title from the **New Item Text Attribute** (configured in widget)
3. Sets IsCompleted to false
4. Commits the object
5. Refreshes the data source

Example microflow:

```
Input: No parameters (uses New Item Text Attribute)
Activities:
1. Create TodoItem
2. Change Object: $NewTodoItem/Title := $NewItemTextAttribute
3. Change Object: $NewTodoItem/IsCompleted := false
4. Commit Object: $NewTodoItem
```

### Toggling Completion Status

Create a microflow or nanoflow that:

1. Receives the selected TodoItem as a parameter (automatically passed by widget)
2. Toggles the IsCompleted boolean value
3. Commits the object

Example microflow:

```
Input: TodoItem (parameter)
Activities:
1. Change Object: $TodoItem/IsCompleted := not($TodoItem/IsCompleted)
2. Commit Object: $TodoItem
```

### Editing Items

Create a microflow or nanoflow that:

1. Receives the selected TodoItem as a parameter
2. Opens an edit form, shows a popup, or performs edit logic
3. Commits any changes

### Deleting Items

Create a microflow or nanoflow that:

1. Receives the selected TodoItem as a parameter
2. Optionally shows a confirmation dialog
3. Deletes the object

Example microflow:

```
Input: TodoItem (parameter)
Activities:
1. Show Message: "Are you sure you want to delete this item?" (with Yes/No)
2. Delete Object: $TodoItem (if Yes selected)
```

## Styling

The widget includes built-in CSS classes that can be customized:

-   `.todo-list-widget` - Main container with card-style design
-   `.todo-add-section` - Add new item section with background
-   `.todo-input` - Input field for new items with focus states
-   `.todo-add-button` - Add button with hover effects
-   `.todo-items-container` - List container with padding
-   `.todo-items-list` - Unordered list element
-   `.todo-item` - Individual todo item cards with borders
-   `.todo-item.completed` - Completed items with different styling
-   `.todo-item-content` - Inner content container with flexbox layout
-   `.todo-item-label` - Label containing checkbox and text
-   `.todo-checkbox` - Checkboxes with custom accent color
-   `.todo-item-text` - Item text with line-through when completed
-   `.todo-item-actions` - Action buttons container (hidden by default)
-   `.todo-action-btn` - Base class for edit/delete buttons
-   `.todo-edit-btn` - Edit button with blue hover effect
-   `.todo-delete-btn` - Delete button with red hover effect
-   `.todo-empty-state` - Empty state message with dashed border

### UI Features

-   **Hover Effects**: Items lift with shadow, action buttons appear on hover
-   **Smooth Transitions**: All interactive elements have 0.2s ease transitions
-   **Modern Design**: Card-based layout with rounded corners and subtle shadows
-   **Mobile Responsive**: Adapts layout and touch targets for mobile devices

## Development

### Prerequisites

-   Node.js (version 16 or higher)
-   Mendix Studio Pro

### Building

```bash
npm install
npm run build
```

### Development Mode

```bash
npm run dev
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## Browser Support

-   Modern browsers (Chrome, Firefox, Safari, Edge)
-   Mobile browsers (iOS Safari, Chrome Mobile)
-   IE11+ (with polyfills)

## License

Apache-2.0
