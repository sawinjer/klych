import { authClient } from "../auth-client";

export const useUserName = () => {
  const { isPending, data } = authClient.useSession();
  const name = isPending
    ? "Завантаження..."
    : [data?.user.name, data?.user.surname].filter(Boolean).join(" ");

  if (!name) {
    return "Безіменний :(";
  }

  return name;
};
