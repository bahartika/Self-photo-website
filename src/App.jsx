import { useRef } from "react";
import './styles/App.css'
import Camera from "./components/Camera";
import Capture from "./components/Capture";

function App() {
  const videoRef = useRef(null);

  return (
    <>
      <header className="bg-chartreuse flex justify-center py-3 shadow-lg fixed w-full z-1">        
        <h1 className="text-3xl font-bold font-quicksand text-metal">SELF PHOTO WEBSITE</h1>
      </header>
      <div className="flex flex-col justify-center items-center p-4 min-h-screen md:w-full bg-metal font-quicksand pt-20 pb-10">
        <div className="md:flex gap-12">
          <Camera videoRef={videoRef} />
          <Capture videoRef={videoRef} />
        </div>
      </div>
      <footer className="bg-chartreuse flex justify-center py-3 shadow-lg w-full">
        <h3 className="text-sm font-bold font-quicksand">Copyright © 2025 Bahartika</h3>
      </footer>
    </>
  );
}

export default App;
