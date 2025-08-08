/**
 * Utility functions for formatting dates in a user-friendly way
 */

/**
 * Formats a date in a relative, human-readable format
 * @param date The date to format
 * @returns A formatted string like "Just now", "5m ago", "Today 2:30 PM", "Yesterday 10:15 AM", etc.
 */
export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const absDiffInDays = Math.abs(Math.floor(diffInMs / (1000 * 60 * 60 * 24)));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const isInFuture = diffInMs < 0;

  // Same day
  if (absDiffInDays === 0) {
    if (Math.abs(diffInMinutes) < 1) {
      return "Just now";
    } else if (Math.abs(diffInMinutes) < 60) {
      return isInFuture ? `In ${Math.abs(diffInMinutes)}m` : `${Math.abs(diffInMinutes)}m ago`;
    } else if (Math.abs(diffInHours) < 24) {
      const timeStr = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
      return `Today ${timeStr}`;
    }
    return "Today";
  }

  // Yesterday or Tomorrow
  if (absDiffInDays === 1) {
    const timeStr = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    return isInFuture ? `Tomorrow ${timeStr}` : `Yesterday ${timeStr}`;
  }

  // Within the last/next week
  if (absDiffInDays < 7) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const timeStr = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    return `${dayNames[date.getDay()]} ${timeStr}`;
  }

  // Within the current year
  if (date.getFullYear() === now.getFullYear()) {
    // For dates in different months, show full month name for clarity
    if (date.getMonth() !== now.getMonth()) {
      return date.toLocaleDateString(undefined, { month: "long", day: "numeric" });
    }
    // Same month, use short format
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  // Older dates
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/**
 * Formats a date for tooltip display with full details
 * @param date The date to format
 * @returns A formatted string with complete date and time information
 */
export function formatTooltipDate(date: Date): string {
  return date.toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  });
}

/**
 * Formats user information for display in tooltips
 * @param userName The user's name
 * @returns Formatted user string or empty string if no user
 */
export function formatUserInfo(userName?: string): string {
  return userName ? ` by ${userName}` : "";
}
