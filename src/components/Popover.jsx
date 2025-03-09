import React, { useState, useEffect, useRef } from "react";

const Popover = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !event.target.closest("button")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [popoverRef]);

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full border-2 border-metal text-metal text-sm p-2 w-3 h-3 flex items-center justify-center cursor-pointer"
      >
        i
      </button>
      {isOpen && (
        <div
          ref={popoverRef}
          className={`bg-white text-center border shadow-md inset-shadow-lg rounded p-2 transition-transform duration-300 ease-in-out transition-opacity duration-300 ease-in-out ${
            isOpen ? "scale-100" : "scale-50"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;