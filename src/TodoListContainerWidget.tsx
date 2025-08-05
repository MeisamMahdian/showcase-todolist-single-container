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
