import React, { useEffect, useRef, useState } from "react";
import styles from "./OurMentors.module.css";
import Orb from "./Orb";
import raginiMam from "../assets/images/raginiMam.png";
import mrShiv from "../assets/images/mr-shiv.png";
import tushar from "../assets/images/tushar.png";
import aman from "../assets/images/aman.png";
import dishantSir from "../assets/images/dishantSir.png";
import eakum from "../assets/images/eakum.png";

const mentors = [
  {
    name: "Ms. Ragini",
    title: "Cloud Computing (AWS)",
    description:
      "With deep expertise in cloud architecture, Ms. Ragini guides students through the complexities of designing secure, high-availability systems on AWS, ensuring they understand the backbone of the modern internet. Her comprehensive mentorship covers everything from serverless computing and DevOps pipelines to cost optimization strategies and disaster recovery planning. By focusing on real-world scenarios and industry best practices, she empowers learners to master the strategic decision-making required for deploying enterprise-grade infrastructure. Her hands-on labs challenge students to build resilient networks that can scale globally, preparing them to tackle the toughest cloud challenges faced by today's tech giants.",
    shortDescription:
      "Ms. Ragini simplifies cloud architecture on AWS, covering secure design, serverless, DevOps pipelines, and cost optimization. Her hands-on labs focus on real-world scenarios and scalable infrastructure so learners build production-ready cloud solutions with confidence.",
    image: raginiMam,
  },
  {
    name: "Mr. Shiv",
    title: "Artificial Intelligence",
    description:
      "Mr. Shiv brings the cutting edge of AI into the classroom, demystifying neural network architectures and deep learning paradigms to reveal the mathematics behind the magic. His rigorous curriculum spans from classical machine learning algorithms to modern transformer models and reinforcement learning, designing intelligent agents capable of solving ambiguous real-world problems. By dissecting state-of-the-art research papers and implementing models from scratch, he prepares students for the forefront of innovation. His goal is to not just teach tools, but to cultivate the problem-solving intuition needed to build the next generation of autonomous systems.",
    shortDescription:
      "Mr. Shiv breaks down neural networks, transformers, and reinforcement learning with a math-first approach. Students implement models from scratch and build real-world intelligent systems, developing the intuition required for modern AI innovation.",
    image: mrShiv,
  },
  {
    name: "Mr. Tushar",
    title: "Full Stack Web Development (MERN Stack)",
    description:
      "A Full Stack virtuoso, Mr. Tushar empowers students to build robust end-to-end solutions, bridging the gap between elegant user interfaces and powerful back-end logic. His deep dive into React performance, Node.js scalability, and database design ensures learners can handle high-traffic applications with ease and efficiency. Beyond the code, he emphasizes clean architecture, security best practices, and automated testing protocols, effectively transforming aspiring developers into engineering leaders. Through his guidance, students learn to view software layout holistically, understanding how every line of code impacts the final user experience and system reliability.",
    shortDescription:
      "Mr. Tushar guides students through React performance, Node.js scalability, and database design. He emphasizes clean architecture, security, and testing so learners can build reliable, high-traffic MERN applications end to end.",
    image: tushar,
  },
  {
    name: "Mr. Aman",
    title: "Data Science",
    description:
      "Bridging the gap between raw data and business value, Mr. Aman teaches students how to wrangle messy datasets, apply sophisticated statistical models, and communicate findings clearly to stakeholders. His mentorship covers the entire data lifecycle—from ingestion and cleaning to predictive modeling and interactive visualization—equipping students with the analytical rigor needed in today's data-driven economy. He focuses on cultivating a 'data mindset', where intuition is backed by evidence and hypotheses are rigorously tested. Students leave his class not just as analysts, but as storytellers who can drive strategic business decisions through the power of data.",
    shortDescription:
      "Mr. Aman covers the full data lifecycle: cleaning, modeling, and visualization. He builds a data-driven mindset so students can communicate insights clearly and drive real business decisions with evidence.",
    image: aman,
  },
  {
    name: "Mr. Dishant",
    title: "Web Development (MERN Stack)",
    description:
      "Mr. Dishant focuses on the foundational strength and modern capabilities of web development, ensuring students build sites that are not only functional but also delightful to use. He helps students master the art of creating responsive, accessible, and interactive user interfaces that perform flawlessly across all devices and screen sizes. His sessions involve live coding challenges that simulate agile sprints, teaching students how to collaborate, code review, and iterate effectively under pressure. By instilling industry-standard workflows and a passion for polished UI/UX, he prepares graduates to contribute immediately to top-tier product teams.",
    shortDescription:
      "Mr. Dishant trains students to build responsive, accessible interfaces and collaborate through agile-style coding sprints. His focus on UI/UX and workflows prepares learners to contribute quickly in product teams.",
    image: dishantSir,
  },
  {
    name: "Mr. Eakum",
    title: "Generative AI Engineer",
    description:
      "At the frontier of the AI revolution, Mr. Eakumpreet explores the capabilities of Large Language Models and creative synthesis, opening up new possibilities for automation and creativity. He mentors students on fine-tuning models, mastering advanced prompt engineering, and integrating AI services to generate code, media, and text. His course completely redefines modern productivity workflows, showing how AI can act as a force multiplier for individual capability. Students experiment with the latest tools and APIs, learning to build applications that can reason, create, and interact in ways that were impossible just a few years ago.",
    shortDescription:
      "Mr. Eakumpreet teaches LLMs, prompt engineering, and AI integrations for code, media, and text generation. Students build real AI-driven apps and learn workflows that amplify productivity and creativity.",
    image: eakum,
  },
];

