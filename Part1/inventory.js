"use strict";
// TypeScript Inventory Management System
// PROG2005 A2 - Part 1
// Stock status calculation based on quantity
function calculateStockStatus(quantity) {
    if (quantity === 0)
        return 'Out of Stock';
    if (quantity < 10)
        return 'Low Stock';
    return 'In Stock';
}
// Generate unique item ID
function generateItemId() {
    return 'ITEM-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
}
// Inventory array (simulating database)
let inventory = [
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
let itemsContainer;
let searchInput;
let addForm;
// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    itemsContainer = document.getElementById('items-container');
    searchInput = document.getElementById('search-input');
    addForm = document.getElementById('add-form');
    renderInventory(inventory);
    setupEventListeners();
});
// Set up event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filtered = searchByName(searchTerm);
        renderInventory(filtered);
    });
    // Add item form submission
    const addBtn = document.getElementById('add-item-btn');
    addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener('click', showAddForm);
    // Close form buttons
    const closeBtn = document.getElementById('close-form-btn');
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', hideAddForm);
    const cancelBtn = document.getElementById('cancel-btn');
    cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.addEventListener('click', hideAddForm);
    // Save item
    const saveBtn = document.getElementById('save-item-btn');
    saveBtn === null || saveBtn === void 0 ? void 0 : saveBtn.addEventListener('click', saveItem);
}
// Render inventory items
function renderInventory(items) {
    if (items.length === 0) {
        itemsContainer.innerHTML = '<div class="no-items">No items found</div>';
        return;
    }
    itemsContainer.innerHTML = items.map((item) => `
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
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
// Get CSS class for stock status
function getStatusClass(status) {
    switch (status) {
        case 'In Stock': return 'status-in-stock';
        case 'Low Stock': return 'status-low-stock';
        case 'Out of Stock': return 'status-out-of-stock';
        default: return '';
    }
}
// Search by item name
function searchByName(searchTerm) {
    if (!searchTerm)
        return inventory;
    return inventory.filter((item) => item.itemName.toLowerCase().includes(searchTerm));
}
// Display all items
function displayAllItems() {
    searchInput.value = '';
    renderInventory(inventory);
}
// Display popular items only
function displayPopularItems() {
    searchInput.value = '';
    const popularItems = inventory.filter((item) => item.popularItem);
    renderInventory(popularItems);
}
// Show add form
function showAddForm() {
    addForm.classList.add('active');
    clearForm();
}
// Hide add form
function hideAddForm() {
    addForm.classList.remove('active');
    clearForm();
}
// Clear form fields
function clearForm() {
    document.getElementById('item-name').value = '';
    document.getElementById('category').value = 'Electronics';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
    document.getElementById('supplier-name').value = '';
    document.getElementById('popular').checked = false;
    document.getElementById('comment').value = '';
}
// Save item (add or update)
function saveItem() {
    const nameInput = document.getElementById('item-name');
    const categoryInput = document.getElementById('category');
    const quantityInput = document.getElementById('quantity');
    const priceInput = document.getElementById('price');
    const supplierInput = document.getElementById('supplier-name');
    const popularInput = document.getElementById('popular');
    const commentInput = document.getElementById('comment');
    // Validation
    const itemName = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceInput.value);
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
    const category = categoryInput.value;
    const supplierName = supplierInput.value.trim();
    const stockStatus = calculateStockStatus(quantity);
    const popularItem = popularInput.checked;
    const comment = commentInput.value.trim();
    // Check if editing or adding
    const editItemId = document.getElementById('save-item-btn').dataset.itemId;
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
    }
    else {
        // Add new item
        const newItem = {
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
function addItem(item) {
    inventory.push(item);
    showMessage(`Item "${item.itemName}" added successfully!`, 'success');
}
// Update existing item
function updateItem(itemId, updates) {
    const index = inventory.findIndex((item) => item.itemId === itemId);
    if (index !== -1) {
        inventory[index] = Object.assign(Object.assign({}, inventory[index]), updates);
        showMessage(`Item "${updates.itemName}" updated successfully!`, 'success');
    }
}
// Edit item - populate form with item data
function editItem(itemId) {
    const item = inventory.find((i) => i.itemId === itemId);
    if (!item)
        return;
    document.getElementById('item-name').value = item.itemName;
    document.getElementById('category').value = item.category;
    document.getElementById('quantity').value = item.quantity.toString();
    document.getElementById('price').value = item.price.toString();
    document.getElementById('supplier-name').value = item.supplierName;
    document.getElementById('popular').checked = item.popularItem;
    document.getElementById('comment').value = item.comment;
    const saveBtn = document.getElementById('save-item-btn');
    saveBtn.dataset.itemId = itemId;
    addForm.classList.add('active');
    showMessage(`Editing "${item.itemName}"...`, 'info');
}
// Delete item with confirmation
function deleteItem(itemName) {
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
function confirmDelete(itemName) {
    const index = inventory.findIndex((item) => item.itemName === itemName);
    if (index !== -1) {
        const deletedItem = inventory.splice(index, 1)[0];
        showMessage(`Item "${deletedItem.itemName}" deleted successfully!`, 'success');
        renderInventory(inventory);
    }
    closeModal();
}
// Close modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    modal === null || modal === void 0 ? void 0 : modal.remove();
}
// Update item by name
function updateItemByName(itemName, updates) {
    const index = inventory.findIndex((item) => item.itemName.toLowerCase() === itemName.toLowerCase());
    if (index !== -1) {
        inventory[index] = Object.assign(Object.assign({}, inventory[index]), updates);
        return true;
    }
    return false;
}
// Show message to user
function showMessage(message, type) {
    const messageBox = document.createElement('div');
    messageBox.className = `message-box message-${type}`;
    messageBox.innerHTML = message;
    document.body.appendChild(messageBox);
    setTimeout(() => {
        messageBox.classList.add('show');
    }, 10);
    setTimeout(() => {
        messageBox.classList.remove('show');
        setTimeout(() => messageBox.remove(), 300);
    }, 3000);
}
// Export functions for global access
window.editItem = editItem;
window.deleteItem = deleteItem;
window.confirmDelete = confirmDelete;
window.closeModal = closeModal;
window.displayAllItems = displayAllItems;
window.displayPopularItems = displayPopularItems;
