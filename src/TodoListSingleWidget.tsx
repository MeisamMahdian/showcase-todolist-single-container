import { ReactElement, createElement } from "react";
import { TodoList } from "./components/TodoList";
import { TodoListSingleWidgetContainerProps } from "../typings/TodoListSingleWidgetProps";

import "./ui/TodoListSingleWidget.css";

export function TodoListSingleWidget(props: TodoListSingleWidgetContainerProps): ReactElement {
  const {
    todoItems,
    titleAttribute,
    completedAttribute,
    changedDateAttribute,
    createdDateAttribute,
    ownerAttribute,
    changedByAttribute,
    dueDateAttribute,
    itemTextAttribute,
    dueDateInputAttribute,
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
      dueDateAttribute={dueDateAttribute}
      itemTextAttribute={itemTextAttribute}
      dueDateInputAttribute={dueDateInputAttribute}
      onAddAction={onAddAction}
      onToggleAction={onToggleAction}
      onEditAction={onEditAction}
      onDeleteAction={onDeleteAction}
      showAddButton={showAddButton}
      newItemPlaceholder={newItemPlaceholder}
    />
  );
}
