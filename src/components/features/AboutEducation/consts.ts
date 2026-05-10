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
    title: "AGBU",
    subtitle: "Frontend Development (Angular 2+)",
    period: "Jan 2023 - Oct 2023",
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
    period: "Mar 2026",
    title: "Frontend Developer Intern - AutoDream",
    description:
      "Fix bugs, learn and apply modern frontend development practices. Build and maintain user interfaces using React, TypeScript, and modern web technologies.",
    isCurrent: false,
  },
  {
    period: "Oct 2024 - Apr 2025",
    title: "UI/UX Designer - LEDon startup",
    description:
      "Design and implement user-friendly interfaces for web and mobile applications. Collaborate with developers to ensure seamless user experiences.",
    isCurrent: false,
  },
  
];
