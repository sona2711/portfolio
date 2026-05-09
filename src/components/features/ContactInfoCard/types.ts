export type ContactInfoLabel = "EMAIL" | "PHONE" | "LOCATION";

export type ContactInfoItem = {
  label: ContactInfoLabel;
  value: string;
};

export type ContactInfoCardProps = {
  cardTitle: string;
  socialsLabel?: string;
  items: ContactInfoItem[];
};
