import { Platform } from "@/types";
import { useState } from "react";
import { fetchPlatforms } from "@/services/platforms";
import PlatformList from "@/components/PlatformList/PlatformList";

const Platforms = () => {
  const [platforms] = useState<Platform[]>(() => fetchPlatforms());

  // TODO: Add image to the platform page

  return (
    <>
      <div className="flex justify-between min-h-[58px] py-2 px-4">
        <h1 className="block w-min pt-5 text-xl leading-4 text-text-gray-300">
          Platforms
        </h1>
      </div>
      {!platforms && <div className="p-6">No platform loaded</div>}
      {platforms && (
        <PlatformList baseSlug="/platforms/" platforms={platforms} />
      )}
    </>
  );
};

export default Platforms;
