import React from "react";
import dynamic from "next/dynamic";
const HomePageContent = dynamic(() =>
  import("@/components/home/HomePageContent")
);
const HomePage = () => {
  return <HomePageContent />;
};

export default HomePage;
