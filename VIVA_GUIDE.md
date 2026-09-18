# 🎓 FoodBridge – Viva Preparation Guide

This guide covers 20 important topics that may be asked during your project viva.
Each answer includes simple explanations and references to specific code files.

---

## 1. Project Overview

**Q: What is FoodBridge?**

FoodBridge is a frontend web application that connects surplus food donors with NGOs and volunteers. Donors post available food, NGOs browse and accept donations, and volunteers coordinate pickup. It uses React, JavaScript, and CSS — no backend server or database. Data is stored in the browser's `localStorage`.

---

## 2. Folder Structure

**Q: Explain the folder structure.**

```
src/
├── data/         → Sample food data (foodData.js)
├── hooks/        → Custom React hooks (useLocalStorage.js)
├── components/   → Reusable UI pieces (Navbar, FoodCard, etc.)
├── pages/        → Full page components (Home, FoodList, Dashboard, etc.)
├── styles/       → CSS files for each section
├── App.jsx       → Root component with routes and state
└── main.jsx      → Entry point that renders App
```

- **Components** are small, reusable pieces (like a food card).
- **Pages** are full screens (like the home page or dashboard).
- **Styles** are separate CSS files — one per section — so they are easy to find and modify.

---

## 3. How React Components Work

**Q: What is a React component?**

A component is a JavaScript function that returns JSX (HTML-like code). Components let us split the UI into independent, reusable pieces.

**Example — `StatusBadge.jsx`:**
```jsx
function StatusBadge({ status }) {
  let badgeClass = "status-badge";
  if (status === "Available") {
    badgeClass += " status-available";
  }
  return <span className={badgeClass}>{status}</span>;
}
```

This component receives `status` as a prop and renders a colored badge.

---

## 4. Why Props Are Used

**Q: What are props and why do we use them?**

Props (short for "properties") are how we pass data from a parent component to a child component. They flow **one way** — from parent to child.

**Example:** In `App.jsx`, we pass the `foods` array to `FoodList`:
```jsx
<Route path="/food" element={<FoodList foods={foods} />} />
```

Inside `FoodList`, it receives `foods` as a prop:
```jsx
function FoodList({ foods }) {
  // foods is now available here
}
```

---

## 5. Why State Is Used

**Q: What is state and why do we use it?**

State is data that can **change** over time. When state changes, React automatically re-renders the component to show the updated UI.

**Example:** The search input in `FoodList.jsx`:
```jsx
const [searchTerm, setSearchTerm] = useState("");
```

When the user types, `searchTerm` updates, and the filtered list re-renders.

---

## 6. Difference Between Props and State

| Feature | Props | State |
|---|---|---|
| Who controls it? | Parent component | The component itself |
| Can it change? | No (read-only) | Yes (using setState) |
| Direction | Parent → Child | Internal to the component |
| Example | `<FoodCard food={food} />` | `const [searchTerm, setSearchTerm] = useState("")` |

---

## 7. How Search Works

**Q: How does the search feature filter food donations?**

In `FoodList.jsx`, we use `Array.filter()` to check if each food name includes the search term:

```jsx
const filteredFoods = foods.filter((food) => {
  const matchesSearch = food.foodName
    .toLowerCase()
    .includes(searchTerm.toLowerCase());
  const matchesCategory =
    selectedCategory === "All" || food.category === selectedCategory;
  const matchesStatus =
    selectedStatus === "All" || food.status === selectedStatus;
  return matchesSearch && matchesCategory && matchesStatus;
});
```

**Step by step:**
1. User types in the search box → `searchTerm` state updates
2. `filter()` runs on every food item
3. Each food's name is compared (case-insensitive) with the search text
4. Category and status filters are also checked
5. Only foods matching ALL criteria appear on screen

---

## 8. How Filter Works

**Q: How do the category and status filters work?**

The `FilterBar` component renders two `<select>` dropdowns. When the user selects a category (e.g., "Meals"), the parent's `selectedCategory` state updates. The filtering logic in `FoodList.jsx` checks:

```jsx
const matchesCategory =
  selectedCategory === "All" || food.category === selectedCategory;
```

If "All" is selected, every food passes. Otherwise, only foods with a matching category are shown.

---

## 9. How Donation Form Works

**Q: How does the Donate Food form work?**

File: `DonateFood.jsx`

1. All form fields are stored in a **single state object**:
   ```jsx
   const [formData, setFormData] = useState({
     donorName: "", foodName: "", category: "", ...
   });
   ```

