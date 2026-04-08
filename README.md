# PROG2005 A2 - Inventory Management System

**Author:** YongjintaoSun  
**Student ID:** 24832902  
**Course:** PROG2005 Programming Mobile Systems  
**University:** Southern Cross University

---

## 📋 Project Overview

This repository contains the complete solution for PROG2005 Assessment 2, consisting of:

- **Part 1:** TypeScript-based Inventory Management System
- **Part 2:** Angular Multi-page Application
- **Part 3:** GenAI Report

---

## 🗂️ Repository Structure

```
PROG2005-A2/
├── Part1/                          # TypeScript Inventory System
│   ├── index.html                  # Main HTML file
│   ├── css/
│   │   └── styles.css             # Responsive CSS styles
│   ├── js/
│   │   ├── inventory.ts           # TypeScript source code
│   │   └── inventory.js           # Compiled JavaScript
│   └── tsconfig.json              # TypeScript configuration
│
├── Part2/                          # Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.ts             # Main app component
│   │   │   ├── app.routes.ts      # Route configuration
│   │   │   ├── inventory.service.ts # Inventory service
│   │   │   ├── home/              # Home page component
│   │   │   ├── inventory/         # Inventory management component
│   │   │   ├── search/            # Search & filter component
│   │   │   ├── privacy/           # Privacy & security page
│   │   │   └── help/              # Help & FAQ page
│   │   ├── index.html
│   │   └── styles.css
│   ├── angular.json
│   └── package.json
│
└── Part3/
    └── GenAI_Report.txt           # GenAI usage report
```

---

## ✅ Features Implemented

### Part 1: TypeScript Inventory System

- ✅ **Full CRUD Operations:** Add, edit, update, and delete inventory items
- ✅ **Search Functionality:** Real-time search by item name
- ✅ **Data Validation:** Comprehensive form validation with TypeScript typing
- ✅ **Responsive Design:** Mobile-first responsive CSS
- ✅ **Sample Data:** Pre-populated with realistic inventory data
- ✅ **Unique Item IDs:** Enforcement of unique identifiers
- ✅ **Confirmation Prompts:** Delete confirmation dialogs
- ✅ **Statistics Dashboard:** Visual statistics display

### Part 2: Angular Application

- ✅ **5 Pages:** Home, Inventory, Search, Privacy, Help
- ✅ **Reactive Forms:** Form validation with Angular Reactive Forms
- ✅ **Service Architecture:** InventoryService with RxJS observables
- ✅ **Component-Based:** Modular component structure
- ✅ **Routing:** Angular Router for navigation
- ✅ **Privacy Analysis:** Comprehensive security considerations page
- ✅ **Help System:** FAQs and troubleshooting guide
- ✅ **Responsive UI:** Fully responsive across all devices

---

## 🚀 How to Run

### Part 1: TypeScript System

1. Navigate to `Part1/` directory
2. Open `index.html` in a web browser
3. No build step required - runs directly in browser

### Part 2: Angular Application

1. Navigate to `Part2/` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   ng serve
   ```
4. Open browser to `http://localhost:4200`

---

## 📊 Data Fields

All inventory items include:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Item ID | string | Yes | Unique identifier |
| Item Name | string | Yes | Product name |
| Category | enum | Yes | Electronics/Furniture/Clothing/Tools/Misc |
| Quantity | number | Yes | Stock quantity |
| Price | number | Yes | Unit price |
| Supplier Name | string | Yes | Supplier information |
| Stock Status | enum | Yes | In Stock/Low Stock/Out of Stock |
| Popular Item | enum | Yes | Yes/No |
| Comment | string | No | Optional notes |

---

## 🔒 Security & Privacy

The application implements and documents:

- Data encryption best practices
- Authentication & authorization principles
- Mobile-specific security considerations
- Web application security (XSS, CSRF protection)
- Data privacy compliance (GDPR, CCPA)
- Security monitoring recommendations

See `Part2/src/app/privacy/privacy.ts` for detailed analysis.

---

## 🤖 GenAI Usage

This assessment utilized Claude (Anthropic) for:

- Code structure and architecture planning
- Debugging TypeScript and Angular issues
- CSS styling and responsive design guidance
- Documentation and report writing assistance

See `Part3/GenAI_Report.txt` for complete declaration.

---

## 📚 Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Angular 17+** - Modern web framework
- **RxJS** - Reactive programming
- **CSS3** - Modern styling with Grid & Flexbox
- **HTML5** - Semantic markup

---

## 📝 License

This project is created for educational purposes as part of PROG2005 coursework.

---

**GitHub Repository:** https://github.com/YongjintaoSun/PROG2005-A2
