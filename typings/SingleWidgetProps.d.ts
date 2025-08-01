/**
 * This file was generated from SingleWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListActionValue, ListAttributeValue } from "mendix";

export interface SingleWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
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

export interface SingleWidgetPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    todoItems: {} | { caption: string } | { type: string } | null;
    titleAttribute: string;
    completedAttribute: string;
    changedDateAttribute: string;
    createdDateAttribute: string;
    ownerAttribute: string;
    changedByAttribute: string;
    itemTextAttribute: string;
    onAddAction: {} | null;
    onToggleAction: {} | null;
    onEditAction: {} | null;
    onDeleteAction: {} | null;
    showAddButton: boolean;
    newItemPlaceholder: string;
}
