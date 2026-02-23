import React, { useEffect, useRef, useState } from 'react'
import vid1 from '../assets/vids/vid1.mp4'
import vid2 from '../assets/vids/vid2.mp4'
import styles from "./SectionTwo.module.css"

const SectionTwo = () => {
  const sectionRef = useRef(null)
  const videoRefs = useRef([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 769)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const videos = videoRefs.current.filter(Boolean)
        if (entry.isIntersecting) {
          videos.forEach((video) => {
            const playPromise = video.play()
            if (playPromise && typeof playPromise.catch === 'function') {
              playPromise.catch(() => {})
            }
          })
        } else {
          videos.forEach((video) => video.pause())
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const content = {
    mission: {
      title: "Mission",
      text: isMobile 
        ? "Help college students build job-ready skills with personalized 1-on-1 training. 24/7 flexibility with a 3-day free workshop."
        : "Our mission is to help college students build job-ready skills alongside their studies through personalized 1-on-1, industry-focused learning. With 24/7 flexibility, hands-on training, and a 3-day free workshop, we ensure students graduate with confidence—not just a degree.",
    },
    vision: {
      title: "Vision",
      text: isMobile
        ? "Make online learning flexible and career-focused. Connect college education with real industry skills."
        : "Our vision is to make online learning flexible, personal, and career-focused for college students. We aim to connect college education with real industry skills and guide learners from classrooms to careers with confidence.",
    },
  }

  const descriptionText = isMobile
    ? "Virtual Academy by TechCadd — 1-on-1 online training for college students. Real industry skills with 24/7 flexibility."
    : "Virtual Academy by TechCadd — online learning for college students. Live, 1-on-1 training focused on real industry skills, built around your college schedule. With 24/7 flexibility and a 3-day free workshop, we help you become job-ready—not just degree-ready. Real skills. Real mentors. Real careers."

  return (
    <section ref={sectionRef} className={styles.aboutSection}>
      <h2 className={styles.aboutHeading} data-about-heading>
        <span>About</span> <span className={styles.us}>Us</span>
      </h2>

      <p className={styles.aboutDescription} data-about-desc>
        <span className={styles.bold}>Virtual Academy</span>{" "}
        <span className={styles.light}>by</span>{" "}
        <span className={styles.bold1}>TechCadd</span> — {isMobile ? "1-on-1 online training for college students. Real industry skills with 24/7 flexibility." : "online learning for college students. Live, 1-on-1 training focused on real industry skills, built around your college schedule. With 24/7 flexibility and a 3-day free workshop, we help you become job-ready—not just degree-ready. Real skills. Real mentors. Real careers."}
      </p>

      <div className={styles.aboutSplit}>
        <div className={styles.textPane}>
          <div className={styles.missionBlock} data-about-mission>
            <h3 className={styles.missionTitle}>{content.mission.title}</h3>
            <p className={styles.missionText}>{content.mission.text}</p>
          </div>
          <div className={styles.missionBlock} data-about-mission>
            <h3 className={styles.missionTitle}>{content.vision.title}</h3>
            <p className={styles.missionText}>{content.vision.text}</p>
          </div>
        </div>

        <div className={styles.videoPane} data-about-videos>
          <video
            ref={(el) => (videoRefs.current[0] = el)}
            className={styles.aboutVideo}
            src={vid1}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            data-about-video
          />
          <video
            ref={(el) => (videoRefs.current[1] = el)}
            className={`${styles.aboutVideo} ${styles.aboutVideoBottom}`}
            src={vid2}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            data-about-video
          />
        </div>
      </div>
    </section>
  )
}

export default SectionTwo