"use client";

import { ProfilePicture } from "@/components/Profile/ProfilePicture/ProfilePicture";
import { useUserName } from "@/lib/hooks/useUserName";

const Profile = () => {
  const username = useUserName();

  return (
    <div className="flex justify-center gap-25 flex-wrap">
      <ProfilePicture />
      <h1 className="text-[64px]">{username}</h1>
    </div>
  );
};

export default Profile;
