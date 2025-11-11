import { Calendar, Clock, Heart, House, Map as MapIcon } from "lucide-react";
import Image from "next/image";
import type { KlychSearchResult } from "@/providers/SearchKlychProvider/SearchKlychProvider.interface";
import { Button } from "../Button/Button";
import { categoriesOptionsDict } from "../KlychCreationForm/KlychCategorySelect";
import moment from "moment";

interface Props {
  klych: KlychSearchResult;
}

export const KlychFeedItem: React.FC<Props> = (props) => {
  const { klych } = props;
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
        <Button variant="outlined">
          <Heart />
        </Button>
        <Button>Відгукнутися</Button>
      </div>
    </div>
  );
};
