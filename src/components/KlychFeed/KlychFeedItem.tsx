import {
  Calendar,
  Clock,
  Heart,
  House,
  Map as MapIcon,
  User,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useLikes } from "@/providers/LikesProvider/LikesProvider";
import { useSearchKlych } from "@/providers/SearchKlychProvider/SearchKlychProvider";
import type { KlychSearchResult } from "@/providers/SearchKlychProvider/SearchKlychProvider.interface";
import { Button } from "../Button/Button";
import { categoriesOptionsDict } from "../KlychCreationForm/KlychCategorySelect";
import { RespondButton } from "../RespondButton/RespondButton";

interface Props {
  klych: KlychSearchResult;
}

export const KlychFeedItem: React.FC<Props> = (props) => {
  const { klych } = props;
  const { refresh } = useSearchKlych();
  const { likes, toggleLike, loading } = useLikes();
  const authorName = [klych.author.name, klych.author.surname]
    .filter(Boolean)
    .join(" ");
  const date = moment(klych.datetimeOfOccurance);
  const dateString = date.format("DD.MM.YYYY");
  const timeString = date.format("HH:mm");

  return (
    <div className="border-1 border-white rounded-md w-full">
      <div className="flex justify-between w-full gap-2 p-5">
        <div className="gap-3 flex flex-col">
          <h5 className="text-[36px]">{klych.title}</h5>
          <div className="flex gap-4">
            <span className="border-r-1 border-r-white pr-4">{authorName}</span>
            <span>{categoriesOptionsDict[klych.category]}</span>
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <span className="flex gap-1 items-center">
              <House /> {klych.online ? "Онлайн" : "Офлайн"}
            </span>
            {klych.locationName && (
              <span className="flex gap-1 items-center">
                <MapIcon />
                {klych.locationName}
              </span>
            )}
            <span className="flex gap-1 items-center">
              <Calendar /> {dateString}
            </span>
            {timeString !== "00:00" && (
              <span className="flex gap-1 items-center">
                <Clock /> {timeString}
              </span>
            )}

            <span className="flex gap-1 items-center">
              <User />
              {[klych.respondsCount, klych.requiredPeoplesAmount].join("/")}
            </span>
          </div>
        </div>

        <Image
          alt={klych.title}
          width={160}
          height={90}
          src={klych.coverImage}
        />
      </div>
      <div className="rounded-b-md bg-[#4E0700] h-[78px] w-full flex items-center justify-end gap-2 p-5">
        <Button
          disabled={loading}
          variant={likes.includes(klych.id) ? "contained" : "outlined"}
          onClick={() => toggleLike(klych.id)}
        >
          <Heart />
        </Button>
        <RespondButton
          onRespond={refresh}
          klychId={klych.id}
          authorId={klych.authorId}
        />
      </div>
    </div>
  );
};
