import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Games from "./components/Games";
import Scroll from "./components/Scroll";
import Stats from "./components/Stats";

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Games />
        <Stats />
      </main>
      <Scroll />
      <Footer />
    </div>
  );
};

export default App;