2. One `handleChange` function handles all inputs:
   ```jsx
   function handleChange(event) {
     const { name, value } = event.target;
     setFormData({ ...formData, [name]: value });
   }
   ```

3. On submit, `validateForm()` checks all required fields.

4. If valid, a new donation object is created with `id: Date.now()` and status `"Available"`.

5. The parent's `onAddDonation` function adds it to the `foods` array and saves to localStorage.

---

## 10. How localStorage Works

**Q: What is localStorage and how is it used?**

`localStorage` is a browser API that stores data as key-value pairs. Data persists even after the page is refreshed or the browser is closed.

We use a custom hook `useLocalStorage.js`:

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
```

**How it works:**
1. On first load, it checks if data exists in localStorage
2. If yes, it parses and uses that data
3. If no, it uses the initial value (sample data)
4. Whenever the value changes, `useEffect` saves it back to localStorage

---

## 11. How Dynamic Route Works

**Q: How does the food details page show different data based on the URL?**

File: `FoodDetails.jsx`

Route defined in `App.jsx`:
```jsx
<Route path="/food/:id" element={<FoodDetails foods={foods} />} />
```

The `:id` is a **route parameter**. When the user clicks "View Details" on food with id `3`, they navigate to `/food/3`.

Inside `FoodDetails.jsx`:
```jsx
const { id } = useParams(); // reads "3" from the URL
const food = foods.find((item) => item.id === Number(id));
```

`useParams()` extracts the id from the URL. Then `Array.find()` searches for the matching donation.

---

## 12. Why useEffect Is Used

**Q: What does useEffect do?**

`useEffect` runs code **after** the component renders. It is used for side effects like:

1. **Saving to localStorage** (in `useLocalStorage.js`):
   ```jsx
   useEffect(() => {
     localStorage.setItem(key, JSON.stringify(storedValue));
   }, [key, storedValue]);
   ```

2. **Auto-focusing an input** (in `DonateFood.jsx`):
   ```jsx
   useEffect(() => {
     donorNameRef.current.focus();
   }, []);
   ```

3. **Animated counter** (in `Dashboard.jsx`):
   ```jsx
   useEffect(() => {
     const intervalId = setInterval(() => { ... }, 120);
     return () => clearInterval(intervalId); // cleanup
   }, []);
   ```

The dependency array `[]` means "run once on mount". Adding variables like `[storedValue]` means "run whenever storedValue changes".

---

## 13. How Delete Works

**Q: How is a donation deleted?**

In `Dashboard.jsx`:
```jsx
function handleDelete(id) {
  const confirmed = window.confirm("Are you sure?");
  if (confirmed) {
    onDeleteFood(id);
  }
}
```

In `App.jsx`:
```jsx
function handleDeleteFood(id) {
  const updatedFoods = foods.filter((food) => food.id !== id);
  setFoods(updatedFoods);
}
```

**Step by step:**
1. User clicks the Delete button
2. A confirmation dialog appears
3. If confirmed, `onDeleteFood(id)` is called
4. `Array.filter()` creates a new array **without** the deleted item
5. `setFoods()` updates the state
6. `useLocalStorage` saves the updated array to localStorage
7. React re-renders the table without the deleted row

---

## 14. How Edit Works

**Q: How is a donation edited?**

1. User clicks "Edit" → `editingDonation` state is set to that donation
2. `EditDonationModal` appears with pre-filled form fields
3. User modifies fields and clicks "Save"
4. `handleSaveEdit` merges the changes with the original donation
5. `onUpdateFood` in `App.jsx` replaces the old donation with the updated one

In `App.jsx`:
```jsx
function handleUpdateFood(updatedDonation) {
  const updatedFoods = foods.map((food) => {
    if (food.id === updatedDonation.id) {
      return updatedDonation;
    }
    return food;
  });
  setFoods(updatedFoods);
}
```

---

## 15. How Responsive Design Works

**Q: How does the layout change on different screen sizes?**

We use CSS media queries with a **mobile-first** approach:

```css
/* Mobile: 1 column (default) */
.food-grid {
  display: grid;
  grid-template-columns: 1fr;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .food-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .food-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

The default styles are for mobile. As the screen gets wider, media queries add more columns.

---

## 16. How CSS Animation Works

**Q: How does the landing page animation work?**

In `home.css`, we define a CSS keyframe animation:

```css
/* Moves the food box from donor side to NGO side */
@keyframes moveFood {
  0%   { left: 5%;  opacity: 0; transform: scale(0.8); }
  10%  { opacity: 1; transform: scale(1); }
  50%  { left: 50%; transform: scale(1.15); }
  90%  { opacity: 1; transform: scale(1); }
  100% { left: 88%; opacity: 0; transform: scale(0.8); }
}

.food-package {
  animation: moveFood 4s ease-in-out infinite;
}
```

This makes a food emoji slide from left to right (Donor → NGO), repeating infinitely. The `ease-in-out` timing makes it smooth.

---

## 17. How Protected Route Works

**Q: How does the protected route prevent access without login?**

File: `ProtectedRoute.jsx`

```jsx
function ProtectedRoute({ currentUser, children }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
```

In `App.jsx`, the Dashboard is wrapped:
```jsx
<Route path="/dashboard" element={
  <ProtectedRoute currentUser={currentUser}>
    <Dashboard ... />
  </ProtectedRoute>
} />
```

If `currentUser` is `null` (not logged in), the user is redirected to `/login`. If logged in, the Dashboard renders normally.

---

## 18. Full Data Flow

**Q: How does data move through the application?**

```
foodData.js (sample data)
        ↓
App.jsx reads initial data via useLocalStorage
        ↓
React state (foods array, currentUser)
        ↓
Props passed to pages/components
        ↓
FoodCard/Dashboard renders the data

New Donation:
  User fills form → handleChange → formData state → handleSubmit
  → onAddDonation → App state updates → localStorage saves
  → FoodList re-renders automatically

Delete:
  User clicks Delete → handleDelete(id) → filter removes item
  → setFoods → localStorage → UI re-renders

Search:
  User types → searchTerm updates → filter() runs
  → filtered array created → FoodCard components re-render
```

---

## 19. Important Viva Questions

| # | Question | Key Concept |
|---|---|---|
| 1 | What is JSX? | HTML-like syntax in JavaScript |
| 2 | What is virtual DOM? | React's fast rendering mechanism |
| 3 | What is useState? | Hook to manage component state |
| 4 | What is useEffect? | Hook for side effects (data fetching, timers) |
| 5 | What is useRef? | Hook to reference DOM elements |
| 6 | What is useMemo? | Hook to cache expensive calculations |
| 7 | What is useCallback? | Hook to cache function references |
| 8 | What is controlled component? | Form input where React controls the value |
| 9 | What is lifting state up? | Moving state to a common parent |
| 10 | What is prop drilling? | Passing props through multiple levels |
| 11 | What is React Router? | Library for client-side navigation |
| 12 | What is dynamic route? | Route with a variable parameter (:id) |
| 13 | What is localStorage? | Browser storage that persists data |
| 14 | What is CSS Grid? | 2D layout system for rows and columns |
| 15 | What is Flexbox? | 1D layout system for alignment |
| 16 | What is media query? | CSS rule for different screen sizes |
| 17 | What is semantic HTML? | Using meaningful tags (header, main, nav) |
| 18 | What is CSS variable? | Custom property like --primary-green |
| 19 | What is ES6 destructuring? | Extracting values from objects/arrays |
| 20 | What is Array.map()? | Creates a new array by transforming each item |

---

## 20. Simple Answers for Common Questions

**Q: Why React?**
React lets us build UIs using reusable components. When state changes, only the affected parts re-render — making it fast.

**Q: Why Vite?**
Vite is a fast build tool for React. It provides instant hot reload during development.

**Q: Why localStorage instead of a database?**
This is a frontend-only project. localStorage lets us save data in the browser without needing a server.

**Q: Why CSS variables?**
CSS variables (like `--primary-green`) let us define colors once and reuse them everywhere. Changing one variable updates the entire theme.

**Q: Why separate CSS files?**
Separate CSS files make it easy to find and modify styles. During viva, the examiner can quickly locate and change any CSS property.

**Q: How to change button color?**
Open `global.css`, find `--primary-green: #1f6b4f;`, and change the color value. Or use browser DevTools to inspect and modify the `.primary-button` class.

**Q: How to change card padding?**
Open `food.css`, find `.food-card-body`, and change the `padding` value.

**Q: How to change grid columns?**
Open `food.css`, find `.food-grid`, and change `grid-template-columns`. For example, `repeat(4, 1fr)` for 4 columns.
