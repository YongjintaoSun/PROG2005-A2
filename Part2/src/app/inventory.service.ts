/**
 * PROG2005 A2 - Part 2: Angular Inventory Service
 * Author: YongjintaoSun
 * Student ID: 24832902
 * Description: Service for managing inventory data in Angular app
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Category = 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';
export type PopularStatus = 'Yes' | 'No';

export interface InventoryItem {
  itemId: string;
  itemName: string;
  category: Category;
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: StockStatus;
  popularItem: PopularStatus;
  comment: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface InventoryStatistics {
  totalItems: number;
  totalQuantity: number;
  totalValue: number;
  popularCount: number;
  inStockCount: number;
  lowStockCount: number;
  outOfStockCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly CATEGORIES: Category[] = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Miscellaneous'];
  private readonly STOCK_STATUSES: StockStatus[] = ['In Stock', 'Low Stock', 'Out of Stock'];
  private readonly POPULAR_STATUSES: PopularStatus[] = ['Yes', 'No'];

  private inventory: InventoryItem[] = [];
  private inventorySubject = new BehaviorSubject<InventoryItem[]>([]);
  public inventory$ = this.inventorySubject.asObservable();

  constructor() {
    this.initializeSampleData();
  }

  getCategories(): Category[] {
    return [...this.CATEGORIES];
  }

  getStockStatuses(): StockStatus[] {
    return [...this.STOCK_STATUSES];
  }

  getPopularStatuses(): PopularStatus[] {
    return [...this.POPULAR_STATUSES];
  }

  validateItem(item: Partial<InventoryItem>, isUpdate: boolean = false): ValidationResult {
    const errors: string[] = [];

    if (!isUpdate && !item.itemId) {
      errors.push('Item ID is required');
    } else if (!isUpdate && item.itemId && this.isItemIdExists(item.itemId)) {
      errors.push('Item ID already exists');
    }

    if (!isUpdate && !item.itemName) {
      errors.push('Item Name is required');
    } else if (item.itemName && item.itemName.trim().length === 0) {
      errors.push('Item Name cannot be empty');
    }

    if (!isUpdate && !item.category) {
      errors.push('Category is required');
    } else if (item.category && !this.CATEGORIES.includes(item.category)) {
      errors.push('Invalid category');
    }

    if (!isUpdate && item.quantity === undefined) {
      errors.push('Quantity is required');
    } else if (item.quantity !== undefined && (isNaN(item.quantity) || item.quantity < 0)) {
      errors.push('Quantity must be non-negative');
    }

    if (!isUpdate && item.price === undefined) {
      errors.push('Price is required');
    } else if (item.price !== undefined && (isNaN(item.price) || item.price < 0)) {
      errors.push('Price must be non-negative');
    }

    if (!isUpdate && !item.supplierName) {
      errors.push('Supplier Name is required');
    } else if (item.supplierName && item.supplierName.trim().length === 0) {
      errors.push('Supplier Name cannot be empty');
    }

    if (!isUpdate && !item.stockStatus) {
      errors.push('Stock Status is required');
    } else if (item.stockStatus && !this.STOCK_STATUSES.includes(item.stockStatus)) {
      errors.push('Invalid stock status');
    }

    if (!isUpdate && !item.popularItem) {
      errors.push('Popular Item status is required');
    } else if (item.popularItem && !this.POPULAR_STATUSES.includes(item.popularItem)) {
      errors.push('Invalid popular item status');
    }

    return { isValid: errors.length === 0, errors };
  }

  private isItemIdExists(itemId: string): boolean {
    return this.inventory.some(item => item.itemId === itemId);
  }

  addItem(item: InventoryItem): { success: boolean; message: string } {
    const validation = this.validateItem(item);
    if (!validation.isValid) {
      return { success: false, message: 'Validation failed: ' + validation.errors.join(', ') };
    }

    if (this.isItemIdExists(item.itemId)) {
      return { success: false, message: 'Item ID already exists' };
    }

    this.inventory.push({ ...item });
    this.inventorySubject.next([...this.inventory]);
    return { success: true, message: `Item "${item.itemName}" added successfully` };
  }

  updateItem(itemName: string, updates: Partial<InventoryItem>): { success: boolean; message: string } {
    const index = this.inventory.findIndex(item => 
      item.itemName.toLowerCase() === itemName.toLowerCase()
    );

    if (index === -1) {
      return { success: false, message: `Item "${itemName}" not found` };
    }

    const updatedItem = { ...this.inventory[index], ...updates };
    const validation = this.validateItem(updatedItem, true);
    
    if (!validation.isValid) {
      return { success: false, message: 'Validation failed: ' + validation.errors.join(', ') };
    }

    if (updates.itemName && updates.itemName.toLowerCase() !== itemName.toLowerCase()) {
      const nameConflict = this.inventory.some((item, i) => 
        i !== index && item.itemName.toLowerCase() === updates.itemName!.toLowerCase()
      );
      if (nameConflict) {
        return { success: false, message: `Name "${updates.itemName}" already exists` };
      }
    }

    this.inventory[index] = updatedItem;
    this.inventorySubject.next([...this.inventory]);
    return { success: true, message: `Item "${itemName}" updated successfully` };
  }

  deleteItem(itemName: string): { success: boolean; message: string } {
    const index = this.inventory.findIndex(item => 
      item.itemName.toLowerCase() === itemName.toLowerCase()
    );

    if (index === -1) {
      return { success: false, message: `Item "${itemName}" not found` };
    }

    const deletedItem = this.inventory.splice(index, 1)[0];
    this.inventorySubject.next([...this.inventory]);
    return { success: true, message: `Item "${deletedItem.itemName}" deleted successfully` };
  }

  searchByName(searchTerm: string): InventoryItem[] {
    if (!searchTerm || searchTerm.trim().length === 0) {
      return [];
    }
    return this.inventory.filter(item =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getAllItems(): InventoryItem[] {
    return [...this.inventory];
  }

  getPopularItems(): InventoryItem[] {
    return this.inventory.filter(item => item.popularItem === 'Yes');
  }

  getItemByName(itemName: string): InventoryItem | undefined {
    return this.inventory.find(item =>
      item.itemName.toLowerCase() === itemName.toLowerCase()
    );
  }

  getStatistics(): InventoryStatistics {
    return {
      totalItems: this.inventory.length,
      totalQuantity: this.inventory.reduce((sum, item) => sum + item.quantity, 0),
      totalValue: this.inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      popularCount: this.inventory.filter(item => item.popularItem === 'Yes').length,
      inStockCount: this.inventory.filter(item => item.stockStatus === 'In Stock').length,
      lowStockCount: this.inventory.filter(item => item.stockStatus === 'Low Stock').length,
      outOfStockCount: this.inventory.filter(item => item.stockStatus === 'Out of Stock').length
    };
  }

  private initializeSampleData(): void {
    const sampleItems: InventoryItem[] = [
      {
        itemId: 'ELC001',
        itemName: 'MacBook Pro 16"',
        category: 'Electronics',
        quantity: 25,
        price: 3499.99,
        supplierName: 'Apple Inc.',
        stockStatus: 'In Stock',
        popularItem: 'Yes',
        comment: 'Latest M3 chip model'
      },
      {
        itemId: 'ELC002',
        itemName: 'Samsung 65" Smart TV',
        category: 'Electronics',
        quantity: 12,
        price: 1299.99,
        supplierName: 'Samsung Electronics',
        stockStatus: 'In Stock',
        popularItem: 'Yes',
        comment: '4K QLED display'
      },
      {
        itemId: 'FUR001',
        itemName: 'Ergonomic Office Chair',
        category: 'Furniture',
        quantity: 8,
        price: 399.99,
        supplierName: 'IKEA',
        stockStatus: 'Low Stock',
        popularItem: 'Yes',
        comment: 'Adjustable height and lumbar support'
      },
      {
        itemId: 'FUR002',
        itemName: 'Standing Desk',
        category: 'Furniture',
        quantity: 15,
        price: 599.99,
        supplierName: 'IKEA',
        stockStatus: 'In Stock',
        popularItem: 'No',
        comment: 'Electric height adjustment'
      },
      {
        itemId: 'CLO001',
        itemName: 'Winter Jacket',
        category: 'Clothing',
        quantity: 50,
        price: 89.99,
        supplierName: 'North Face',
        stockStatus: 'In Stock',
        popularItem: 'No',
        comment: 'Waterproof and insulated'
      },
      {
        itemId: 'TLS001',
        itemName: 'Power Drill Set',
        category: 'Tools',
        quantity: 0,
        price: 149.99,
        supplierName: 'DeWalt',
        stockStatus: 'Out of Stock',
        popularItem: 'No',
        comment: '20V cordless with 50 accessories'
      },
      {
        itemId: 'MSC001',
        itemName: 'Wireless Speaker',
        category: 'Miscellaneous',
        quantity: 30,
        price: 79.99,
        supplierName: 'JBL',
        stockStatus: 'In Stock',
        popularItem: 'Yes',
        comment: 'Bluetooth 5.0, waterproof'
      }
    ];

    this.inventory = sampleItems;
    this.inventorySubject.next([...this.inventory]);
  }
}
