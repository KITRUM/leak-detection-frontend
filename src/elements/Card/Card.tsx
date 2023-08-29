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
      className={`flex flex-col justify-end min-h-[256px] w-full p-8 bg-cover rounded-md text-xl text-white shadow-card hover:scale-[1.05] duration-300 bg-[url('/platform-${card.id}.WebP')]`}
    >
      <div>{card.name}</div>
    </Link>
  );
};

export default Card;
