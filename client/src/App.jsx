import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Games from "./components/Games";

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Games />
      </main>
      <Footer />
    </div>
  );
};

export default App;
