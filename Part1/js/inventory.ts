/**
 * PROG2005 A2 - Part 1: TypeScript Inventory Management System
 * Author: YongjintaoSun
 * Student ID: 24832902
 * Description: A TypeScript-based inventory management system for Harvey Norman database
 */

// ==================== Type Definitions ====================

/**
 * Category type for inventory items
 */
type Category = 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';

/**
 * Stock status type for inventory items
 */
type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

/**
 * Popular item status type
 */
type PopularStatus = 'Yes' | 'No';

/**
 * Inventory item interface
 */
interface InventoryItem {
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

/**
 * Search result interface
 */
interface SearchResult {
    found: boolean;
    items: InventoryItem[];
    message: string;
}

/**
 * Validation result interface
 */
interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

// ==================== Inventory Management Class ====================

/**
 * Main inventory management class
 */
class InventoryManager {
    private inventory: InventoryItem[] = [];
    private readonly CATEGORIES: Category[] = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Miscellaneous'];
    private readonly STOCK_STATUSES: StockStatus[] = ['In Stock', 'Low Stock', 'Out of Stock'];
    private readonly POPULAR_STATUSES: PopularStatus[] = ['Yes', 'No'];

    /**
     * Get all categories
     */
    getCategories(): Category[] {
        return [...this.CATEGORIES];
    }

    /**
     * Get all stock statuses
     */
    getStockStatuses(): StockStatus[] {
        return [...this.STOCK_STATUSES];
    }

    /**
     * Get all popular statuses
     */
    getPopularStatuses(): PopularStatus[] {
        return [...this.POPULAR_STATUSES];
    }

