import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import styles from "./DemoClassModal.module.css";

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
};

const DemoClassModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [experience, setExperience] = useState("student");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const closeTimerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setFormData(INITIAL_FORM);
      setExperience("student");
      setIsSubmitted(false);
      setSubmitError("");
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleChange = (event) => {
    if (submitError) {
      setSubmitError("");
    }

    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitted) {
      return;
    }

    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName || !trimmedPhone || !trimmedEmail) {
      setSubmitError("Please fill in all mandatory fields.");
      return;
    }

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const payload = {
      experience,
      topic: "3 Days Demo Classes",
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
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
      setSubmitError("");

      closeTimerRef.current = setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      setSubmitError("Submission failed. Please try again.");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div className={styles.modal} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Book 3 Days Demo Classes">
        <h2 className={`${styles.title} ${isSubmitted ? styles.submittedHeading : ""}`}>3 Days Demo Classes</h2>
        <p className={`${styles.subText} ${isSubmitted ? styles.submittedHeading : ""}`}>Fill the form and our team will contact you.</p>

        <form className={`${styles.form} ${isSubmitted ? styles.submittedForm : ""}`} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              className={styles.textInput}
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitted}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              className={styles.textInput}
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitted}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              className={styles.textInput}
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitted}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>You are</label>
            <div className={styles.experienceSwitch}>
              <button
                type="button"
                className={`${styles.experienceOption} ${experience === "student" ? styles.experienceOptionActive : ""}`}
                onClick={() => setExperience("student")}
                disabled={isSubmitted}
              >
                Student
              </button>
              <button
                type="button"
                className={`${styles.experienceOption} ${experience === "working-professional" ? styles.experienceOptionActive : ""}`}
                onClick={() => setExperience("working-professional")}
                disabled={isSubmitted}
              >
                Working Professional
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitButton} disabled={isSubmitted}>
            Submit
          </button>

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
            <p className={styles.submitSuccessNote}>
              <FaCheckCircle className={styles.submitSuccessNoteIcon} />
              Our team will contact you shortly
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoClassModal;