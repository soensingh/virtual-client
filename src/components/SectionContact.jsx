import React, { useEffect, useRef, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import styles from "./SectionContact.module.css";

const SectionContact = () => {
  const [experience, setExperience] = useState("student");
  const [interest, setInterest] = useState("");
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const topicDropdownRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const topicGroups = [
    {
      label: "2-Month Courses",
      options: [
        "Web Development (MERN Stack)",
        "Data Science + Tools (Tableau, Power BI)",
        "Cloud Computing + AWS",
        "Cyber Security",
        "Digital Marketing",
        "Programming Languages (C/C++, Python, Java) + DSA",
        "SQL & Database Design Fundamentals",
        "Networking Fundamentals",
        "Artificial Intelligence",
        "Python Programming Masterclass",
      ],
    },
    {
      label: "9-Day Bootcamps",
      options: [
        "CYBER-SMART - Master Digital Safety",
        "DECODE E-INDIA - 9 Digital Systems",
        "CREATOR'S LAB - Photoshop & Design",
        "THE SKILLS 2026 - Professional Skills",
        "AI THAT UNDERSTANDS - Generative AI",
      ],
    },
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!topicDropdownRef.current) return;
      if (!topicDropdownRef.current.contains(event.target)) {
        setIsTopicOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const handleChange = (e) => {
    if (submitError) {
      setSubmitError("");
    }

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

    setSubmitError("");

    if (!experience) {
      setSubmitError("Please select your experience.");
      return;
    }

    if (!interest) {
      setSubmitError("Please select a topic of interest.");
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setSubmitError("Please fill in all mandatory fields.");
      return;
    }

    const payload = {
      experience: experience || "",
      topic: interest || "",
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

      setIsTopicOpen(false);
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError("Submission failed. Please try again.");
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactCard}>
        {/* Left Side */}
        <div className={styles.leftSide}>
          <p className={styles.smallText}>Restricted by opportunities?</p>
          <h1 className={styles.mainHeading}>
            From Skills to Salary — Faster
          </h1>

          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <FaCheckCircle className={styles.checkIcon} />
              <p>
                <span className={styles.featureStat}>128%</span> average hike via our placement cell
              </p>
            </div>
            <div className={styles.featureItem}>
              <FaCheckCircle className={styles.checkIcon} />
              <p>
                <span className={styles.featureStat}>1.5 Lac+</span> learners cracked top tech companies
              </p>
            </div>
            <div className={styles.featureItem}>
              <FaCheckCircle className={styles.checkIcon} />
              <p>
                <span className={styles.featureStat}>1,400+</span> unicorn startups
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className={styles.rightSide}>
          <h3 className={`${styles.formTitle} ${isSubmitted ? styles.submittedHeading : ""}`}>
            Let's find the right course for you
          </h3>
          
          <form
            className={`${styles.contactForm} ${isSubmitted ? styles.submittedForm : ""}`}
            onSubmit={handleSubmit}
          >
            
            {/* Topic Dropdown */}
            <div className={styles.formGroup}>
              <label className={styles.groupLabel}>Select topic of interest</label>
              <div ref={topicDropdownRef} className={styles.dropdownRoot}>
                <button
                  type="button"
                  className={`${styles.selectTrigger} ${isTopicOpen ? styles.selectTriggerOpen : ""}`}
                  onClick={() => {
                    if (!isSubmitted) {
                      setIsTopicOpen((prev) => !prev);
                    }
                  }}
                  aria-expanded={isTopicOpen}
                  aria-label="Select topic of interest"
                  disabled={isSubmitted}
                >
                  <span>{interest || "Select your options/choices"}</span>
                  <span className={`${styles.selectArrow} ${isTopicOpen ? styles.selectArrowOpen : ""}`}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                <div className={`${styles.selectMenu} ${isTopicOpen ? styles.selectMenuOpen : ""}`}>
                  {topicGroups.map((group) => (
                    <div key={group.label} className={styles.selectGroup}>
                      <div className={styles.selectGroupLabel}>{group.label}</div>
                      {group.options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`${styles.selectOption} ${interest === option ? styles.selectOptionActive : ""}`}
                          onClick={() => {
                            if (submitError) {
                              setSubmitError("");
                            }
                            setInterest(option);
                            setIsTopicOpen(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inputs */}
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
              Find your course
            </button>
            <p className={styles.disclaimer}>
              By proceeding you agree to our Terms & Privacy Policy
            </p>

            {submitError && !isSubmitted && (
              <div className={styles.submitErrorNote} aria-live="polite">
                <FaExclamationCircle className={styles.submitErrorNoteIcon} />
                <span>{submitError}</span>
              </div>
            )}
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
    </section>
  )
}

export default SectionContact;