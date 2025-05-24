import React, { useState } from "react";
import cod from "../assets/cod.png";
import { motion, AnimatePresence } from "framer-motion";

// Reusable navigation item component
const NavItem = ({ label, onClick, isMobile = false }) => (
  <motion.div className="relative">
    <motion.button
      className={`text-white px-4 py-2 rounded-md font-['Orbitron'] ${isMobile ? "text-left w-full" : ""}`}
      whileHover={isMobile ? { x: 5 } : { scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {label}
    </motion.button>
    <motion.div
      className={`absolute bottom-0 left-0 ${isMobile ? "w-[90%]" : "right-0"} h-0.5 bg-green-500`}
      initial={{ width: 0 }}
      whileHover={{ width: isMobile ? "90%" : "100%" }}
      transition={{ duration: 0.2 }}
    />
  </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = ["Home", "Games", "Stats"];

  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-4 md:px-16 py-8">
      <motion.img
        src={cod}
        alt="Call of Duty Logo"
        className="w-40 md:w-52 h-8 md:h-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4 text-xl">
        {navItems.map((item) => (
          <NavItem key={item} label={item} />
        ))}
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-20 right-0 left-0 bg-gray-900 p-4 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavItem key={item} label={item} onClick={closeMenu} isMobile />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
