'use client';
import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Privacy Policy</h1>
        
        <p className={styles.lastUpdated}>Last Updated: April 10, 2023</p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Introduction</h2>
          <p>AI Tarot ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and use our services, and tell you about your privacy rights and how the law protects you.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. The Data We Collect</h2>
          <p>We may collect, use, store, and transfer different kinds of personal data about you, which we have grouped together as follows:</p>
          <ul className={styles.list}>
            <li><strong>Identity Data</strong>: includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong>: includes email address.</li>
            <li><strong>Technical Data</strong>: includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access our website.</li>
            <li><strong>Profile Data</strong>: includes your username and password, your preferences, feedback, and survey responses.</li>
            <li><strong>Usage Data</strong>: includes information about how you use our website and services.</li>
            <li><strong>Content Data</strong>: includes the questions you submit for tarot readings and the readings you receive.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. How We Collect Your Data</h2>
          <p>We use different methods to collect data from and about you including through:</p>
          <ul className={styles.list}>
            <li><strong>Direct interactions</strong>: You may give us your Identity and Contact Data by filling in forms or by corresponding with us. This includes personal data you provide when you create an account, use our services, or contact us.</li>
            <li><strong>Automated technologies or interactions</strong>: As you interact with our website, we may automatically collect Technical Data about your equipment, browsing actions, and patterns.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. How We Use Your Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className={styles.list}>
            <li>To register you as a new user.</li>
            <li>To provide and improve our services.</li>
            <li>To manage our relationship with you.</li>
            <li>To administer and protect our business and website.</li>
            <li>To deliver relevant website content to you.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Data Security</h2>
          <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Data Retention</h2>
          <p>We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Your Legal Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
          <ul className={styles.list}>
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Cookies</h2>
          <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.</p>
          <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Children's Privacy</h2>
          <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date at the top of this Privacy Policy.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>Email: privacy@ai-tarot.com</p>
        </div>

        <div className={styles.buttons}>
          <Link href="/" className={styles.button}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
} 