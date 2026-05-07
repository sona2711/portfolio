import type { CVContentState } from "@/types/cvContent";

const toSection = (title: string, content: string): string | null => {
  const normalizedContent = content.trim();
  if (!normalizedContent) {
    return null;
  }

  return `## ${title}\n${normalizedContent}`;
};

export const buildCVProfileMarkdown = (
  sections: CVContentState["sections"],
): string =>
  [
    "# CV Profile",
    toSection("About Me", sections.aboutMe),
    toSection("Summary", sections.summary),
    toSection("Experience", sections.experience),
    toSection("Projects", sections.projects),
    toSection("Skills", sections.skills),
    toSection("Education", sections.education),
    toSection("Certifications", sections.certifications),
    toSection("Languages", sections.languages),
    toSection("Interests", sections.interests),
    toSection("References", sections.references),
    toSection("Virtual Self", sections.virtualSelf),
  ]
    .filter((section): section is string => Boolean(section))
    .join("\n\n");
