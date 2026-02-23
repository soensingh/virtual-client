import React, { useEffect, useRef, useState } from "react";
import styles from "./Quote.module.css";
import gouravSirImage from "../assets/images/gouravSir2.png";
import LightRays from "./LightRays";

const Quote = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const quoteNode = sectionRef.current;
    if (!quoteNode) return;

    const footerNode = document.getElementById("footer");
    const root = document.getElementById("landing-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setIsVisible(anyVisible);
        if (anyVisible) setHasBeenVisible(true);
      },
      {
        root,
        threshold: 0.25,
      }
    );

    observer.observe(quoteNode);
    if (footerNode) observer.observe(footerNode);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={styles.quoteMainContainer}>
      <div
        className={`${styles.threadsBackground} ${isVisible || hasBeenVisible ? styles.threadsVisible : styles.threadsHidden}`}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#7509ce"
          raysSpeed={1.2}
          lightSpread={0.6}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>
      <div className={styles.quoteContent}>
        <div className={styles.quoteTextContainer}>
          <div className={styles.mainText}>
            “your degree may open a door , but your skills decide how far you go .
            build skills, and your career will build itself.”
          </div>
          <div className={styles.subText}>
            Er. Gourav Gupta<br/> Founder and CEO , Techcadd
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src={gouravSirImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Quote;
