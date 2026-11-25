import type { Project } from "./types";

export type ParsedProject = Project & {
  tags: string[];
  dateRange?: string;
  description: string;
};

/**
 * Parses project blurb string into structured metadata:
 * Extracts tech stack tags, date ranges, and core description.
 */
export function parseProject(project: Project): ParsedProject {
  const { blurb } = project;
  const dashIndex = blurb.indexOf("—");

  if (dashIndex === -1) {
    return {
      ...project,
      tags: [],
      description: blurb,
    };
  }

  const techPart = blurb.substring(0, dashIndex).trim();
  const rest = blurb.substring(dashIndex + 1).trim();
  const tags = techPart
    .split("·")
    .map((t) => t.trim())
    .filter(Boolean);

  const dotIndex = rest.indexOf(". ");
  if (
    dotIndex !== -1 &&
    /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\d{4})/i.test(rest)
  ) {
    return {
      ...project,
      tags,
      dateRange: rest.substring(0, dotIndex).trim(),
      description: rest.substring(dotIndex + 2).trim(),
    };
  }

  return {
    ...project,
    tags,
    description: rest,
  };
}
