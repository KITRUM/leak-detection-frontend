import { Platform } from "@/types";

export function fetchPlatforms(): Platform[] {
  // Fetch all Platforms that are added to the system

  // TODO: Fetch the real data from the backend
  return [
    { id: 1, name: "Trestakk" },
    { id: 2, name: "Snorre" },
    { id: 3, name: "Askeladd" },
    { id: 4, name: "Troll" },
  ];
}
