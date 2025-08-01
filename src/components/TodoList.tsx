import { ReactElement, createElement } from "react";
import { ActionValue, EditableValue, ListAttributeValue, ListValue, ListActionValue } from "mendix";
import { TodoItem } from "./TodoItem";
import { TodoAddItem } from "./TodoAddItem";
import { TodoControls } from "./TodoControls";
import { useTodoList } from "../hooks/useTodoList";

interface TodoListProps {
    todoItems: ListValue;
    titleAttribute: ListAttributeValue<string>;
    completedAttribute: ListAttributeValue<boolean>;
    changedDateAttribute?: ListAttributeValue<Date>;
    createdDateAttribute?: ListAttributeValue<Date>;
    ownerAttribute?: ListAttributeValue<string>;
    changedByAttribute?: ListAttributeValue<string>;
    itemTextAttribute?: EditableValue<string>;
    onAddAction?: ActionValue;
    onToggleAction?: ListActionValue;
    onEditAction?: ListActionValue;
    onDeleteAction?: ListActionValue;
    showAddButton: boolean;
    newItemPlaceholder: string;
}

export function TodoList({
    todoItems,
    titleAttribute,
    completedAttribute,
    changedDateAttribute,
    createdDateAttribute,
    ownerAttribute,
    changedByAttribute,
    itemTextAttribute,
    onAddAction,
    onToggleAction,
    onEditAction,
    onDeleteAction,
    showAddButton,
    newItemPlaceholder = "Enter new todo item..."
}: TodoListProps): ReactElement {
    const {
        newItemText,
        setNewItemText,
        editingItem,
        filterBy,
        setFilterBy,
        sortBy,
        sortOrder,
        sortedItems,
        handleAddItem,
        handleToggleItem,
        handleEditItem,
        handleCancelEdit,
        handleDeleteItem,
        handleSortChange
    } = useTodoList({
        todoItems,
        titleAttribute,
        completedAttribute,
        changedDateAttribute,
        itemTextAttribute,
        onAddAction,
        onToggleAction,
        onEditAction,
        onDeleteAction
    });

    return (
        <div className="todo-list-widget">
            {showAddButton && (
                <TodoAddItem
                    newItemText={newItemText}
                    editingItem={editingItem}
                    newItemPlaceholder={newItemPlaceholder}
                    onAddAction={onAddAction}
                    onEditAction={editingItem ? onEditAction?.get(editingItem) : undefined}
                    itemTextAttribute={itemTextAttribute}
                    onTextChange={setNewItemText}
                    onAddItem={handleAddItem}
                    onCancelEdit={handleCancelEdit}
                />
            )}

            <div className="todo-items-container">
                <TodoControls
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    filterBy={filterBy}
                    changedDateAttribute={changedDateAttribute}
                    onSortChange={handleSortChange}
                    onFilterChange={setFilterBy}
                />

                {sortedItems.length === 0 ? (
                    <div className="todo-empty-state">No todo items yet. Add your first item above!</div>
                ) : (
                    <ul className="todo-items-list">
                        {sortedItems.map((item, index) => (
                            <TodoItem
                                key={item.id || index}
                                item={item}
                                index={index}
                                titleAttribute={titleAttribute}
                                completedAttribute={completedAttribute}
                                changedDateAttribute={changedDateAttribute}
                                createdDateAttribute={createdDateAttribute}
                                ownerAttribute={ownerAttribute}
                                changedByAttribute={changedByAttribute}
                                onEditAction={onEditAction}
                                onDeleteAction={onDeleteAction}
                                onToggleItem={handleToggleItem}
                                onEditItem={handleEditItem}
                                onDeleteItem={handleDeleteItem}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
