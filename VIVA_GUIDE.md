# 🎓 FoodBridge – 25CSE0203 Syllabus Alignment & Viva Guide

This guide maps the **FoodBridge** codebase directly to the **25CSE0203: Front End Engineering-II** course syllabus (Lectures 1–72).
Every answer is written in **simple, beginner-friendly language** with direct references to project files so you can explain any question asked in your viva with confidence.

---

## 📋 Syllabus Topic-by-Topic Code Map

| Lecture Range | Syllabus Topics | Where It Is in FoodBridge Code |
|---|---|---|
| **Lectures 1–6** | HTML5 semantic tags, accessibility, CSS3 fundamentals, Box Model, Flexbox, Grid, Responsive Design | `src/styles/global.css`, `src/components/Navbar.jsx`, `src/pages/Home.jsx` |
| **Lectures 7–12** | JavaScript basics (functions, arrays, objects, loops), Git/GitHub, static landing page | `src/pages/Home.jsx`, `src/data/foodData.js` |
| **Lectures 13–18** | ES6+ (let/const, arrow functions, destructuring), Browser Storage (`localStorage`), JSON, interactive to-do app | `src/hooks/useLocalStorage.js`, `src/pages/dashboard/RescueChecklist.jsx` |
| **Lectures 19–24** | Handling events, forms, controlled components, React setup with Vite, Mini project: counter app | `src/components/common/Counter.jsx`, `src/pages/FoodDetails.jsx` |
| **Lectures 25–30** | React intro, JSX, component props & state, rendering lists, conditional rendering | `src/components/FoodCard.jsx`, `src/pages/FoodList.jsx`, `src/components/StatusBadge.jsx` |
| **Lectures 31–36** | `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, Custom hooks, lifting state up | `src/hooks/useDebounce.js`, `src/hooks/useDocumentTitle.js`, `src/pages/FoodList.jsx`, `src/pages/DonateFood.jsx` |
| **Lectures 37–42** | React Router, Nested routes (`<Outlet />`), dynamic routes (`:id`), Route params, Protected routes, 404 page | `src/App.jsx`, `src/components/ProtectedRoute.jsx`, `src/pages/FoodDetails.jsx`, `src/pages/NotFound.jsx` |
| **Lectures 43–48** | Navigation layout, page structure, multi-page SPA design | `src/App.jsx`, `src/components/Navbar.jsx`, `src/components/Footer.jsx` |
| **Lectures 49–54** | Context API, State architecture, Global vs Local state, **Intro to Redux Toolkit**, Async state (loading/error), **Mini project: shopping cart or dashboard** | `src/redux/store.js`, `src/redux/cartSlice.js`, `src/pages/Cart.jsx`, `src/context/AuthContext.jsx`, `src/pages/dashboard/DashboardLayout.jsx` |
| **Lectures 55–60** | Form handling, validation strategies, reusable input components | `src/components/common/InputField.jsx`, `src/components/common/SelectField.jsx`, `src/pages/DonateFood.jsx` |
| **Lectures 61–66** | Modal, tabs, dropdowns, toast notifications, search/filter/sort, Mini project: registration form | `src/components/common/Modal.jsx`, `src/components/common/Tabs.jsx`, `src/context/ToastContext.jsx`, `src/pages/Register.jsx` |
| **Lectures 67–72** | Consuming REST APIs with `fetch()` & `async/await`, loading states, retry, error handling, debounce, pagination, CRUD | `src/pages/RecipeIdeas.jsx`, `src/pages/FoodList.jsx`, `src/pages/dashboard/MyDonations.jsx` |

---

## 🎯 Top 12 Viva Questions & Answers

### 1. (Lectures 1–6) How do you make the app responsive and accessible?
- **Response:** We use CSS Flexbox (`display: flex`) for navigation bars and header controls, and CSS Grid (`display: grid`) for food cards and dashboard metrics.
- Mobile-first media queries (`@media (max-width: 768px)`) ensure the layout adapts smoothly from phones to desktops.
- Semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) and ARIA roles (`role="dialog"`, `aria-label`, `aria-live`) ensure screen reader accessibility.
- **File:** [global.css](file:///c:/Users/divya/Desktop/food/src/styles/global.css)

### 2. (Lectures 13–18) How does browser storage work and how is data persisted?
- **Response:** Data is stored in the browser's `localStorage` as JSON strings.
- We created a custom hook `useLocalStorage(key, initialValue)`. When data changes, `JSON.stringify()` saves it; on page load, `JSON.parse()` reads it back.
- **Example:** We built an interactive **Rescue Task Checklist** in the Dashboard where volunteers can add, check off, and delete tasks persisted across page refreshes.
- **Files:** [useLocalStorage.js](file:///c:/Users/divya/Desktop/food/src/hooks/useLocalStorage.js), [RescueChecklist.jsx](file:///c:/Users/divya/Desktop/food/src/pages/dashboard/RescueChecklist.jsx)

### 3. (Lectures 19–24) How do controlled components and events work? Show the Counter.
- **Response:** In a controlled component, the input value is bound to React state via `value={state}`, and changes update through `onChange={(e) => setState(e.target.value)}`.
- We created an interactive `<Counter />` component in `FoodDetails.jsx` where users can select how many portions of surplus food they wish to rescue using `+` and `-` buttons.
- **Files:** [Counter.jsx](file:///c:/Users/divya/Desktop/food/src/components/common/Counter.jsx), [FoodDetails.jsx](file:///c:/Users/divya/Desktop/food/src/pages/FoodDetails.jsx)

### 4. (Lectures 31–36) Explain the hooks used: `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`.
- `useState`: Manages dynamic component state (e.g. search terms, active tab, modal open/close).
- `useEffect`: Handles side effects like fetching data or setting event listeners on window.
- `useRef`: Directly references DOM nodes without re-renders. Used in `DonateFood.jsx` to auto-focus the first input field, and in `Modal.jsx` for focus trapping.
- `useMemo`: Caches expensive calculations. Used in `FoodList.jsx` to memoize filtered and sorted donations so filtering doesn't re-run unnecessarily.
- `useCallback`: Memoizes handler functions across renders in our Context providers.
- **Files:** [FoodList.jsx](file:///c:/Users/divya/Desktop/food/src/pages/FoodList.jsx), [DonateFood.jsx](file:///c:/Users/divya/Desktop/food/src/pages/DonateFood.jsx)

### 5. (Lectures 37–42) How does React Router work? What are dynamic routes, nested routes, and protected routes?
- **Dynamic Routes:** `<Route path="/food/:id" element={<FoodDetails />} />` uses `:id` parameter accessed with `useParams()`.
- **Nested Routes:** The `/dashboard` route uses `<Outlet />` inside `DashboardLayout.jsx` to render sub-pages (`/dashboard`, `/dashboard/my-donations`, `/dashboard/my-claims`, `/dashboard/checklist`) inside the same parent layout without refreshing.
- **Protected Routes:** `<ProtectedRoute>` checks if the user is authenticated; if not, it redirects them to `/login` while saving the path they were trying to visit.
- **404 Page:** `<Route path="*" element={<NotFound />} />` catches non-existent URLs.
- **Files:** [App.jsx](file:///c:/Users/divya/Desktop/food/src/App.jsx), [ProtectedRoute.jsx](file:///c:/Users/divya/Desktop/food/src/components/ProtectedRoute.jsx), [DashboardLayout.jsx](file:///c:/Users/divya/Desktop/food/src/pages/dashboard/DashboardLayout.jsx)

### 6. (Lectures 49–54) How is State Architecture implemented? Explain Context API vs Redux Toolkit, Async State, and the Shopping Cart Mini Project.
- **Local State:** Component-specific state managed using `useState` (e.g., search text, modal open/close).
- **Global State via Context API:** `AuthContext` manages user authentication and role permissions without prop drilling.
- **Global State via Redux Toolkit:** We configured a central Redux store (`configureStore`) with a `cartSlice` (`createSlice`) to power the **Shopping Cart Mini Project** (`/cart`).
  - **Actions:** `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`.
  - **Async State & Loading/Error Handling:** Implemented using `createAsyncThunk("cart/checkoutCart")`. It handles `pending` (loading: true), `fulfilled` (success receipt), and `rejected` (error message).
  - **Hooks:** Components read data using `useSelector((state) => state.cart)` and dispatch actions using `useDispatch()`.
- **Files:** [store.js](file:///c:/Users/divya/Desktop/food/src/redux/store.js), [cartSlice.js](file:///c:/Users/divya/Desktop/food/src/redux/cartSlice.js), [Cart.jsx](file:///c:/Users/divya/Desktop/food/src/pages/Cart.jsx), [AuthContext.jsx](file:///c:/Users/divya/Desktop/food/src/context/AuthContext.jsx)

### 7. (Lectures 55–60) How do reusable form components and validation strategies work?
- We created modular form inputs: `<InputField>`, `<SelectField>`, `<TextareaField>`.
- Validation checks required fields, email format with regex, minimum 10 digits for phone numbers, and positive numbers for quantities.
- Real-time errors display below each input and clear automatically when the user starts typing.
- **Files:** [InputField.jsx](file:///c:/Users/divya/Desktop/food/src/components/common/InputField.jsx), [DonateFood.jsx](file:///c:/Users/divya/Desktop/food/src/pages/DonateFood.jsx), [Register.jsx](file:///c:/Users/divya/Desktop/food/src/pages/Register.jsx)

### 8. (Lectures 61–66) How are Modals, Tabs, and Toast notifications implemented?
- **Modal:** Rendered over a backdrop with keyboard support (Esc key closes dialog) and focus trap. Used when confirming food claim or donation deletion.
- **Tabs:** Accessible buttons with active indicator and count badges. Used in `VolunteerDelivery.jsx` to switch between "All Active", "Ready for Pickup", "In Transit", and "Delivered".
- **Toast Notifications:** A floating alert system at the bottom-right that automatically disappears after 4 seconds with a smooth slide-in animation.
- **Files:** [Modal.jsx](file:///c:/Users/divya/Desktop/food/src/components/common/Modal.jsx), [Tabs.jsx](file:///c:/Users/divya/Desktop/food/src/components/common/Tabs.jsx), [ToastContext.jsx](file:///c:/Users/divya/Desktop/food/src/context/ToastContext.jsx)

### 9. (Lectures 67–72) How is a 3rd-party REST API consumed?
- In `RecipeIdeas.jsx`, we use `fetch()` with `async/await` to call the public TheMealDB API (`https://www.themealdb.com/api/json/v1/1/search.php?s=...`).
- We handle:
  - **Loading state:** Displays a loading spinner while the request is in progress.
  - **Error handling:** Catches network errors and shows a friendly message.
  - **Retry button:** Allows users to re-trigger the fetch if network failed.
