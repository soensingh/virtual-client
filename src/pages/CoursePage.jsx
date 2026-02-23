import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./CoursePage.module.css";
import courseImg1 from "../assets/images/course_img/virtual 1.png";
import courseImg2 from "../assets/images/course_img/virtual 2.png";
import courseImg3 from "../assets/images/course_img/virtual 3.png";
import courseImg4 from "../assets/images/course_img/virtual 4.png";
import courseImg5 from "../assets/images/course_img/virtual 5.png";
import courseImg6 from "../assets/images/course_img/virtual 6.png";
import courseImg7 from "../assets/images/course_img/virtual 7.png";
import courseImg8 from "../assets/images/course_img/virtual 8.png";
import courseImg9 from "../assets/images/course_img/virtual 9.png";
import courseImg10 from "../assets/images/course_img/virtual 10.jpeg";

const courseImageById = {
  1: courseImg1,
  2: courseImg2,
  3: courseImg3,
  4: courseImg4,
  5: courseImg5,
  6: courseImg6,
  7: courseImg7,
  8: courseImg8,
  9: courseImg9,
  10: courseImg10,
};

const CoursePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;
  const syllabus = location.state?.syllabus;
  const [activeTab, setActiveTab] = useState('overview');
  const [experience, setExperience] = useState("student");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!course) {
    return (
      <div className={styles.errorContainer}>
        <h2>Course not found</h2>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          Go Back Home
        </button>
      </div>
    );
  }

  const getCoursePrice = (courseId) => {
    if (courseId === 10) {
      return { old: "12,000", current: "6,500" };
    }
    return { old: "12,000", current: "9,500" };
  };

  const price = getCoursePrice(course.id);

  const syllabusWeeks = useMemo(() => {
    if (!syllabus || typeof syllabus !== "string") {
      return [];
    }

    const normalized = syllabus.replace(/\r/g, "").trim();
    if (!normalized) {
      return [];
    }

    const chunks = normalized
      .split(/\n(?=Week\s+\d+(?:-\d+)?\s*:)/g)
      .map((chunk) => chunk.trim())
      .filter(Boolean);

    const parsed = chunks
      .map((chunk) => {
        const lines = chunk.split("\n");
        const title = (lines[0] || "").trim();
        const content = lines.slice(1).join("\n").trim();
        return { title, content };
      })
      .filter((week) => /^Week\s+\d+/i.test(week.title));

    if (parsed.length > 0) {
      return parsed;
    }

    const phaseChunks = normalized
      .split(/\n(?=Phase\s+\d+\s*:)/gi)
      .map((chunk) => chunk.trim())
      .filter(Boolean);

    let intro = "";
    if (phaseChunks.length > 0 && !/^Phase\s+\d+\s*:/i.test(phaseChunks[0])) {
      intro = phaseChunks.shift() || "";
    }

    const parsedPhases = phaseChunks
      .map((chunk) => {
        const lines = chunk.split("\n");
        const title = (lines[0] || "").trim();
        const content = lines.slice(1).join("\n").trim();
        return { title, content };
      })
      .filter((phase) => /^Phase\s+\d+\s*:/i.test(phase.title));

    if (parsedPhases.length > 0) {
      if (intro) {
        parsedPhases[0] = {
          ...parsedPhases[0],
          content: `${intro}\n\n${parsedPhases[0].content}`.trim()
        };
      }

      return parsedPhases;
    }

    return [];
  }, [syllabus]);

  useEffect(() => {
    setExpandedWeek(0);
  }, [course?.id, syllabus]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitted) {
      return;
    }

    if (!experience) {
      alert("Please select your experience.");
      return;
    }

    const payload = {
      experience: experience || "",
      topic: course.title,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/api/form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSubmitted(true);
    } catch (error) {
      alert("Submission failed. Please try again.");
    }
  };

  const handleScrollToForm = (event) => {
    event.preventDefault();
    const formElement = document.getElementById("contactForm");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <h1 className={styles.pageTitle}>{course.title}</h1>
        <p className={styles.breadcrumb}>Home &gt; Courses &gt; {course.title}</p>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <div className={styles.courseImageWrapper}>
            <img src={course.image || courseImageById[course.id]} alt={course.title} className={styles.courseImage} />
          </div>

          {/* Pricing */}
          <div className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>Course Pricing</h2>
            <div className={styles.pricingCard}>
              <div className={styles.pricingHeader}>
                <h3>Complete Course Package</h3>
                <p>Get access to all materials and lifetime support</p>
              </div>
              <div className={styles.pricingDetails}>
                <span className={styles.oldPrice}>₹{price.old}</span>
                <span className={styles.currentPrice}>₹{price.current}</span>
                <span className={styles.discount}>Save ₹{parseInt(price.old.replace(',', '')) - parseInt(price.current.replace(',', ''))}</span>
              </div>
              <a href="#contactForm" className={styles.enrollButton} onClick={handleScrollToForm}>
                Enroll Now
              </a>
            </div>
          </div>

          {/* Course Overview */}
          <div className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>Course Details</h2>
            <p className={styles.description}>
              This comprehensive course is designed to equip learners with in-demand skills
              and practical knowledge. Perfect for working professionals, students, and anyone
              looking to advance their career in {course.title}.
            </p>

            <h3 className={styles.subSectionTitle}>Course Highlights</h3>
            <ul className={styles.highlightsList}>
              {course.meta.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
              <li>Live interactive sessions with industry experts</li>
              <li>Hands-on projects and real-world case studies</li>
              <li>Lifetime access to course materials</li>
              <li>Certificate of completion</li>
              <li>Career support and placement assistance</li>
            </ul>
          </div>

          {/* Complete Curriculum */}
          <div className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>Complete Curriculum</h2>
            {syllabusWeeks.length > 0 ? (
              <div className={styles.syllabusAccordion}>
                {syllabusWeeks.map((week, index) => {
                  const isOpen = expandedWeek === index;

                  return (
                    <div key={week.title} className={styles.weekItem}>
                      <button
                        type="button"
                        className={styles.weekTrigger}
                        onClick={() => setExpandedWeek(index)}
                        aria-expanded={isOpen}
                      >
                        <span className={styles.weekTitle}>{week.title}</span>
                        <span className={`${styles.weekChevron} ${isOpen ? styles.weekChevronOpen : ""}`}>
                          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className={`${styles.weekPanel} ${isOpen ? styles.weekPanelOpen : ""}`}>
                        <div className={styles.weekContentWrap}>
                          <pre className={styles.weekContentText}>{week.content}</pre>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <pre className={styles.syllabusText}>{syllabus || 'Curriculum coming soon...'}</pre>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={styles.rightSidebar}>
          {/* Need Help Card */}
          <div className={styles.helpCard}>
            <div className={styles.helpIcon}>📞</div>
            <h3 className={styles.helpTitle}>Need Help? Call Here</h3>
            <a href="tel:+919888122255" className={styles.phoneNumber}>+91 98881 22255</a>
            <a href="#contactForm" className={styles.chatButton}>Get A Quote</a>
          </div>

          {/* Contact Form */}
          <div className={styles.contactFormCard} id="contactForm">
            <h3 className={`${styles.cardTitle} ${isSubmitted ? styles.submittedHeading : ""}`}>Enrollment Form</h3>
            <form
              className={`${styles.contactForm} ${isSubmitted ? styles.submittedForm : ""}`}
              onSubmit={handleSubmit}
            >

              {/* Topic - Locked to current course */}
              <div className={styles.formGroup}>
                <label className={styles.groupLabel}>Topic of interest</label>
                <input
                  type="text"
                  value={course.title}
                  className={styles.lockedInput}
                  disabled
                />
              </div>

              {/* Name Input */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.textInput}
                  disabled={isSubmitted}
                  required
                />
              </div>

              {/* Phone Input */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.textInput}
                  disabled={isSubmitted}
                  required
                />
              </div>

              {/* Email Input */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.textInput}
                  disabled={isSubmitted}
                  required
                />
              </div>

              {/* Experience Toggle */}
              <div className={styles.formGroup}>
                <label className={styles.groupLabel}>Experience</label>
                <div className={styles.experienceToggle} role="group" aria-label="Experience">
                  <button
                    type="button"
                    className={`${styles.experienceOption} ${experience === "student" ? styles.experienceOptionActive : ""}`}
                    aria-pressed={experience === "student"}
                    onClick={() => setExperience("student")}
                    disabled={isSubmitted}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    className={`${styles.experienceOption} ${experience === "working-professional" ? styles.experienceOptionActive : ""}`}
                    aria-pressed={experience === "working-professional"}
                    onClick={() => setExperience("working-professional")}
                    disabled={isSubmitted}
                  >
                    Working Professional
                  </button>
                </div>
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitted}>
                Enroll in this course
              </button>
              <p className={styles.disclaimer}>
                By proceeding you agree to our Terms & Privacy Policy
              </p>
            </form>

            {isSubmitted && (
              <div className={styles.submitSuccessOverlay} aria-live="polite">
                <FaCheckCircle className={styles.submitSuccessIcon} />
              </div>
            )}

            {isSubmitted && (
              <div className={styles.submitSuccessNote} aria-live="polite">
                <FaCheckCircle className={styles.submitSuccessNoteIcon} />
                <span>Our team will contact you shortly</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
