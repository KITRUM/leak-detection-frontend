import { Link } from "react-router-dom";
import React from "react";

type TCard = {
  baseSlug: string;
  card: {
    id: number;
    name: string;
  };
  backgroundColor?: string | null;
};

const Card: React.FC<TCard> = ({ baseSlug, card }) => {
  return (
    <Link
      to={`${baseSlug}${card.id}`}
      key={card.id}
      className={
        "min-h-[256px] w-full p-8 bg-white rounded-md text-lg text-primary-black shadow-card hover:scale-[1.05] duration-300"
      }
    >
      {card.name}
    </Link>
  );
};

export default Card;
