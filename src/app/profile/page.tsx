"use server";

import { headers } from "next/headers";
import { auth } from "@/auth";
import { LikesGrid } from "@/components/LikesGrid/LikesGrid";
import { SentRespondsGrid } from "@/components/SentRespondsGrid/SentRespondsGrid";

const Profile: React.FC = async () => {
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
      <LikesGrid userId={session.user.id} />
      <SentRespondsGrid userId={session.user.id} />
    </div>
  );
};

export default Profile;