    /**
     * Validate item data
     */
    validateItem(item: Partial<InventoryItem>, isUpdate: boolean = false): ValidationResult {
        const errors: string[] = [];

        // Item ID validation (required for new items)
        if (!isUpdate && !item.itemId) {
            errors.push('Item ID is required');
        } else if (!isUpdate && item.itemId && this.isItemIdExists(item.itemId)) {
            errors.push('Item ID already exists. Each item must have a unique ID.');
        }

        // Item name validation
        if (!isUpdate && !item.itemName) {
            errors.push('Item Name is required');
        } else if (item.itemName && item.itemName.trim().length === 0) {
            errors.push('Item Name cannot be empty');
        }

        // Category validation
        if (!isUpdate && !item.category) {
            errors.push('Category is required');
        } else if (item.category && !this.CATEGORIES.includes(item.category)) {
            errors.push('Invalid category selected');
        }

        // Quantity validation
        if (!isUpdate && item.quantity === undefined) {
            errors.push('Quantity is required');
        } else if (item.quantity !== undefined && (isNaN(item.quantity) || item.quantity < 0)) {
            errors.push('Quantity must be a non-negative number');
        }

        // Price validation
        if (!isUpdate && item.price === undefined) {
            errors.push('Price is required');
        } else if (item.price !== undefined && (isNaN(item.price) || item.price < 0)) {
            errors.push('Price must be a non-negative number');
        }

        // Supplier name validation
        if (!isUpdate && !item.supplierName) {
            errors.push('Supplier Name is required');
        } else if (item.supplierName && item.supplierName.trim().length === 0) {
            errors.push('Supplier Name cannot be empty');
        }

        // Stock status validation
        if (!isUpdate && !item.stockStatus) {
            errors.push('Stock Status is required');
        } else if (item.stockStatus && !this.STOCK_STATUSES.includes(item.stockStatus)) {
            errors.push('Invalid stock status selected');
        }

        // Popular item validation
        if (!isUpdate && !item.popularItem) {
            errors.push('Popular Item status is required');
        } else if (item.popularItem && !this.POPULAR_STATUSES.includes(item.popularItem)) {
            errors.push('Invalid popular item status selected');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Check if item ID already exists
     */
    private isItemIdExists(itemId: string): boolean {
        return this.inventory.some(item => item.itemId === itemId);
    }

    /**
     * Add a new item to inventory
     */
    addItem(item: InventoryItem): { success: boolean; message: string } {
        const validation = this.validateItem(item);
        if (!validation.isValid) {
            return {
                success: false,
                message: 'Validation failed: ' + validation.errors.join(', ')
            };
        }

        if (this.isItemIdExists(item.itemId)) {
            return {
                success: false,
                message: 'Item ID already exists. Each item must have a unique ID.'
            };
        }

        this.inventory.push({ ...item });
        return {
            success: true,
            message: `Item "${item.itemName}" has been added successfully.`
        };
    }

    /**
     * Update an existing item by name
     */
    updateItem(itemName: string, updates: Partial<InventoryItem>): { success: boolean; message: string } {
        const index = this.inventory.findIndex(item => 
            item.itemName.toLowerCase() === itemName.toLowerCase()
        );

        if (index === -1) {
            return {
                success: false,
                message: `Item with name "${itemName}" not found.`
            };
        }

        // Validate updates
        const updatedItem = { ...this.inventory[index], ...updates };
        const validation = this.validateItem(updatedItem, true);
        
        if (!validation.isValid) {
            return {
                success: false,
                message: 'Validation failed: ' + validation.errors.join(', ')
            };
        }

        // Check if new item name conflicts with existing items (excluding current item)
        if (updates.itemName && updates.itemName.toLowerCase() !== itemName.toLowerCase()) {
            const nameConflict = this.inventory.some((item, i) => 
                i !== index && item.itemName.toLowerCase() === updates.itemName!.toLowerCase()
            );
            if (nameConflict) {
                return {
                    success: false,
                    message: `Another item with name "${updates.itemName}" already exists.`
                };
            }
        }

        this.inventory[index] = updatedItem;
        return {
            success: true,
            message: `Item "${itemName}" has been updated successfully.`
        };
    }

    /**
     * Delete an item by name
     */
    deleteItem(itemName: string): { success: boolean; message: string } {
        const index = this.inventory.findIndex(item => 
            item.itemName.toLowerCase() === itemName.toLowerCase()
        );

        if (index === -1) {
            return {
                success: false,
                message: `Item with name "${itemName}" not found.`
            };
        }

        const deletedItem = this.inventory.splice(index, 1)[0];
        return {
            success: true,
            message: `Item "${deletedItem.itemName}" has been deleted successfully.`
        };
    }

    /**
     * Search items by name
     */
    searchByName(searchTerm: string): SearchResult {
        if (!searchTerm || searchTerm.trim().length === 0) {
            return {
                found: false,
                items: [],
                message: 'Please enter a search term.'
            };
        }

        const results = this.inventory.filter(item =>
            item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (results.length === 0) {
            return {
                found: false,
                items: [],
                message: `No items found matching "${searchTerm}".`
            };
        }

        return {
            found: true,
            items: results,
            message: `Found ${results.length} item(s) matching "${searchTerm}".`
        };
    }

    /**
     * Get all items
     */
    getAllItems(): InventoryItem[] {
        return [...this.inventory];
    }

    /**
     * Get popular items only
     */
    getPopularItems(): InventoryItem[] {
        return this.inventory.filter(item => item.popularItem === 'Yes');
    }

    /**
     * Get item by name
     */
    getItemByName(itemName: string): InventoryItem | undefined {
        return this.inventory.find(item =>
            item.itemName.toLowerCase() === itemName.toLowerCase()
        );
    }

    /**
     * Get item by ID
     */
    getItemById(itemId: string): InventoryItem | undefined {
        return this.inventory.find(item => item.itemId === itemId);
    }

    /**
     * Get inventory statistics
     */
    getStatistics(): {
        totalItems: number;
        totalQuantity: number;
        totalValue: number;
        popularCount: number;
        inStockCount: number;
        lowStockCount: number;
        outOfStockCount: number;
    } {
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

    /**
     * Initialize with sample data
     */
    initializeSampleData(): void {
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
    }
}

// ==================== UI Controller Class ====================

/**
 * UI Controller for managing the user interface
 */
class UIController {
    private inventoryManager: InventoryManager;
    private currentEditItemName: string | null = null;

    constructor() {
        this.inventoryManager = new InventoryManager();
        this.inventoryManager.initializeSampleData();
        this.initializeEventListeners();
        this.renderAllItems();
        this.renderStatistics();
    }

    /**
     * Initialize event listeners
     */
    private initializeEventListeners(): void {
        // Tab navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Add item form
        const addItemBtn = document.getElementById('addItemBtn');
        if (addItemBtn) {
            addItemBtn.addEventListener('click', () => this.handleAddItem());
        }

        // Search functionality
        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e));
        }

        // Category filter for search
        const categoryFilter = document.getElementById('categoryFilter') as HTMLSelectElement;
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.handleFilter());
        }
    }

