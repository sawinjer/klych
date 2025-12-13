import { Calendar, User } from "lucide-react";
import moment from "moment";
import Image from "next/image";

interface Props {
  story: {
    title: string;
    category: string;
    coverImage: string;
    createdAt: Date;
    author: {
      name: string;
      surname: string | null;
    };
  };
}

export const StoryHeader: React.FC<Props> = (props) => {
  const { story } = props;
  const authorName = [story.author.name, story.author.surname]
    .filter(Boolean)
    .join(" ");
  const dateString = moment(story.createdAt).format("DD.MM.YYYY");

  return (
    <div className="flex justify-between w-full gap-2 p-5">
      <div className="gap-3 flex flex-col">
        <h1 className="text-[36px] font-bold">{story.title}</h1>
        <div className="flex gap-4">
          <span className="flex gap-1 items-center">
            <User size={18} />
            {authorName}
          </span>
          <span className="border-l-1 border-l-white pl-4">{story.category}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex gap-1 items-center text-[#C4C1B1]">
            <Calendar size={18} />
            {dateString}
          </span>
        </div>
      </div>
      <Image
        alt={story.title}
        width={268}
        height={150}
        src={story.coverImage}
        className="rounded-md object-cover"
      />
    </div>
  );
};
