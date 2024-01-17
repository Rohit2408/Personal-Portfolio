import { useLayoutEffect, useRef, useState } from "react";
import TagCloud from "TagCloud";
import "./TextSphere.css";
import { useMediaQuery } from "@mui/material";

const TextShpere = () => {
  const containerRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)")

  useLayoutEffect(() => {
    const container = containerRef.current;
    const texts = [
      "HTML",
      "CSS",
      "C",
      "JavaScript",
      "React",
      "C++",
      "JAVA",
      "NodeJS",
      "Babel",
      "Jquery",
      "ES6",
      "GIT",
      "GITHUB"
    ];

    const options = {
      radius: isMobile ? 150 : 300,
      maxSpeed: "fast",
      initSpeed: "normal",
      keep: true,
    };

    const initializeTagCloud = () => {
      if (container && !isInitialized) {
        try {
          TagCloud(container, texts, options);
          setIsInitialized(true);
        } catch (error) {
          console.error("Error initializing TagCloud:", error);
        }
      }
    };

    initializeTagCloud();
  }, [isInitialized, isMobile]);

  return (
    <>
      <div className="text-shpere">
        <span className="tagcloud" ref={containerRef}></span>
      </div>
    </>
  );
};

export default TextShpere;
