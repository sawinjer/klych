import { getMyKlyches, getMyKlychesCount } from "@/db/queries/getMyKlyches";
import { getUserInServer } from "@/lib/getUserInServer";
import { MyKlychsGridClient } from "./MyKlychsGridClient";

export const MyKlychsGrid: React.FC = async () => {
  const pagination = { page: 1, itemsPerPage: 3 };
  const user = await getUserInServer();

  if (!user) {
    return null;
  }

  const onGoingKlychs = await getMyKlyches(user.id, pagination, false);
  const onGoingCount = await getMyKlychesCount(user.id, false);
  const finishedKlychs = await getMyKlyches(user.id, pagination, true);
  const finishedKlychsCount = await getMyKlychesCount(user.id, true);

  return (
    <MyKlychsGridClient
      finishedKlychs={finishedKlychs}
      finishedKlychsCount={finishedKlychsCount}
      onGoingKlychs={onGoingKlychs}
      onGoingCount={onGoingCount}
    />
  );
};