const OurMentors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [isCompact, setIsCompact] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const timeoutRef2 = useRef(null);

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (timeoutRef2.current) clearTimeout(timeoutRef2.current);
  };

  const animateToIndex = (nextIndex) => {
    if (nextIndex === currentIndex) return;
    setPhase("out");
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(nextIndex);
      setPhase("in");
      timeoutRef2.current = setTimeout(() => {
        setPhase("idle");
      }, 300);
    }, 300);
  };

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % mentors.length;
      animateToIndex(nextIndex);
    }, 4000);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 1400);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    startAutoScroll();
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimers();
    };
  }, [currentIndex]);

  const handleDotClick = (index) => {
    clearTimers();
    animateToIndex(index);
    startAutoScroll();
  };

  const currentMentor = mentors[currentIndex];
  const mentorDescription = isCompact
    ? currentMentor.shortDescription
    : currentMentor.description;

  return (
    <div className={styles.mentorsMainContainer}>
      <div className={styles.mentorsHeader}>
        <h2>
          Our Experts <span>Mentors</span>
        </h2>
        <p>Learn from professionals with real industry experience.</p>
      </div>
      <div className={styles.mentorsContainer}>
        <div className={styles.mentorCard}>
          <div className={styles.mentorImageWrapper}>
            <div className={styles.mentorOrb}>
              <Orb
                hoverIntensity={2}
                rotateOnHover
                hue={0}
                forceHoverState={false}
                backgroundColor="#000000"
              />
            </div>
            <div
              className={`${styles.mentorImage} ${
                phase === "out"
                  ? styles.imageOut
                  : phase === "in"
                    ? styles.imageIn
                    : ""
              }`}
            >
              <img
                className={styles.mentorPhoto}
                src={currentMentor.image}
                alt={currentMentor.name}
              />
            </div>
          </div>
          <div
            className={`${styles.mentorInfo} ${
              phase === "out"
                ? styles.textOut
                : phase === "in"
                  ? styles.textIn
                  : ""
            }`}
          >
            <h3>{currentMentor.name}</h3>
            <p>— {currentMentor.title}</p>
            <p>{mentorDescription}</p>
          </div>
        </div>
        <div className={styles.dots}>
          {mentors.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ""}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Show mentor ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurMentors;
