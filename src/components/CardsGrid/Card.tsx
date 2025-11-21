import Image from "next/image";
import type { ReactNode } from "react";
import type { CardData } from "./CardsGrid.interface";

interface Props {
  card: CardData;
  footer?: ReactNode;
}

export const Card: React.FC<Props> = (props) => {
  const { card, footer } = props;
  const hasFooter = footer !== undefined && footer !== null;

  return (
    <div className="w-full border-1 border-white rounded-md">
      <p className="text-[20px] p-5">{card.title}</p>
      <Image
        alt={card.title}
        src={card.image}
        width={300}
        height={240}
        className="max-w-[300px] w-full"
      />
      <p className="p-5">{card.subTitle}</p>
      {hasFooter && (
        <div className="p-5 bg-[#4E0700] rounded-b-md">{footer}</div>
      )}
    </div>
  );
};
