import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import PhotoGrid from "./PhotoGrid";
import Controls from "./Controls";

const Capture = ({ videoRef }) => {
  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(["Normal", "Normal", "Normal", "Normal"]);
  const [selectedLayout, setSelectedLayout] = useState("Grid");
  const [selectedTheme, setSelectedTheme] = useState("Classic");
  const layoutRef = useRef(null);

  const startCountdown = async () => {
    setIsCapturing(true);
    setPhotos([]);

    for (let i = 0; i < 4; i++) {
      setCountdown(3);
      for (let j = 3; j > 0; j--) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCountdown(j - 1);
      }

      await capturePhoto();
    }

    setCountdown(null);
    setIsCapturing(false);
  };

  const capturePhoto = async () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
  
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      const image = canvas.toDataURL("image/png");
      setPhotos((prev) => [...prev, image]);
    }
  };
  
  const restartSession = () => {
    setPhotos([]);
    setIsCapturing(false);
  };

const downloadLayout = async () => {
  if (layoutRef.current) {
    const { width, height } = layoutRef.current.getBoundingClientRect();

    const canvas = await html2canvas(layoutRef.current, {
      backgroundColor: null,
      logging: false,
      useCORS: true,
      scale: 2, 
    });

    // Menjaga aspect ratio agar tidak gepeng
    const aspectRatio = width / height;
    const newWidth = 1000; // Atur sesuai kebutuhan
    const newHeight = newWidth / aspectRatio;

    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = newWidth;
    resizedCanvas.height = newHeight;
    const ctx = resizedCanvas.getContext("2d");

    // Balik gambar horizontal (mirror)
    ctx.translate(resizedCanvas.width, 0);
    ctx.scale(-1, 1);

    // Gambar ulang dengan mempertahankan aspect ratio
    ctx.drawImage(canvas, 0, 0, resizedCanvas.width, resizedCanvas.height);

    const image = resizedCanvas.toDataURL("image/png");
    saveAs(image, `photo-layout-${selectedLayout}.png`);
  }
};

  
  return (
    <div className="flex flex-col justify-center items-center mt-4">
      {countdown !== null && (
        <p className="text-lg font-bold text-chartreuse">Foto dalam {countdown} detik...</p>
      )}

      {!isCapturing && photos.length === 0 && (
        <button 
          className="mt-4 bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-700 inset-shadow-lg font-bold inset-shadow-blue-400 text-avocado px-4 py-2 rounded-full border-2 border-black transition hover:scale-105 cursor-pointer"
          onClick={startCountdown}
        >
          Mulai Foto
        </button>
      )}

      <PhotoGrid 
        photos={photos} 
        selectedLayout={selectedLayout} 
        selectedTheme={selectedTheme} 
        layoutRef={layoutRef} 
        selectedFilters={selectedFilters} 
      />

      <Controls 
        photos={photos} 
        selectedLayout={selectedLayout}
        setSelectedLayout={setSelectedLayout} 
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme} 
        setSelectedFilter={(filter) => setSelectedFilters(Array(4).fill(filter))}
        downloadLayout={downloadLayout} 
        restartSession={restartSession} 
      />
    </div>
  );
};

export default Capture;
