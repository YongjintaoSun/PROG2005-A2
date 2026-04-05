import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="privacy-container">
      <header class="privacy-header">
        <h1>🔒 Privacy & Security Analysis</h1>
        <p>Understanding security considerations for mobile and web applications</p>
      </header>

      <section class="overview-section">
        <h2>📖 Overview</h2>
        <p>
          This inventory management system is designed with security and privacy in mind. As mobile and web 
          applications become more prevalent, understanding the security implications is crucial for developers 
          and users alike. This page explains the key security considerations implemented in our application.
        </p>
      </section>

      <section class="client-side-section">
        <h2>🖥️ Client-Side Processing</h2>
        <div class="security-item">
          <h3>Local Data Storage</h3>
          <p>
            This application operates entirely client-side using browser memory. No data is transmitted to external 
            servers, ensuring that sensitive inventory information remains on the user's device. This approach 
            eliminates many common server-side security risks.
          </p>
        </div>
        <div class="security-item">
          <h3>No Authentication Required</h3>
          <p>
            Since the application runs locally without backend storage, traditional authentication mechanisms 
            are not required. This eliminates risks associated with password management and session hijacking.
          </p>
        </div>
      </section>

      <section class="security-considerations-section">
        <h2>⚠️ Security Considerations for Mobile Applications</h2>
        
        <div class="security-item">
          <h3>Data Storage Security</h3>
          <ul>
            <li><strong>Local Storage:</strong> Browser localStorage and sessionStorage should be used carefully</li>
            <li><strong>Encryption:</strong> Sensitive data should be encrypted before storage</li>
            <li><strong>Data Minimization:</strong> Store only necessary information</li>
          </ul>
        </div>

        <div class="security-item">
          <h3>Input Validation</h3>
          <ul>
            <li><strong>Client-side Validation:</strong> Prevents invalid data entry and improves UX</li>
            <li><strong>Sanitization:</strong> Prevents XSS (Cross-Site Scripting) attacks</li>
            <li><strong>Type Checking:</strong> TypeScript ensures type safety</li>
          </ul>
        </div>

        <div class="security-item">
          <h3>Privacy Considerations</h3>
          <ul>
            <li><strong>Data Collection:</strong> Minimize personal data collection</li>
            <li><strong>User Consent:</strong> Inform users about data usage</li>
            <li><strong>Data Retention:</strong> Clear data when no longer needed</li>
          </ul>
        </div>
      </section>

      <section class="best-practices-section">
        <h2>✅ Best Practices Implemented</h2>
        
        <div class="practice-grid">
          <div class="practice-card">
            <span class="practice-icon">✅</span>
            <h3>Input Validation</h3>
            <p>All form inputs are validated to prevent invalid data entry. Numeric fields reject non-numeric values.</p>
          </div>
          
          <div class="practice-card">
            <span class="practice-icon">✅</span>
            <h3>XSS Prevention</h3>
            <p>HTML content is properly escaped to prevent Cross-Site Scripting attacks.</p>
          </div>
          
          <div class="practice-card">
            <span class="practice-icon">✅</span>
            <h3>Type Safety</h3>
            <p>TypeScript provides compile-time type checking, reducing runtime errors.</p>
          </div>
          
          <div class="practice-card">
            <span class="practice-icon">✅</span>
            <h3>Responsive Design</h3>
            <p>Application works across devices without compromising security on any platform.</p>
          </div>
          
          <div class="practice-card">
            <span class="practice-icon">✅</span>
            <h3>No External Data Transmission</h3>
            <p>Data never leaves the user's browser, ensuring privacy.</p>
          </div>
          
          <div class="practice-card">
            <span class="practice-icon">✅</span>
            <h3>Confirmation Dialogs</h3>
            <p>Delete operations require confirmation to prevent accidental data loss.</p>
          </div>
        </div>
      </section>

      <section class="recommendations-section">
        <h2>🚀 Recommendations for Production</h2>
        
        <div class="recommendation-item">
          <h3>For Future Development:</h3>
          <ul>
            <li>Implement server-side authentication and authorization</li>
            <li>Add HTTPS for all communications</li>
            <li>Implement database encryption for stored data</li>
            <li>Add audit logging for data access</li>
            <li>Implement role-based access control (RBAC)</li>
            <li>Add data backup and recovery mechanisms</li>
          </ul>
        </div>
      </section>

      <section class="references-section">
        <h2>📚 References</h2>
        <ul>
          <li>OWASP Mobile Security Project - <a href="https://owasp.org/www-project-mobile-security/" target="_blank">owasp.org</a></li>
          <li>Android Security Documentation - <a href="https://developer.android.com/security" target="_blank">developer.android.com</a></li>
          <li>iOS Security Guide - <a href="https://support.apple.com/guide/security" target="_blank">support.apple.com</a></li>
          <li>MDN Web Security - <a href="https://developer.mozilla.org/en-US/docs/Web/Security" target="_blank">mozilla.org</a></li>
        </ul>
      </section>

      <section class="navigation-section">
        <h2>🧭 Continue Exploring</h2>
        <div class="nav-links">
          <a routerLink="/home" class="nav-link">🏠 Home</a>
          <a routerLink="/inventory" class="nav-link">📋 Inventory</a>
          <a routerLink="/search" class="nav-link">🔍 Search</a>
          <a routerLink="/help" class="nav-link">❓ Help</a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .privacy-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }

    .privacy-header {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #dc2626, #991b1b);
      color: white;
      border-radius: 12px;
      margin-bottom: 30px;
    }

    .privacy-header h1 {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    .privacy-header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    section {
      margin-bottom: 30px;
      padding: 25px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    section h2 {
      color: #1e293b;
      margin-bottom: 20px;
      font-size: 1.5rem;
      padding-bottom: 10px;
      border-bottom: 2px solid #e2e8f0;
    }

    section p {
      color: #64748b;
      line-height: 1.8;
    }

    .security-item {
      margin-bottom: 25px;
      padding: 20px;
      background: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid #dc2626;
    }

    .security-item h3 {
      color: #1e293b;
      margin-bottom: 12px;
      font-size: 1.1rem;
    }

    .security-item p {
      color: #64748b;
      line-height: 1.7;
    }

    .security-item ul {
      color: #64748b;
      padding-left: 20px;
      line-height: 1.8;
    }

    .security-item li {
      margin-bottom: 8px;
    }

    .practice-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .practice-card {
      padding: 20px;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
    }

    .practice-icon {
      font-size: 1.5rem;
      display: block;
      margin-bottom: 10px;
    }

    .practice-card h3 {
      color: #166534;
      margin-bottom: 10px;
    }

    .practice-card p {
      color: #64748b;
      font-size: 0.95rem;
    }

    .recommendation-item ul {
      color: #64748b;
      padding-left: 20px;
      line-height: 1.8;
    }

    .recommendation-item li {
      margin-bottom: 10px;
    }

    .references-section ul {
      list-style: none;
      padding: 0;
    }

    .references-section li {
      padding: 10px 0;
      border-bottom: 1px solid #e2e8f0;
    }

    .references-section a {
      color: #2563eb;
      text-decoration: none;
    }

    .references-section a:hover {
      text-decoration: underline;
    }

    .navigation-section {
      text-align: center;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: white;
    }

    .navigation-section h2 {
      color: white;
      border-bottom-color: rgba(255,255,255,0.3);
    }

    .nav-links {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 20px;
    }

    .nav-link {
      padding: 12px 20px;
      background: white;
      color: #2563eb;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: transform 0.3s ease;
    }

    .nav-link:hover {
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .privacy-container {
        padding: 15px;
      }
      
      .privacy-header h1 {
        font-size: 1.5rem;
      }

      .practice-grid {
        grid-template-columns: 1fr;
      }

      .nav-links {
        flex-direction: column;
      }
    }
  `]
})
export class PrivacyComponent {}