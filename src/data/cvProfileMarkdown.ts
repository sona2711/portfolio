import type { CVContentState } from "@/types/cvContent";

const toSection = (title: string, content: string): string =>
  `## ${title}\n${content.trim() || "_Not provided yet._"}`;

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
  ].join("\n\n");
