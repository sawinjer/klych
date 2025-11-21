import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";
import { auth } from "@/auth";
import { KlychCreationForm } from "@/components/KlychCreationForm/KlychCreationForm";

const MakeKlychPage: React.FC = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session?.session) {
    redirect("/sign-in");
  }

  return (
    <div className="px-5 flex flex-col items-center">
      <KlychCreationForm />
    </div>
  );
};

export default MakeKlychPage;
