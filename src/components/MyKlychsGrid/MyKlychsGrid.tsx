import { getMyKlyches, getMyKlychesCount } from "@/db/queries/getMyKlyches";
import { MyKlychsGridClient } from "./MyKlychsGridClient";

interface Props {
  userId: string;
  finished?: boolean;
}

export const MyKlychsGrid: React.FC<Props> = async (props) => {
  const initialItems = await getMyKlyches(
    props.userId,
    { page: 1, itemsPerPage: 3 },
    props.finished,
  );
  const totalItems = await getMyKlychesCount(props.userId, props.finished);

  return (
    <MyKlychsGridClient
      userId={props.userId}
      totalItems={totalItems}
      initialItems={initialItems}
      finished={props.finished}
    />
  );
};
