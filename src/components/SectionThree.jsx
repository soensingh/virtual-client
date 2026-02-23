import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import whyUs1 from "../assets/images/why-us1.jpg"
import whyUs2 from "../assets/images/why-us2.webp"
import whyUs3 from "../assets/images/why-us3.png"
import whyUs4 from "../assets/images/why-us4.webp"
import whyUs5 from "../assets/images/why-us5.jpg"
import whyUs6 from "../assets/images/why-us6.jpg"
import styles from "./SectionThree.module.css"

const SectionThree = () => {
  const bookItems = [
    {
      title: "Personalised 1-on-1 learning",
      description:
        "Live sessions designed around your pace, goals, and individual learning needs.",
      highlights: [
        "Tailored learning path",
        "Personal feedback",
        "Progress at your speed",
      ],
      meta: {
        mode: "1:1 learning",
        pace: "Your schedule",
        focus: "Personal guidance",
      },
      icon: styles.iconGreen,
      image: whyUs1,
    },
    {
      title: "24/7 live mentor support",
      description:
        "Learn anytime with continuous instructor access, including nights, weekends, and holidays.",
      highlights: [
        "Always-on guidance",
        "Fast doubt clearing",
        "Support when you need it",
      ],
      meta: {
        access: "24/7 access",
        support: "Live mentors",
        coverage: "Weekends included",
      },
      icon: styles.iconOrange,
      image: whyUs2,
    },
    {
      title: "3-day free trial classes",
      description:
        "Experience our teaching approach before enrolling — no pressure, no risk.",
      highlights: [
        "Try before you commit",
        "See the learning style",
        "Risk-free start",
      ],
      meta: {
        trial: "3 days",
        cost: "Free",
        confidence: "No risk",
      },
      icon: styles.iconPurple,
      image: whyUs3,
    },
    {
      title: "Industry-focused curriculum",
      description:
        "Learn in-demand skills across MERN Stack, AI/ML, Data Science, and Cyber Security.",
      highlights: [
        "Modern tech stacks",
        "Market-aligned skills",
        "Real hiring relevance",
      ],
      meta: {
        stacks: "MERN + AI/ML",
        scope: "Data + Security",
        focus: "In-demand",
      },
      icon: styles.iconGreen,
      image: whyUs4,
    },
    {
      title: "Proven TechCadd expertise",
      description:
        "Backed by years of successful offline training, now accessible online worldwide.",
      highlights: [
        "Years of outcomes",
        "Trusted training brand",
        "Global online access",
      ],
      meta: {
        legacy: "Proven track record",
        delivery: "Online + worldwide",
        trust: "TechCadd",
      },
      icon: styles.iconOrange,
      image: whyUs5,
    },
    {
      title: "Complete skill-building path",
      description:
        "From strong programming fundamentals to advanced Cloud and Generative AI.",
      highlights: [
        "Foundations to advanced",
        "Cloud + GenAI coverage",
        "Step-by-step growth",
      ],
      meta: {
        path: "Full-stack growth",
        depth: "Fundamentals → GenAI",
        outcome: "Job-ready",
      },
      icon: styles.iconPurple,
      image: whyUs6,
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isCompactView, setIsCompactView] = useState(false)
  const activeItem = bookItems[activeIndex]
  const mainRef = useRef(null)
  const mediaRef = useRef(null)
  const contentRef = useRef(null)
  const tabsRef = useRef([])
  const isAnimatingRef = useRef(false)

  const animateTabs = (indexToActivate) => {
    tabsRef.current.forEach((tab, index) => {
      if (!tab) return
      gsap.to(tab, {
        x: index === indexToActivate ? 16 : 0,
        duration: 0.25,
        ease: 'power2.out',
      })
    })
  }

  useLayoutEffect(() => {
    animateTabs(activeIndex)
  }, [activeIndex])

  useLayoutEffect(() => {
    if (!mediaRef.current || !contentRef.current) return

    gsap.killTweensOf([mediaRef.current, contentRef.current])
    gsap.fromTo(
      mediaRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    )
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => {
          isAnimatingRef.current = false
        },
      }
    )
  }, [activeIndex])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)')
    const handleChange = (event) => setIsCompactView(event.matches)
    handleChange(mediaQuery)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  useEffect(() => {
    if (!isCompactView) return
    const timer = setInterval(() => {
      handleTabClick((activeIndex + 1) % bookItems.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [activeIndex, isCompactView])

  const handleTabClick = (index) => {
    if (index === activeIndex || isAnimatingRef.current) return

    isAnimatingRef.current = true
    gsap.killTweensOf([mediaRef.current, contentRef.current])
    gsap.to([mediaRef.current, contentRef.current], {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(index)
      },
    })
  }

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.whyUsText}>WHY US</div>
      <div className={styles.sectionHeader}>
        <h2>
          Why <span>Choose TechCadd's </span>
          <br />
          <span className={styles.subtitleAccent}>Virtual Academy</span>
        </h2>
        <p>Learn In-Demand Skills With Expert Mentors And A Job-Focused Learning Approach.</p>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.bookStack}>
          <div ref={mainRef} className={styles.bookMain}>
            <div className={styles.bookBody}>
              <div ref={mediaRef} className={styles.bookMedia}>
                <img src={activeItem.image} alt={activeItem.title} />
              </div>
              <div ref={contentRef} className={styles.bookContent}>
                <div className={styles.bookTitle}>{activeItem.title}</div>
                <div className={styles.bookDescription}>{activeItem.description}</div>
                {Array.isArray(activeItem.highlights) && activeItem.highlights.length > 0 && (
                  <ul className={styles.bookHighlights}>
                    {activeItem.highlights.slice(0, 3).map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                )}
                {activeItem.meta && (
                  <div className={styles.bookMeta}>
                    {Object.entries(activeItem.meta).map(([key, value]) => (
                      <span key={key} className={styles.bookMetaPill}>
                        {value}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.bookTabs}>
            {bookItems.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={`${styles.bookTab} ${index === activeIndex ? styles.bookTabActive : ""}`}
                onClick={() => handleTabClick(index)}
                ref={(element) => {
                  tabsRef.current[index] = element
                }}
              >
                <span className={`${styles.tabIcon} ${item.icon}`} aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <path
                      d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className={styles.tabText}>{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionThree