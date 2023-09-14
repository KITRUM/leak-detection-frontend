import { Platform } from "@/types";
import { useState } from "react";
import { fetchPlatforms } from "@/services/platforms";
import PlatformList from "@/components/PlatformList/PlatformList";
import EmptySceneMessage from "@/elements/EmptySceneMessage";

const Platforms = () => {
  const [platforms] = useState<Platform[]>(() => fetchPlatforms());

  return (
    <>
      <div className="flex justify-between min-h-[58px] py-2 px-4"></div>
      {platforms.length === 0 ? (
        <EmptySceneMessage message="No sensors are loaded" />
      ) : (
        <PlatformList baseSlug="/platforms/" platforms={platforms} />
      )}
    </>
  );
};

export default Platforms;
