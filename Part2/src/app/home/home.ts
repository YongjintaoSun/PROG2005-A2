/**
 * PROG2005 A2 - Part 2: Home Component
 * Author: YongjintaoSun
 * Student ID: 24832902
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <header class="hero-section">
        <h1>📦 Inventory Management System</h1>
        <p class="subtitle">Harvey Norman Database - Angular Edition</p>
        <p class="author">Developed by YongjintaoSun (Student ID: 24832902)</p>
      </header>

      <section class="features-section">
        <h2>Application Features</h2>
        <div class="features-grid">
          <div class="feature-card" routerLink="/inventory">
            <div class="feature-icon">📝</div>
            <h3>Manage Inventory</h3>
            <p>Add, edit, and delete inventory items with full validation</p>
          </div>
          <div class="feature-card" routerLink="/search">
            <div class="feature-icon">🔍</div>
            <h3>Search & Filter</h3>
            <p>Search items by name and filter by category</p>
          </div>
          <div class="feature-card" routerLink="/privacy">
            <div class="feature-icon">🔒</div>
            <h3>Privacy & Security</h3>
            <p>Learn about privacy and security considerations</p>
          </div>
          <div class="feature-card" routerLink="/help">
            <div class="feature-icon">❓</div>
            <h3>Help & Support</h3>
            <p>FAQs and troubleshooting guidance</p>
          </div>
        </div>
      </section>

      <section class="tech-section">
        <h2>Technology Stack</h2>
        <div class="tech-list">
          <span class="tech-badge">Angular 17+</span>
          <span class="tech-badge">TypeScript</span>
          <span class="tech-badge">Reactive Forms</span>
          <span class="tech-badge">RxJS</span>
          <span class="tech-badge">CSS Grid & Flexbox</span>
        </div>
      </section>

      <section class="course-section">
        <h2>Course Information</h2>
        <div class="course-info">
          <p><strong>Course:</strong> PROG2005 Programming Mobile Systems</p>
          <p><strong>Assessment:</strong> A2 - Part 2 (Angular Application)</p>
          <p><strong>University:</strong> Southern Cross University</p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .hero-section {
      text-align: center;
      padding: 3rem 2rem;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: white;
      border-radius: 16px;
      margin-bottom: 3rem;
    }

    .hero-section h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .subtitle {
      font-size: 1.25rem;
      opacity: 0.9;
      margin-bottom: 0.5rem;
    }

    .author {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    .features-section {
      margin-bottom: 3rem;
    }

    .features-section h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #1e293b;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      color: #2563eb;
      margin-bottom: 0.5rem;
    }

    .feature-card p {
      color: #64748b;
      font-size: 0.9rem;
    }

    .tech-section {
      background: #f8fafc;
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
    }

    .tech-section h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #1e293b;
    }

    .tech-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }

    .tech-badge {
      background: #2563eb;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .course-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .course-section h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #1e293b;
    }

    .course-info {
      text-align: center;
    }

    .course-info p {
      margin-bottom: 0.5rem;
      color: #64748b;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 1.75rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  title = 'PROG2005-A2';
}
