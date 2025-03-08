import React from "react";
import { filters, layouts, themes } from "../config/config";

const PhotoGrid = ({ photos, selectedLayout, selectedTheme, layoutRef, selectedFilters }) => {
  return (
    photos.length > 0 && (
      <div 
        ref={layoutRef} 
        className={`w-auto p-4 border-2 rounded-lg ${layouts[selectedLayout] || ""} ${themes[selectedTheme] || ""}`}
      >
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            {/* <img
              src={photo}
              alt={`Foto ${index + 1}`}
              className={`${selectedLayout === "Horizontal" ? "w-20 h-20" : "w-30 h-30"} md:w-30 md:h-30 object-cover border rounded-lg`}
              style={{ filter: filters[selectedFilters[index]] || "Normal" }}
            /> */}
            <img
                src={photo}
                alt={`Foto ${index + 1}`}
                className={`max-w-auto object-cover border-2 rounded-lg`}
                style={{ filter: filters[selectedFilters[index]] || "Normal" }}
            />
          </div>
        ))}
      </div>
    )
  );  
};

export default PhotoGrid;
