const filters = {
    Normal: "",
    Grayscale: "grayscale(50%)",
    Cinematic: "contrast(120%) brightness(90%) saturate(130%)",
    Vintage: "brightness(90%) contrast(110%) sepia(20%)",
    Pastel: "brightness(110%) saturate(120%) blur(0.5px)",
    GoldenHour: "sepia(30%) brightness(110%) contrast(95%) saturate(150%)",
    Matte: "contrast(90%) brightness(110%) saturate(80%)",
    Grain: "contrast(120%) brightness(95%) saturate(90%)",
    HueRotate: "hue-rotate(30deg)",
    Sepia: "sepia(80%) contrast(120%)",
  };
  
const layouts = {
    Grid: "grid grid-cols-2 gap-2 scale-x-[-1] object-contain ", // 2x2
    Horizontal: "flex flex-row gap-2 scale-x-[-1] object-contain", // 1x4
    Vertical: "flex flex-col gap-2 scale-x-[-1] object-contain", // 4x1
  };
  
const themes = {
    Classic: "bg-white border-black",
    Dark: "bg-black border-white text-white",
    Pastel: "bg-pink-200 border-pink-400",
    Neon: "bg-green-400 border-green-600",
    Gradient: "bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal]",
    Sunset: "bg-[url('/public/sunset.jpeg')] bg-cover bg-center"
  };
  
export {filters, layouts, themes}