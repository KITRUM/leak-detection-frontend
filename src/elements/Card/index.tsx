import { Link } from "react-router-dom";
import React from "react";

type TCard = {
  baseSlug: string;
  card: {
    id: number;
    name: string;
  };
  backgorundColor?: string | null;
};

const Card: React.FC<TCard> = ({ baseSlug, card, backgorundColor }) => {
  const background =
    backgorundColor == null ? "bg-white" : `bg-${backgorundColor}-50`;

  return (
    <Link
      to={`${baseSlug}${card.id}`}
      key={card.id}
      className={`min-h-[256px] w-full p-8 ${background} rounded-md text-lg text-primary-black shadow-card hover:scale-[1.05] duration-300`}
    >
      {card.name}
    </Link>
  );
};

export default Card;
