"use client";

import { ProfileDetails } from "@/components/Profile/ProfileDetails/ProfileDetails";
import { ProfilePicture } from "@/components/Profile/ProfilePicture/ProfilePicture";
import { useUserName } from "@/lib/hooks/useUserName";

const Profile = () => {
  const username = useUserName();

  return (
    <div className="flex justify-center flex-col gap-[30px] flex-wrap">
      <h1 className="text-[64px]">Історія волонтерського буття</h1>
      <h2 className="text-[36px]">{username}</h2>
      <div className="flex gap-10 items-center">
        <ProfilePicture />
        <ProfileDetails />
      </div>
    </div>
  );
};

export default Profile;