    /**
     * Handle navigation between sections
     */
    private handleNavigation(event: Event): void {
        const target = event.currentTarget as HTMLElement;
        const section = target.getAttribute('data-section');

        // Update active button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        target.classList.add('active');

        // Show selected section
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        const selectedSection = document.getElementById(section + '-section');
        if (selectedSection) {
            selectedSection.classList.add('active');
        }

        // Refresh content based on section
        if (section === 'view-all') {
            this.renderAllItems();
        } else if (section === 'popular') {
            this.renderPopularItems();
        } else if (section === 'statistics') {
            this.renderStatistics();
        }
    }

    /**
     * Handle add item form submission
     */
    private handleAddItem(): void {
        const form = document.getElementById('addItemForm') as HTMLFormElement;
        const formData = new FormData(form);

        const item: InventoryItem = {
            itemId: formData.get('itemId') as string,
            itemName: formData.get('itemName') as string,
            category: formData.get('category') as Category,
            quantity: parseInt(formData.get('quantity') as string) || 0,
            price: parseFloat(formData.get('price') as string) || 0,
            supplierName: formData.get('supplierName') as string,
            stockStatus: formData.get('stockStatus') as StockStatus,
            popularItem: formData.get('popularItem') as PopularStatus,
            comment: formData.get('comment') as string || ''
        };

        const result = this.inventoryManager.addItem(item);
        this.showMessage(result.message, result.success ? 'success' : 'error');

        if (result.success) {
            form.reset();
            this.renderAllItems();
            this.renderStatistics();
        }
    }

    /**
     * Handle search input
     */
    private handleSearch(event: Event): void {
        const searchInput = event.target as HTMLInputElement;
        const searchTerm = searchInput.value;
        const result = this.inventoryManager.searchByName(searchTerm);
        
        this.renderSearchResults(result);
    }

    /**
     * Handle category filter
     */
    private handleFilter(): void {
        const categoryFilter = document.getElementById('categoryFilter') as HTMLSelectElement;
        const selectedCategory = categoryFilter.value;
        
        if (selectedCategory === 'all') {
            this.renderAllItems();
        } else {
            const filtered = this.inventoryManager.getAllItems().filter(
                item => item.category === selectedCategory
            );
            this.renderItemList(filtered, 'items-container');
        }
    }

