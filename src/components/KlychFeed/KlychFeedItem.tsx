import { Heart } from "lucide-react";
import Link from "next/link";
import { useLikes } from "@/providers/LikesProvider/LikesProvider";
import { useSearchKlych } from "@/providers/SearchKlychProvider/SearchKlychProvider";
import type { KlychSearchResult } from "@/providers/SearchKlychProvider/SearchKlychProvider.interface";
import { Button } from "../Button/Button";
import { KlychHeder } from "../KlychHeader/KlychHeader";
import { RespondButton } from "../RespondButton/RespondButton";

interface Props {
  klych: KlychSearchResult;
}

export const KlychFeedItem: React.FC<Props> = (props) => {
  const { klych } = props;
  const { refresh } = useSearchKlych();
  const { likes, toggleLike, loading } = useLikes();
  const onLikeClick: React.MouseEventHandler = () => {
    toggleLike(klych.id);
  };

  return (
    <div className="border-1 border-white rounded-md w-full">
      <Link href={`/klych/${klych.id}`}>
        <KlychHeder klych={klych} />
      </Link>
      <div className="rounded-b-md bg-[#4E0700] h-[78px] w-full flex items-center justify-end gap-2 p-5">
        <Button
          disabled={loading}
          variant={likes.includes(klych.id) ? "contained" : "outlined"}
          onClick={onLikeClick}
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
