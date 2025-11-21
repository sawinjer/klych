import { headers } from "next/headers";
import type React from "react";
import { auth } from "@/auth";
import { MyKlychsGrid } from "@/components/MyKlychsGrid/MyKlychsGrid";

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

      <MyKlychsGrid userId={session.user.id} finished />
    </div>
  );
};

export default MyKlychsPage;
