import React from 'react';
import { motion } from 'framer-motion';

import bo from '../images/bo.jpg';
import mw from '../images/mw.jpg';
import wz from '../images/wz.jpg';
import vg from '../images/vg.jpg';

const gameImages = {
  'Modern Warfare': mw,
  'Warzone': wz,
  'Black Ops Cold War': bo,
  'Vanguard': vg,
};

const Games = () => {
  const gamesData = [
    {
      title: 'Modern Warfare',
      release: '2019',
      genre: 'First-Person Shooter',
      rating: '4.5/5',
    },
    {
      title: 'Warzone',
      release: '2020',
      genre: 'Battle Royale',
      rating: '4.2/5',
    },
    {
      title: 'Black Ops Cold War',
      release: '2020',
      genre: 'First-Person Shooter',
      rating: '4.3/5',
    },
    {
      title: 'Vanguard',
      release: '2021',
      genre: 'First-Person Shooter',
      rating: '4.0/5',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="min-h-screen py-12 bg-black text-white">
      <motion.h1 
        className="text-4xl md:text-5xl px-4 md:px-8 font-bold mb-10 text-left text-green-500 font-sans tracking-wider" // Changed to text-left
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        POPULAR TITLES
      </motion.h1>
      
      <motion.div 
        className=""
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {gamesData.map((game, index) => (
          <motion.div 
            key={game.title}
            className={`bg-gray-900 overflow-hidden shadow-lg hover:shadow-green-500/30 transition-all duration-300 ease-out group rounded-none ${index % 2 === 0 ? 'text-left' : 'text-right'}`} // Added rounded-none and conditional text alignment
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.03 }}
          >
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}> {/* Flex container for image and content, conditional order */}
              <div className="relative h-48 md:h-auto md:w-1/2 w-full overflow-hidden"> {/* Adjusted image container for flex layout */}
                <img 
                  src={gameImages[game.title] || 'https://via.placeholder.com/400x225/1a1a1a/00ff00?text=Game+Art'}
                  alt={`${game.title} cover art`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              
              <div className={`p-5 md:w-1/2 flex flex-col justify-between ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}> {/* Adjusted content container for flex layout and alignment */}
                <div>
                  <h2 className={`text-2xl font-bold text-green-400 mb-2 font-['Orbitron'] truncate group-hover:text-green-300 transition-colors ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                    {game.title}
                  </h2>
                  <p className={`text-sm text-gray-400 mb-1 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>Release: {game.release}</p>
                  <p className={`text-sm text-gray-400 mb-3 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>Genre: {game.genre}</p>
                </div>
                
                <div className={`flex items-center mb-4 mt-auto ${index % 2 === 0 ? 'justify-start' : 'justify-end'} w-full`}> {/* Ensure rating aligns with text */} 
                  <span className={`text-sm bg-green-500 text-black font-bold px-2 py-1 rounded-none ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>{game.rating}</span>
                </div>
                
                <motion.button 
                  className={`w-full md:w-auto bg-green-600 hover:bg-green-500 text-black font-bold py-2.5 px-4 rounded-none transition-colors duration-200 font-['Orbitron'] text-sm tracking-wide ${index % 2 === 0 ? 'self-start' : 'self-end'}`}
                  whileTap={{ scale: 0.95 }}
                >
                  LEARN MORE
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Games;
