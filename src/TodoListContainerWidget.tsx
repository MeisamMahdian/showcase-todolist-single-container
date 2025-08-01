import { ReactElement, createElement } from "react";
import { TodoList } from "./components/TodoList";
import { TodoListContainerWidgetContainerProps } from "../typings/TodoListContainerWidgetProps";

import "./ui/TodoListContainerWidget.css";

export function TodoListContainerWidget(props: TodoListContainerWidgetContainerProps): ReactElement {
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
