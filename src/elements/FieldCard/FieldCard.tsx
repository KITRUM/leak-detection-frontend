import { Link } from "react-router-dom";
import React from "react";
import { twMerge } from "tailwind-merge";
import { getBackgroundImage } from "./getBackgroundImage";

type TCard = {
  baseSlug: string;
  field: {
    id: number;
    name: string;
  };
  backgroundColor?: string | null;
};

const FieldCard: React.FC<TCard> = ({ baseSlug, field }) => {
  const bgImage = getBackgroundImage(field.id);

  const styles = twMerge(
    "bg-cover bg-center  flex flex-col justify-end min-h-[256px] w-full p-8 rounded-md text-xl text-white shadow-card hover:scale-[1.05] duration-300",
    bgImage
  );

  return (
    <Link to={`${baseSlug}${field.id}`} key={field.id} className={styles}>
      <div>{field.name}</div>
    </Link>
  );
};

export default FieldCard;
