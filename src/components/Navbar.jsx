import React, { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'
import mainLogo from '../assets/images/mainLogo.png'
import afterLogo from '../assets/images/afterLogo.png'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Navbar = ({ activeSection }) => {
  const navRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLogoScrolled, setIsLogoScrolled] = useState(false)

  const handleLogoClick = () => {
    const container = document.getElementById('landing-scroll')
    const homeSection = document.getElementById('home')

    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    setIsMenuOpen(false)
  }

  const handleEnquireClick = () => {
    const container = document.getElementById('landing-scroll')
    const target = document.getElementById('contact')
    if (!target) return

    if (container) {
      const top = target.offsetTop
      container.scrollTo({ top, behavior: 'smooth' })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSearchClick = () => {
    const targetSection = document.getElementById('courses');
    const container = document.getElementById('landing-scroll');

    if (targetSection) {
      if (container) {
        const top = targetSection.offsetTop;
        container.scrollTo({ top, behavior: 'smooth' });
      } else {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Poll for the input to appear (since it might be lazy loaded)
      const checkFocus = setInterval(() => {
        const searchInput = document.getElementById('course-search-input');
        if (searchInput) {
          searchInput.focus({ preventScroll: true }); // Prevent jumping if already scrolled
          clearInterval(checkFocus);
        }
      }, 100);

      // Stop checking after 3 seconds
      setTimeout(() => clearInterval(checkFocus), 3000);
    }
  };

  useEffect(() => {
    const scrollContainer = document.getElementById('landing-scroll')
    const ctx = gsap.context(() => {
      if (!navRef.current) return
      if (!scrollContainer) return

      // Invisible border avoids a layout jump when the stroke fades in
      gsap.set(navRef.current, { borderBottom: '1px solid rgba(255, 255, 255, 0)' })

      // Scrub keeps the blur tied to scroll position; scrub value smooths rapid wheel flicks
      gsap.to(navRef.current, {
        backgroundColor: 'rgba(14, 3, 23, 0.6)',
        backdropFilter: 'blur(12px)',
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          scroller: scrollContainer,
          start: 0,
          end: 220,
          scrub: 0.35,
        },
      })
    }, navRef)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const scrollContainer = document.getElementById('landing-scroll')
    if (!scrollContainer) return

    const ENTER_THRESHOLD = 90
    const EXIT_THRESHOLD = 50

    const handleScroll = () => {
      const y = scrollContainer.scrollTop

      setIsLogoScrolled((prev) => {
        if (!prev && y >= ENTER_THRESHOLD) return true
        if (prev && y <= EXIT_THRESHOLD) return false
        return prev
      })
    }

    handleScroll()
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={navRef} className={styles.navbarMainContainer} data-navbar>
      <div
        className={`${styles.menuBackdrop} ${isMenuOpen ? styles.menuBackdropOpen : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />
      <button
        type="button"
        className={`${styles.navbarLogoContainer} ${isLogoScrolled ? styles.logoScrolled : ''}`}
        onClick={handleLogoClick}
        aria-label="Go to top"
      >
        <img
          src={mainLogo}
          alt="Techcadd"
          className={`${styles.logoImage} ${styles.mainLogoImage} ${!isLogoScrolled ? styles.logoVisible : styles.logoHidden}`}
        />
        <img
          src={afterLogo}
          alt="Techcadd"
          className={`${styles.logoImage} ${styles.afterLogoImage} ${isLogoScrolled ? styles.logoVisible : styles.logoHidden}`}
        />
      </button>
      <div
        className={`${styles.navbarMenuContainer} ${isMenuOpen ? styles.navbarMenuOpen : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <a
          href="#about"
          className={`${styles.poppinsRegular} ${activeSection === 'about' ? styles.navActive : ''}`}
          data-nav-item
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </a>
        <a
          href="#why-techcadd"
          className={`${styles.poppinsRegular} ${activeSection === 'why-techcadd' ? styles.navActive : ''}`}
          data-nav-item
          onClick={() => setIsMenuOpen(false)}
        >
          Why Techcadd
        </a>
        <a
          href="#bootcamp"
          className={`${styles.poppinsRegular} ${activeSection === 'bootcamp' ? styles.navActive : ''}`}
          data-nav-item
          onClick={() => setIsMenuOpen(false)}
        >
          Bootcamp
        </a>
        <a
          href="#courses"
          className={`${styles.poppinsRegular} ${activeSection === 'courses' ? styles.navActive : ''}`}
          data-nav-item
          onClick={() => setIsMenuOpen(false)}
        >
          Courses
        </a>
        <a
          href="#placements"
          className={`${styles.poppinsRegular} ${activeSection === 'placements' ? styles.navActive : ''}`}
          data-nav-item
          onClick={() => setIsMenuOpen(false)}
        >
          Mentors
        </a>
        <a
          href="#reviews"
          className={`${styles.poppinsRegular} ${activeSection === 'reviews' ? styles.navActive : ''}`}
          data-nav-item
          onClick={() => setIsMenuOpen(false)}
        >
          Reviews
        </a>
        <a
          href="#contact"
          className={`${styles.poppinsRegular} ${activeSection === 'contact' ? styles.navActive : ''}`}
          data-nav-item
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </a>
      </div>
      <div className={styles.navbarActions}>
        <div className={styles.navbarEnquireContainer}>
        <button className={styles.openSans} type="button" onClick={handleEnquireClick}>Enquire</button>
        </div>
        <div className={styles.navbarSearchContainer} onClick={handleSearchClick} style={{ cursor: 'pointer' }}>
          <svg width="28px" height="28px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
              <defs>
                <style>{".cls-1{fill:none;stroke:#ffffff;stroke-miterlimit:10;stroke-width:1.91px;}"}</style>
              </defs>
              <circle className="cls-1" cx="9.14" cy="9.14" r="7.64" />
              <line className="cls-1" x1="22.5" y1="22.5" x2="14.39" y2="14.39" />
            </g>
          </svg>
        </div>
        <button
          type="button"
          className={styles.menuToggle}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>
  )
}

export default Navbar