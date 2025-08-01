import { useState, useCallback, useMemo } from "react";
import { ActionValue, EditableValue, ListAttributeValue, ListValue, ListActionValue, ObjectItem } from "mendix";

type SortBy = "title" | "date";
type SortOrder = "asc" | "desc";
type FilterBy = "all" | "active" | "completed";

interface UseTodoListProps {
    todoItems: ListValue;
    titleAttribute: ListAttributeValue<string>;
    completedAttribute: ListAttributeValue<boolean>;
    changedDateAttribute?: ListAttributeValue<Date>;
    itemTextAttribute?: EditableValue<string>;
    onAddAction?: ActionValue;
    onToggleAction?: ListActionValue;
    onEditAction?: ListActionValue;
    onDeleteAction?: ListActionValue;
}

interface UseTodoListReturn {
    // State
    newItemText: string;
    setNewItemText: (text: string) => void;
    editingItem: ObjectItem | null;
    filterBy: FilterBy;
    setFilterBy: (filter: FilterBy) => void;
    sortBy: SortBy;
    sortOrder: SortOrder;

    // Computed values
    sortedItems: ObjectItem[];

    // Event handlers
    handleAddItem: () => void;
    handleToggleItem: (item: ObjectItem) => void;
    handleEditItem: (item: ObjectItem) => void;
    handleCancelEdit: () => void;
    handleDeleteItem: (item: ObjectItem) => void;
    handleSortChange: (sortBy: SortBy) => void;
}

export function useTodoList({
    todoItems,
    titleAttribute,
    completedAttribute,
    changedDateAttribute,
    itemTextAttribute,
    onAddAction,
    onToggleAction,
    onEditAction,
    onDeleteAction
}: UseTodoListProps): UseTodoListReturn {
    const [newItemText, setNewItemText] = useState("");
    const [editingItem, setEditingItem] = useState<ObjectItem | null>(null);
    const [filterBy, setFilterBy] = useState<FilterBy>("all");
    // Default to sorting by date (descending) if changedDateAttribute exists, otherwise by title
    const [sortBy, setSortBy] = useState<SortBy>(changedDateAttribute ? "date" : "title");
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

    const handleAddItem = useCallback(() => {
        if (newItemText.trim()) {
            if (editingItem) {
                // Update existing item
                if (onEditAction?.get(editingItem)?.canExecute) {
                    // Set the new text in the attribute before executing the action
                    if (itemTextAttribute && itemTextAttribute.status === "available") {
                        itemTextAttribute.setValue(newItemText.trim());
                    }
                    onEditAction.get(editingItem).execute();
                    setEditingItem(null);
                    setNewItemText("");
                }
            } else {
                // Add new item
                if (onAddAction?.canExecute) {
                    // Set the new item text in the attribute before executing the action
                    if (itemTextAttribute && itemTextAttribute.status === "available") {
                        itemTextAttribute.setValue(newItemText.trim());
                    }
                    onAddAction.execute();
                    setNewItemText("");
                }
            }
        }
    }, [newItemText, onAddAction, onEditAction, editingItem, itemTextAttribute]);

    const handleToggleItem = useCallback(
        (item: ObjectItem) => {
            // Execute the toggle action - let the microflow handle the attribute updates
            const action = onToggleAction?.get(item);
            if (action?.canExecute) {
                action.execute();
            }
        },
        [onToggleAction]
    );

    const handleEditItem = useCallback(
        (item: ObjectItem) => {
            // Switch to edit mode
            const titleValue = titleAttribute?.get(item).displayValue || "";
            setNewItemText(titleValue);
            setEditingItem(item);
        },
        [titleAttribute]
    );

    const handleCancelEdit = useCallback(() => {
        setEditingItem(null);
        setNewItemText("");
    }, []);

    const handleDeleteItem = useCallback(
        (item: ObjectItem) => {
            const action = onDeleteAction?.get(item);
            if (action?.canExecute) {
                action.execute();
            }
        },
        [onDeleteAction]
    );

    const handleSortChange = useCallback(
        (newSortBy: SortBy) => {
            if (sortBy === newSortBy) {
                // Toggle sort order if same field clicked
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
                // Change sort field and default to ascending
                setSortBy(newSortBy);
                setSortOrder("asc");
            }
        },
        [sortBy, sortOrder]
    );

    // Sort and filter items based on current criteria
    const sortedItems = useMemo(() => {
        const items = todoItems?.items || [];

        // First filter items based on completion status
        const filteredItems = items.filter(item => {
            if (filterBy === "all") {
                return true;
            }
            const completedValue = completedAttribute?.get(item).value || false;
            if (filterBy === "active") {
                return !completedValue;
            }
            if (filterBy === "completed") {
                return completedValue;
            }
            return true;
        });

        // Then sort the filtered items
        const itemsToSort = [...filteredItems];
        return itemsToSort.sort((a, b) => {
            let comparison = 0;

            if (sortBy === "title") {
                const titleA = titleAttribute?.get(a).value || "";
                const titleB = titleAttribute?.get(b).value || "";
                comparison = titleA.localeCompare(titleB);
            } else if (sortBy === "date" && changedDateAttribute) {
                const dateA = changedDateAttribute.get(a).value?.getTime() || 0;
                const dateB = changedDateAttribute.get(b).value?.getTime() || 0;
                comparison = dateA - dateB;
            }

            return sortOrder === "asc" ? comparison : -comparison;
        });
    }, [todoItems?.items, sortBy, sortOrder, filterBy, titleAttribute, changedDateAttribute, completedAttribute]);

    return {
        // State
        newItemText,
        setNewItemText,
        editingItem,
        filterBy,
        setFilterBy,
        sortBy,
        sortOrder,

        // Computed values
        sortedItems,

        // Event handlers
        handleAddItem,
        handleToggleItem,
        handleEditItem,
        handleCancelEdit,
        handleDeleteItem,
        handleSortChange
    };
}
