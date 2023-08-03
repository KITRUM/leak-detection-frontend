import { Platform } from "@/types";

export function fetchPlatforms(): Platform[] {
  // Fetch all platforms that are added to the system

  // TODO: Fetch the real data from the backend
  return [
    { id: 1, name: "Trestakk" },
    { id: 2, name: "Askeladd" },
    { id: 3, name: "Troll" },
  ];
}
