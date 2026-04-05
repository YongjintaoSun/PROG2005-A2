import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem, Category } from '../../models/inventory.model';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="inventory-container">
      <header>
        <h1>📋 Inventory Management</h1>
        <div class="header-stats">
          <span>Total: {{ inventoryService.totalItems() }} items</span>
          <span>Popular: {{ inventoryService.popularItemsCount() }}</span>
        </div>
      </header>

      <div class="toolbar">
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchTerm" 
            (input)="onSearch()"
            placeholder="🔍 Search by item name...">
        </div>
        <div class="actions">
          <button class="btn-primary" (click)="openForm()">➕ Add Item</button>
          <button class="btn-secondary" (click)="showAll()">📋 All Items</button>
          <button class="btn-secondary" (click)="showPopular()">⭐ Popular</button>
        </div>
      </div>

      <div class="items-grid">
        @for (item of displayedItems(); track item.itemId) {
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
                <span class="popular-badge">⭐ Popular</span>
              }
              @if (item.comment) {
                <p class="comment"><em>"{{ item.comment }}"</em></p>
              }
            </div>
            <div class="item-actions">
              <button class="btn-edit" (click)="openForm(item)">✏️ Edit</button>
              <button class="btn-delete" (click)="confirmDelete(item)">🗑️ Delete</button>
            </div>
          </div>
        } @empty {
          <div class="no-items">No items found</div>
        }
      </div>

      <!-- Form Modal -->
      @if (showModal()) {
        <div class="modal-overlay" (click)="closeForm()">
          <div class="modal-content" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>{{ editingItem() ? 'Edit Item' : 'Add New Item' }}</h2>
              <button class="close-btn" (click)="closeForm()">×</button>
            </div>
            <form (ngSubmit)="saveItem()">
              <div class="form-group">
                <label for="itemName">Item Name *</label>
                <input 
                  type="text" 
                  id="itemName" 
                  [(ngModel)]="formData.itemName" 
                  name="itemName"
                  required
                  placeholder="Enter item name">
              </div>

              <div class="form-group">
                <label for="category">Category</label>
                <select id="category" [(ngModel)]="formData.category" name="category">
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Tools">Tools</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="quantity">Quantity *</label>
                  <input 
                    type="number" 
                    id="quantity" 
                    [(ngModel)]="formData.quantity" 
                    name="quantity"
                    min="0"
                    required
                    placeholder="0">
                </div>
                <div class="form-group">
                  <label for="price">Price ($) *</label>
                  <input 
                    type="number" 
                    id="price" 
                    [(ngModel)]="formData.price" 
                    name="price"
                    min="0"
                    step="0.01"
                    required
                    placeholder="0.00">
                </div>
              </div>

              <div class="form-group">
                <label for="supplierName">Supplier Name</label>
                <input 
                  type="text" 
                  id="supplierName" 
                  [(ngModel)]="formData.supplierName" 
                  name="supplierName"
                  placeholder="Enter supplier name">
              </div>

              <div class="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    [(ngModel)]="formData.popularItem" 
                    name="popularItem">
                  <span>⭐ Mark as Popular</span>
                </label>
              </div>

              <div class="form-group">
                <label for="comment">Comment</label>
                <textarea 
                  id="comment" 
                  [(ngModel)]="formData.comment" 
                  name="comment"
                  rows="3"
                  placeholder="Add any notes..."></textarea>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn-primary">Save Item</button>
                <button type="button" class="btn-secondary" (click)="closeForm()">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Delete Confirmation Modal -->
      @if (deleteConfirmItem()) {
        <div class="modal-overlay" (click)="cancelDelete()">
          <div class="modal-content confirm-modal" (click)="$event.stopPropagation()">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{{ deleteConfirmItem()?.itemName }}"?</p>
            <div class="modal-actions">
              <button class="btn-delete" (click)="executeDelete()">Yes, Delete</button>
              <button class="btn-cancel" (click)="cancelDelete()">Cancel</button>
            </div>
          </div>
        </div>
      }

      <!-- Message -->
      @if (message()) {
        <div class="message" [class]="messageType()">
          {{ message() }}
        </div>
      }
    </div>
  `,
  styles: [`
    .inventory-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      flex-wrap: wrap;
      gap: 15px;
    }

    header h1 {
      color: #1e293b;
      font-size: 1.8rem;
    }

    .header-stats {
      display: flex;
      gap: 20px;
      color: #64748b;
      font-weight: 500;
    }

    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 15px;
      margin-bottom: 30px;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .search-box {
      flex: 1;
      min-width: 250px;
    }

    .search-box input {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
    }

    .search-box input:focus {
      outline: none;
      border-color: #2563eb;
    }

    .actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn-primary, .btn-secondary, .btn-edit, .btn-delete, .btn-cancel {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-size: 0.95rem;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #2563eb;
      color: white;
    }

    .btn-primary:hover {
      background: #1d4ed8;
    }

    .btn-secondary {
      background: #64748b;
      color: white;
    }

    .btn-secondary:hover {
      background: #475569;
    }

    .btn-edit {
      background: #3b82f6;
      color: white;
    }

    .btn-delete {
      background: #ef4444;
      color: white;
    }

    .btn-cancel {
      background: #64748b;
      color: white;
    }

    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    .no-items {
      grid-column: 1 / -1;
      text-align: center;
      padding: 60px 20px;
      color: #64748b;
      font-size: 1.2rem;
    }

    .item-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .item-card:hover {
      transform: translateY(-5px);
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      padding: 15px 20px;
      background: #f1f5f9;
    }

    .item-id {
      font-size: 0.85rem;
      color: #64748b;
      font-weight: 600;
    }

    .status {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-in-stock { background: #dcfce7; color: #166534; }
    .status-low-stock { background: #fef3c7; color: #92400e; }
    .status-out-of-stock { background: #fee2e2; color: #991b1b; }

    .item-name {
      padding: 15px 20px 10px;
      font-size: 1.3rem;
      color: #1e293b;
    }

    .item-details {
      padding: 0 20px 15px;
    }

    .item-details p {
      margin-bottom: 8px;
      color: #64748b;
    }

    .item-details strong {
      color: #1e293b;
    }

    .popular-badge {
      display: inline-block;
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      color: #78350f;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-top: 10px;
    }

    .comment {
      margin-top: 12px;
      padding: 10px;
      background: #f8fafc;
      border-left: 3px solid #2563eb;
      font-size: 0.9rem;
    }

    .item-actions {
      display: flex;
      gap: 10px;
      padding: 15px 20px;
      border-top: 1px solid #e2e8f0;
    }

    .item-actions button {
      flex: 1;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      padding: 20px;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 25px;
      border-bottom: 1px solid #e2e8f0;
      background: #f8fafc;
      border-radius: 12px 12px 0 0;
    }

    .modal-header h2 {
      font-size: 1.5rem;
      color: #1e293b;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 2rem;
      color: #64748b;
      cursor: pointer;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .close-btn:hover {
      background: #e2e8f0;
    }

    form {
      padding: 25px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #1e293b;
    }

    .form-group input, .form-group select, .form-group textarea {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
    }

    .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
      outline: none;
      border-color: #2563eb;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }

    .checkbox-group input[type="checkbox"] {
      width: 20px;
      height: 20px;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 25px;
    }

    .form-actions button {
      flex: 1;
    }

    .confirm-modal {
      text-align: center;
      padding: 30px;
    }

    .confirm-modal h3 {
      margin-bottom: 15px;
      color: #1e293b;
    }

    .confirm-modal p {
      margin-bottom: 25px;
      color: #64748b;
    }

    .modal-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .message {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 2000;
      animation: slideIn 0.3s ease;
    }

    .message-success { background: #22c55e; }
    .message-error { background: #ef4444; }

    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @media (max-width: 768px) {
      .toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .items-grid {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class InventoryComponent {
  inventoryService = inject(InventoryService);
  
  searchTerm = '';
  displayedItems = signal<InventoryItem[]>([]);
  showModal = signal(false);
  editingItem = signal<InventoryItem | null>(null);
  deleteConfirmItem = signal<InventoryItem | null>(null);
  message = signal('');
  messageType = signal<'success' | 'error'>('success');

  formData: {
    itemName: string;
    category: Category;
    quantity: number;
    price: number;
    supplierName: string;
    popularItem: boolean;
    comment: string;
  } = this.getEmptyForm();

  constructor() {
    this.displayedItems.set(this.inventoryService.inventory());
  }

  getEmptyForm() {
    return {
      itemName: '',
      category: 'Electronics' as Category,
      quantity: 0,
      price: 0,
      supplierName: '',
      popularItem: false,
      comment: ''
    };
  }

  onSearch() {
    if (!this.searchTerm) {
      this.displayedItems.set(this.inventoryService.inventory());
    } else {
      this.displayedItems.set(this.inventoryService.searchByName(this.searchTerm));
    }
  }

  showAll() {
    this.searchTerm = '';
    this.displayedItems.set(this.inventoryService.inventory());
  }

  showPopular() {
    this.searchTerm = '';
    this.displayedItems.set(this.inventoryService.getPopularItems());
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'In Stock': return 'status-in-stock';
      case 'Low Stock': return 'status-low-stock';
      case 'Out of Stock': return 'status-out-of-stock';
      default: return '';
    }
  }

  openForm(item?: InventoryItem) {
    if (item) {
      this.editingItem.set(item);
      this.formData = {
        itemName: item.itemName,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        supplierName: item.supplierName,
        popularItem: item.popularItem,
        comment: item.comment
      };
    } else {
      this.editingItem.set(null);
      this.formData = this.getEmptyForm();
    }
    this.showModal.set(true);
  }

  closeForm() {
    this.showModal.set(false);
    this.editingItem.set(null);
    this.formData = this.getEmptyForm();
  }

  saveItem() {
    if (!this.formData.itemName.trim()) {
      this.showMessage('Please enter an item name', 'error');
      return;
    }

    if (this.formData.quantity < 0 || isNaN(this.formData.quantity)) {
      this.showMessage('Please enter a valid quantity', 'error');
      return;
    }

    if (this.formData.price < 0 || isNaN(this.formData.price)) {
      this.showMessage('Please enter a valid price', 'error');
      return;
    }

    const editing = this.editingItem();
    if (editing) {
      this.inventoryService.updateItem(editing.itemId, {
        itemName: this.formData.itemName,
        category: this.formData.category,
        quantity: this.formData.quantity,
        price: this.formData.price,
        supplierName: this.formData.supplierName,
        popularItem: this.formData.popularItem,
        comment: this.formData.comment
      });
      this.showMessage(`Item "${this.formData.itemName}" updated successfully!`, 'success');
    } else {
      this.inventoryService.addItem({
        itemName: this.formData.itemName,
        category: this.formData.category,
        quantity: this.formData.quantity,
        price: this.formData.price,
        supplierName: this.formData.supplierName,
        popularItem: this.formData.popularItem,
        comment: this.formData.comment
      });
      this.showMessage(`Item "${this.formData.itemName}" added successfully!`, 'success');
    }

    this.displayedItems.set(this.inventoryService.inventory());
    this.closeForm();
  }

  confirmDelete(item: InventoryItem) {
    this.deleteConfirmItem.set(item);
  }

  cancelDelete() {
    this.deleteConfirmItem.set(null);
  }

  executeDelete() {
    const item = this.deleteConfirmItem();
    if (item) {
      this.inventoryService.deleteItem(item.itemId);
      this.displayedItems.set(this.inventoryService.inventory());
      this.showMessage(`Item "${item.itemName}" deleted successfully!`, 'success');
    }
    this.deleteConfirmItem.set(null);
  }

  showMessage(text: string, type: 'success' | 'error') {
    this.message.set(text);
    this.messageType.set(type);
    setTimeout(() => this.message.set(''), 3000);
  }
}