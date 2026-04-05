import { Injectable, signal, computed } from '@angular/core';
import { InventoryItem, Category, StockStatus, calculateStockStatus, generateItemId } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventorySignal = signal<InventoryItem[]>([
    {
      itemId: 'ITEM-A001',
      itemName: 'Laptop',
      category: 'Electronics',
      quantity: 15,
      price: 1299.99,
      supplierName: 'Tech Supplies Inc.',
      stockStatus: 'In Stock',
      popularItem: true,
      comment: 'High-performance business laptop'
    },
    {
      itemId: 'ITEM-B002',
      itemName: 'Office Chair',
      category: 'Furniture',
      quantity: 8,
      price: 249.99,
      supplierName: 'Comfort Seating Co.',
      stockStatus: 'In Stock',
      popularItem: false,
      comment: 'Ergonomic design with lumbar support'
    },
    {
      itemId: 'ITEM-C003',
      itemName: 'Winter Jacket',
      category: 'Clothing',
      quantity: 5,
      price: 89.99,
      supplierName: 'Fashion Wholesalers',
      stockStatus: 'Low Stock',
      popularItem: true,
      comment: 'Water-resistant winter jacket'
    },
    {
      itemId: 'ITEM-D004',
      itemName: 'Power Drill',
      category: 'Tools',
      quantity: 0,
      price: 79.99,
      supplierName: 'Hardware Pro',
      stockStatus: 'Out of Stock',
      popularItem: false,
      comment: '18V cordless drill - coming soon'
    }
  ]);

  readonly inventory = this.inventorySignal.asReadonly();
  
  readonly totalItems = computed(() => this.inventorySignal().length);
  readonly popularItemsCount = computed(() => this.inventorySignal().filter(item => item.popularItem).length);

  addItem(item: Omit<InventoryItem, 'itemId' | 'stockStatus'>): void {
    const newItem: InventoryItem = {
      ...item,
      itemId: generateItemId(),
      stockStatus: calculateStockStatus(item.quantity)
    };
    this.inventorySignal.update(items => [...items, newItem]);
  }

  updateItem(itemId: string, updates: Partial<InventoryItem>): void {
    this.inventorySignal.update(items => 
      items.map(item => {
        if (item.itemId === itemId) {
          const updated = { ...item, ...updates };
          if (updates.quantity !== undefined) {
            updated.stockStatus = calculateStockStatus(updates.quantity);
          }
          return updated;
        }
        return item;
      })
    );
  }

  deleteItem(itemId: string): void {
    this.inventorySignal.update(items => items.filter(item => item.itemId !== itemId));
  }

  getItemById(itemId: string): InventoryItem | undefined {
    return this.inventorySignal().find(item => item.itemId === itemId);
  }

  searchByName(searchTerm: string): InventoryItem[] {
    if (!searchTerm) return this.inventorySignal();
    const term = searchTerm.toLowerCase();
    return this.inventorySignal().filter(item => 
      item.itemName.toLowerCase().includes(term)
    );
  }

  filterByCategory(category: Category): InventoryItem[] {
    return this.inventorySignal().filter(item => item.category === category);
  }

  getPopularItems(): InventoryItem[] {
    return this.inventorySignal().filter(item => item.popularItem);
  }
}