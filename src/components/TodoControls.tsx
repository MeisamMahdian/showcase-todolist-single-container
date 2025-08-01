import { ReactElement, createElement } from "react";
import { ListAttributeValue } from "mendix";

type SortBy = "title" | "date";
type SortOrder = "asc" | "desc";
type FilterBy = "all" | "active" | "completed";

interface TodoControlsProps {
    sortBy: SortBy;
    sortOrder: SortOrder;
    filterBy: FilterBy;
    changedDateAttribute?: ListAttributeValue<Date>;
    onSortChange: (sortBy: SortBy) => void;
    onFilterChange: (filterBy: FilterBy) => void;
}

export function TodoControls({
    sortBy,
    sortOrder,
    filterBy,
    changedDateAttribute,
    onSortChange,
    onFilterChange
}: TodoControlsProps): ReactElement {
    return (
        <div className="todo-controls">
            <div className="todo-sort-controls">
                <span className="todo-sort-label">Sort by:</span>
                <button
                    className={`todo-sort-btn ${sortBy === "title" ? "active" : ""}`}
                    onClick={() => onSortChange("title")}
                >
                    Title {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                {changedDateAttribute && (
                    <button
                        className={`todo-sort-btn ${sortBy === "date" ? "active" : ""}`}
                        onClick={() => onSortChange("date")}
                    >
                        Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                    </button>
                )}
            </div>

            <div className="todo-filter-controls">
                <span className="todo-filter-label">Show:</span>
                <button
                    className={`todo-filter-btn ${filterBy === "all" ? "active" : ""}`}
                    onClick={() => onFilterChange("all")}
                >
                    All
                </button>
                <button
                    className={`todo-filter-btn ${filterBy === "active" ? "active" : ""}`}
                    onClick={() => onFilterChange("active")}
                >
                    Active
                </button>
                <button
                    className={`todo-filter-btn ${filterBy === "completed" ? "active" : ""}`}
                    onClick={() => onFilterChange("completed")}
                >
                    Completed
                </button>
            </div>
        </div>
    );
}
