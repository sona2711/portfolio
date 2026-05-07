import type { CVSectionValue } from "./cvProfile";

export type CVContentState = {
  sections: Record<CVSectionKey, CVSectionValue>;
};

export type CVSectionKey =
  | "aboutMe"
  | "summary"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "certifications"
  | "languages"
  | "interests"
  | "references"
  | "virtualSelf";