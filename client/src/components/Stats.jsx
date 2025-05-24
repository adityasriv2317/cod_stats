import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Animated Number Component
const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;

    const duration = 150; // ms
    const incrementTime = Math.max(10, duration / Math.abs(end - start));

    const timer = setInterval(() => {
      start +=
        (end > start ? 1 : -1) *
        Math.ceil(Math.abs(end - start) / (duration / incrementTime));
      if ((end > 0 && start >= end) || (end < 0 && start <= end) || end === 0) {
        start = end;
        clearInterval(timer);
      }
      setDisplayValue(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-['Orbitron'] tabular-nums">
      {displayValue.toLocaleString()}
    </span>
  );
};

// Bar Chart Component
const BarChart = ({ data, title, maxValue }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (i) => ({
      width: `${(data[i].value / maxValue) * 100}%`,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      className="bg-black p-6 shadow-lg w-full mb-8 rounded-none"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl md:text-2xl font-semibold text-green-400 mb-4 font-['Orbitron']">
        {title}
      </h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item.label} className="flex items-center">
            <span className="w-1/3 text-sm md:text-base text-gray-300 font-['Orbitron'] truncate pr-2">
              {item.label}
            </span>
            <div className="w-2/3 bg-gray-700 h-6 md:h-8 rounded-none overflow-hidden">
              <motion.div
                className="bg-green-500 h-full flex items-center justify-end pr-2"
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <span className="text-xs md:text-sm font-bold text-black">
                  <AnimatedNumber value={item.value} />
                </span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Stats = () => {
  const overallStats = [
    { label: "Games Released", value: 19 },
    { label: "Total Revenue (USD)", value: 27000000000 },
  ];

  const playerStats = [
    { label: "Total Players Worldwide", value: 150000000 },
    { label: "Active Monthly Users", value: 100000000 },
  ];

  const gamePopularityData = [
    { label: "Modern Warfare (2019)", value: 75000000 },
    { label: "Warzone", value: 125000000 },
    { label: "Black Ops Cold War", value: 55000000 },
    { label: "Vanguard", value: 30000000 },
    { label: "Modern Warfare II (2022)", value: 60000000 },
  ];
  const maxPopularity = Math.max(...gamePopularityData.map((d) => d.value));

  const salesByRegionData = [
    { label: "North America", value: 45 }, // Percentage
    { label: "Europe", value: 30 },
    { label: "Asia", value: 15 },
    { label: "Rest of World", value: 10 },
  ];
  const maxSalesRegion = 100;

  return (
    <div
      id="stats"
      className="min-h-screen bg-black text-white py-12 px-4 md:px-8"
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-10 text-center md:text-left text-green-500 font-sans tracking-wider"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        NUMBERS SPEAK
      </motion.h1>

      <motion.div
        className="flex flex-col md:flex-row gap-8"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.3, staggerChildren: 0.1 },
        }}
      >
        <motion.div
          className="flex flex-wrap items-center justify-center md:w-1/2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.3, staggerChildren: 0.1 },
          }}
        >
          {overallStats.map((stat) => (
            <motion.div
              key={stat.label}
              className="bg-black p-6 shadow-lg text-center rounded-none"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <h2 className="text-lg md:text-xl text-green-400 font-semibold mb-2 font-['Orbitron']">
                {stat.label}
              </h2>
              <p className="text-3xl md:text-4xl font-bold text-white">
                <AnimatedNumber value={stat.value} />
              </p>
            </motion.div>
          ))}
        </motion.div>
        <div className="md:w-1/2">
          <BarChart
            data={salesByRegionData}
            title="Sales Distribution by Region (%)"
            maxValue={maxSalesRegion}
          />
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row gap-8"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.3, staggerChildren: 0.1 },
        }}
      >
        <div className="md:w-1/2">
          <BarChart
            data={gamePopularityData}
            title="Player Counts by Recent Titles"
            maxValue={maxPopularity}
          />
        </div>
        <motion.div
          className="flex flex-wrap items-center justify-center md:w-1/2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.3, staggerChildren: 0.1 },
          }}
        >
          {playerStats.map((stat) => (
            <motion.div
              key={stat.label}
              className="bg-black p-6 shadow-lg text-center rounded-none"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <h2 className="text-lg md:text-xl text-green-400 font-semibold mb-2 font-['Orbitron']">
                {stat.label}
              </h2>
              <p className="text-3xl md:text-4xl font-bold text-white">
                <AnimatedNumber value={stat.value} />
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Stats;
