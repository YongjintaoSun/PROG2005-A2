import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { Category } from '../../models/inventory.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="search-container">
      <header class="search-header">
        <h1>🔍 Search & Filter</h1>
        <p>Find items quickly using search and filter options</p>
      </header>

      <div class="filters-section">
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchTerm" 
            (input)="onSearch()"
            placeholder="🔍 Search by item name..." 
            class="search-input">
        </div>

        <div class="filter-options">
          <div class="filter-group">
            <label>Category:</label>
            <select [(ngModel)]="selectedCategory" (change)="onSearch()" class="filter-select">
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Tools">Tools</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Stock Status:</label>
            <select [(ngModel)]="selectedStatus" (change)="onSearch()" class="filter-select">
              <option value="">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div class="filter-group">
            <label>
              <input 
                type="checkbox" 
                [(ngModel)]="showPopularOnly" 
                (change)="onSearch()">
              Show Popular Only ⭐
            </label>
          </div>
        </div>

        <div class="results-info">
          <span>Found: {{ filteredItems().length }} items</span>
          <button class="btn-clear" (click)="clearFilters()">Clear Filters</button>
        </div>
      </div>

      <div class="results-section">
        @if (filteredItems().length === 0) {
          <div class="no-results">
            <p>No items found matching your criteria.</p>
            <p>Try adjusting your search or filters.</p>
          </div>
        } @else {
          <div class="items-grid">
            @for (item of filteredItems(); track item.itemId) {
              <div class="item-card">
                <div class="item-header">
                  <span class="item-id">{{ item.itemId }}</span>
                  <span class="status" [class]="getStatusClass(item.stockStatus)">
                    {{ item.stockStatus }}
                  </span>
                </div>
                <h3 class="item-name">{{ item.itemName }}</h3>
                <div class="item-details">
                  <p><strong>Category:</strong> {{ item.category }}</p>
                  <p><strong>Quantity:</strong> {{ item.quantity }}</p>
                  <p><strong>Price:</strong> \${{ item.price.toFixed(2) }}</p>
                  <p><strong>Supplier:</strong> {{ item.supplierName }}</p>
                  @if (item.popularItem) {
                    <p class="popular">⭐ Popular Item</p>
                  }
                  @if (item.comment) {
                    <p class="comment"><em>"{{ item.comment }}"</em></p>
                  }
                </div>
              </div>
            }
          </div>
        }
      </div>

      <div class="navigation-section">
        <a routerLink="/inventory" class="nav-link">📋 Go to Full Inventory</a>
        <a routerLink="/home" class="nav-link">🏠 Back to Home</a>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .search-header {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #7c3aed, #db2777);
      color: white;
      border-radius: 12px;
      margin-bottom: 30px;
    }

    .search-header h1 {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    .search-header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .filters-section {
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }

    .search-box {
      margin-bottom: 20px;
    }

    .search-input {
      width: 100%;
      padding: 15px 20px;
      font-size: 1.1rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      transition: border-color 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #7c3aed;
    }

    .filter-options {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 20px;
    }

    .filter-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .filter-group label {
      font-weight: 500;
      color: #475569;
      white-space: nowrap;
    }

    .filter-select {
      padding: 10px 15px;
      font-size: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: white;
      cursor: pointer;
    }

    .filter-group input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .results-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
      border-top: 1px solid #e2e8f0;
    }

    .results-info span {
      font-weight: 500;
      color: #475569;
    }

    .btn-clear {
      padding: 8px 16px;
      background: #f1f5f9;
      color: #64748b;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .btn-clear:hover {
      background: #e2e8f0;
    }

    .results-section {
      margin-bottom: 30px;
    }

    .no-results {
      text-align: center;
      padding: 60px 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .no-results p {
      color: #64748b;
      font-size: 1.1rem;
      margin-bottom: 10px;
    }

    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .item-card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .item-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .item-id {
      font-size: 0.85rem;
      color: #64748b;
      font-family: monospace;
    }

    .status {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .status-in-stock {
      background: #dcfce7;
      color: #166534;
    }

    .status-low-stock {
      background: #fef3c7;
      color: #92400e;
    }

    .status-out-of-stock {
      background: #fee2e2;
      color: #991b1b;
    }

    .item-name {
      font-size: 1.25rem;
      color: #1e293b;
      margin-bottom: 15px;
    }

    .item-details p {
      color: #64748b;
      margin-bottom: 8px;
      font-size: 0.95rem;
    }

    .item-details strong {
      color: #475569;
    }

    .popular {
      color: #f59e0b !important;
      font-weight: 500;
    }

    .comment {
      font-size: 0.9rem;
      color: #94a3b8;
      font-style: italic;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #e2e8f0;
    }

    .navigation-section {
      display: flex;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
    }

    .nav-link {
      padding: 12px 24px;
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
      .search-container {
        padding: 15px;
      }

      .search-header h1 {
        font-size: 1.5rem;
      }

      .filter-options {
        flex-direction: column;
      }

      .filter-group {
        width: 100%;
      }

      .filter-select {
        width: 100%;
      }

      .items-grid {
        grid-template-columns: 1fr;
      }

      .navigation-section {
        flex-direction: column;
      }
    }
  `]
})
export class SearchComponent {
  inventoryService = inject(InventoryService);
  
  searchTerm = '';
  selectedCategory = '';
  selectedStatus = '';
  showPopularOnly = false;

  filteredItems = computed(() => {
    let items = this.inventoryService.getAllItems();
    
    // Filter by search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      items = items.filter(item => 
        item.itemName.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (this.selectedCategory) {
      items = items.filter(item => item.category === this.selectedCategory);
    }
    
    // Filter by stock status
    if (this.selectedStatus) {
      items = items.filter(item => item.stockStatus === this.selectedStatus);
    }
    
    // Filter by popular
    if (this.showPopularOnly) {
      items = items.filter(item => item.popularItem);
    }
    
    return items;
  });

  onSearch() {
    // Filtering is handled by computed signal
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedStatus = '';
    this.showPopularOnly = false;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'In Stock': return 'status-in-stock';
      case 'Low Stock': return 'status-low-stock';
      case 'Out of Stock': return 'status-out-of-stock';
      default: return '';
    }
  }
}