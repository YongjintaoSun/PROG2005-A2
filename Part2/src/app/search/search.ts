/**
 * PROG2005 A2 - Part 2: Search Component
 * Author: YongjintaoSun
 * Student ID: 24832902
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InventoryService, InventoryItem, Category } from '../inventory.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="search-container">
      <header class="page-header">
        <h1>🔍 Search Inventory</h1>
        <p>Find items by name and filter by category</p>
      </header>

      <section class="search-section">
        <div class="search-box">
          <input 
            type="text" 
            [formControl]="searchControl"
            placeholder="Search by item name..."
            class="search-input"
          >
        </div>

        <div class="filter-section">
          <h3>Filter Options</h3>
          <div class="filter-grid">
            <div class="filter-group">
              <label>Category</label>
              <select [(ngModel)]="filters.category" (change)="applyFilters()" [ngModelOptions]="{standalone: true}">
                <option value="">All Categories</option>
                <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
              </select>
            </div>

            <div class="filter-group">
              <label>Stock Status</label>
              <select [(ngModel)]="filters.stockStatus" (change)="applyFilters()" [ngModelOptions]="{standalone: true}">
                <option value="">All Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div class="filter-group">
              <label>Popular Items</label>
              <select [(ngModel)]="filters.popular" (change)="applyFilters()" [ngModelOptions]="{standalone: true}">
                <option value="">All Items</option>
                <option value="Yes">Popular Only</option>
                <option value="No">Non-Popular</option>
              </select>
            </div>

            <div class="filter-group">
              <label>Price Range</label>
              <div class="price-range">
                <input type="number" [(ngModel)]="filters.minPrice" placeholder="Min" (input)="applyFilters()" [ngModelOptions]="{standalone: true}">
                <span>-</span>
                <input type="number" [(ngModel)]="filters.maxPrice" placeholder="Max" (input)="applyFilters()" [ngModelOptions]="{standalone: true}">
              </div>
            </div>
          </div>

          <button class="btn-clear" (click)="clearFilters()">Clear All Filters</button>
        </div>
      </section>

      <section class="results-section">
        <div class="results-header">
          <h2>Search Results</h2>
          <span class="results-count">{{ filteredItems.length }} item(s) found</span>
        </div>

        <div class="table-container" *ngIf="filteredItems.length > 0">
          <table class="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Popular</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of filteredItems" [class]="getStatusClass(item.stockStatus)">
                <td>{{ item.itemId }}</td>
                <td>{{ item.itemName }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.price | currency }}</td>
                <td>{{ item.supplierName }}</td>
                <td>
                  <span class="status-badge" [class]="getStatusClass(item.stockStatus)">
                    {{ item.stockStatus }}
                  </span>
                </td>
                <td>
                  <span class="popular-badge" *ngIf="item.popularItem === 'Yes'">⭐</span>
                  {{ item.popularItem }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="no-results" *ngIf="filteredItems.length === 0">
          <div class="no-results-icon">🔍</div>
          <h3>No items found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .page-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    .page-header p {
      color: #64748b;
    }

    .search-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .search-box {
      margin-bottom: 2rem;
    }

    .search-input {
      width: 100%;
      padding: 1rem 1.5rem;
      font-size: 1.125rem;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      transition: all 0.3s;
    }

    .search-input:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
    }

    .filter-section h3 {
      margin-bottom: 1rem;
      color: #374151;
    }

    .filter-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
    }

    .filter-group label {
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: #374151;
      font-size: 0.875rem;
    }

    .filter-group select,
    .filter-group input {
      padding: 0.625rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 0.875rem;
    }

    .filter-group select:focus,
    .filter-group input:focus {
      outline: none;
      border-color: #2563eb;
    }

    .price-range {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .price-range input {
      flex: 1;
    }

    .price-range span {
      color: #6b7280;
    }

    .btn-clear {
      background: #f3f4f6;
      color: #374151;
      padding: 0.625rem 1.25rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    .btn-clear:hover {
      background: #e5e7eb;
    }

    .results-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .results-header h2 {
      color: #1e293b;
    }

    .results-count {
      background: #2563eb;
      color: white;
      padding: 0.375rem 1rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .table-container {
      overflow-x: auto;
    }

    .results-table {
      width: 100%;
      border-collapse: collapse;
    }

    .results-table th,
    .results-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }

    .results-table th {
      background: #f9fafb;
      font-weight: 600;
      color: #374151;
    }

    .results-table tbody tr:hover {
      background: #f9fafb;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .status-badge.in-stock {
      background: #d1fae5;
      color: #065f46;
    }

    .status-badge.low-stock {
      background: #fef3c7;
      color: #92400e;
    }

    .status-badge.out-of-stock {
      background: #fee2e2;
      color: #991b1b;
    }

    .popular-badge {
      margin-right: 0.25rem;
    }

    .no-results {
      text-align: center;
      padding: 4rem 2rem;
    }

    .no-results-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .no-results h3 {
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .no-results p {
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .filter-grid {
        grid-template-columns: 1fr;
      }
      
      .results-header {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .results-table {
        font-size: 0.875rem;
      }
      
      .results-table th,
      .results-table td {
        padding: 0.75rem 0.5rem;
      }
    }
  `]
})
export class SearchComponent implements OnInit {
  searchControl = this.fb.control('');
  items: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  categories: Category[] = [];
  
  filters = {
    category: '',
    stockStatus: '',
    popular: '',
    minPrice: null as number | null,
    maxPrice: null as number | null
  };

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.categories = this.inventoryService.getCategories();
    this.items = this.inventoryService.getAllItems();
    this.filteredItems = [...this.items];

    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let results = [...this.items];
    
    // Search by name
    const searchTerm = this.searchControl.value?.toLowerCase() || '';
    if (searchTerm) {
      results = results.filter(item => 
        item.itemName.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by category
    if (this.filters.category) {
      results = results.filter(item => item.category === this.filters.category);
    }
    
    // Filter by stock status
    if (this.filters.stockStatus) {
      results = results.filter(item => item.stockStatus === this.filters.stockStatus);
    }
    
    // Filter by popular status
    if (this.filters.popular) {
      results = results.filter(item => item.popularItem === this.filters.popular);
    }
    
    // Filter by price range
    if (this.filters.minPrice !== null) {
      results = results.filter(item => item.price >= this.filters.minPrice!);
    }
    if (this.filters.maxPrice !== null) {
      results = results.filter(item => item.price <= this.filters.maxPrice!);
    }
    
    this.filteredItems = results;
  }

  clearFilters(): void {
    this.searchControl.setValue('');
    this.filters = {
      category: '',
      stockStatus: '',
      popular: '',
      minPrice: null,
      maxPrice: null
    };
    this.applyFilters();
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }
}
