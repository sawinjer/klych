export interface CardData {
  id: string;
  title: string;
  subTitle: string;
  image: string;
  disabled?: boolean;
  footer?: React.ReactNode;
}
