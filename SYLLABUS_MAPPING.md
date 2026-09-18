# 📚 FoodBridge – Syllabus Topic Mapping

This document maps every syllabus topic (Lectures 1–42) to where it is used in the FoodBridge project.

---

## Lectures 1–6: HTML5, CSS3, Responsive Design

### HTML5 Structure & Semantic Tags
**Used in:**
- `index.html` — `<!doctype html>`, `<html>`, `<head>`, `<body>`, `<meta>`
- `Home.jsx` — `<main>`, `<section>`, `<article>`, `<h1>`–`<h3>`
- `About.jsx` — `<section>`, `<h2>`, `<ul>`, `<li>`
- `Navbar.jsx` — `<nav>`, `aria-label`
- `Footer.jsx` — `<footer>`
- `FoodCard.jsx` — `<article>`

### Accessibility Basics
**Used in:**
- `Navbar.jsx` — `aria-label="Main navigation"`, `aria-label="Toggle navigation menu"`
- `SearchBar.jsx` — `aria-label="Search food donations"`
- `FilterBar.jsx` — `aria-label` on select elements
- All forms — `<label htmlFor="">` connected to inputs
- `FoodCard.jsx` — semantic `<article>` element
- `Home.jsx` — `aria-hidden="true"` on decorative elements

### CSS3 Fundamentals
**Used in:**
- `global.css` — CSS variables (`:root`), reset, typography, colors
- All `.css` files — properties like `color`, `padding`, `margin`, `border-radius`, `font-size`, `background-color`, `box-shadow`, `border`, `transition`

### Box Model
**Used in:**
- `global.css` — `box-sizing: border-box` (applied to all elements via `*`)
- `food.css` — `.food-card` uses `padding`, `border`, `margin`
- `form.css` — `.form-input` uses `padding`, `border`

### Flexbox
**Used in:**
- `navbar.css` — `.navbar-container` uses `display: flex`, `align-items`, `justify-content`, `gap`
- `home.css` — `.hero-buttons` uses `display: flex`, `gap`, `flex-wrap`
- `home.css` — `.flow-container` uses `display: flex` for the animation flow
- `food.css` — `.food-card-header`, `.food-card-footer` use `display: flex`
- `dashboard.css` — `.journey-steps` uses `display: flex`

### CSS Grid
**Used in:**
- `home.css` — `.steps-grid`, `.featured-grid`, `.why-grid`, `.impact-grid`, `.footer-grid`
- `food.css` — `.food-grid` (1-column → 2-column → 3-column)
- `dashboard.css` — `.summary-cards` (1-column → 2-column → 4-column)
- `about.css` — `.users-grid`
- `form.css` — `.form-row` (side-by-side inputs)

### Responsive Design & Media Queries
**Used in:**
- `food.css` — Media queries at 768px and 1024px for `.food-grid`
- `home.css` — Media queries for `.steps-grid`, `.featured-grid`, `.impact-grid`, `.footer-grid`
- `navbar.css` — Media query at 900px for mobile hamburger menu
- `dashboard.css` — Media queries for `.summary-cards`
- `about.css` — Media queries for `.users-grid` and `.arch-flow`

### Mobile-First Layout
**Used in:**
- All CSS files start with mobile (1-column) layout, then use `@media (min-width: ...)` to add columns for larger screens

---

## Lectures 7–12: JavaScript Basics

### JavaScript Variables
**Used in:**
- All `.jsx` files use `const` and `let`
- `foodData.js` — `const foodData = [...]`
- `FoodList.jsx` — `const filteredFoods = ...`

### Functions
**Used in:**
- `App.jsx` — `handleAddDonation()`, `handleDeleteFood()`, `handleUpdateFood()`, `handleLogin()`, `handleLogout()`
- `DonateFood.jsx` — `handleChange()`, `validateForm()`, `handleSubmit()`
- `Dashboard.jsx` — `handleDelete()`, `handleEditClick()`, `handleSaveEdit()`
- `useLocalStorage.js` — `useLocalStorage()` function

### Arrays
**Used in:**
- `foodData.js` — array of 6 food donation objects
- `App.jsx` — `foods` state is an array
- `FilterBar.jsx` — `categories` and `statuses` arrays

### Objects
**Used in:**
- `foodData.js` — each donation is a JavaScript object with properties
- `DonateFood.jsx` — `formData` state is an object
- `Login.jsx` — `user` object created on login

