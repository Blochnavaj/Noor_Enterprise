 // src/Components/LoaderOverlay.jsx
import React from "react";
import Loader from "./Loader";

const LoaderOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <Loader />
    </div>
  );
};

export default LoaderOverlay;
