/**
 * PROG2005 A2 - Part 2: Angular Main App Component
 * Author: YongjintaoSun
 * Student ID: 24832902
 */

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="app-container">
      <!-- Navigation Header -->
      <header class="app-header">
        <div class="header-content">
          <div class="logo">
            <span class="logo-icon">📦</span>
            <span class="logo-text">Inventory System</span>
          </div>
          <nav class="main-nav">
            <a routerLink="/home" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">🏠</span>
              <span class="nav-text">Home</span>
            </a>
            <a routerLink="/inventory" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">📋</span>
              <span class="nav-text">Inventory</span>
            </a>
            <a routerLink="/search" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">🔍</span>
              <span class="nav-text">Search</span>
            </a>
            <a routerLink="/privacy" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">🔒</span>
              <span class="nav-text">Privacy</span>
            </a>
            <a routerLink="/help" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">❓</span>
              <span class="nav-text">Help</span>
            </a>
          </nav>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <div class="footer-content">
          <p>PROG2005 A2 - Part 2 | Angular Inventory Management System</p>
          <p>Developed by YongjintaoSun (Student ID: 24832902) | Southern Cross University</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .logo-icon {
      font-size: 2rem;
    }

    .main-nav {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1rem;
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.2s;
      font-weight: 500;
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.15);
      color: white;
    }

    .nav-link.active {
      background: rgba(255, 255, 255, 0.25);
      color: white;
    }

    .nav-icon {
      font-size: 1.25rem;
    }

    .main-content {
      flex: 1;
      background: #f1f5f9;
      padding-bottom: 2rem;
    }

    .app-footer {
      background: #1e293b;
      color: rgba(255, 255, 255, 0.7);
      padding: 1.5rem;
      text-align: center;
    }

    .footer-content {
      max-width: 1400px;
      margin: 0 auto;
    }

    .footer-content p {
      margin-bottom: 0.5rem;
    }

    .footer-content p:last-child {
      margin-bottom: 0;
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        padding: 1rem;
      }

      .main-nav {
        width: 100%;
        justify-content: center;
      }

      .nav-link {
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
      }

      .nav-text {
        display: none;
      }

      .nav-icon {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .main-nav {
        gap: 0.25rem;
      }

      .nav-link {
        padding: 0.5rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'PROG2005-A2';
}
