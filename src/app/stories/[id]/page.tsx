import { notFound } from "next/navigation";
import sanitize from "sanitize-html";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import { StoryHeader } from "@/components/StoryHeader/StoryHeader";
import { SingInBanner } from "@/components/SingInBanner/SingInBanner";
import { getStoryById } from "@/db/queries/getStoryById";
import { getUserInServer } from "@/lib/getUserInServer";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const StoryPage: React.FC<Props> = async (props) => {
  const params = await props.params;
  const story = await getStoryById(params.id);
  const user = await getUserInServer();

  if (!story) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-10 items-center py-10">
      <div className="max-w-[1090px] w-full flex flex-col gap-10 px-5">
        <Link
          href="/stories"
          className="flex items-center gap-2 text-[#C4C1B1] hover:text-[#F7F4E3] transition-colors w-fit"
        >
          <ArrowLeft size={20} />
          <span>Назад до історій</span>
        </Link>

        <div className="border-1 rounded-md border-white">
          <StoryHeader story={story} />
        </div>

        <div className="flex gap-10">
          <div
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <i sanitize it properly>
            dangerouslySetInnerHTML={{
              __html: sanitize(story.description),
            }}
            className="flex-1 text-justify leading-relaxed"
          />
          <div className="w-[280px] flex-shrink-0">
            <div className="rounded-md border-1 border-white p-6 h-fit flex flex-col gap-4 sticky top-10">
              <span className="font-bold text-[20px]">Поділитися історією</span>
              <p className="text-[#C4C1B1] text-sm">
                Розкажи про цю історію друзям та знайомим
              </p>
              <button
                type="button"
                className="rounded-xl border border-[#F7F4E3] text-[#F7F4E3] py-3 px-6 font-bold flex items-center justify-center gap-2 hover:bg-[#F7F4E3] hover:text-[#202020] transition-colors"
              >
                <Share2 size={18} />
                Поділитися
              </button>
            </div>
          </div>
        </div>

        {!user && <SingInBanner />}
      </div>
    </div>
  );
};

export default StoryPage;
