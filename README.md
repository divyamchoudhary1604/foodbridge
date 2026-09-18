# 🍽️ FoodBridge – Smart Food Rescue & Distribution Platform


**Tagline:** "Reducing Food Waste, Feeding Lives."

---

## 📋 Project Overview

FoodBridge is a frontend web application that connects:
- **Donors** – restaurants, hostels, households with surplus food
- **NGOs** – shelters and organizations that need food
- **Volunteers** – individuals who pick up and deliver food
- **Admin** – platform administrators

The platform allows donors to post surplus food, NGOs to browse and accept donations, and volunteers to coordinate pickup — all through a clean, responsive web interface.

> **Note:** This is a frontend prototype. No real backend, database, or authentication is used. Data is stored in the browser's `localStorage`.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic elements |
| CSS3 | Styling, Flexbox, Grid, animations, responsive design |
| JavaScript ES6+ | Logic, array methods, modules, DOM |
| React (via Vite) | Component-based UI framework |
| React Router DOM | Client-side routing |
| localStorage | Browser-based data persistence |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# Navigate to the project folder
cd food

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production
```bash
npm run build
```

---

## 📁 Folder Structure

```
food/
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── README.md               # This file
├── VIVA_GUIDE.md           # Viva preparation guide
├── SYLLABUS_MAPPING.md     # Syllabus topic mapping
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Root component with routing and state
    ├── index.css           # Status badge styles
    ├── data/
    │   └── foodData.js     # 6 sample food donations
    ├── hooks/
    │   └── useLocalStorage.js  # Custom hook for localStorage
    ├── components/
    │   ├── Navbar.jsx          # Navigation bar
    │   ├── Footer.jsx          # Page footer
    │   ├── FoodCard.jsx        # Reusable food card
    │   ├── SearchBar.jsx       # Search input
    │   ├── FilterBar.jsx       # Category/status filters
    │   ├── StatusBadge.jsx     # Status indicator badge
    │   ├── ProtectedRoute.jsx  # Route guard for auth
    │   └── EditDonationModal.jsx # Edit donation popup
    ├── pages/
    │   ├── Home.jsx            # Landing page
    │   ├── FoodList.jsx        # Food listing with search/filter
    │   ├── FoodDetails.jsx     # Single food details (dynamic route)
    │   ├── DonateFood.jsx      # Donation form
    │   ├── Login.jsx           # Demo login
    │   ├── Register.jsx        # Demo registration
    │   ├── Dashboard.jsx       # User dashboard
    │   ├── About.jsx           # About page
    │   └── NotFound.jsx        # 404 page
    └── styles/
        ├── global.css          # Design tokens, reset, buttons
        ├── navbar.css          # Navbar styles
        ├── home.css            # Landing page and footer
        ├── food.css            # Food listing and details
        ├── form.css            # Form pages
        ├── dashboard.css       # Dashboard styles
        └── about.css           # About and 404 pages
```

---

## 📄 Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with hero, animation, features |
| `/food` | Food List | Browse donations with search and filters |
| `/food/:id` | Food Details | View single donation details |
| `/donate` | Donate Food | Post new surplus food |
| `/login` | Login | Demo role-based login |
| `/register` | Register | Demo account creation |
| `/dashboard` | Dashboard | Stats, manage donations (protected) |
| `/about` | About | Project information |
| `*` | 404 | Page not found |

---

## ✨ Key Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ CSS animations (food flow, counter)
- ✅ Search and multi-filter system
- ✅ Controlled forms with validation
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Dynamic routing with URL parameters
- ✅ Protected routes (login required)
- ✅ localStorage persistence
- ✅ Custom React hook
- ✅ Role-based dashboard views

---

## 👥 Team

3rd Semester Frontend Engineering Project

---

## 📝 License

This project is for educational purposes only.
