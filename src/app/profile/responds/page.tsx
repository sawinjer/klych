import { CircleCheck } from "lucide-react";
import { headers } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import type React from "react";
import { auth } from "@/auth";
import { RespondsGrid } from "@/components/RespondsGrid/RespondsGrid";

const RespondsPage: React.FC = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in", RedirectType.replace);
  }

  return (
    <div className="flex justify-center flex-col gap-10">
      <h1 className="text-[64px]">Кличу я, прийди-прийди</h1>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 text-[36px] font-bold items-center">
          <CircleCheck size={32} color="red" /> <h2>Відгуки</h2>
        </div>
        <RespondsGrid userId={session.user.id} />
      </div>
    </div>
  );
};

export default RespondsPage;
