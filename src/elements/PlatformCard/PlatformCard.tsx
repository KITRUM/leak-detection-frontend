import { Link } from "react-router-dom";
import React from "react";
import { twMerge } from "tailwind-merge";
import { getBackgroundImage } from "./getBackgroundImage";

type TCard = {
  baseSlug: string;
  platform: {
    id: number;
    name: string;
  };
  backgroundColor?: string | null;
};

const PlatformCard: React.FC<TCard> = ({ baseSlug, platform }) => {
  const bgImage = getBackgroundImage(platform.id);

  const styles = twMerge(
    "bg-cover bg-center  flex flex-col justify-end min-h-[256px] w-full p-8 rounded-md text-xl text-white shadow-card hover:scale-[1.05] duration-300",
    bgImage
  );

  return (
    <Link to={`${baseSlug}${platform.id}`} key={platform.id} className={styles}>
      <div>{platform.name}</div>
    </Link>
  );
};

export default PlatformCard;
