import { Link } from "react-router-dom";
import React from "react";

type TCard = {
  baseSlug: string;
  card: {
    id: number;
    name: string;
  };
};

const Card: React.FC<TCard> = ({ baseSlug, card }) => {
  const { id, name } = card;
  return (
    <Link
      to={`${baseSlug}${id}`}
      key={id}
      className="min-h-[256px] w-full p-8 rounded-lg bg-card-light text-lg text-primary-black shadow-card hover:scale-[1.05] hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 duration-300"
    >
      {name}
    </Link>
  );
};

export default Card;
