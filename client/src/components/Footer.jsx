import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // optional if using routing

const socialLinks = [
  {
    name: "GitHub",
    icon: <Github className="w-6 h-6" />,
    url: "https://github.com/yourusername",
  },
  {
    name: "Twitter",
    icon: <Twitter className="w-6 h-6" />,
    url: "https://twitter.com/yourhandle",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-6 h-6" />,
    url: "https://linkedin.com/in/yourprofile",
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

        {/* Dev Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Developer</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>
              {/* Replace with <Link> if using React Router */}
              <a href="/about" className="hover:text-green-400 transition">
                About the Developer
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Connect</h3>
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

      <div className="text-center text-xs text-gray-600 pb-4">
        &copy; {new Date().getFullYear()} COD Fan Site. Not affiliated with
        Activision. Built by [Your Name].
      </div>
    </footer>
  );
};

export default Footer;
