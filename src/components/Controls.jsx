import React, { useMemo } from "react";
import { filters, layouts, themes } from "../config/config";

const Controls = ({
  photos,
  selectedLayout,
  setSelectedLayout,
  selectedTheme,
  setSelectedTheme,
  setSelectedFilter,
  selectedFilter,
  downloadLayout,
  restartSession,
}) => {
  const defaultLayout = useMemo(() => Object.keys(layouts)[0], [layouts]);
  const defaultTheme = useMemo(() => Object.keys(themes)[0], [themes]);
  const defaultFilter = useMemo(() => Object.keys(filters)[0], [filters]);


  return (
    <div className="mt-4 flex flex-col items-center gap-4">
      {photos.length === 4 && (
        <div className="flex gap-4">
          <button
            className="bg-green-400 font-bold text-black inset-shadow-lg inset-shadow-green-600 text-white px-4 py-2 rounded-full border-2 border-black transition hover:bg-green-700 hover:scale-105 cursor-pointer"
            onClick={downloadLayout}
          >
            Unduh Layout
          </button>
          <button
            className="bg-red-400 font-bold text-black inset-shadow-lg inset-shadow-red-600 text-white px-4 py-2 rounded-full border-2 border-black transition hover:bg-red-700 hover:scale-105 cursor-pointer"
            onClick={restartSession}
          >
            Ulangi Sesi Foto
          </button>
        </div>
      )}

      <div className="flex gap-2 md:gap-4 text-chartreuse">
          <div>
            <label className="mr-2 font-semibold">Layout:</label>
            <select
              className="border p-1 rounded cursor-pointer field-sizing-content"
              onChange={(e) => setSelectedLayout(e.target.value)}
              value={selectedLayout || defaultLayout}
            >
              {Object.keys(layouts).map((key) => (
                <option className="bg-metal" key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mr-2 font-semibold">Tema:</label>
            <select
              className="border p-1 rounded cursor-pointer field-sizing-content"
              onChange={(e) => setSelectedTheme(e.target.value)}
              value={selectedTheme || defaultTheme}
            >
              {Object.keys(themes).map((key) => (
                <option className="bg-metal" key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          {photos.length === 4 && (
            <div>
              <label className="mr-2 font-semibold">Filter:</label>
              <select
                className="border p-1 rounded cursor-pointer field-sizing-content"
                onChange={(e) => setSelectedFilter(e.target.value)}
                value={selectedFilter || defaultFilter}
              >
                {Object.keys(filters).map((key) => (
                  <option className="bg-metal" key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
  );
};

export default Controls;
