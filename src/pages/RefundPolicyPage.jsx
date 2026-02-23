import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import styles from "./LegalPages.module.css";

const RefundPolicyPage = () => {
  return (
    <div id="landing-scroll" className={styles.scrollShell}>
      <Navbar activeSection="" />
      <main className={styles.page}>
        <article className={styles.container}>
          <h1 className={styles.title}>Refund Policy</h1>
          <p className={styles.updatedOn}>Last Updated: February 16, 2026</p>

        <section className={styles.section}>
          <h2>1. General Policy</h2>
          <p>
            Fees paid for course registration, training programs, and bootcamps are generally
            non-refundable once admission is confirmed and learning access is activated.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Eligible Refund Scenarios</h2>
          <ul>
            <li>Duplicate payment due to technical error.</li>
            <li>Payment received but admission not processed by the institute.</li>
            <li>Batch cancellation by institute without an alternative schedule.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Non-Refundable Scenarios</h2>
          <ul>
            <li>Change of mind after enrollment confirmation.</li>
            <li>Non-attendance, partial attendance, or missed sessions by student.</li>
            <li>Course discontinuation due to personal reasons.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Refund Request Process</h2>
          <p>
            Refund requests must be sent from your registered email with payment details,
            enrollment information, and reason for request. Our team reviews each request and
            responds after verification.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Processing Timeline</h2>
          <p>
            Approved refunds are processed to the original payment method within 7 to 14
            business days, subject to bank or payment gateway timelines.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Contact for Refund Support</h2>
          <p>
            For refund-related support, contact <strong>info@techcadd.com</strong> or call
            <strong> 9888122255</strong> during working hours.
          </p>
        </section>

          <Link to="/" className={styles.homeLink}>Back to Home</Link>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicyPage;