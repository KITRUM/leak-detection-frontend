export const getBackgroundImage = (platformId: number) => {
  switch (platformId) {
    case 1:
      return "bg-[url('src/assets/platform-1.WebP')]";
    case 2:
      return "bg-[url('src/assets/platform-2.WebP')]";
    case 3:
      return "bg-[url('src/assets/platform-3.WebP')]";
    case 4:
      return "bg-[url('src/assets/platform-4.WebP')]";
    default:
      return "";
  }
};
