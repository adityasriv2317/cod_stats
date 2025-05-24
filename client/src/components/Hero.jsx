import React from "react";
import hero from "../assets/hero.jpg";
import { motion } from "framer-motion";

const Hero = () => {
  // Sample game stats data
  const gameStats = [
    { label: "Active Players", value: "25M+", icon: "👥" },
    { label: "Maps", value: "20+", icon: "🗺️" },
    { label: "Weapons", value: "50+", icon: "🔫" },
    { label: "Win Rate", value: "24%", icon: "🏆" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.6,
      },
    },
  };

  const statItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div id="home" className="relative h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={hero} alt="hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 bg-opacity-50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-4 md:px-16 text-white">
        <motion.div
          className="flex flex-col items-start max-w-4xl text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold mb-4"
            variants={itemVariants}
          >
            <span className="text-green-600">CALL OF DUTY</span> <br />
            {(() => {
              const titles = [
                "WARZONE",
                "MODERN WARFARE",
                "BLACK OPS",
                "VANGUARD",
                "MOBILE",
                "WORLD WAR",
              ];
              const [currentTitleIndex, setCurrentTitleIndex] =
                React.useState(0);
              const [displayText, setDisplayText] = React.useState("");

              React.useEffect(() => {
                const titleInterval = setInterval(() => {
                  setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
                  setDisplayText("");
                }, 5000);

                return () => clearInterval(titleInterval);
              }, []);

              React.useEffect(() => {
                const currentTitle = titles[currentTitleIndex];
                let charIndex = 0;

                const textInterval = setInterval(() => {
                  if (charIndex <= currentTitle.length) {
                    setDisplayText(currentTitle.slice(0, charIndex));
                    charIndex++;
                  } else {
                    clearInterval(textInterval);
                  }
                }, 120);

                return () => clearInterval(textInterval);
              }, [currentTitleIndex]);

              return (
                <motion.span
                  key={currentTitleIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {displayText}
                  {"_"}
                </motion.span>
              );
            })()}
          </motion.h1>

          <motion.p
            className="text-md md:text-xl font-mono mb-8 md:ml-4 max-w-xl"
            variants={itemVariants}
          >
            Call of Duty is a first-person shooter video game franchise
            published by Activision. Starting out in 2003, it first focused on
            games set in World War II.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex md:ml-4 text-xl font-mono flex-wrap gap-4"
          >
            <motion.button
              className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 hover:rounded-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              BUY NOW
            </motion.button>

            <motion.button
              className="border-2 border-white hover:border-green-500 text-white font-bold py-3 px-6 hover:rounded-md transition-all"
              whileHover={{ scale: 1.05, borderColor: "#16a34a" }}
              whileTap={{ scale: 0.95 }}
            >
              LEARN MORE
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
