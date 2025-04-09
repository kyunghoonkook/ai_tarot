'use client';
import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function TermsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Terms of Service</h1>
        
        <p className={styles.lastUpdated}>Last Updated: April 10, 2023</p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Introduction</h2>
          <p>Welcome to AI Tarot ("we," "our," or "us"). By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read these terms carefully before using our services.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Acceptance of Terms</h2>
          <p>By accessing or using our services, you confirm that you accept these Terms of Service and agree to comply with them. If you do not agree with these terms, you must not use our services.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Service Description</h2>
          <p>AI Tarot provides digital tarot reading services powered by artificial intelligence. Our services are for entertainment purposes only and should not be considered as professional advice, including but not limited to financial, legal, medical, or psychological advice.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. User Accounts</h2>
          <p>To access certain features of our service, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>5. User Content</h2>
          <p>Our service may allow you to submit questions and receive tarot readings. By submitting content to our service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your content in any existing or future media.</p>
          <p>You represent and warrant that you own or control all rights to the content you submit and that the content does not violate these terms or any applicable law.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Prohibited Activities</h2>
          <p>You agree not to use our services:</p>
          <ul className={styles.list}>
            <li>In any way that violates any applicable law or regulation</li>
            <li>To transmit or facilitate the transmission of any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or invasive of another's privacy</li>
            <li>To impersonate or attempt to impersonate AI Tarot, an AI Tarot employee, another user, or any other person or entity</li>
            <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the service</li>
            <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the service</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Intellectual Property</h2>
          <p>The service and its original content, features, and functionality are and will remain the exclusive property of AI Tarot and its licensors. The service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Disclaimer of Warranties</h2>
          <p>Our services are provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Limitation of Liability</h2>
          <p>In no event shall AI Tarot, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Changes to Terms</h2>
          <p>We reserve the right to modify or replace these Terms of Service at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Contact Us</h2>
          <p>If you have any questions about these Terms of Service, please contact us at:</p>
          <p>Email: support@ai-tarot.com</p>
        </div>

        <div className={styles.buttons}>
          <Link href="/" className={styles.button}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
} 