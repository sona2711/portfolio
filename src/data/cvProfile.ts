import type { CVProfile } from "@/types/cvProfile";
import type { CVContentState } from "@/types/cvContent";

const normalizeSection = (value: string): string => value.trim();

export const buildCVProfile = (
  sections: CVContentState["sections"],
): CVProfile => ({
  aboutMe: normalizeSection(sections.aboutMe),
  summary: normalizeSection(sections.summary),
  experience: normalizeSection(sections.experience),
  projects: normalizeSection(sections.projects),
  skills: normalizeSection(sections.skills),
  education: normalizeSection(sections.education),
  certifications: normalizeSection(sections.certifications),
  languages: normalizeSection(sections.languages),
  interests: normalizeSection(sections.interests),
  references: normalizeSection(sections.references),
  virtualSelf: normalizeSection(sections.virtualSelf),
});
