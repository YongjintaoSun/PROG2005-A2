// TypeScript Inventory Management System
// PROG2005 A2 - Part 1

// Type definitions
interface InventoryItem {
    itemId: string;
    itemName: string;
    category: Category;
    quantity: number;
    price: number;
    supplierName: string;
    stockStatus: StockStatus;
    popularItem: boolean;
    comment: string;
}

type Category = 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

// Stock status calculation based on quantity
function calculateStockStatus(quantity: number): StockStatus {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 10) return 'Low Stock';
    return 'In Stock';
}

// Generate unique item ID
function generateItemId(): string {
    return 'ITEM-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
}

// Inventory array (simulating database)
let inventory: InventoryItem[] = [
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
];

// DOM Elements
let itemsContainer: HTMLElement;
let searchInput: HTMLInputElement;
let addForm: HTMLElement;

// Initialize the application
document.addEventListener('DOMContentLoaded', (): void => {
    itemsContainer = document.getElementById('items-container')!;
    searchInput = document.getElementById('search-input') as HTMLInputElement;
    addForm = document.getElementById('add-form')!;
    
    renderInventory(inventory);
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners(): void {
    // Search functionality
    searchInput.addEventListener('input', (): void => {
        const searchTerm: string = searchInput.value.toLowerCase();
        const filtered: InventoryItem[] = searchByName(searchTerm);
        renderInventory(filtered);
    });
    
    // Add item form submission
    const addBtn = document.getElementById('add-item-btn');
    addBtn?.addEventListener('click', showAddForm);
    
    // Close form buttons
    const closeBtn = document.getElementById('close-form-btn');
    closeBtn?.addEventListener('click', hideAddForm);
    
    const cancelBtn = document.getElementById('cancel-btn');
    cancelBtn?.addEventListener('click', hideAddForm);
    
    // Save item
    const saveBtn = document.getElementById('save-item-btn');
    saveBtn?.addEventListener('click', saveItem);
}

// Render inventory items
function renderInventory(items: InventoryItem[]): void {
    if (items.length === 0) {
        itemsContainer.innerHTML = '<div class="no-items">No items found</div>';
        return;
    }
    
    itemsContainer.innerHTML = items.map((item: InventoryItem): string => `
        <div class="item-card">
            <div class="item-header">
                <span class="item-id">${escapeHtml(item.itemId)}</span>
                <span class="stock-status ${getStatusClass(item.stockStatus)}">${escapeHtml(item.stockStatus)}</span>
            </div>
            <h3 class="item-name">${escapeHtml(item.itemName)}</h3>
            <div class="item-details">
                <p><strong>Category:</strong> ${escapeHtml(item.category)}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
                <p><strong>Supplier:</strong> ${escapeHtml(item.supplierName)}</p>
                ${item.popularItem ? '<span class="popular-badge">⭐ Popular</span>' : ''}
                ${item.comment ? `<p class="comment"><em>"${escapeHtml(item.comment)}"</em></p>` : ''}
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editItem('${item.itemId}')">Edit</button>
                <button class="btn-delete" onclick="deleteItem('${item.itemName}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Get CSS class for stock status
function getStatusClass(status: StockStatus): string {
    switch (status) {
        case 'In Stock': return 'status-in-stock';
        case 'Low Stock': return 'status-low-stock';
        case 'Out of Stock': return 'status-out-of-stock';
        default: return '';
    }
}

// Search by item name
function searchByName(searchTerm: string): InventoryItem[] {
    if (!searchTerm) return inventory;
    return inventory.filter((item: InventoryItem): boolean => 
        item.itemName.toLowerCase().includes(searchTerm)
    );
}

// Display all items
function displayAllItems(): void {
    searchInput.value = '';
    renderInventory(inventory);
}

// Display popular items only
function displayPopularItems(): void {
    searchInput.value = '';
    const popularItems: InventoryItem[] = inventory.filter((item: InventoryItem): boolean => item.popularItem);
    renderInventory(popularItems);
}

// Show add form
function showAddForm(): void {
    addForm.classList.add('active');
    clearForm();
}

// Hide add form
function hideAddForm(): void {
    addForm.classList.remove('active');
    clearForm();
}

// Clear form fields
function clearForm(): void {
    (document.getElementById('item-name') as HTMLInputElement).value = '';
    (document.getElementById('category') as HTMLSelectElement).value = 'Electronics';
    (document.getElementById('quantity') as HTMLInputElement).value = '';
    (document.getElementById('price') as HTMLInputElement).value = '';
    (document.getElementById('supplier-name') as HTMLInputElement).value = '';
    (document.getElementById('popular') as HTMLInputElement).checked = false;
    (document.getElementById('comment') as HTMLTextAreaElement).value = '';
}

// Save item (add or update)
function saveItem(): void {
    const nameInput = document.getElementById('item-name') as HTMLInputElement;
    const categoryInput = document.getElementById('category') as HTMLSelectElement;
    const quantityInput = document.getElementById('quantity') as HTMLInputElement;
    const priceInput = document.getElementById('price') as HTMLInputElement;
    const supplierInput = document.getElementById('supplier-name') as HTMLInputElement;
    const popularInput = document.getElementById('popular') as HTMLInputElement;
    const commentInput = document.getElementById('comment') as HTMLTextAreaElement;
    
    // Validation
    const itemName: string = nameInput.value.trim();
    const quantity: number = parseInt(quantityInput.value);
    const price: number = parseFloat(priceInput.value);
    
    if (!itemName) {
        showMessage('Please enter an item name', 'error');
        return;
    }
    
    if (isNaN(quantity) || quantity < 0) {
        showMessage('Please enter a valid quantity', 'error');
        return;
    }
    
    if (isNaN(price) || price < 0) {
        showMessage('Please enter a valid price', 'error');
        return;
    }
    
    const category: Category = categoryInput.value as Category;
    const supplierName: string = supplierInput.value.trim();
    const stockStatus: StockStatus = calculateStockStatus(quantity);
    const popularItem: boolean = popularInput.checked;
    const comment: string = commentInput.value.trim();
    
    // Check if editing or adding
    const editItemId = (document.getElementById('save-item-btn') as HTMLButtonElement).dataset.itemId;
    
    if (editItemId) {
        // Update existing item
        updateItem(editItemId, {
            itemName,
            category,
            quantity,
            price,
            supplierName,
            stockStatus,
            popularItem,
            comment
        });
    } else {
        // Add new item
        const newItem: InventoryItem = {
            itemId: generateItemId(),
            itemName,
            category,
            quantity,
            price,
            supplierName,
            stockStatus,
            popularItem,
            comment
        };
        addItem(newItem);
    }
    
    hideAddForm();
    renderInventory(inventory);
}

// Add new item
function addItem(item: InventoryItem): void {
    inventory.push(item);
    showMessage(`Item "${item.itemName}" added successfully!`, 'success');
}

// Update existing item
function updateItem(itemId: string, updates: Partial<InventoryItem>): void {
    const index: number = inventory.findIndex((item: InventoryItem): boolean => item.itemId === itemId);
    if (index !== -1) {
        inventory[index] = { ...inventory[index], ...updates };
        showMessage(`Item "${updates.itemName}" updated successfully!`, 'success');
    }
}

// Edit item - populate form with item data
function editItem(itemId: string): void {
    const item: InventoryItem | undefined = inventory.find((i: InventoryItem): boolean => i.itemId === itemId);
    if (!item) return;
    
    (document.getElementById('item-name') as HTMLInputElement).value = item.itemName;
    (document.getElementById('category') as HTMLSelectElement).value = item.category;
    (document.getElementById('quantity') as HTMLInputElement).value = item.quantity.toString();
    (document.getElementById('price') as HTMLInputElement).value = item.price.toString();
    (document.getElementById('supplier-name') as HTMLInputElement).value = item.supplierName;
    (document.getElementById('popular') as HTMLInputElement).checked = item.popularItem;
    (document.getElementById('comment') as HTMLTextAreaElement).value = item.comment;
    
    const saveBtn = document.getElementById('save-item-btn') as HTMLButtonElement;
    saveBtn.dataset.itemId = itemId;
    
    addForm.classList.add('active');
    showMessage(`Editing "${item.itemName}"...`, 'info');
}

// Delete item with confirmation
function deleteItem(itemName: string): void {
    const confirmMessage = `Are you sure you want to delete "${itemName}"?`;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Confirm Delete</h3>
            <p>${escapeHtml(confirmMessage)}</p>
            <div class="modal-actions">
                <button class="btn-confirm" onclick="confirmDelete('${escapeHtml(itemName)}')">Yes, Delete</button>
                <button class="btn-cancel" onclick="closeModal()">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Confirm delete
function confirmDelete(itemName: string): void {
    const index: number = inventory.findIndex((item: InventoryItem): boolean => item.itemName === itemName);
    if (index !== -1) {
        const deletedItem: InventoryItem = inventory.splice(index, 1)[0];
        showMessage(`Item "${deletedItem.itemName}" deleted successfully!`, 'success');
        renderInventory(inventory);
    }
    closeModal();
}

// Close modal
function closeModal(): void {
    const modal = document.querySelector('.modal-overlay');
    modal?.remove();
}

// Update item by name
function updateItemByName(itemName: string, updates: Partial<InventoryItem>): boolean {
    const index: number = inventory.findIndex((item: InventoryItem): boolean => 
        item.itemName.toLowerCase() === itemName.toLowerCase()
    );
    
    if (index !== -1) {
        inventory[index] = { ...inventory[index], ...updates };
        return true;
    }
    return false;
}

// Show message to user
function showMessage(message: string, type: 'success' | 'error' | 'info'): void {
    const messageBox = document.createElement('div');
    messageBox.className = `message-box message-${type}`;
    messageBox.innerHTML = message;
    document.body.appendChild(messageBox);
    
    setTimeout((): void => {
        messageBox.classList.add('show');
    }, 10);
    
    setTimeout((): void => {
        messageBox.classList.remove('show');
        setTimeout((): void => messageBox.remove(), 300);
    }, 3000);
}

// Export functions for global access
(window as any).editItem = editItem;
(window as any).deleteItem = deleteItem;
(window as any).confirmDelete = confirmDelete;
(window as any).closeModal = closeModal;
(window as any).displayAllItems = displayAllItems;
(window as any).displayPopularItems = displayPopularItems;