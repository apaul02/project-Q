// components/Preloader.tsx
import React from "react";
import Lottie from "lottie-react";
import animationData from "../../public/loader.json"; // Replace with your Lottie JSON file

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#DEDEDE] to-[#E1A38F]">
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

export default Preloader;
