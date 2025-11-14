import Image from "next/image";
import type { CardData } from "./CardsGrid.interface";

interface Props {
  card: CardData;
}

export const Card: React.FC<Props> = (props) => {
  const { card } = props;

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
    </div>
  );
};
