import type { Klych } from "@/db/schema";
import type { CardData } from "../CardsGrid/CardsGrid.interface";

export const mapKlychToCard = (klych: Klych): CardData => ({
  id: klych.id,
  title: klych.status === "active" ? "Активний" : "Завершений",
  subTitle: klych.title,
  image: klych.coverImage,
});
