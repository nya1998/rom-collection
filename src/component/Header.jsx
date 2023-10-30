import {
  PiCloudSunDuotone,
  PiCloudMoonDuotone,
  PiMagnifyingGlassBold,
} from "react-icons/pi";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Switch from "react-switch";

export default function Detail() {
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [IsLightMode, setIsLightMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!isMobileMenuVisible);
  };
  const handleSwitchChange = (checked) => {
    setIsLightMode(checked);
    localStorage.setItem("isLightMode", JSON.stringify(checked));
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      const url = `/search/${encodeURIComponent(searchQuery)}`;
      window.location.href = url;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const storedIsLightMode = localStorage.getItem("isLightMode");
    const parsedIsLightMode = JSON.parse(storedIsLightMode);
    setIsLightMode(parsedIsLightMode || false);
  }, []);

  useEffect(() => {
    if (IsLightMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [IsLightMode]);

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img
              src="/vite.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
              width="36"
              height="36"
            />
          </a>
          <div className="flex items-center lg:order-2">
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-48 h-8 p-2 pr-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Cari Game"
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                value={searchQuery}
                required
              ></input>
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5"
                onClick={handleSearch}
                aria-label="Search"
              >
                <PiMagnifyingGlassBold
                  size={15}
                  className="text-black dark:text-white"
                />
              </button>
            </div>
            <Switch
              height={29}
              onChange={handleSwitchChange}
              checked={IsLightMode}
              className="ml-3"
              onColor="#6fcdfc"
              offColor="#252525"
              aria-label="themeBtn"
              checkedIcon={<PiCloudSunDuotone size={27} className="ml-0.5" />}
              uncheckedIcon={<PiCloudMoonDuotone size={27} className="mr-0.5" />}
            />
            <button
              onClick={toggleMobileMenu}
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-3"
              aria-controls="mobile-menu-2"
              aria-expanded={isMobileMenuVisible}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMobileMenuVisible ? "" : "hidden "
            }w-full md:block md:w-auto`}
            id="mobile-menu-2"
          >
            <ul
              className={`${
                isMobileMenuVisible ? "dark:bg-gray-800 " : ""
              }rounded-lg flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0`}
            >
              <li>
                <Link
                  className="block py-2 pr-4 pl-3 lg:bg-transparent lg:p-0 dark:text-white"
                  to="/"
                  id="homeLink"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  className="block py-2 pr-4 pl-3 text-gray-700 border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  href="/console/switch"
                >
                  Switch
                </a>
              </li>
              <li>
                <a
                  className="block py-2 pr-4 pl-3 text-gray-700 border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  href="/console/vita"
                >
                  PS Vita
                </a>
              </li>
              <li>
                <Link
                  className="block py-2 pr-4 pl-3 text-gray-700 border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  to="#"
                >
                  Request
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 pr-4 pl-3 text-gray-700 border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  to="#"
                >
                  DMCA
                </Link>
              </li>
              <li className="dark:bg-gray-900 pt-3"></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
