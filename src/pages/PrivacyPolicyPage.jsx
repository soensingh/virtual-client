import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import styles from "./LegalPages.module.css";

const PrivacyPolicyPage = () => {
  return (
    <div id="landing-scroll" className={styles.scrollShell}>
      <Navbar activeSection="" />
      <main className={styles.page}>
        <article className={styles.container}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.updatedOn}>Last Updated: February 16, 2026</p>

        <section className={styles.section}>
          <h2>1. Information We Collect</h2>
          <p>
            TechCadd Virtual Academy collects the information you provide through forms,
            including your name, phone number, email address, selected course interest,
            and professional status.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To contact you regarding demo classes, course counseling, and enrollment.</li>
            <li>To respond to your questions and support requests.</li>
            <li>To improve our courses, services, and communication quality.</li>
            <li>To send relevant updates about offers, batches, and training schedules.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Data Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information. Data may be shared only with trusted
            service providers or internal teams strictly for admission, counseling,
            communication, and operational support.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Data Security</h2>
          <p>
            We apply reasonable administrative and technical safeguards to protect your data.
            While no platform can guarantee absolute security, we continuously work to keep
            your information safe from unauthorized access.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Cookies and Analytics</h2>
          <p>
            Our website may use cookies and analytics tools to understand traffic patterns,
            improve user experience, and maintain website performance.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Your Rights</h2>
          <p>
            You may request correction, update, or deletion of your personal data by contacting
            us. We will process your request as per applicable law and operational feasibility.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Contact</h2>
          <p>
            For privacy-related concerns, write to <strong>info@techcadd.com</strong> or call
            <strong> 9888122255</strong>.
          </p>
        </section>

          <Link to="/" className={styles.homeLink}>Back to Home</Link>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;