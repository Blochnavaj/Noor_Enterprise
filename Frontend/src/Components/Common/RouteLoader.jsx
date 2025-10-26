// src/Components/RouteLoader.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoaderOverlay from "./LoaderOverlay";

const RouteLoader = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // show loader for ~0.8s
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <LoaderOverlay />}
      <div className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
        {children}
      </div>
    </>
  );
};

export default RouteLoader;
