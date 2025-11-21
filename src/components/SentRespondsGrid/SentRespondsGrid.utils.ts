import type { getKlychsResponds } from "@/db/queries/getResponds";
import type { CardData } from "../CardsGrid/CardsGrid.interface";

export type Respond = Awaited<ReturnType<typeof getKlychsResponds>>[number];
export const mapRespondToCard = (respond: Respond): CardData => ({
  id: respond.id,
  title: statusToText[respond.status || "pending"],
  subTitle: respond.klych.title,
  image: respond.klych.coverImage,
  disabled: respond.klych.status === "finished",
  link: `/klych/${respond.klych.id}`,
});

export const statusToText = {
  pending: "Очікує",
  accepted: "Прийнятий",
  declined: "Відхилений",
};