### Loops (map, filter)
**Used in:**
- `FoodList.jsx` — `foods.filter()` for search/filter, `filteredFoods.map()` for rendering cards
- `Home.jsx` — `featuredFoods.map()` for rendering featured donations
- `Dashboard.jsx` — `foods.map()` for rendering table rows
- `FilterBar.jsx` — `categories.map()` for rendering options

---

## Lectures 13–18: ES6+, DOM, Browser Storage

### let/const
**Used in:** Every `.jsx` and `.js` file uses `const` for variables that don't change and `let` for those that do.

### Arrow Functions
**Used in:**
- `FoodList.jsx` — `foods.filter((food) => { ... })`
- `App.jsx` — `foods.map((food) => { ... })`
- Callback functions throughout the project

### Destructuring
**Used in:**
- `FoodCard.jsx` — `const { id, foodName, category, ... } = food;`
- `DonateFood.jsx` — `const { name, value } = event.target;`
- `FoodDetails.jsx` — `const { id } = useParams();`
- All component props — `function Navbar({ currentUser, onLogout })`

### Spread Operator
**Used in:**
- `DonateFood.jsx` — `setFormData({ ...formData, [name]: value })`
- `App.jsx` — `const updatedFoods = [...foods, newDonation]`
- `EditDonationModal.jsx` — `const updatedDonation = { ...donation, ... }`

### Modules (import/export)
**Used in:**
- Every file uses `import` and `export`
- `foodData.js` — `export default foodData`
- `App.jsx` — imports all components and pages
- `useLocalStorage.js` — `export default useLocalStorage`

### DOM Manipulation
**Used in:**
- `DonateFood.jsx` — `useRef` to focus an input element (`donorNameRef.current.focus()`)
- React's virtual DOM handles all other DOM updates automatically

### Event Handling
**Used in:**
- `DonateFood.jsx` — `onChange={handleChange}`, `onSubmit={handleSubmit}`
- `Navbar.jsx` — `onClick={handleToggleMenu}`, `onClick={handleLinkClick}`
- `Dashboard.jsx` — `onClick={() => handleDelete(food.id)}`
- `SearchBar.jsx` — `onChange={(event) => onSearchChange(event.target.value)}`
- `EditDonationModal.jsx` — `onClick={(e) => e.stopPropagation()}`

### Browser Storage (localStorage)
**Used in:**
- `useLocalStorage.js` — `localStorage.getItem()`, `localStorage.setItem()`, `JSON.parse()`, `JSON.stringify()`
- `App.jsx` — uses `useLocalStorage` hook for `foods` and `currentUser`

### JSON
**Used in:**
- `useLocalStorage.js` — `JSON.parse()` to read, `JSON.stringify()` to write
- `foodData.js` — data structured as JSON-style objects

### Forms
**Used in:**
- `DonateFood.jsx` — full controlled form with validation
- `Login.jsx` — login form
- `Register.jsx` — registration form
- `EditDonationModal.jsx` — edit form

---

## Lectures 19–24: Events, Forms, React Setup

### Events
**Used in:** (See Event Handling above)

### Controlled Components
**Used in:**
- `DonateFood.jsx` — every input has `value={formData.field}` and `onChange={handleChange}`
- `Login.jsx` — `value={email}` with `onChange`
- `SearchBar.jsx` — `value={searchTerm}` with `onChange`
- `FilterBar.jsx` — `value={selectedCategory}` with `onChange`

### React Setup Using Vite
**Used in:**
- `vite.config.js` — Vite configuration with React plugin
- `package.json` — `npm run dev` starts Vite dev server
- `index.html` — `<script type="module" src="/src/main.jsx">`
- `main.jsx` — `ReactDOM.createRoot().render()`

---

## Lectures 25–30: React Fundamentals

### Component-Based Architecture
**Used in:**
- The entire project is organized into components:
  - 8 reusable components in `src/components/`
  - 9 page components in `src/pages/`

### JSX
**Used in:** Every `.jsx` file uses JSX syntax to write HTML-like code inside JavaScript functions.

### Props
**Used in:**
- `App.jsx` → `FoodList` — `foods={foods}`
- `App.jsx` → `DonateFood` — `onAddDonation={handleAddDonation}`
- `FoodList` → `FoodCard` — `food={food}`
- `FoodList` → `SearchBar` — `searchTerm={searchTerm}`
- `App.jsx` → `Navbar` — `currentUser={currentUser}`, `onLogout={handleLogout}`

