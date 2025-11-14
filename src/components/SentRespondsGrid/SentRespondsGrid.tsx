import { CircleCheck } from "lucide-react";
import { getKlychsResponds, getRespondsCount } from "@/db/queries/getResponds";
import { SentRespondsGridClient } from "./SentRespondsGridClient";

interface Props {
  userId: string;
}

export const SentRespondsGrid: React.FC<Props> = async (props) => {
  const responds = await getKlychsResponds(props.userId, {
    page: 1,
    itemsPerPage: 3,
  });
  const respondsCount = await getRespondsCount(props.userId);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 text-[36px] font-bold items-center">
        <CircleCheck size={32} color="red" /> <h2>Надіслані відгуки</h2>
      </div>
      <SentRespondsGridClient
        userId={props.userId}
        initialResponds={responds}
        totalItems={respondsCount}
      />
    </div>
  );
};
