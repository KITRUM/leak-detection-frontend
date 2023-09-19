export const getBackgroundImage = (fieldId: number) => {
  switch (fieldId) {
    case 1:
      return "bg-[url('src/assets/field-1.WebP')]";
    case 2:
      return "bg-[url('src/assets/field-2.WebP')]";
    case 3:
      return "bg-[url('src/assets/field-3.WebP')]";
    case 4:
      return "bg-[url('src/assets/field-4.WebP')]";
    default:
      return "";
  }
};
