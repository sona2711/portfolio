import type { CVSectionKey, UserData } from "@/types/cvContent";


export const buildPrompt = (
  section: CVSectionKey,
  data: UserData
) => {
  const withFallback = (value?: string, fallback = "not provided") =>
    value?.trim() || fallback;

  switch (section) {
    case "aboutMe":
      return `Write a professional CV about me based on: ${withFallback(data.aboutMe)}`;
    case "summary":
      return `Write a professional CV summary for a ${withFallback(data.role, "candidate")}. Skills: ${withFallback(data.skills)}.`;

    case "experience":
      return `Write a strong experience section based on: ${withFallback(data.experience)}`;

    case "projects":
      return `Describe these projects: ${withFallback(data.projects)}`;

    case "skills":
      return `Organize and improve this skills list: ${withFallback(data.skills)}`;
    case "education":
      return `Write a strong education section based on: ${withFallback(data.education)}`;
    case "certifications":
      return `Write a strong certifications section based on: ${withFallback(data.certifications)}`;
    case "languages":
      return `Write a strong languages section based on: ${withFallback(data.languages)}`;
    case "interests":
      return `Write a strong interests section based on: ${withFallback(data.interests)}`;
    case "references":
      return `Write a strong references section based on: ${withFallback(data.references)}`;
    case "virtualSelf":
      return `Generate a video of a virtual self based on: ${withFallback(data.virtualSelf)}`;
  }

  const exhaustiveSection: never = section;
  return exhaustiveSection;
};