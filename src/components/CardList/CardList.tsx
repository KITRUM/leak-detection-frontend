import Card from "@/elements/Card";
import React from "react";

type TCardList = {
  baseSlug: string;
  cards: {
    id: number;
    name: string;
  }[];
};

const CardList: React.FC<TCardList> = ({ baseSlug, cards }) => {
  return (
    <div className="grid grid-cols-4 place-items-center gap-8 p-8">
      {cards.map((card) => {
        return <Card key={card.id} card={card} baseSlug={baseSlug} />;
      })}
    </div>
  );
};

export default CardList;
