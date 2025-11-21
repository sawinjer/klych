import { notFound } from "next/navigation";
import sanitize from "sanitize-html";
import { KlychHeder } from "@/components/KlychHeader/KlychHeader";
import { RespondButton } from "@/components/RespondButton/RespondButton";
import { SingInBanner } from "@/components/SingInBanner/SingInBanner";
import { getKlychById } from "@/db/queries/getKlychById";
import { RespondsProvider } from "@/providers/RespondsProvider/RespondsProvider";
import { getUserInServer } from "@/lib/getUserInServer";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const KlychPage: React.FC<Props> = async (props) => {
  const params = await props.params;
  const klych = await getKlychById(params.id);
  const user = await getUserInServer();

  if (!klych) {
    return notFound();
  }

  return (
    <RespondsProvider>
      <div className="flex flex-col gap-10 items-center py-10">
        <div className="max-w-[1090px] w-full flex flex-col gap-10">
          <div className="border-1 rounded-md border-white">
            <KlychHeder klych={klych} />
          </div>
          <div className="flex gap-10">
            <div
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <i sanitize it properly>
              dangerouslySetInnerHTML={{
                __html: sanitize(klych.description),
              }}
              className="flex-1 text-justify"
            />
            <div className="rounded-md border-1 border-white p-6 h-fit flex flex-col gap-2">
              <span className="font-bold text-[20px]">
                Без тебе ніц не вийде
              </span>
              <RespondButton klychId={klych.id} authorId={klych.authorId} />
            </div>
          </div>
          {!user && <SingInBanner />}
        </div>
      </div>
    </RespondsProvider>
  );
};

export default KlychPage;
