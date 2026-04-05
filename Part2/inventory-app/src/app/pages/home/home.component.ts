import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <header class="hero">
        <h1>📦 Inventory Management System</h1>
        <p class="subtitle">PROG2005 A2 - Part 2 Angular Application</p>
      </header>
      
      <section class="purpose-section">
        <h2>📋 Purpose of This Application</h2>
        <p>
          This Angular-based inventory management system provides a comprehensive solution for managing
          inventory items in any business or organization. It allows users to track products, monitor stock
          levels, manage supplier information, and identify popular items.
        </p>
      </section>

      <section class="features-section">
        <h2>✨ Key Features</h2>
        <div class="features-grid">
          <div class="feature-card">
            <span class="feature-icon">➕</span>
            <h3>Add Items</h3>
            <p>Add new inventory items with full details including name, category, quantity, price, and supplier</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">✏️</span>
            <h3>Edit Items</h3>
            <p>Modify existing item information with real-time stock status updates</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🗑️</span>
            <h3>Delete Items</h3>
            <p>Remove items with confirmation dialog to prevent accidental deletions</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🔍</span>
            <h3>Search & Filter</h3>
            <p>Search by item name and filter by category for quick access to items</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">⭐</span>
            <h3>Popular Items</h3>
            <p>Mark and view popular items to highlight best-selling products</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">📊</span>
            <h3>Stock Status</h3>
            <p>Automatic stock status tracking: In Stock, Low Stock, Out of Stock</p>
          </div>
        </div>
      </section>

      <section class="data-fields-section">
        <h2>📊 Data Fields</h2>
        <ul>
          <li><strong>Item ID:</strong> Unique identifier for each item</li>
          <li><strong>Item Name:</strong> Name of the product</li>
          <li><strong>Category:</strong> Electronics, Furniture, Clothing, Tools, Miscellaneous</li>
          <li><strong>Quantity:</strong> Number of items in stock</li>
          <li><strong>Price:</strong> Unit price in dollars</li>
          <li><strong>Supplier Name:</strong> Name of the supplier</li>
          <li><strong>Stock Status:</strong> In Stock, Low Stock, or Out of Stock</li>
          <li><strong>Popular Item:</strong> Mark as popular (Yes/No)</li>
          <li><strong>Comment:</strong> Additional notes about the item</li>
        </ul>
      </section>

      <section class="navigation-section">
        <h2>🧭 Navigation</h2>
        <p>Use the navigation bar above to access different pages:</p>
        <div class="nav-links">
          <a routerLink="/inventory" class="nav-link">📋 Inventory Management</a>
          <a routerLink="/search" class="nav-link">🔍 Search & Filter</a>
          <a routerLink="/privacy" class="nav-link">🔒 Privacy & Security</a>
          <a routerLink="/help" class="nav-link">❓ Help & FAQ</a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }

    .hero {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: white;
      border-radius: 12px;
      margin-bottom: 30px;
    }

    .hero h1 {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    .subtitle {
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
      margin-bottom: 15px;
      font-size: 1.5rem;
    }

    .purpose-section p {
      color: #64748b;
      line-height: 1.8;
      font-size: 1.05rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .feature-card {
      padding: 20px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .feature-icon {
      font-size: 2rem;
      display: block;
      margin-bottom: 10px;
    }

    .feature-card h3 {
      color: #2563eb;
      margin-bottom: 10px;
    }

    .feature-card p {
      color: #64748b;
      font-size: 0.95rem;
    }

    .data-fields-section ul {
      list-style: none;
      padding: 0;
    }

    .data-fields-section li {
      padding: 12px 0;
      border-bottom: 1px solid #e2e8f0;
      color: #475569;
    }

    .data-fields-section li:last-child {
      border-bottom: none;
    }

    .data-fields-section strong {
      color: #1e293b;
    }

    .nav-links {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 20px;
    }

    .nav-link {
      padding: 15px 25px;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: background 0.3s ease;
    }

    .nav-link:hover {
      background: #1d4ed8;
    }

    @media (max-width: 768px) {
      .home-container {
        padding: 15px;
      }
      
      .hero h1 {
        font-size: 1.5rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {}