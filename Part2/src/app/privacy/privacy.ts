/**
 * PROG2005 A2 - Part 2: Privacy Component
 * Author: YongjintaoSun
 * Student ID: 24832902
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="privacy-container">
      <header class="page-header">
        <h1>🔒 Privacy & Security Analysis</h1>
        <p>Understanding security considerations in mobile and web applications</p>
      </header>

      <section class="intro-section">
        <div class="intro-card">
          <h2>Why Privacy & Security Matter</h2>
          <p>
            In today's digital landscape, mobile and web applications handle vast amounts of sensitive data. 
            Understanding and implementing proper privacy and security measures is crucial for protecting user information 
            and maintaining trust. This page outlines key security considerations for inventory management applications.
          </p>
        </div>
      </section>

      <section class="security-sections">
        <div class="security-card">
          <div class="card-icon">🔐</div>
          <h3>Data Encryption</h3>
          <p>
            All sensitive data should be encrypted both in transit and at rest. This includes:
          </p>
          <ul>
            <li>Using HTTPS/TLS for all network communications</li>
            <li>Encrypting sensitive fields in the database</li>
            <li>Implementing secure key management practices</li>
            <li>Using strong encryption algorithms (AES-256)</li>
          </ul>
        </div>

        <div class="security-card">
          <div class="card-icon">🛡️</div>
          <h3>Authentication & Authorization</h3>
          <p>
            Proper access control ensures only authorized users can access specific data:
          </p>
          <ul>
            <li>Implement multi-factor authentication (MFA)</li>
            <li>Use role-based access control (RBAC)</li>
            <li>Enforce strong password policies</li>
            <li>Implement session timeout and secure logout</li>
            <li>Regular audit of user permissions</li>
          </ul>
        </div>

        <div class="security-card">
          <div class="card-icon">📱</div>
          <h3>Mobile-Specific Security</h3>
          <p>
            Mobile applications face unique security challenges:
          </p>
          <ul>
            <li>Secure local storage (avoid storing sensitive data in plain text)</li>
            <li>Implement certificate pinning to prevent MITM attacks</li>
            <li>Protect against reverse engineering and tampering</li>
            <li>Handle device loss/theft scenarios (remote wipe capability)</li>
            <li>Secure biometric authentication integration</li>
          </ul>
        </div>

        <div class="security-card">
          <div class="card-icon">🌐</div>
          <h3>Web Application Security</h3>
          <p>
            Web applications require protection against common vulnerabilities:
          </p>
          <ul>
            <li>Prevent XSS (Cross-Site Scripting) attacks</li>
            <li>Protect against CSRF (Cross-Site Request Forgery)</li>
            <li>Implement Content Security Policy (CSP)</li>
            <li>Validate and sanitize all user inputs</li>
            <li>Use secure HTTP headers</li>
          </ul>
        </div>

        <div class="security-card">
          <div class="card-icon">📊</div>
          <h3>Data Privacy Compliance</h3>
          <p>
            Compliance with data protection regulations is essential:
          </p>
          <ul>
            <li>GDPR compliance for EU users</li>
            <li>CCPA compliance for California residents</li>
            <li>Obtain explicit user consent for data collection</li>
            <li>Provide data export and deletion capabilities</li>
            <li>Maintain transparent privacy policies</li>
          </ul>
        </div>

        <div class="security-card">
          <div class="card-icon">🔍</div>
          <h3>Security Monitoring</h3>
          <p>
            Continuous monitoring helps detect and respond to threats:
          </p>
          <ul>
            <li>Implement comprehensive logging</li>
            <li>Set up intrusion detection systems</li>
            <li>Monitor for unusual access patterns</li>
            <li>Regular security audits and penetration testing</li>
            <li>Incident response planning</li>
          </ul>
        </div>
      </section>

      <section class="best-practices">
        <h2>Security Best Practices Summary</h2>
        <div class="practices-grid">
          <div class="practice-item">
            <span class="check">✓</span>
            <span>Regular security updates and patches</span>
          </div>
          <div class="practice-item">
            <span class="check">✓</span>
            <span>Secure coding practices and code reviews</span>
          </div>
          <div class="practice-item">
            <span class="check">✓</span>
            <span>Data minimization - collect only what's necessary</span>
          </div>
          <div class="practice-item">
            <span class="check">✓</span>
            <span>Regular security training for developers</span>
          </div>
          <div class="practice-item">
            <span class="check">✓</span>
            <span>Third-party library security assessments</span>
          </div>
          <div class="practice-item">
            <span class="check">✓</span>
            <span>Backup and disaster recovery plans</span>
          </div>
        </div>
      </section>

      <section class="conclusion">
        <div class="conclusion-card">
          <h2>Conclusion</h2>
          <p>
            Security and privacy are not one-time implementations but ongoing processes. 
            As threats evolve, applications must adapt and improve their security posture. 
            By following these guidelines and staying informed about emerging threats, 
            developers can build more secure and trustworthy applications that protect 
            both the business and its users.
          </p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .privacy-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .page-header h1 {
      color: #1e293b;
      margin-bottom: 0.5rem;
      font-size: 2.5rem;
    }

    .page-header p {
      color: #64748b;
      font-size: 1.125rem;
    }

    .intro-section {
      margin-bottom: 3rem;
    }

    .intro-card {
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: white;
      padding: 2.5rem;
      border-radius: 16px;
      text-align: center;
    }

    .intro-card h2 {
      margin-bottom: 1rem;
      font-size: 1.75rem;
    }

    .intro-card p {
      font-size: 1.125rem;
      line-height: 1.7;
      opacity: 0.95;
    }

    .security-sections {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .security-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .security-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .card-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .security-card h3 {
      color: #1e293b;
      margin-bottom: 1rem;
      font-size: 1.25rem;
    }

    .security-card p {
      color: #64748b;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .security-card ul {
      list-style: none;
      padding: 0;
    }

    .security-card li {
      padding: 0.5rem 0;
      padding-left: 1.5rem;
      position: relative;
      color: #374151;
    }

    .security-card li::before {
      content: "•";
      color: #2563eb;
      font-weight: bold;
      position: absolute;
      left: 0;
    }

    .best-practices {
      background: #f8fafc;
      padding: 2.5rem;
      border-radius: 16px;
      margin-bottom: 3rem;
    }

    .best-practices h2 {
      text-align: center;
      color: #1e293b;
      margin-bottom: 2rem;
    }

    .practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
    }

    .practice-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .check {
      color: #10b981;
      font-weight: bold;
      font-size: 1.25rem;
    }

    .conclusion {
      text-align: center;
    }

    .conclusion-card {
      background: white;
      padding: 2.5rem;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .conclusion-card h2 {
      color: #1e293b;
      margin-bottom: 1rem;
    }

    .conclusion-card p {
      color: #64748b;
      font-size: 1.125rem;
      line-height: 1.7;
      max-width: 800px;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .page-header h1 {
        font-size: 1.75rem;
      }
      
      .security-sections {
        grid-template-columns: 1fr;
      }
      
      .practices-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PrivacyComponent {}
