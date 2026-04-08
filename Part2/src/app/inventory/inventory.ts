/**
 * PROG2005 A2 - Part 2: Inventory Component
 * Author: YongjintaoSun
 * Student ID: 24832902
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InventoryService, InventoryItem, Category, StockStatus, PopularStatus } from '../inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="inventory-container">
      <header class="page-header">
        <h1>📋 Inventory Management</h1>
        <p>Add, edit, and manage your inventory items</p>
      </header>

      <!-- Add/Edit Form -->
      <section class="form-section">
        <h2>{{ isEditing ? 'Edit Item' : 'Add New Item' }}</h2>
        <form [formGroup]="itemForm" (ngSubmit)="onSubmit()" class="item-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="itemId">Item ID *</label>
              <input id="itemId" type="text" formControlName="itemId" 
                     [readonly]="isEditing" placeholder="e.g., ELC003">
              <div class="error-message" *ngIf="itemForm.get('itemId')?.invalid && itemForm.get('itemId')?.touched">
                Item ID is required
              </div>
            </div>

            <div class="form-group">
              <label for="itemName">Item Name *</label>
              <input id="itemName" type="text" formControlName="itemName" placeholder="e.g., iPhone 15 Pro">
              <div class="error-message" *ngIf="itemForm.get('itemName')?.invalid && itemForm.get('itemName')?.touched">
                Item Name is required
              </div>
            </div>

            <div class="form-group">
              <label for="category">Category *</label>
              <select id="category" formControlName="category">
                <option value="">Select Category</option>
                <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
              </select>
              <div class="error-message" *ngIf="itemForm.get('category')?.invalid && itemForm.get('category')?.touched">
                Category is required
              </div>
            </div>

            <div class="form-group">
              <label for="quantity">Quantity *</label>
              <input id="quantity" type="number" formControlName="quantity" min="0" placeholder="0">
              <div class="error-message" *ngIf="itemForm.get('quantity')?.invalid && itemForm.get('quantity')?.touched">
                Valid quantity is required
              </div>
            </div>

            <div class="form-group">
              <label for="price">Price ($) *</label>
              <input id="price" type="number" formControlName="price" min="0" step="0.01" placeholder="0.00">
              <div class="error-message" *ngIf="itemForm.get('price')?.invalid && itemForm.get('price')?.touched">
                Valid price is required
              </div>
            </div>

            <div class="form-group">
              <label for="supplierName">Supplier Name *</label>
              <input id="supplierName" type="text" formControlName="supplierName" placeholder="e.g., Apple Inc.">
              <div class="error-message" *ngIf="itemForm.get('supplierName')?.invalid && itemForm.get('supplierName')?.touched">
                Supplier Name is required
              </div>
            </div>

            <div class="form-group">
              <label for="stockStatus">Stock Status *</label>
              <select id="stockStatus" formControlName="stockStatus">
                <option value="">Select Status</option>
                <option *ngFor="let status of stockStatuses" [value]="status">{{ status }}</option>
              </select>
              <div class="error-message" *ngIf="itemForm.get('stockStatus')?.invalid && itemForm.get('stockStatus')?.touched">
                Stock Status is required
              </div>
            </div>

            <div class="form-group">
              <label for="popularItem">Popular Item *</label>
              <select id="popularItem" formControlName="popularItem">
                <option value="">Select</option>
                <option *ngFor="let status of popularStatuses" [value]="status">{{ status }}</option>
              </select>
              <div class="error-message" *ngIf="itemForm.get('popularItem')?.invalid && itemForm.get('popularItem')?.touched">
                Popular Item status is required
              </div>
            </div>
          </div>

          <div class="form-group full-width">
            <label for="comment">Comment</label>
            <textarea id="comment" formControlName="comment" rows="3" placeholder="Optional notes..."></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-primary" [disabled]="itemForm.invalid">
              {{ isEditing ? 'Update Item' : 'Add Item' }}
            </button>
            <button type="button" class="btn-secondary" (click)="resetForm()">Clear</button>
          </div>
        </form>
      </section>

      <!-- Message Display -->
      <div class="message-container" *ngIf="message">
        <div class="message" [class.success]="messageType === 'success'" [class.error]="messageType === 'error'">
          {{ message }}
        </div>
      </div>

      <!-- Inventory List -->
      <section class="list-section">
        <div class="list-header">
          <h2>All Items</h2>
          <div class="filter-controls">
            <label>Filter by Category:</label>
            <select [(ngModel)]="selectedCategory" (change)="filterByCategory()" [ngModelOptions]="{standalone: true}">
              <option value="all">All Categories</option>
              <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
            </select>
          </div>
        </div>

        <div class="table-container" *ngIf="filteredItems.length > 0">
          <table class="inventory-table">
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
                <th>Actions</th>
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
                <td><span class="status-badge" [class]="getStatusClass(item.stockStatus)">{{ item.stockStatus }}</span></td>
                <td>{{ item.popularItem }}</td>
                <td>
                  <button class="btn-edit" (click)="editItem(item)">Edit</button>
                  <button class="btn-delete" (click)="confirmDelete(item)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="no-items" *ngIf="filteredItems.length === 0">
          <p>No items to display.</p>
        </div>
      </section>

      <!-- Delete Confirmation Modal -->
      <div class="modal" *ngIf="showDeleteModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Confirm Delete</h3>
            <button class="close-btn" (click)="cancelDelete()">&times;</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete "<strong>{{ itemToDelete?.itemName }}</strong>"?</p>
            <p class="warning">This action cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button class="btn-danger" (click)="deleteItem()">Delete</button>
            <button class="btn-secondary" (click)="cancelDelete()">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .inventory-container {
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

    .form-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .form-section h2 {
      margin-bottom: 1.5rem;
      color: #1e293b;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group.full-width {
      grid-column: 1 / -1;
    }

    .form-group label {
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: #374151;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .form-group input[readonly] {
      background-color: #f3f4f6;
      cursor: not-allowed;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      margin-top: 1.5rem;
      display: flex;
      gap: 1rem;
    }

    .btn-primary {
      background: #2563eb;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
      background: #1d4ed8;
    }

    .btn-primary:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #6b7280;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
    }

    .btn-secondary:hover {
      background: #4b5563;
    }

    .message-container {
      margin-bottom: 1rem;
    }

    .message {
      padding: 1rem;
      border-radius: 8px;
      font-weight: 500;
    }

    .message.success {
      background: #d1fae5;
      color: #065f46;
    }

    .message.error {
      background: #fee2e2;
      color: #991b1b;
    }

    .list-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .list-header h2 {
      color: #1e293b;
    }

    .filter-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .filter-controls select {
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
    }

    .table-container {
      overflow-x: auto;
    }

    .inventory-table {
      width: 100%;
      border-collapse: collapse;
    }

    .inventory-table th,
    .inventory-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }

    .inventory-table th {
      background: #2563eb;
      color: white;
      font-weight: 600;
    }

    .inventory-table tbody tr:hover {
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

    .btn-edit,
    .btn-delete {
      padding: 0.4rem 0.8rem;
      border: none;
      border-radius: 6px;
      font-size: 0.875rem;
      cursor: pointer;
      margin-right: 0.5rem;
    }

    .btn-edit {
      background: #2563eb;
      color: white;
    }

    .btn-edit:hover {
      background: #1d4ed8;
    }

    .btn-delete {
      background: #ef4444;
      color: white;
    }

    .btn-delete:hover {
      background: #dc2626;
    }

    .no-items {
      text-align: center;
      padding: 3rem;
      color: #6b7280;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      max-width: 400px;
      width: 90%;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .modal-header h3 {
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #6b7280;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .modal-body .warning {
      color: #ef4444;
      font-weight: 500;
    }

    .modal-footer {
      padding: 1.5rem;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }

    .btn-danger {
      background: #ef4444;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    .btn-danger:hover {
      background: #dc2626;
    }

    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
      
      .list-header {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .inventory-table {
        font-size: 0.875rem;
      }
      
      .inventory-table th,
      .inventory-table td {
        padding: 0.5rem;
      }
    }
  `]
})
export class InventoryComponent implements OnInit {
  itemForm: FormGroup;
  items: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  categories: Category[] = [];
  stockStatuses: StockStatus[] = [];
  popularStatuses: PopularStatus[] = [];
  
  isEditing = false;
  editingItemName: string | null = null;
  selectedCategory = 'all';
  
  message = '';
  messageType: 'success' | 'error' = 'success';
  
  showDeleteModal = false;
  itemToDelete: InventoryItem | null = null;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService
  ) {
    this.itemForm = this.createForm();
  }

  ngOnInit(): void {
    this.categories = this.inventoryService.getCategories();
    this.stockStatuses = this.inventoryService.getStockStatuses();
    this.popularStatuses = this.inventoryService.getPopularStatuses();
    
    this.inventoryService.inventory$.subscribe(items => {
      this.items = items;
      this.filterByCategory();
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      itemId: ['', Validators.required],
      itemName: ['', Validators.required],
      category: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      supplierName: ['', Validators.required],
      stockStatus: ['', Validators.required],
      popularItem: ['', Validators.required],
      comment: ['']
    });
  }

  onSubmit(): void {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const item: InventoryItem = this.itemForm.value;
    
    if (this.isEditing && this.editingItemName) {
      const result = this.inventoryService.updateItem(this.editingItemName, item);
      this.showMessage(result.message, result.success ? 'success' : 'error');
      if (result.success) {
        this.resetForm();
      }
    } else {
      const result = this.inventoryService.addItem(item);
      this.showMessage(result.message, result.success ? 'success' : 'error');
      if (result.success) {
        this.resetForm();
      }
    }
  }

  editItem(item: InventoryItem): void {
    this.isEditing = true;
    this.editingItemName = item.itemName;
    this.itemForm.patchValue(item);
    this.itemForm.get('itemId')?.disable();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  confirmDelete(item: InventoryItem): void {
    this.itemToDelete = item;
    this.showDeleteModal = true;
  }

  deleteItem(): void {
    if (this.itemToDelete) {
      const result = this.inventoryService.deleteItem(this.itemToDelete.itemName);
      this.showMessage(result.message, result.success ? 'success' : 'error');
      this.cancelDelete();
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.itemToDelete = null;
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingItemName = null;
    this.itemForm.reset({
      quantity: 0,
      price: 0,
      comment: ''
    });
    this.itemForm.get('itemId')?.enable();
  }

  filterByCategory(): void {
    if (this.selectedCategory === 'all') {
      this.filteredItems = [...this.items];
    } else {
      this.filteredItems = this.items.filter(item => item.category === this.selectedCategory);
    }
  }

  getStatusClass(status: StockStatus): string {
    return status.toLowerCase().replace(' ', '-');
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
