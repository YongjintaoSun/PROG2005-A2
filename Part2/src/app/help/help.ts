/**
 * PROG2005 A2 - Part 2: Help Component
 * Author: YongjintaoSun
 * Student ID: 24832902
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQ {
  question: string;
  answer: string;
  expanded: boolean;
}

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="help-container">
      <header class="page-header">
        <h1>❓ Help & Support</h1>
        <p>Frequently Asked Questions and Troubleshooting Guide</p>
      </header>

      <section class="quick-start">
        <div class="quick-start-card">
          <h2>🚀 Quick Start Guide</h2>
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Navigate to Inventory</h4>
                <p>Click on "Manage Inventory" from the home page or use the navigation menu.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Add Items</h4>
                <p>Fill in the form with item details. All fields marked with * are required.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Search & Filter</h4>
                <p>Use the Search page to find items by name or apply filters.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>Edit or Delete</h4>
                <p>Click Edit or Delete buttons in the inventory table to manage existing items.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-list">
          <div class="faq-item" *ngFor="let faq of faqs" [class.expanded]="faq.expanded">
            <button class="faq-question" (click)="toggleFaq(faq)">
              <span>{{ faq.question }}</span>
              <span class="toggle-icon">{{ faq.expanded ? '−' : '+' }}</span>
            </button>
            <div class="faq-answer" *ngIf="faq.expanded">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="troubleshooting">
        <h2>🔧 Troubleshooting</h2>
        <div class="troubleshooting-grid">
          <div class="trouble-card">
            <h4>Cannot Add Item</h4>
            <p><strong>Problem:</strong> Form shows validation errors</p>
            <p><strong>Solution:</strong></p>
            <ul>
              <li>Ensure all required fields (*) are filled</li>
              <li>Item ID must be unique</li>
              <li>Quantity and Price must be positive numbers</li>
            </ul>
          </div>

          <div class="trouble-card">
            <h4>Item Not Found</h4>
            <p><strong>Problem:</strong> Search returns no results</p>
            <p><strong>Solution:</strong></p>
            <ul>
              <li>Check spelling of item name</li>
              <li>Try partial name matching</li>
              <li>Clear filters to see all items</li>
            </ul>
          </div>

          <div class="trouble-card">
            <h4>Edit Not Working</h4>
            <p><strong>Problem:</strong> Cannot update an item</p>
            <p><strong>Solution:</strong></p>
            <ul>
              <li>Item ID cannot be changed during edit</li>
              <li>New item name must not conflict with existing items</li>
              <li>Ensure all required fields are valid</li>
            </ul>
          </div>

          <div class="trouble-card">
            <h4>Delete Confirmation</h4>
            <p><strong>Problem:</strong> Accidentally deleted an item</p>
            <p><strong>Solution:</strong></p>
            <ul>
              <li>Deletion requires confirmation</li>
              <li>Read the confirmation dialog carefully</li>
              <li>Deleted items cannot be recovered in this demo</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="contact-section">
        <div class="contact-card">
          <h2>📞 Need More Help?</h2>
          <p>If you cannot find the answer to your question, please contact support:</p>
          <div class="contact-info">
            <div class="contact-item">
              <span class="icon">📧</span>
              <span>support&#64;inventory-system.edu</span>
            </div>
            <div class="contact-item">
              <span class="icon">📱</span>
              <span>+61 2 1234 5678</span>
            </div>
            <div class="contact-item">
              <span class="icon">🕐</span>
              <span>Mon-Fri: 9:00 AM - 5:00 PM AEST</span>
            </div>
          </div>
        </div>
      </section>

      <section class="about-section">
        <div class="about-card">
          <h2>📋 About This Application</h2>
          <p>
            This Inventory Management System was developed as part of PROG2005 Programming Mobile Systems 
            Assessment 2 at Southern Cross University. It demonstrates modern web development practices 
            using Angular, TypeScript, and Reactive Forms.
          </p>
          <div class="about-details">
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>Developer:</strong> YongjintaoSun</p>
            <p><strong>Student ID:</strong> 24832902</p>
            <p><strong>Course:</strong> PROG2005 Programming Mobile Systems</p>
            <p><strong>University:</strong> Southern Cross University</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .help-container {
      max-width: 1000px;
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

    .quick-start {
      margin-bottom: 3rem;
    }

    .quick-start-card {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 2.5rem;
      border-radius: 16px;
    }

    .quick-start-card h2 {
      margin-bottom: 2rem;
      text-align: center;
    }

    .steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .step {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .step-number {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .step-content h4 {
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    .step-content p {
      opacity: 0.9;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .faq-section {
      margin-bottom: 3rem;
    }

    .faq-section h2 {
      color: #1e293b;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .faq-list {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .faq-item {
      border-bottom: 1px solid #e5e7eb;
    }

    .faq-item:last-child {
      border-bottom: none;
    }

    .faq-question {
      width: 100%;
      padding: 1.25rem 1.5rem;
      background: none;
      border: none;
      text-align: left;
      font-size: 1rem;
      font-weight: 500;
      color: #374151;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background 0.2s;
    }

    .faq-question:hover {
      background: #f9fafb;
    }

    .toggle-icon {
      font-size: 1.5rem;
      color: #2563eb;
      font-weight: 300;
    }

    .faq-answer {
      padding: 0 1.5rem 1.25rem;
      color: #6b7280;
      line-height: 1.6;
    }

    .troubleshooting {
      margin-bottom: 3rem;
    }

    .troubleshooting h2 {
      color: #1e293b;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .troubleshooting-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .trouble-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #f59e0b;
    }

    .trouble-card h4 {
      color: #92400e;
      margin-bottom: 1rem;
    }

    .trouble-card p {
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .trouble-card ul {
      list-style: none;
      padding: 0;
      margin-top: 0.5rem;
    }

    .trouble-card li {
      padding: 0.25rem 0;
      padding-left: 1.25rem;
      position: relative;
      color: #4b5563;
      font-size: 0.9rem;
    }

    .trouble-card li::before {
      content: "→";
      position: absolute;
      left: 0;
      color: #f59e0b;
    }

    .contact-section {
      margin-bottom: 3rem;
    }

    .contact-card {
      background: #2563eb;
      color: white;
      padding: 2.5rem;
      border-radius: 16px;
      text-align: center;
    }

    .contact-card h2 {
      margin-bottom: 1rem;
    }

    .contact-card > p {
      margin-bottom: 1.5rem;
      opacity: 0.9;
    }

    .contact-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.5rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
    }

    .icon {
      font-size: 1.25rem;
    }

    .about-section {
      margin-bottom: 2rem;
    }

    .about-card {
      background: #f8fafc;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
    }

    .about-card h2 {
      color: #1e293b;
      margin-bottom: 1rem;
    }

    .about-card > p {
      color: #64748b;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .about-details {
      display: inline-block;
      text-align: left;
      background: white;
      padding: 1.5rem 2rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .about-details p {
      margin-bottom: 0.5rem;
      color: #374151;
    }

    .about-details p:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      .page-header h1 {
        font-size: 1.75rem;
      }
      
      .steps {
        grid-template-columns: 1fr;
      }
      
      .troubleshooting-grid {
        grid-template-columns: 1fr;
      }
      
      .contact-info {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class HelpComponent {
  faqs: FAQ[] = [
    {
      question: 'How do I add a new item to the inventory?',
      answer: 'Navigate to the "Manage Inventory" page, fill in all required fields in the form (marked with *), and click "Add Item". The Item ID must be unique.',
      expanded: false
    },
    {
      question: 'Can I edit an existing item?',
      answer: 'Yes! Find the item in the inventory table and click the "Edit" button. You can update all fields except the Item ID. Make sure to save your changes.',
      expanded: false
    },
    {
      question: 'How do I search for items?',
      answer: 'Go to the "Search" page and type in the search box. The system will search by item name. You can also apply filters by category, stock status, price range, and popularity.',
      expanded: false
    },
    {
      question: 'What are the required fields when adding an item?',
      answer: 'All fields except "Comment" are required: Item ID, Item Name, Category, Quantity, Price, Supplier Name, Stock Status, and Popular Item status.',
      expanded: false
    },
    {
      question: 'Can I delete an item?',
      answer: 'Yes, you can delete items by clicking the "Delete" button in the inventory table. A confirmation dialog will appear to prevent accidental deletions.',
      expanded: false
    },
    {
      question: 'Why can\'t I use the same Item ID twice?',
      answer: 'Item IDs must be unique to ensure each item can be uniquely identified in the system. This prevents confusion and data integrity issues.',
      expanded: false
    },
    {
      question: 'What are the different stock statuses?',
      answer: 'There are three stock statuses: "In Stock" (sufficient quantity available), "Low Stock" (running low, needs reordering), and "Out of Stock" (temporarily unavailable).',
      expanded: false
    },
    {
      question: 'Is my data saved permanently?',
      answer: 'This is a demonstration application. Data is stored in memory during the session and will be reset when you refresh the page. In a production environment, data would be persisted to a database.',
      expanded: false
    }
  ];

  toggleFaq(faq: FAQ): void {
    faq.expanded = !faq.expanded;
  }
}
