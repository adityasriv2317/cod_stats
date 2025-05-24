import React from "react";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // optional if using routing
import TakeSs from "./TakeSs";

const socialLinks = [
  {
    name: "GitHub",
    icon: <Github className="w-6 h-6" />,
    url: "https://github.com/adityasriv2317",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-6 h-6" />,
    url: "https://linkedin.com/in/aditya2317",
  },
];

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-700 text-white font-mono">
      <div className="max-w-7xl mx-auto py-10 px-6 md:px-16 flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Branding / Game Description */}
        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-2">
            Call of Duty Fan Site
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            This site is a tribute to the legendary Call of Duty franchise.
            Built by fans, for fans — experience stats, game history, and more
            in one place.
          </p>
        </div>

         <div className="">
          <TakeSs />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Developer</h3>
          <div className="flex gap-5">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-green-400 transition"
                aria-label={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 px-2 pb-4">
        &copy; {new Date().getFullYear()} COD Stats Site. Not affiliated with
        Activision. Created by <a className="text-gray-400 hover:text-gray-200" href="https://github.com/adityasriv2317" target="_blank">@adityasriv2317</a>.
      </div>
    </footer>
  );
};

export default Footer;
