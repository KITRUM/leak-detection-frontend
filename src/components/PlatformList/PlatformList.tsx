import React from "react";
import PlatformCard from "@/elements/PlatformCard/PlatformCard";

type TCardList = {
  baseSlug: string;
  platforms: {
    id: number;
    name: string;
  }[];
};

const PlatformList: React.FC<TCardList> = ({ baseSlug, platforms }) => {
  return (
    <div className="grid grid-cols-4 place-items-center gap-8 p-8">
      {platforms.map((platform) => {
        return (
          <PlatformCard
            key={platform.id}
            platform={platform}
            baseSlug={baseSlug}
          />
        );
      })}
    </div>
  );
};

export default PlatformList;
