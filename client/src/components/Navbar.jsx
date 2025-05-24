import React, { useState, useEffect } from "react";
import cod from "../assets/cod.png";
import { motion, AnimatePresence } from "framer-motion";
// Removed: import { Link } from "react-router-dom";

// Reusable navigation item component
const NavItem = ({ label, onClick, isMobile = false, href }) => {
  // Changed 'to' to 'href'
  const handleNavClick = (e) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(href.substring(1));
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div className="relative">
      <motion.a
        href={href}
        className={`text-white cursor-pointer px-4 py-2 rounded-md font-['Orbitron'] ${
          isMobile ? "text-center text-2xl w-full block" : "text-left"
        }`}
        whileHover={isMobile ? { x: 5 } : { scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNavClick}
      >
        {label}
      </motion.a>
      <motion.div
        className={`absolute bottom-0 left-0 ${
          isMobile ? "w-[90%]" : "right-0"
        } h-0.5 bg-green-500`}
        initial={{ width: 0, opacity: 0 }}
        whileHover={{
          width: isMobile ? "90%" : "100%",
          opacity: 1,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        exit={{ width: 0, opacity: 0 }}
      />
    </motion.div>
  );
};

// Smooth scroll utility function
const smoothScrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { label: "Home", path: "#home" }, // Paths are now IDs
    { label: "Games", path: "#games" },
    { label: "Stats", path: "#stats" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed ${
        isVisible
          ? " bg-gradient-to-b from-30% from-green-950/60 to-transparent"
          : ""
      } top-0 left-0 right-0 z-[11] flex justify-between transition-colors ease-in-out items-center px-4 md:px-16 py-8`}
    >
      <motion.img
        src={cod}
        alt="Call of Duty Logo"
        className="w-40 md:w-52 h-8 md:h-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4 text-xl">
        {navLinks.map((linkItem) => (
          <motion.div
            key={linkItem.label}
            className="relative cursor-pointer"
            whileHover="hover"
          >
            <NavItem
              label={linkItem.label}
              href={linkItem.path}
              onClick={closeMenu}
            />{" "}
            {/* Pass href and ensure closeMenu is called */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 w-2/3 bg-green-600"
              initial={{ scaleX: 0 }}
              variants={{
                hover: {
                  scaleX: 1,
                  transition: { duration: 0.3, ease: "easeOut" },
                },
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        className="md:hidden text-white z-[11] focus:outline-none"
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
            className="fixed inset-0 bg-green-950/50 bg-opacity-80 pt-32 px-4 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="rounded-lg p-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((linkItem) => (
                  <NavItem
                    key={linkItem.label}
                    label={linkItem.label}
                    onClick={closeMenu} // closeMenu will be called after scrolling
                    isMobile
                    href={linkItem.path} // Pass href
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
