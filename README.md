# Farmart Frontend

React + Redux Toolkit frontend for Farmart e-commerce platform connecting farmers with buyers.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

```bash
# Create .env from template
cp .env.example .env

# Make sure backend API URL is correct
# VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Server

```bash
npm run dev
```

App runs at `http://localhost:5173`

## Project Structure

```
farmart-frontend/
├── src/
│   ├── app/
│   │   └── store.js              # Redux store configuration
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authSlice.js      # Auth Redux slice (login/register/logout)
│   │   │   ├── Login.jsx         # Login form component
│   │   │   └── Register.jsx      # Register form component
│   │   ├── animals/
│   │   │   └── animalsSlice.js   # Animals state (skeleton)
│   │   ├── cart/                 # Cart feature
│   │   └── orders/               # Orders feature
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation bar (skeleton)
│   │   └── PrivateRoute.jsx      # Protected route wrapper
│   ├── services/
│   │   └── api.js                # Axios instance with JWT interceptor
│   ├── App.jsx                   # Main app component with routing
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── .env.example                  # Environment template
├── package.json                  # Dependencies
└── vite.config.js                # Vite configuration
```

## Feature-Based Development

Each team member implements their assigned feature (frontend + backend together):

### Authentication
- **Redux**: `authSlice.js` with `loginUser`, `registerUser`, `logout` actions
- **Components**: `Login.jsx`, `Register.jsx` forms with full validation
- **Auth Flow**: JWT stored in localStorage, automatic header injection
- **Protected Routes**: `PrivateRoute.jsx` redirects unauthenticated users

### Animals Listings
- **Redux**: Implement `animalsSlice.js` - fetch all, fetch by ID, create, update, delete
- **Pages**: 
  - `AnimalList.jsx` - Browse animals, search, filters (species, price range)
  - `AnimalDetail.jsx` - View single animal, add to cart button
  - `AnimalForm.jsx` - Create/edit animals (farmers only)
- **API**: Integrate with `/api/animals` endpoints

### Shopping Cart
- **Redux**: Create `cartSlice.js` - fetch cart, add item, update quantity, remove item
- **Pages**:
  - `Cart.jsx` - View cart, update quantities, remove items, checkout button
- **Components**: 
  - `AddToCartButton.jsx` - Reusable button on animal cards
- **API**: Integrate with `/api/carts` endpoints

### Orders & Payment
- **Redux**: Create `ordersSlice.js` - create order, fetch orders, confirm/reject (farmers)
- **Pages**:
  - `Checkout.jsx` - Review order, payment form, submit
  - `OrderHistory.jsx` - Buyer's order history
  - `FarmerOrders.jsx` - Farmers view/confirm/reject orders
- **API**: Integrate with `/api/orders` endpoints

### QA & Testing
- Write Cypress E2E tests for all features
- Manual testing across features
- Create test data and edge cases

## Tech Stack

- **React** 19.2.0 - UI library
- **Redux Toolkit** 2.11.2 - State management
- **React Router** 7.13.0 - Routing
- **Axios** 1.13.3 - HTTP client with JWT handling
- **Vite** 7.2.4 - Build tool & dev server

## Available Scripts

```bash
npm run dev          # Start dev server (port 5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Lint code with ESLint
```

## Development Workflow

1. **Create feature branch**: `git checkout -b feature/animals`
2. **Implement feature**: Redux slice + React components
3. **Test locally**: Backend running + frontend integration
4. **Create PR**: Push to GitHub and request review
5. **Team review**: Review within 24 hours
6. **Merge**: Merge to `dev` branch

## State Management Pattern

All features follow the same Redux pattern:

```javascript
// 1. Create slice
const featureSlice = createSlice({
  name: 'feature',
  initialState: { data: [], loading: false, error: null },
  reducers: { /* sync actions */ },
  extraReducers: (builder) => {
    // Handle async thunks (pending/fulfilled/rejected)
  }
});

// 2. Create async thunks
export const fetchItems = createAsyncThunk('feature/fetch', async () => {
  const response = await api.get('/endpoint');
  return response.data;
});

// 3. Use in components
const dispatch = useDispatch();
const { data, loading } = useSelector(state => state.feature);
useEffect(() => { dispatch(fetchItems()) }, []);
```

## Sprint Timeline (2 weeks)

**Days 1-3**: Auth + Animals feature  
**Days 4-7**: Animals complete + Cart feature  
**Days 8-11**: Orders/Payment + E2E testing  
**Days 12-13**: Bug fixes + polish  
**Day 14**: Demo rehearsal

## Notes

- **Auth is IN TESTING** - Implementation complete, testing before commit
- All API calls go through `src/services/api.js` (auto-adds JWT token)
- Protected routes use `<PrivateRoute>` component
- Backend API runs on port 5000, frontend on 5173
- Check `docs/API.md` in backend repo for endpoint documentation

## Team Lead Notes

- Daily 15-min standups at [TIME]
- PRs reviewed within 24 hours
- Feature branches merge to `dev`
- Deploy from `main` at end of sprint

---

**Backend Repo**: [farmart-backend](https://github.com/Vanessa-Faith/farmart-backend)  
**Figma Wireframes**: [Link from team lead]
**Videos**: we would like to acknowledge https://www.pexels.com/download/video/31819948/ 
