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
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  // Same day
  if (diffInDays === 0) {
    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      const timeStr = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
      return `Today ${timeStr}`;
    }
    return "Today";
  }

  // Yesterday
  if (diffInDays === 1) {
    const timeStr = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    return `Yesterday ${timeStr}`;
  }

  // Within the last week
  if (diffInDays < 7) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const timeStr = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    return `${dayNames[date.getDay()]} ${timeStr}`;
  }

  // Within the current year
  if (date.getFullYear() === now.getFullYear()) {
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
