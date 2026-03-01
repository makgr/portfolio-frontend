export function formatDate(
  dateString: string | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  }
): string {
  if (!dateString) return "";
  try {
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

export function formatDateShort(dateString: string | null | undefined): string {
  return formatDate(dateString, { year: "numeric", month: "short" });
}

export function formatDateFull(dateString: string | null | undefined): string {
  return formatDate(dateString, { year: "numeric", month: "long", day: "numeric" });
}

export function getYearMonth(dateString: string | null | undefined): string {
  return formatDate(dateString, { year: "numeric", month: "short" });
}

export function getRelativeTime(dateString: string | null | undefined): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "Today";
    if (diffDays < 2) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  } catch {
    return dateString;
  }
}
