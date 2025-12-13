import Image from "next/image";
import Link from "next/link";
import type { StoryFormSubmitResult } from "../StoryForm/StoryForm.interface";
import { authClient } from "@/lib/auth-client";
import { UserRole } from "@/lib/enums/UserRole";

interface Props {
  story: StoryFormSubmitResult & { id: string };
}

export const StoriesFeedItem: React.FC<Props> = (props) => {
  const { story } = props;
  const { data } = authClient.useSession();
  const isAdmin = data?.user.role === UserRole.Admin;

  return (
    <Link href={`/stories/${story.id}`}>
      <article className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="border-1 border-white py-2.5 px-4 rounded-md w-fit">
              {story.category}
            </span>
          </div>
          <span className="text-[36px] font-bold">{story.title}</span>
        </div>
        {story.coverImage && (
          <Image
            alt={story.title}
            src={story.coverImage}
            height={188}
            width={268}
          />
        )}
      </article>
    </Link>
  );
};
