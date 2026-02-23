import React, { useEffect, useRef, useState } from "react";
import styles from "./ComboPack.module.css";

const courses = [
  {
    id: 1,
    title: "Full Stack Development",
    desc: "Become job-ready in 6 months with end-to-end web skills.",
    image: "https://picsum.photos/id/1011/400/500",
    duration: "24 Weeks",
    level: "Beginner → Advanced",
    mode: "Live + Projects",
    includes: ["HTML/CSS/JS", "React", "Node + Mongo", "Deployment"]
  },
  {
    id: 2,
    title: "React Mastery",
    desc: "Build modern UI and scalable frontends.",
    image: "https://picsum.photos/id/1015/400/500",
    duration: "10 Weeks",
    level: "Intermediate",
    mode: "Live + Labs",
    includes: ["Hooks", "State Mgmt", "Routing", "Performance"]
  },
  {
    id: 3,
    title: "Node & Backend",
    desc: "APIs, Auth, Databases, and scalable services.",
    image: "https://picsum.photos/id/1016/400/500",
    duration: "12 Weeks",
    level: "Intermediate",
    mode: "Live + Projects",
    includes: ["REST APIs", "Auth", "MongoDB", "Security"]
  },
  {
    id: 4,
    title: "UI/UX Design",
    desc: "Design beautiful, user-focused experiences.",
    image: "https://picsum.photos/id/1025/400/500",
    duration: "8 Weeks",
    level: "Beginner",
    mode: "Studio + Projects",
    includes: ["Figma", "Wireframes", "Prototypes", "Design Systems"]
  },
  {
    id: 5,
    title: "Data Structures",
    desc: "Crack interviews with strong DSA skills.",
    image: "https://picsum.photos/id/1035/400/500",
    duration: "10 Weeks",
    level: "Beginner → Intermediate",
    mode: "Live + Practice",
    includes: ["Arrays", "Trees", "Graphs", "DP"]
  },
  {
    id: 6,
    title: "MERN Projects",
    desc: "Real-world project experience for portfolio.",
    image: "https://picsum.photos/id/1045/400/500",
    duration: "6 Weeks",
    level: "Intermediate",
    mode: "Project Sprint",
    includes: ["2 Capstones", "API Integration", "Auth", "Deployment"]
  }
];

const ComboPack = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [leftEdgeId, setLeftEdgeId] = useState(null);

  const trackRef = useRef(null);
  const cardRefs = useRef({});

  // detect which card is near left edge
  useEffect(() => {
    const track = trackRef.current;
    const threshold = 40; // px from left edge

    const detectLeftCard = () => {
      const trackLeft = track.getBoundingClientRect().left;

      let closest = null;
      let minDiff = Infinity;

      courses.forEach(course => {
        const el = cardRefs.current[course.id];
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const diff = Math.abs(rect.left - trackLeft);

        if (diff < minDiff && diff <= threshold) {
          minDiff = diff;
          closest = course.id;
        }
      });

      setLeftEdgeId(closest);
    };

    track.addEventListener("scroll", detectLeftCard);
    window.addEventListener("resize", detectLeftCard);
    detectLeftCard();

    return () => {
      track.removeEventListener("scroll", detectLeftCard);
      window.removeEventListener("resize", detectLeftCard);
    };
  }, []);

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselTrack} ref={trackRef}>
        {courses.map(course => {
          const isHovered = hoveredId === course.id;
          const isLeftEdge = isHovered && leftEdgeId === course.id;

          return (
            <div
              key={course.id}
              ref={el => (cardRefs.current[course.id] = el)}
              className={`${styles.cardWrapper}
                ${isHovered ? styles.active : ""}
                ${isLeftEdge ? styles.leftEdgeActive : ""}`}
              onMouseEnter={() => setHoveredId(course.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* CONTENT PANEL */}
              {isHovered && (
                <div className={styles.contentPanel}>
                  <h3>{course.title}</h3>
                  <p className={styles.courseDesc}>{course.desc}</p>
                  <div className={styles.courseMeta}>
                    <span>{course.duration}</span>
                    <span>{course.level}</span>
                    <span>{course.mode}</span>
                  </div>
                  <ul className={styles.courseList}>
                    {course.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <button>Enroll Now</button>
                </div>
              )}

              {/* IMAGE CARD */}
              <div className={styles.imageCard}>
                <img src={course.image} alt={course.title} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComboPack;
