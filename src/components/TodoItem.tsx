import { ReactElement, createElement } from "react";
import { ListAttributeValue, ListActionValue, ObjectItem } from "mendix";
import { formatRelativeDate, formatTooltipDate, formatUserInfo } from "../utils/dateHelpers";

interface TodoItemProps {
  item: ObjectItem;
  index: number;
  titleAttribute: ListAttributeValue<string>;
  completedAttribute: ListAttributeValue<boolean>;
  changedDateAttribute?: ListAttributeValue<Date>;
  createdDateAttribute?: ListAttributeValue<Date>;
  ownerAttribute?: ListAttributeValue<string>;
  changedByAttribute?: ListAttributeValue<string>;
  dueDateAttribute?: ListAttributeValue<Date>;
  onEditAction?: ListActionValue;
  onDeleteAction?: ListActionValue;
  onToggleItem: (item: ObjectItem) => void;
  onEditItem: (item: ObjectItem) => void;
  onDeleteItem: (item: ObjectItem) => void;
}

export function TodoItem({
  item,
  index,
  titleAttribute,
  completedAttribute,
  changedDateAttribute,
  createdDateAttribute,
  ownerAttribute,
  changedByAttribute,
  dueDateAttribute,
  onEditAction,
  onDeleteAction,
  onToggleItem,
  onEditItem,
  onDeleteItem
}: TodoItemProps): ReactElement {
  // Get attribute values using the attribute objects
  const titleValue = titleAttribute?.get(item).displayValue || "Untitled";
  const completedValue = completedAttribute?.get(item).value || false;
  const changedDateValue = changedDateAttribute?.get(item).value;
  const createdDateValue = createdDateAttribute?.get(item).value;
  const ownerValue = ownerAttribute?.get(item).displayValue;
  const changedByValue = changedByAttribute?.get(item).displayValue;
  const dueDateValue = dueDateAttribute?.get(item).value;

  // Create tooltip text with created date and user information
  let tooltipText = "";
  if (createdDateValue) {
    tooltipText += `Created: ${formatTooltipDate(createdDateValue)}${formatUserInfo(ownerValue)}`;
  }

  if (changedDateValue && changedDateValue.getTime() !== createdDateValue?.getTime()) {
    if (tooltipText) {
      tooltipText += "\n";
    }
    tooltipText += `Last modified: ${formatTooltipDate(changedDateValue)}${formatUserInfo(changedByValue)}`;
  }

  return (
    <li
      key={item.id || index}
      className={`todo-item ${completedValue ? "completed" : ""}`}
      title={tooltipText || undefined}
    >
      <div className="todo-item-content">
        <label className="todo-item-label">
          <input
            type="checkbox"
            checked={completedValue}
            onChange={() => onToggleItem(item)}
            className="todo-checkbox"
          />
          <div className="todo-item-info">
            <span className="todo-item-text">{titleValue}</span>
            <div className="todo-item-dates">
              {dueDateValue && (
                <span
                  className={`todo-item-due-date ${dueDateValue < new Date() ? "overdue" : ""}`}
                  title={`Due: ${dueDateValue.toLocaleString()}`}
                >
                  Due: {formatRelativeDate(dueDateValue)}
                </span>
              )}
            </div>
          </div>
        </label>
        <div className="todo-item-actions">
          {onEditAction && (
            <button onClick={() => onEditItem(item)} className="todo-action-btn todo-edit-btn" title="Edit item">
              ✏️
            </button>
          )}
          {onDeleteAction?.get(item)?.canExecute && (
            <button onClick={() => onDeleteItem(item)} className="todo-action-btn todo-delete-btn" title="Delete item">
              🗑️
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
