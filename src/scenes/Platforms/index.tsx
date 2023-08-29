import { Platform } from "@/types";
import { useState } from "react";
import { fetchPlatforms } from "@/services/platforms";
import CardList from "@/components/CardList/CardList";

const Platforms = () => {
  const [platforms] = useState<Platform[]>(() => fetchPlatforms());

  // TODO: Add image to the platform page

  return (
    <>
      <div className="min-h-[58px] py-2 px-4">
        <h1 className="block w-min pt-5 text-sm leading-4 text-primary-blue border-b border-primary-blue">
          Platforms
        </h1>
      </div>
      {!platforms && <div className="p-6">No platform loaded</div>}
      {platforms && <CardList baseSlug="/platforms/" cards={platforms} />}
    </>
  );
};

export default Platforms;
