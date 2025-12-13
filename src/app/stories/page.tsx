import { Newspaper } from "lucide-react";
import { LinkButton } from "@/components/Button/LinkBuntton";
import {
  StoriesFeed,
  type StoriesResponse,
} from "@/components/StoriesFeed/StoriesFeed";
import { UserRole } from "@/lib/enums/UserRole";
import { getUserInServer } from "@/lib/getUserInServer";
import { meiliClient } from "@/lib/meiliClient";

const StoriesPage: React.FC = async () => {
  const user = await getUserInServer();
  const isAdmin = user?.role === UserRole.Admin;

  const index = meiliClient.index("stories");
  const response = await index.search("", {
    hitsPerPage: 20,
    page: 1,
  });

  return (
    <div className="px-5 flex flex-col gap-10">
      {isAdmin && (
        <LinkButton
          className="w-fit"
          href="/stories/create"
          icon={<Newspaper />}
        >
          Створити історію
        </LinkButton>
      )}
      <StoriesFeed initialResponse={response as unknown as StoriesResponse} />
    </div>
  );
};

export default StoriesPage;
