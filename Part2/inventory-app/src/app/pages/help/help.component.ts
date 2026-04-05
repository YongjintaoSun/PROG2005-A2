import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="help-container">
      <header class="help-header">
        <h1>❓ Help & FAQ</h1>
        <p>Find answers to common questions about this inventory management system</p>
      </header>

      <section class="faq-section">
        <h2>Frequently Asked Questions</h2>
        
        <div class="faq-item">
          <h3>📝 How do I add a new item?</h3>
          <p>Navigate to the Inventory Management page using the navigation bar. Click the "Add New Item" button. Fill in the required fields (Item Name, Category, Quantity, Price, Supplier Name). Click "Save" to add the item to your inventory.</p>
        </div>

        <div class="faq-item">
          <h3>✏️ How do I edit an existing item?</h3>
          <p>Go to the Inventory Management page. Find the item you want to edit in the list. Click the "Edit" button next to that item. Modify the fields as needed and click "Update" to save changes.</p>
        </div>

        <div class="faq-item">
          <h3>🗑️ How do I delete an item?</h3>
          <p>On the Inventory Management page, find the item you wish to delete. Click the "Delete" button. A confirmation dialog will appear. Click "Yes, Delete" to confirm or "Cancel" to abort.</p>
        </div>

        <div class="faq-item">
          <h3>🔍 How do I search for items?</h3>
          <p>Use the Search & Filter page from the navigation bar. Enter the item name in the search box. Results will filter in real-time as you type. You can also filter by category.</p>
        </div>

        <div class="faq-item">
          <h3>⭐ What are "Popular Items"?</h3>
          <p>Popular items are products marked as popular or best-selling. You can mark an item as popular when adding or editing it. Use the "Show Popular Only" filter to view only popular items.</p>
        </div>

        <div class="faq-item">
          <h3>📦 What do the stock status indicators mean?</h3>
          <ul>
            <li><strong>In Stock:</strong> Item is available with quantity of 10 or more</li>
            <li><strong>Low Stock:</strong> Item quantity is between 1-9</li>
            <li><strong>Out of Stock:</strong> Item quantity is 0</li>
          </ul>
        </div>

        <div class="faq-item">
          <h3>💻 Is this application responsive?</h3>
          <p>Yes! This application is designed to work on both desktop and mobile devices. The interface adapts automatically to different screen sizes.</p>
        </div>

        <div class="faq-item">
          <h3>🔒 Is my data secure?</h3>
          <p>Yes. This application runs entirely in your browser with no server-side storage. Your data remains on your device. For security best practices, see our Privacy & Security page.</p>
        </div>
      </section>

      <section class="troubleshooting-section">
        <h2>🔧 Troubleshooting</h2>
        
        <div class="faq-item">
          <h3>Form validation errors</h3>
          <p>Make sure all required fields are filled correctly. Quantity and Price must be positive numbers. Item Name cannot be empty.</p>
        </div>

        <div class="faq-item">
          <h3>Changes not saving</h3>
          <p>Refresh the page and try again. Make sure you're clicking the correct save/update button.</p>
        </div>

        <div class="faq-item">
          <h3>Page not loading</h3>
          <p>Try clearing your browser cache or refreshing the page. Ensure you have JavaScript enabled.</p>
        </div>
      </section>

      <section class="contact-section">
        <h2>📧 Contact Support</h2>
        <p>If you need further assistance, please contact your unit assessor or refer to the unit materials.</p>
        <div class="nav-links">
          <a routerLink="/home" class="nav-link">🏠 Back to Home</a>
          <a routerLink="/inventory" class="nav-link">📋 Go to Inventory</a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .help-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }

    .help-header {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #059669, #10b981);
      color: white;
      border-radius: 12px;
      margin-bottom: 30px;
    }

    .help-header h1 {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    .help-header p {
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

    .faq-item {
      margin-bottom: 25px;
      padding: 20px;
      background: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid #2563eb;
    }

    .faq-item h3 {
      color: #1e293b;
      margin-bottom: 12px;
      font-size: 1.1rem;
    }

    .faq-item p {
      color: #64748b;
      line-height: 1.7;
    }

    .faq-item ul {
      color: #64748b;
      padding-left: 20px;
      line-height: 1.8;
    }

    .faq-item li {
      margin-bottom: 8px;
    }

    .troubleshooting-section .faq-item {
      border-left-color: #f59e0b;
    }

    .contact-section {
      text-align: center;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: white;
    }

    .contact-section h2 {
      color: white;
      border-bottom-color: rgba(255,255,255,0.3);
    }

    .contact-section p {
      opacity: 0.9;
      margin-bottom: 20px;
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
      .help-container {
        padding: 15px;
      }
      
      .help-header h1 {
        font-size: 1.5rem;
      }

      .nav-links {
        flex-direction: column;
      }
    }
  `]
})
export class HelpComponent {}