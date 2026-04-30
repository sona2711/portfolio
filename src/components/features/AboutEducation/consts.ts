import type { EducationItem, ExperienceItem } from "./types";

export const EDUCATION_TITLE = "Education";
export const EXPERIENCE_TITLE = "Experience";

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    title: "EPIC Institute of Technology",
    subtitle: "Real-Time Frontend",
    period: "Sep 2023 - Jul 2024",
  },
  {
    title: "Tumo Labs",
    subtitle: "Guided Self-Learning program (Javascript)",
    period: "Sep 2022 - Dec 2023",
  },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    period: "Jan 2024 - Present",
    title: "Coach (Part-time) - UATE-Armath EL",
    description:
      "Conduct lessons in programming, robotics, and engineering for school-aged students. Develop interactive lesson plans covering Kturtle, Scratch, Arduino, and Raspberry Pi.",
    isCurrent: true,
  },
  {
    period: "2023",
    title: "Frontend Development (Angular 2+) - AGBU",
    description:
      'Part of the "Women Coders" Program in partnership with e.uck Start. Focused on modern web architectures and reactive programming.',
  },
];
