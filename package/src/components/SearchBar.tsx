import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchBarProps {
  quickSearchItems?: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  quickSearchItems = [
    "Network Infrastructure",
    "Cybersecurity Services",
    "Affiliate Marketing",
    "UX Elevate",
    "Digital Marketing",
    "E-commerce Solutions",
    "Consulting & Strategy",
  ],
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Autofocus input when open
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close search" : "Open search"}
        className="p-2 text-gray-600 hover:text-primary focus:outline-none"
      >
        {open ? <FiX size={20} /> : <FiSearch size={20} />}
      </button>

      {/* Search Dropdown */}
      <div
        className={`absolute top-10 right-0 w-80 bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded shadow-lg transition-all duration-300 ease-in-out transform ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: Connect to search
          }}
          className="p-4"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter your keywords"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm dark:bg-dark dark:text-white"
          />

          <div className="mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold">
              Quick Search:
            </p>
            <ul className="flex flex-wrap gap-2">
              {quickSearchItems.map((text, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    className="text-xs bg-gray-100 dark:bg-gray-700 dark:text-white px-2 py-1 rounded hover:bg-primary hover:text-white transition"
                    onClick={() => {
                      if (inputRef.current) {
                        inputRef.current.value = text;
                        inputRef.current.focus();
                      }
                    }}
                  >
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
