import React from "react";
import FeaturedCollections from "./components/homePageComp/FeaturedCollections";
import Hero from "./components/homePageComp/Hero";
import About from "./components/homePageComp/About";
import Newsletter from "./components/homePageComp/Newsletter";

const App: React.FC = () => {
  return (
    <div className="bg-stone-50 text-gray-800">
      <main>
        <Hero />
        <FeaturedCollections />
        <About />
        <Newsletter />
      </main>
    </div>
  );
};

export default App;
