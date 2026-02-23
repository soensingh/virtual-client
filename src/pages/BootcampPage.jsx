import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import styles from './BootcampPage.module.css';
import bootcampImg1 from '../assets/images/bootcamp_img/bootcam1.jpg.jpeg';
import bootcampImg2 from '../assets/images/bootcamp_img/bootcam2.jpg.jpeg';
import bootcampImg3 from '../assets/images/bootcamp_img/bootcam3.jpg.jpeg';
import bootcampImg4 from '../assets/images/bootcamp_img/bootcam4.jpg.jpeg';
import bootcampImg5 from '../assets/images/bootcamp_img/bootcam5.jpg.jpeg';

const bootcampImageByTitle = {
  'CYBER-SMART': bootcampImg1,
  'DECODE E-INDIA': bootcampImg2,
  'CREATOR’S LAB': bootcampImg3,
  'THE SKILLS 2026': bootcampImg4,
  'AI THAT UNDERSTANDS': bootcampImg5,
};

export default function BootcampPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bootcamp, syllabus } = location.state || {};
  
  const [experience, setExperience] = useState("student");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedDay, setExpandedDay] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const syllabusDays = useMemo(() => {
    if (!syllabus || typeof syllabus !== "string") {
      return [];
    }

    const normalized = syllabus.replace(/\r/g, "").trim();
    if (!normalized) {
      return [];
    }

    const chunks = normalized
      .split(/\n(?=Day\s*\d+\s*[-:])/gi)
      .map((chunk) => chunk.trim())
      .filter(Boolean);

    return chunks
      .map((chunk) => {
        const lines = chunk.split("\n");
        const title = (lines[0] || "").trim();
        const content = lines.slice(1).join("\n").trim();
        return { title, content };
      })
      .filter((item) => /^Day\s*\d+\s*[-:]/i.test(item.title));
  }, [syllabus]);

  useEffect(() => {
    setExpandedDay(0);
  }, [bootcamp?.id, syllabus]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

    const payload = {
      experience: experience || "",
      topic: bootcamp.title,
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

  if (!bootcamp) {
    return (
      <div className={styles.errorContainer}>
        <h1>Bootcamp not found</h1>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <h1 className={styles.pageTitle}>{bootcamp.title}</h1>
        <p className={styles.breadcrumb}>Home &gt; Bootcamps &gt; {bootcamp.title}</p>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Bootcamp Image */}
          <div className={styles.courseImageWrapper}>
            <img
              src={bootcamp.image || bootcampImageByTitle[bootcamp.title]}
              alt={bootcamp.title}
              className={styles.courseImage}
            />
          </div>

          {/* Bootcamp Details */}
          <div className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>Bootcamp Details</h2>
            <p className={styles.description}>{bootcamp.subtitle}</p>
            
            <h3 className={styles.subSectionTitle}>What You'll Learn</h3>
            <ul className={styles.highlightsList}>
              <li>Intensive {bootcamp.duration} hands-on training program</li>
              <li>Industry-relevant skills and practical knowledge</li>
              <li>Real-world projects and case studies</li>
              <li>Expert mentorship and guidance</li>
              <li>Certificate of completion</li>
              <li>Career support and networking opportunities</li>
            </ul>
          </div>

          {/* Complete Curriculum */}
          <div className={styles.contentSection}>
            <h2 className={`${styles.sectionTitle} ${styles.roadmapTitle}`}>Complete Roadmap</h2>
            {syllabusDays.length > 0 ? (
              <div className={styles.syllabusAccordion}>
                {syllabusDays.map((day, index) => {
                  const isOpen = expandedDay === index;

                  return (
                    <div key={day.title} className={styles.dayItem}>
                      <button
                        type="button"
                        className={styles.dayTrigger}
                        onClick={() => setExpandedDay(index)}
                        aria-expanded={isOpen}
                      >
                        <span className={styles.dayTitle}>{day.title}</span>
                        <span className={`${styles.dayChevron} ${isOpen ? styles.dayChevronOpen : ""}`}>
                          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      <div className={`${styles.dayPanel} ${isOpen ? styles.dayPanelOpen : ""}`}>
                        <div className={styles.dayContentWrap}>
                          <pre className={styles.dayContentText}>{day.content}</pre>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className={styles.syllabusText}>{syllabus}</p>
            )}
          </div>

        </div>

        {/* Right Sidebar */}
        <div className={styles.rightSidebar}>
          {/* Contact Form Card */}
          <div className={styles.contactFormCard}>
            <h3 className={`${styles.cardTitle} ${isSubmitted ? styles.submittedHeading : ""}`}>Send a Message</h3>
            <form
              className={`${styles.contactForm} ${isSubmitted ? styles.submittedForm : ""}`}
              onSubmit={handleSubmit}
            >

              {/* Topic - Locked to current bootcamp */}
              <div className={styles.formGroup}>
                <label className={styles.groupLabel}>Topic of interest</label>
                <input
                  type="text"
                  value={bootcamp.title}
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
                Enroll in this bootcamp
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
}
