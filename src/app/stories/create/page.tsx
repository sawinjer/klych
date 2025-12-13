import { redirect } from "next/navigation";
import { StoryCreationForm } from "@/components/StoryForm/StoryCreationForm";
import { UserRole } from "@/lib/enums/UserRole";
import { getUserInServer } from "@/lib/getUserInServer";

const CreateStoryPage: React.FC = async () => {
  const user = await getUserInServer();
  const isAdmin = user?.role === UserRole.Admin;

  if (!isAdmin) {
    redirect("/stories");
  }

  return (
    <div className="flex justify-center">
      <StoryCreationForm />
    </div>
  );
};

export default CreateStoryPage;
