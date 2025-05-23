import { useState, useEffect } from "react";
import Popover from "./Popover";

const Camera = ({ videoRef }) => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
          const videoDevices = deviceInfos.filter(device => device.kind === "videoinput");
          setDevices(videoDevices);

          if (videoDevices.length > 0) {
            setSelectedDeviceId(videoDevices[0].deviceId);
          }
        });
      })
      .catch((err) => console.error("Error accessing camera:", err));
  }, []);

  useEffect(() => {
    if (!selectedDeviceId) return;

    navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: selectedDeviceId } } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing camera:", err));
  }, [selectedDeviceId, videoRef]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-avocado py-4 px-6 rounded-lg shadow-lg border-2 inset-shadow-lg">
      <div className="flex justify-center">
        <video ref={videoRef} autoPlay playsInline className="border-2 object-cover rounded-lg w-96 scale-x-[-1]" />
      </div>

      <select 
        className="p-2 bg-teal-400 border rounded cursor-pointer hover:shadow-md hover:scale-105 transition hover:inset-shadow-lg" 
        onChange={(e) => setSelectedDeviceId(e.target.value)}
        value={selectedDeviceId}
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Kamera ${devices.indexOf(device) + 1}`}
          </option>
        ))}
      </select>
      <Popover>Ini bagian yang menunjukkan kameramu dan tombol untuk pilih kamera yang tersedia.</Popover>
    </div>
  );
};

export default Camera;
