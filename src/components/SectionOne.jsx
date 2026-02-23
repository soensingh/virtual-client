import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SectionOne.module.css";
import heroImage from "../assets/images/heroImage.png";

gsap.registerPlugin(ScrollTrigger);

const SectionOne = ({ onOpenDemoModal }) => {
  const sectionRef = useRef(null);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useLayoutEffect(() => {
    // Fade out animation removed
  }, []);

  return (
    <div ref={sectionRef} className={styles.sectionOneMainContainer}>
      <div className={styles.heroImageContainer} data-hero-image>
        <img src={heroImage} alt="" />
      </div>
      <div className={styles.heroTextContainer} data-hero-text>
        <span>Less college theory.</span> More industry skills. {" "}
        <span> Rise above all.</span>
      </div>
      <div className={styles.heroSubTextContainer} data-hero-subtext>
        <p>
          Job-Ready Skills, Expert Mentors, and Personalized Learning —Anytime,
          Anywhere.
        </p>
      </div>
      <div className={styles.heroButtonContainer} data-hero-buttons>
        <button className={styles.openSans} onClick={onOpenDemoModal}>3 Days Demo Classes</button>
        <button className={styles.openSans} onClick={handleScrollToContact}>Enquire</button>
      </div>
    </div>
  );
};

export default SectionOne;