    /**
     * Show message to user
     */
    private showMessage(message: string, type: 'success' | 'error' | 'info'): void {
        const messageContainer = document.getElementById('message-container');
        if (!messageContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = message;
        messageContainer.innerHTML = '';
        messageContainer.appendChild(messageDiv);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    /**
     * Render all items
     */
    private renderAllItems(): void {
        const items = this.inventoryManager.getAllItems();
        this.renderItemList(items, 'items-container');
    }

    /**
     * Render popular items
     */
    private renderPopularItems(): void {
        const items = this.inventoryManager.getPopularItems();
        this.renderItemList(items, 'popular-items-container');
    }

    /**
     * Render search results
     */
    private renderSearchResults(result: SearchResult): void {
        const container = document.getElementById('search-results');
        if (!container) return;

        if (!result.found) {
            container.innerHTML = `<div class="no-results">${result.message}</div>`;
            return;
        }

        this.renderItemList(result.items, 'search-results');
    }

    /**
     * Render item list
     */
    private renderItemList(items: InventoryItem[], containerId: string): void {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (items.length === 0) {
            container.innerHTML = '<div class="no-items">No items to display.</div>';
            return;
        }

        const tableHTML = `
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
                    ${items.map(item => this.renderItemRow(item)).join('')}
                </tbody>
            </table>
        `;

        container.innerHTML = tableHTML;

        // Add event listeners for edit and delete buttons
        container.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleEditClick(e));
        });
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleDeleteClick(e));
        });
    }

    /**
     * Render single item row
     */
    private renderItemRow(item: InventoryItem): string {
        const statusClass = item.stockStatus.toLowerCase().replace(' ', '-');
        return `
            <tr class="${statusClass}">
                <td>${this.escapeHtml(item.itemId)}</td>
                <td>${this.escapeHtml(item.itemName)}</td>
                <td>${this.escapeHtml(item.category)}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${this.escapeHtml(item.supplierName)}</td>
                <td><span class="status-badge ${statusClass}">${item.stockStatus}</span></td>
                <td>${item.popularItem}</td>
                <td>
                    <button class="edit-btn" data-item-name="${this.escapeHtml(item.itemName)}">Edit</button>
                    <button class="delete-btn" data-item-name="${this.escapeHtml(item.itemName)}">Delete</button>
                </td>
            </tr>
        `;
    }

    /**
     * Handle edit button click
     */
    private handleEditClick(event: Event): void {
        const target = event.currentTarget as HTMLElement;
        const itemName = target.getAttribute('data-item-name');
        if (!itemName) return;

        const item = this.inventoryManager.getItemByName(itemName);
        if (!item) return;

        this.currentEditItemName = itemName;
        this.showEditModal(item);
    }

    /**
     * Show edit modal
     */
    private showEditModal(item: InventoryItem): void {
        const modal = document.getElementById('editModal');
        if (!modal) return;

        // Populate form
        (document.getElementById('editItemName') as HTMLInputElement).value = item.itemName;
        (document.getElementById('editCategory') as HTMLSelectElement).value = item.category;
        (document.getElementById('editQuantity') as HTMLInputElement).value = item.quantity.toString();
        (document.getElementById('editPrice') as HTMLInputElement).value = item.price.toString();
        (document.getElementById('editSupplierName') as HTMLInputElement).value = item.supplierName;
        (document.getElementById('editStockStatus') as HTMLSelectElement).value = item.stockStatus;
        (document.getElementById('editPopularItem') as HTMLSelectElement).value = item.popularItem;
        (document.getElementById('editComment') as HTMLTextAreaElement).value = item.comment;

        modal.style.display = 'flex';

        // Add event listeners
        const saveBtn = document.getElementById('saveEditBtn');
        const cancelBtn = document.getElementById('cancelEditBtn');
        const closeModal = document.getElementById('closeModal');

        if (saveBtn) {
            saveBtn.onclick = () => this.handleSaveEdit();
        }
        if (cancelBtn) {
            cancelBtn.onclick = () => this.hideEditModal();
        }
        if (closeModal) {
            closeModal.onclick = () => this.hideEditModal();
        }
    }

    /**
     * Hide edit modal
     */
    private hideEditModal(): void {
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.style.display = 'none';
        }
        this.currentEditItemName = null;
    }

    /**
     * Handle save edit
     */
    private handleSaveEdit(): void {
        if (!this.currentEditItemName) return;

        const updates: Partial<InventoryItem> = {
            itemName: (document.getElementById('editItemName') as HTMLInputElement).value,
            category: (document.getElementById('editCategory') as HTMLSelectElement).value as Category,
            quantity: parseInt((document.getElementById('editQuantity') as HTMLInputElement).value) || 0,
            price: parseFloat((document.getElementById('editPrice') as HTMLInputElement).value) || 0,
            supplierName: (document.getElementById('editSupplierName') as HTMLInputElement).value,
            stockStatus: (document.getElementById('editStockStatus') as HTMLSelectElement).value as StockStatus,
            popularItem: (document.getElementById('editPopularItem') as HTMLSelectElement).value as PopularStatus,
            comment: (document.getElementById('editComment') as HTMLTextAreaElement).value
        };

        const result = this.inventoryManager.updateItem(this.currentEditItemName, updates);
        this.showMessage(result.message, result.success ? 'success' : 'error');

        if (result.success) {
            this.hideEditModal();
            this.renderAllItems();
            this.renderStatistics();
        }
    }

    /**
     * Handle delete button click
     */
    private handleDeleteClick(event: Event): void {
        const target = event.currentTarget as HTMLElement;
        const itemName = target.getAttribute('data-item-name');
        if (!itemName) return;

        this.showDeleteConfirmation(itemName);
    }

    /**
     * Show delete confirmation
     */
    private showDeleteConfirmation(itemName: string): void {
        const modal = document.getElementById('deleteModal');
        const itemNameSpan = document.getElementById('deleteItemName');
        
        if (!modal || !itemNameSpan) return;

        itemNameSpan.textContent = itemName;
        modal.style.display = 'flex';

        const confirmBtn = document.getElementById('confirmDeleteBtn');
        const cancelBtn = document.getElementById('cancelDeleteBtn');
        const closeModal = document.getElementById('closeDeleteModal');

        if (confirmBtn) {
            confirmBtn.onclick = () => {
                this.performDelete(itemName);
                this.hideDeleteModal();
            };
        }
        if (cancelBtn) {
            cancelBtn.onclick = () => this.hideDeleteModal();
        }
        if (closeModal) {
            closeModal.onclick = () => this.hideDeleteModal();
        }
    }

    /**
     * Hide delete modal
     */
    private hideDeleteModal(): void {
        const modal = document.getElementById('deleteModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    /**
     * Perform delete
     */
    private performDelete(itemName: string): void {
        const result = this.inventoryManager.deleteItem(itemName);
        this.showMessage(result.message, result.success ? 'success' : 'error');

        if (result.success) {
            this.renderAllItems();
            this.renderStatistics();
        }
    }

    /**
     * Render statistics
     */
    private renderStatistics(): void {
        const stats = this.inventoryManager.getStatistics();
        const container = document.getElementById('statistics-container');
        
        if (!container) return;

        container.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Total Items</h3>
                    <p class="stat-value">${stats.totalItems}</p>
                </div>
                <div class="stat-card">
                    <h3>Total Quantity</h3>
                    <p class="stat-value">${stats.totalQuantity}</p>
                </div>
                <div class="stat-card">
                    <h3>Total Value</h3>
                    <p class="stat-value">$${stats.totalValue.toFixed(2)}</p>
                </div>
                <div class="stat-card">
                    <h3>Popular Items</h3>
                    <p class="stat-value">${stats.popularCount}</p>
                </div>
                <div class="stat-card in-stock">
                    <h3>In Stock</h3>
                    <p class="stat-value">${stats.inStockCount}</p>
                </div>
                <div class="stat-card low-stock">
                    <h3>Low Stock</h3>
                    <p class="stat-value">${stats.lowStockCount}</p>
                </div>
                <div class="stat-card out-of-stock">
                    <h3>Out of Stock</h3>
                    <p class="stat-value">${stats.outOfStockCount}</p>
                </div>
            </div>
        `;
    }

    /**
     * Escape HTML to prevent XSS
     */
    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ==================== Application Initialization ====================

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UIController();
});
