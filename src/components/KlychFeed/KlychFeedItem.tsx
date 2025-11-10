import Image from "next/image";
import type { KlychSearchResult } from "@/providers/SearchKlychProvider/SearchKlychProvider.interface";
import { categoriesOptionsDict } from "../KlychCreationForm/KlychCategorySelect";
import { Calendar, Clock, Heart, House, Map } from "lucide-react";
import { Button } from "../Button/Button";

interface Props {
  klych: KlychSearchResult;
}

export const KlychFeedItem: React.FC<Props> = (props) => {
  const { klych } = props;
  const authorName = [klych.author.name, klych.author.surname]
    .filter(Boolean)
    .join(" ");
  const date = new Date(klych.datetimeOfOccurance);
  const dateString = [date.getDate(), date.getMonth(), date.getFullYear()].join(
    ".",
  );
  const timeString = [
    date.getHours().toString().padStart(2, "0"),
    date.getMinutes().toString().padStart(2, "0"),
  ].join(":");

  return (
    <div className="border-1 border-white rounded-md w-full">
      <div className="flex justify-between w-full gap-2 p-5">
        <div className="gap-3 flex flex-col">
          <h5 className="text-[36px]">{klych.title}</h5>
          <div className="flex gap-4">
            <span className="border-r-1 border-r-white pr-4">{authorName}</span>
            <span>{categoriesOptionsDict[klych.category]}</span>
          </div>
          <div className="grid grid-cols-3 gap-x-3 gap-y-3">
            <span className="flex gap-1 items-center">
              <House /> {klych.online ? "Онлайн" : "Офлайн"}
            </span>
            {klych.locationName && (
              <span className="flex gap-1 items-center">
                <Map />
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
