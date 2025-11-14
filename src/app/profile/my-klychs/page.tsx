import { auth } from "@/auth";
import { MyKlychsGrid } from "@/components/MyKlychsGrid/MyKlychsGrid";
import { CircleCheck, Megaphone } from "lucide-react";
import { headers } from "next/headers";
import type React from "react";

const MyKlychsPage: React.FC = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return (
    <div className="flex justify-center flex-col gap-10">
      <h1 className="text-[64px]">
        Клич і прийдуть, {session.user.name || "Безіменний"}
      </h1>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 text-[36px] font-bold items-center">
          <Megaphone size={32} color="red" /> <h2>Активні Кличі</h2>
        </div>
        <MyKlychsGrid userId={session.user.id} finished={false} />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 text-[36px] font-bold items-center">
          <CircleCheck size={32} color="red" /> <h2>Завершені Кличі</h2>
        </div>
        <MyKlychsGrid userId={session.user.id} finished />
      </div>
    </div>
  );
};

export default MyKlychsPage;
