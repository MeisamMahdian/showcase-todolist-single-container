import { ReactElement, createElement, KeyboardEvent, useCallback } from "react";
import { ActionValue, EditableValue, ObjectItem } from "mendix";

interface TodoAddItemProps {
    newItemText: string;
    editingItem: ObjectItem | null;
    newItemPlaceholder: string;
    onAddAction?: ActionValue;
    onEditAction?: ActionValue;
    itemTextAttribute?: EditableValue<string>;
    onTextChange: (text: string) => void;
    onAddItem: () => void;
    onCancelEdit: () => void;
}

export function TodoAddItem({
    newItemText,
    editingItem,
    newItemPlaceholder,
    onAddAction,
    onEditAction,
    itemTextAttribute,
    onTextChange,
    onAddItem,
    onCancelEdit
}: TodoAddItemProps): ReactElement {
    const canExecuteAdd = editingItem
        ? onEditAction && itemTextAttribute?.status === "available"
        : onAddAction?.canExecute;

    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                onAddItem();
            }
        },
        [onAddItem]
    );

    return (
        <div className="todo-add-section">
            <input
                type="text"
                value={newItemText}
                onChange={e => onTextChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={editingItem ? "Edit todo item..." : newItemPlaceholder}
                className="todo-input"
            />
            <div className="todo-add-buttons">
                <button
                    onClick={onAddItem}
                    disabled={!newItemText.trim() || !canExecuteAdd}
                    className="todo-add-button"
                >
                    {editingItem ? "Update" : "Add"}
                </button>
                {editingItem && (
                    <button onClick={onCancelEdit} className="todo-cancel-button">
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
}
