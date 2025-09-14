"use client";
import { useEffect, useState } from "react";

const useParallax = () => {
  const [scrollY, setscrollY] = useState();
  useEffect(() => {
    const handleScroll = () => setscrollY(window.scroll);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollY;
};

export default useParallax;
