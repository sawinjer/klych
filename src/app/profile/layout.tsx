import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";
import { auth } from "@/auth";
import { ProfileNavigation } from "@/components/Profile/ProfileNavigation/ProfileNavigation";

const Layout: React.FC<React.PropsWithChildren> = async (props) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session?.session) {
    redirect("/");
  }

  return (
    <div className="w-full flex gap-10 py-10 px-5">
      <ProfileNavigation />
      {props.children}
    </div>
  );
};

export default Layout;
