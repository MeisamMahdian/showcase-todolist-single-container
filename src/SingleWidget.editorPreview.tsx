import { ReactElement, createElement } from "react";
import { TodoList } from "./components/TodoList";
import { SingleWidgetPreviewProps } from "../typings/SingleWidgetProps";
import { ListValue } from "mendix";

export function preview(props: SingleWidgetPreviewProps): ReactElement {
    const { showAddButton, newItemPlaceholder } = props;

    // Mock ListValue for preview
    const mockTodoItems = {
        status: "available" as const,
        offset: 0,
        limit: 0,
        sortOrder: [],
        hasMoreItems: false,
        totalCount: 0,
        items: []
    } as unknown as ListValue;

    return (
        <TodoList
            todoItems={mockTodoItems}
            titleAttribute={undefined as any}
            completedAttribute={undefined as any}
            changedDateAttribute={undefined}
            createdDateAttribute={undefined}
            ownerAttribute={undefined}
            changedByAttribute={undefined}
            itemTextAttribute={undefined}
            onAddAction={undefined}
            onToggleAction={undefined}
            onEditAction={undefined}
            onDeleteAction={undefined}
            showAddButton={showAddButton}
            newItemPlaceholder={newItemPlaceholder}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/SingleWidget.css");
}