- **File:** [RecipeIdeas.jsx](file:///c:/Users/divya/Desktop/food/src/pages/RecipeIdeas.jsx)

### 10. (Lectures 67–72) What is Debounce and why is it useful?
- Debouncing delays executing a function until a certain amount of time has passed since the user stopped typing.
- Without debouncing, every single keystroke in a search box sends a network request or triggers an expensive filter.
- We built a custom hook `useDebounce(value, 300)` used in `FoodList.jsx` and `RecipeIdeas.jsx`.
- **File:** [useDebounce.js](file:///c:/Users/divya/Desktop/food/src/hooks/useDebounce.js)

### 11. (Lectures 67–72) How does Pagination work?
- The items are divided by a page size (6 items per page).
- `startIndex = (currentPage - 1) * pageSize`.
- `currentFoods = filteredFoods.slice(startIndex, startIndex + pageSize)`.
- Reusable `<Pagination />` component renders page number buttons and Previous/Next buttons.
- **File:** [Pagination.jsx](file:///c:/Users/divya/Desktop/food/src/components/common/Pagination.jsx)

### 12. (Lectures 67–72) How are Full CRUD Operations demonstrated?
- **C (Create):** Donors create new listings in `/donate` (`addFood()`).
- **R (Read):** Users browse listings in `/food` and view individual details in `/food/:id`.
- **U (Update):** In `/dashboard/my-donations`, users can edit their listings via an Edit Modal, or claim/update status in `/food/:id` and `/deliveries`.
- **D (Delete):** In `/dashboard/my-donations`, listings can be deleted with a confirmation modal (`deleteFood()`).
- **Files:** [FoodContext.jsx](file:///c:/Users/divya/Desktop/food/src/context/FoodContext.jsx), [MyDonations.jsx](file:///c:/Users/divya/Desktop/food/src/pages/dashboard/MyDonations.jsx)

### 13. (Lectures 37–42 & 49–54) How is Role-Based Access Control (RBAC) implemented?
- **Donor:** Can post surplus food (`/donate`) and manage posted donations (`/dashboard/my-donations`). Cannot claim food or perform deliveries.
- **NGO:** Can browse and claim surplus food (`/food/:id`) and manage accepted claims (`/dashboard/my-claims`). Cannot post donations.
- **Volunteer:** Can coordinate food deliveries in the pipeline (`/deliveries`) and track tasks (`/dashboard/checklist`).
- **Admin:** Has unrestricted master access across all sections.
- **Implementation:** `ProtectedRoute` checks `allowedRoles.includes(currentUser.role)`. If unauthorized, it displays a friendly restriction card. Navbar and Dashboard links adapt automatically to the logged-in role.
- **Files:** [ProtectedRoute.jsx](file:///c:/Users/divya/Desktop/food/src/components/ProtectedRoute.jsx), [App.jsx](file:///c:/Users/divya/Desktop/food/src/App.jsx), [Navbar.jsx](file:///c:/Users/divya/Desktop/food/src/components/Navbar.jsx)

