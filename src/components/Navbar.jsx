import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggleStore } from "../zustand/store";
import User from "./user";

const Navbar = () => {
  // lang
  const toggleButton = useToggleStore((state) => state.toggleButton);
  const toggle = useToggleStore((state) => state.toggle);

  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Update theme in localStorage and toggle dark mode class on html element
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <ul className="bg-white fixed w-full dark:bg-[#241229] z-[1000] h-16 flex items-center text-[#D375B9] px-7 cursor-pointer shadow-md justify-between">
        <li className="flex items-center  gap-3" onClick={handleNavigateHome}>
          {/* arabic/english */}
          <svg
            width="33"
            height="33"
            viewBox="0 0 32 30"
            // fill="#D375B9"
            xmlns="http://www.w3.org/2000/svg"
            className="md:w-8 md:h-8 h-6 w-6"
          >
            <path
              d="M29.0909 4.77L12.4945 21.9L6.32727 15.54L8.37818 13.425L12.4945 17.67L27.04 2.67L29.0909 4.77ZM14.5455 27C8.13091 27 2.90909 21.615 2.90909 15C2.90909 8.385 8.13091 3 14.5455 3C16.8291 3 18.9673 3.69 20.7709 4.875L22.88 2.7C20.5091 1.005 17.6436 0 14.5455 0C6.51636 0 0 6.72 0 15C0 23.28 6.51636 30 14.5455 30C17.0618 30 19.4327 29.34 21.4982 28.17L19.3164 25.92C17.8618 26.61 16.2473 27 14.5455 27ZM24.7273 19.5H20.3636V22.5H24.7273V27H27.6364V22.5H32V19.5H27.6364V15H24.7273V19.5Z"
              fill="#D375B9"
            />
          </svg>
          <span className="md:text-[32px] text-2xl ">Your Note</span>
        </li>
        <div className="flex  gap-8 items-center ">
          <button>
            <li className="md:text-4xl text-3xl font-semibold "> Ar</li>
          </button>
          <li>
            {" "}
            {/* dark/light */}
            <button onClick={toggleTheme}>
              {darkMode ? (
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:w-7 md:h-7 h-6 w-6"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 1C12 0.447715 12.4477 0 13 0C13.5523 0 14 0.447715 14 1V4C14 4.55228 13.5523 5 13 5C12.4477 5 12 4.55228 12 4V1ZM18 13C18 15.7614 15.7614 18 13 18C10.2386 18 8 15.7614 8 13C8 10.2386 10.2386 8 13 8C15.7614 8 18 10.2386 18 13ZM13 21C12.4477 21 12 21.4477 12 22V25C12 25.5523 12.4477 26 13 26C13.5523 26 14 25.5523 14 25V22C14 21.4477 13.5523 21 13 21ZM25 12C25.5523 12 26 12.4477 26 13C26 13.5523 25.5523 14 25 14H22C21.4477 14 21 13.5523 21 13C21 12.4477 21.4477 12 22 12H25ZM5 13C5 12.4477 4.55228 12 4 12H1C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H4C4.55228 14 5 13.5523 5 13ZM20.7782 3.80761C21.1687 3.41709 21.8019 3.41709 22.1924 3.80761C22.5829 4.19814 22.5829 4.8313 22.1924 5.22183L20.0711 7.34315C19.6805 7.73367 19.0474 7.73367 18.6569 7.34315C18.2663 6.95262 18.2663 6.31946 18.6569 5.92893L20.7782 3.80761ZM7.34315 18.6569C6.95262 18.2663 6.31946 18.2663 5.92893 18.6569L3.80761 20.7782C3.41709 21.1687 3.41709 21.8019 3.80761 22.1924C4.19814 22.5829 4.8313 22.5829 5.22183 22.1924L7.34315 20.0711C7.73367 19.6805 7.73367 19.0474 7.34315 18.6569ZM22.1924 20.7782C22.5829 21.1687 22.5829 21.8019 22.1924 22.1924C21.8019 22.5829 21.1687 22.5829 20.7782 22.1924L18.6569 20.0711C18.2663 19.6805 18.2663 19.0474 18.6569 18.6569C19.0474 18.2663 19.6805 18.2663 20.0711 18.6569L22.1924 20.7782ZM7.34315 7.34315C7.73367 6.95262 7.73367 6.31946 7.34315 5.92893L5.22183 3.80761C4.8313 3.41709 4.19814 3.41709 3.80761 3.80761C3.41709 4.19814 3.41709 4.8313 3.80761 5.22183L5.92893 7.34315C6.31946 7.73367 6.95262 7.73367 7.34315 7.34315Z"
                    fill="#D375B9"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Combined Shape"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.3717 0.215831C10.5931 1.19962 7 5.4302 7 10.5C7 16.299 11.701 21 17.5 21C20.4958 21 23.1986 19.7454 25.1116 17.7328C23.2191 22.5722 18.5098 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C13.81 0 14.6027 0.0740788 15.3717 0.215831Z"
                    fill="#D375B9"
                  />
                </svg>
              )}
            </button>
          </li>
          <li>
            {" "}
            {/* person */}
            <button onClick={toggle}>
              <svg
                width="28"
                height="26"
                viewBox="0 0 28 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="md:w-7 md:h-7 h-6 w-6"
              >
                <path
                  d="M27.5821 25.6668V22.0913C27.5821 20.1948 26.8556 18.3759 25.5624 17.0349C24.2693 15.6938 22.5154 14.9404 20.6866 14.9404H6.89552C5.06672 14.9404 3.31281 15.6938 2.01965 17.0349C0.72649 18.3759 0 20.1948 0 22.0913V25.6668"
                  fill="#D375B9"
                />
                <path
                  d="M13.7912 12.2587C17.1764 12.2587 19.9206 9.5145 19.9206 6.12935C19.9206 2.7442 17.1764 0 13.7912 0C10.4061 0 7.66187 2.7442 7.66187 6.12935C7.66187 9.5145 10.4061 12.2587 13.7912 12.2587Z"
                  fill="#D375B9"
                />
              </svg>
            </button>
          </li>
        </div>
      </ul>
      <User />
    </>
  );
};

export default Navbar;
