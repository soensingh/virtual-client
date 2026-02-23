import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Quote from "../components/Quote.jsx";
import SectionSeven from "../components/SectionSeven.jsx";
import SectionContact from "../components/SectionContact.jsx";
import OurMentors from "../components/OurMentors.jsx";
import SectionOne from "../components/SectionOne.jsx";
import styles from "./LandingPage.module.css";
import SectionTwo from "../components/SectionTwo.jsx";
import SectionThree from "../components/SectionThree.jsx";
import SectionBootcamp from "../components/SectionBootcamp.jsx";
import Footer from "../components/Footer.jsx";
import Reviews from "../components/Reviews.jsx";
import DemoClassModal from "../components/DemoClassModal.jsx";

const LazySection = ({ id, className, children, rootRef, keepMounted = false, initialRender = false }) => {
  const sectionRef = useRef(null);
  const [isRendered, setIsRendered] = useState(Boolean(initialRender || keepMounted));

  useEffect(() => {
    if (isRendered || keepMounted) {
      return;
    }

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRendered(true);
          observer.disconnect();
        }
      },
      {
        root: rootRef?.current || null,
        rootMargin: "650px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [isRendered, keepMounted, rootRef]);

  return (
    <section ref={sectionRef} id={id} className={className}>
      {(isRendered || keepMounted) ? children : null}
    </section>
  );
};

const LandingPage = () => {
  const LANDING_SCROLL_KEY = "landingScrollTop";
  const LANDING_SECTION_KEY = "landingSectionId";
  const LANDING_RETURN_SECTION_KEY = "landingReturnSection";
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isWideScreen, setIsWideScreen] = useState(true);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (!isDemoModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isDemoModalOpen]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const savedReturnSection = sessionStorage.getItem(LANDING_RETURN_SECTION_KEY);
    const savedSectionId = sessionStorage.getItem(LANDING_SECTION_KEY);
    const savedScrollTop = sessionStorage.getItem(LANDING_SCROLL_KEY);
    const targetSectionId = savedReturnSection || savedSectionId;

    let attempts = 0;
    const maxAttempts = 12;

    const restorePosition = () => {
      const previousBehavior = container.style.scrollBehavior;
      container.style.scrollBehavior = "auto";

      let restoredBySection = false;
      if (targetSectionId) {
        const sectionElement = container.querySelector(`#${targetSectionId}`);
        if (sectionElement) {
          container.scrollTop = sectionElement.offsetTop;
          restoredBySection = true;
        }
      }

      if (!restoredBySection && savedScrollTop !== null) {
        const parsedScrollTop = Number(savedScrollTop);
        if (!Number.isNaN(parsedScrollTop)) {
          container.scrollTop = parsedScrollTop;
        }
      }

      container.style.scrollBehavior = previousBehavior;

      attempts += 1;
      const currentTop = container.scrollTop;
      const shouldRetry = attempts < maxAttempts && targetSectionId && currentTop <= 2;

      if (shouldRetry) {
        setTimeout(restorePosition, 60);
        return;
      }

      sessionStorage.removeItem(LANDING_SCROLL_KEY);
      sessionStorage.removeItem(LANDING_SECTION_KEY);
      sessionStorage.removeItem(LANDING_RETURN_SECTION_KEY);
    };

    requestAnimationFrame(restorePosition);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScrollPersist = () => {
      sessionStorage.setItem(LANDING_SCROLL_KEY, String(container.scrollTop));
    };

    container.addEventListener("scroll", handleScrollPersist, { passive: true });
    return () => container.removeEventListener("scroll", handleScrollPersist);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(LANDING_SECTION_KEY, activeSection);
  }, [activeSection]);

  // Wheel handling for smooth section transitions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Allow internal scrolling of elements (like the contact form)
      let target = e.target;
      while (target && target !== container) {
        if (target.scrollHeight > target.clientHeight) {
          const style = window.getComputedStyle(target);
          if (['auto', 'scroll'].includes(style.overflowY)) {
            // If scrolling down and not at bottom, or up and not at top
            if ((e.deltaY > 0 && Math.abs(target.scrollHeight - target.clientHeight - target.scrollTop) > 1) ||
                (e.deltaY < 0 && target.scrollTop > 0)) {
              return; // Let default scroll happen
            }
          }
        }
        target = target.parentElement;
      }

      e.preventDefault();

      if (isScrollingRef.current) return;
      if (Math.abs(e.deltaY) < 20) return; // Ignore tiny movements

      // Select only direct children sections to avoid nested sections breaking logic
      const sections = Array.from(container.children || []).filter(child => child && child.tagName === 'SECTION');
      const viewHeight = window.innerHeight;
      
      // Find current section index based on scroll position
      let currentIndex = sections.findIndex(section => {
        const rect = section.getBoundingClientRect();
        return Math.abs(rect.top) < viewHeight / 2;
      });

      if (currentIndex === -1) currentIndex = 0;

      let nextIndex = currentIndex;
      if (e.deltaY > 0) {
        nextIndex = Math.min(currentIndex + 1, sections.length - 1);
      } else {
        nextIndex = Math.max(currentIndex - 1, 0);
      }

      if (nextIndex !== currentIndex) {
        isScrollingRef.current = true;
        sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
        
        // Lock scroll briefly to allow animation
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 950);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll("section[id]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: container,
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="landing-scroll"
      ref={containerRef}
      className={styles.landingPageMainContainer}
    >
      <Navbar activeSection={activeSection} />
      <section id="home" className={styles.snapSection}>
        <SectionOne onOpenDemoModal={() => setIsDemoModalOpen(true)} />
      </section>
      <LazySection
        id="about"
        className={styles.snapSection}
        rootRef={containerRef}
      >
        <SectionTwo />
      </LazySection>
      <LazySection
        id="why-techcadd"
        className={styles.snapSection}
        rootRef={containerRef}
      >
        <SectionThree />
      </LazySection>
      <LazySection
        id="bootcamp"
        className={styles.snapSection}
        rootRef={containerRef}
      >
        <SectionBootcamp />
      </LazySection>
      <LazySection
        id="courses"
        className={styles.snapSection}
        rootRef={containerRef}
      >
        <SectionSeven />
      </LazySection>
      <LazySection
        id="placements"
        className={styles.snapSection}
        rootRef={containerRef}
      >
        <OurMentors />
      </LazySection>
      <LazySection
        id="reviews"
        className={styles.snapSection}
        rootRef={containerRef}
      >
        <Reviews />
      </LazySection>
      {isWideScreen && (
        <LazySection
          id="quote"
          className={styles.snapSection}
          rootRef={containerRef}
        >
          <Quote />
        </LazySection>
      )}
      <LazySection
        id="contact"
        className={styles.snapSection}
        rootRef={containerRef}
        keepMounted
      >
        <SectionContact />
      </LazySection>

      <LazySection
        id="footer"
        className={styles.snapFooter}
        rootRef={containerRef}
        keepMounted
      >
        <Footer />
      </LazySection>

      <DemoClassModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
