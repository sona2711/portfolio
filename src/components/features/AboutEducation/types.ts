export type EducationItem = {
  title: string;
  subtitle: string;
  period: string;
};

export type ExperienceItem = {
  period: string;
  title: string;
  description: string;
  isCurrent?: boolean;
};

export type AboutEducationProps = Record<string, never>;
