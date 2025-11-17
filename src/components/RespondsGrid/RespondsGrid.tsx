import {
  getKlychsRepondsByKlychAuthorId,
  getRespondsCountByAuthorId,
} from "@/db/queries/getResponds";
import { RepondsGridClient } from "./RespondsGridClient";

interface Props {
  userId: string;
}

export const RespondsGrid: React.FC<Props> = async (props) => {
  const initialReponds = await getKlychsRepondsByKlychAuthorId(props.userId, {
    itemsPerPage: 5,
    page: 1,
  });
  const totalReponds = await getRespondsCountByAuthorId(props.userId);

  return (
    <RepondsGridClient
      totalReponds={totalReponds}
      initialReponds={initialReponds}
    />
  );
};
