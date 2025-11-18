import { Calendar, Clock, House, MapIcon, User } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import type React from "react";
import type { KlychSearchResult } from "@/providers/SearchKlychProvider/SearchKlychProvider.interface";
import { categoriesOptionsDict } from "../KlychCreationForm/KlychCategorySelect";

interface Props {
  klych: Pick<
    KlychSearchResult,
    | "author"
    | "datetimeOfOccurance"
    | "category"
    | "title"
    | "locationName"
    | "online"
    | "coverImage"
    | "respondsCount"
    | "requiredPeoplesAmount"
  >;
}

export const KlychHeder: React.FC<Props> = (props) => {
  const klych = props.klych;
  const authorName = [klych.author.name, klych.author.surname]
    .filter(Boolean)
    .join(" ");
  const date = moment(klych.datetimeOfOccurance);
  const dateString = date.format("DD.MM.YYYY");
  const timeString = date.format("HH:mm");

  return (
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

      <Image alt={klych.title} width={160} height={90} src={klych.coverImage} />
    </div>
  );
};
