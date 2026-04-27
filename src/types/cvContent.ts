export type CVContentState = {
  sections: Record<CVSectionKey, string>;
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

  export type UserData = {
    aboutMe?: string;
    role?: string;
    skills?: string;
    experience?: string;
    projects?: string;
    education?: string;
    certifications?: string;
    languages?: string;
    interests?: string;
    references?: string;
    virtualSelf?: string;
  };