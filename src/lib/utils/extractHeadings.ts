export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(htmlContent: string): TocHeading[] {
  if (typeof window === "undefined") {
    // Server-side: simple regex
    const headings: TocHeading[] = [];
    const regex = /<h([2-4])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-4]>/gi;
    let match;
    while ((match = regex.exec(htmlContent)) !== null) {
      headings.push({
        level: parseInt(match[1], 10),
        id: match[2],
        text: match[3].replace(/<[^>]+>/g, ""),
      });
    }
    return headings;
  }

  // Client-side: parse with DOMParser
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const headingEls = doc.querySelectorAll("h2, h3, h4");

  return Array.from(headingEls).map((el) => {
    const id = el.id || slugify(el.textContent ?? "");
    if (!el.id) el.id = id;
    return {
      id,
      text: el.textContent ?? "",
      level: parseInt(el.tagName.slice(1), 10),
    };
  });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
