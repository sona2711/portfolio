export type FeaturedWorkItem = {
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  previewVariant: "dark" | "accent";
  meta: string;
  tags: string[];
};

export type FeaturedWorkCardProps = {
  item: FeaturedWorkItem;
  imageDirection?: "left" | "right";
};
