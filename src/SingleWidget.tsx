import { ReactElement, createElement } from "react";
import { TodoList } from "./components/TodoList";
import { SingleWidgetContainerProps } from "../typings/SingleWidgetProps";

import "./ui/SingleWidget.css";

export function SingleWidget(props: SingleWidgetContainerProps): ReactElement {
    const {
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
        newItemPlaceholder
    } = props;

    return (
        <TodoList
            todoItems={todoItems}
            titleAttribute={titleAttribute}
            completedAttribute={completedAttribute}
            changedDateAttribute={changedDateAttribute}
            createdDateAttribute={createdDateAttribute}
            ownerAttribute={ownerAttribute}
            changedByAttribute={changedByAttribute}
            itemTextAttribute={itemTextAttribute}
            onAddAction={onAddAction}
            onToggleAction={onToggleAction}
            onEditAction={onEditAction}
            onDeleteAction={onDeleteAction}
            showAddButton={showAddButton}
            newItemPlaceholder={newItemPlaceholder}
        />
    );
}
