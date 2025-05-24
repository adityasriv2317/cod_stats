import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Games from "./components/Games";
import Scroll from "./components/Scroll";

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Games />
      </main>
      <Scroll />
      <Footer />
    </div>
  );
};

export default App;