### State
**Used in:**
- `App.jsx` — `foods` and `currentUser` (central state)
- `FoodList.jsx` — `searchTerm`, `selectedCategory`, `selectedStatus`
- `DonateFood.jsx` — `formData`, `errors`, `showSuccess`
- `Dashboard.jsx` — `rescueCount`, `editingDonation`
- `Navbar.jsx` — `menuOpen`

### Rendering Lists
**Used in:**
- `FoodList.jsx` — `filteredFoods.map((food) => <FoodCard key={food.id} food={food} />)`
- `Home.jsx` — `featuredFoods.map(...)`
- `Dashboard.jsx` — `foods.map(...)` for table rows
- `FilterBar.jsx` — `categories.map(...)` for select options

### Conditional Rendering
**Used in:**
- `Navbar.jsx` — `{currentUser ? <UserBadge /> : <LoginButton />}`
- `FoodList.jsx` — `{filteredFoods.length > 0 ? <Grid /> : <NoResults />}`
- `FoodDetails.jsx` — `{food.status === "Available" && <AcceptButton />}`
- `Dashboard.jsx` — `{editingDonation && <EditModal />}`
- `DonateFood.jsx` — `{showSuccess && <SuccessMessage />}`

---

## Lectures 31–36: Hooks & Patterns

### useState
**Used in:**
- `App.jsx` — via `useLocalStorage` (which uses `useState` internally)
- `FoodList.jsx` — search term, category, status
- `DonateFood.jsx` — form data, errors, success message
- `Dashboard.jsx` — rescue counter, editing donation
- `Navbar.jsx` — mobile menu open state
- `Login.jsx` — email, password, role, error

### useEffect
**Used in:**
- `useLocalStorage.js` — save to localStorage when value changes
- `DonateFood.jsx` — auto-focus input on mount
- `Dashboard.jsx` — animated counter with setInterval

### useRef
**Used in:**
- `DonateFood.jsx` — `const donorNameRef = useRef(null)` to focus the first input field on page load

### useMemo
**Used in:**
- `FoodList.jsx` — memoizing the filtered foods array so filtering only re-runs when dependencies change

### useCallback
**Used in:**
- `Dashboard.jsx` — `handleDelete` wrapped in `useCallback` to keep a stable function reference

### Custom Hooks
**Used in:**
- `useLocalStorage.js` — custom hook that combines `useState` and `useEffect` for localStorage sync

### Lifting State Up
**Used in:**
- `App.jsx` holds the central `foods` state and passes it down to `FoodList`, `Home`, `FoodDetails`, and `Dashboard` via props
- `App.jsx` holds `currentUser` and passes it to `Navbar`, `Dashboard`, and `ProtectedRoute`

### Component Composition
**Used in:**
- `FoodCard` uses `StatusBadge` inside it
- `FoodList` uses `SearchBar`, `FilterBar`, and `FoodCard`
- `Dashboard` uses `StatusBadge` and `EditDonationModal`
- `App` composes `Navbar`, pages, and `Footer`

---

## Lectures 37–42: React Router

### React Router
**Used in:**
- `App.jsx` — `<BrowserRouter>`, `<Routes>`, `<Route>`
- `main.jsx` → `App.jsx` wraps everything in `<BrowserRouter>`

### Nested Routes
**Used in:**
- `/food` and `/food/:id` are related routes under the food section

### Dynamic Routes
**Used in:**
- `App.jsx` — `<Route path="/food/:id" element={<FoodDetails />} />`
- `FoodDetails.jsx` — `const { id } = useParams()` reads the dynamic parameter

### Route Parameters
**Used in:**
- `FoodDetails.jsx` — `useParams()` extracts `id` from `/food/:id`
- `FoodCard.jsx` — `<Link to={`/food/${id}`}>` creates the dynamic URL

### Protected Routes
**Used in:**
- `ProtectedRoute.jsx` — checks if `currentUser` exists, redirects to `/login` if not
- `App.jsx` — wraps Dashboard route with `<ProtectedRoute>`

### 404 Page
**Used in:**
- `NotFound.jsx` — displays "404 – Page Not Found"
- `App.jsx` — `<Route path="*" element={<NotFound />} />` catches all unknown URLs

### Navigation Components
**Used in:**
- `Navbar.jsx` — `<NavLink>` for active link highlighting
- `Footer.jsx` — `<Link>` for quick navigation links
- `FoodCard.jsx` — `<Link to={`/food/${id}`}>` for view details
- `FoodDetails.jsx` — `useNavigate()` for programmatic navigation
- `Login.jsx` — `useNavigate()` to redirect after login
