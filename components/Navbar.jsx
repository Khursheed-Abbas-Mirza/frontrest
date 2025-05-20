"use client"; // Required for using hooks like `useRouter` in components outside SSR context.

import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const navItems = [
    { name: "Home", path: "/" },
    { name: "Booking", path: "/Booking" },
    { name: "ShowBooking", path: "/showBooking" },
    { name: "CancelBooking", path: "/cancelBooking" },
  ];


  return (
    <nav className="bg-black text-white border-b-2 border-[#0f0] z-[9999]">
      <div className="container mx-auto flex justify-between items-center p-4 z-[1000]">
        {/* Logo */}
        <div className="text-lg font-bold">
        
            <span className="text-[#0f0]">Restaurant Booking</span>
          
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`px-4 py-2 rounded `}
            >
              <Link href={item.path} className="hover:bg-[#0f0] hover:text-black p-2 rounded-sm">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-14 left-0 w-full bg-black md:hidden">
            <ul className="flex flex-col space-y-2 p-4">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  className={`px-4 py-2 rounded `}
                >
                  <Link href={item.path}>
                    <span onClick={() => setIsMenuOpen(false)}>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
