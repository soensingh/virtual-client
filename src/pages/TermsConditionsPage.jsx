import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import styles from "./LegalPages.module.css";

const TermsConditionsPage = () => {
  return (
    <div id="landing-scroll" className={styles.scrollShell}>
      <Navbar activeSection="" />
      <main className={styles.page}>
        <article className={styles.container}>
          <h1 className={styles.title}>Terms &amp; Conditions</h1>
          <p className={styles.updatedOn}>Last Updated: February 16, 2026</p>

        <section className={styles.section}>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using TechCadd Virtual Academy services, you agree to these
            Terms &amp; Conditions. If you do not agree, please discontinue use of the website
            and services.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Services</h2>
          <p>
            We provide training programs, bootcamps, counseling sessions, and demo classes.
            Course structure, batch timing, syllabus, and trainer allocation may be updated
            for quality and operational requirements.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. User Responsibilities</h2>
          <ul>
            <li>Provide accurate and complete details while filling forms.</li>
            <li>Use website and learning resources lawfully and responsibly.</li>
            <li>Do not misuse, copy, or distribute proprietary content without permission.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Payments and Enrollment</h2>
          <p>
            Enrollment is confirmed only after fee payment and admission verification.
            Promotional offers are subject to validity period and may change without prior notice.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Intellectual Property</h2>
          <p>
            All course material, design assets, videos, and website content are owned by
            TechCadd or licensed partners. Unauthorized use, reproduction, or redistribution
            is prohibited.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Limitation of Liability</h2>
          <p>
            We strive for uninterrupted service but do not guarantee error-free availability.
            TechCadd Virtual Academy is not liable for indirect losses arising from temporary
            downtime, third-party failures, or user-side technical issues.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Changes to Terms</h2>
          <p>
            We may revise these terms at any time. Continued use of services after updates
            indicates acceptance of the revised terms.
          </p>
        </section>

          <Link to="/" className={styles.homeLink}>Back to Home</Link>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditionsPage;