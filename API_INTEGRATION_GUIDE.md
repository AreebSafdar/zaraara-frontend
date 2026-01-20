# 🔗 API Integration Guide

This document outlines how to integrate real backend APIs into the current frontend application.

## Current Architecture

The application currently uses:
- **State Management:** React Context API
- **Data Source:** Mock data in `src/data/mockData.js`
- **Storage:** Browser state (localStorage not yet implemented)

## Recommended Backend Stack

```
Backend Framework: Node.js/Express or Django
Database: MongoDB or PostgreSQL
Authentication: JWT (JSON Web Tokens)
API Style: RESTful or GraphQL
Payment Gateway: Stripe or PayPal
```

## Step-by-Step Integration Guide

### Phase 1: Setup & Authentication

#### 1.1 Environment Variables
Create `.env` file:
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_ENV=development
```

Update `vite.config.js`:
```javascript
export default defineConfig({
  define: {
    __APP_ENV__: env.APP_ENV
  }
})
```

#### 1.2 Create API Service
Create `src/services/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  // Authentication
  login: (email, password) => 
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(res => res.json()),
  
  signup: (userData) =>
    fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }).then(res => res.json()),
  
  // Products
  getProducts: (category = null, filters = {}) =>
    fetch(`${API_URL}/products${category ? `?category=${category}` : ''}`)
      .then(res => res.json()),
  
  getProduct: (id) =>
    fetch(`${API_URL}/products/${id}`)
      .then(res => res.json()),
  
  // Orders
  createOrder: (orderData, token) =>
    fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    }).then(res => res.json()),
  
  // Add more endpoints as needed
};
```

### Phase 2: Authentication Integration

#### 2.1 Update LoginPage
```javascript
import { api } from '../services/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await api.login(formData.email, formData.password);
    
    if (response.success) {
      // Store token
      localStorage.setItem('authToken', response.token);
      
      // Update user state
      setUser(response.user);
      
      navigate('/home');
    } else {
      setError(response.message);
    }
  } catch (error) {
    setError('Login failed. Please try again.');
  }
};
```

#### 2.2 Add Auth Interceptor
Create `src/services/authService.js`:
```javascript
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
```

### Phase 3: Products & Categories

#### 3.1 Replace Mock Data with API Calls
Update `HomePage.jsx`:
```javascript
import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    // Component JSX
  );
}
```

#### 3.2 Update CategoryPage
```javascript
useEffect(() => {
  const fetchCategoryProducts = async () => {
    try {
      const data = await api.getProducts(slug, filters);
      setCategoryProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
  
  fetchCategoryProducts();
}, [slug, filters]);
```

### Phase 4: Shopping Cart & Orders

#### 4.1 Save Cart to Backend
```javascript
// In AppContext.jsx
const saveCart = async (cartItems) => {
  try {
    const token = getAuthToken();
    await api.updateCart(cartItems, token);
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
};

// Update addToCart to also save
const addToCart = (product) => {
  const updatedCart = [...cart, { ...product, quantity: 1 }];
  setCart(updatedCart);
  saveCart(updatedCart);
};
```

#### 4.2 Create Orders
Update `CheckoutPage.jsx`:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsProcessing(true);
  
  try {
    const token = getAuthToken();
    const orderData = {
      items: cart,
      shippingAddress: formData,
      paymentMethod: formData.paymentMethod,
      total: getCartTotal() + shipping
    };
    
    const response = await api.createOrder(orderData, token);
    
    if (response.success) {
      clearCart();
      navigate(`/order-confirmation/${response.orderNumber}`);
    } else {
      setError(response.message);
    }
  } catch (error) {
    setError('Order creation failed');
  } finally {
    setIsProcessing(false);
  }
};
```

### Phase 5: Real Payment Processing

#### 5.1 Stripe Integration
```bash
npm install @stripe/react-stripe-js @stripe/stripe-js
```

Create `src/services/stripeService.js`:
```javascript
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export const processPayment = async (paymentDetails) => {
  const stripe = await stripePromise;
  
  const result = await stripe.confirmCardPayment(
    paymentDetails.clientSecret,
    {
      payment_method: {
        card: paymentDetails.cardElement,
        billing_details: paymentDetails.billingDetails
      }
    }
  );
  
  return result;
};
```

#### 5.2 Update Checkout for Real Payments
```javascript
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripe = useStripe();
const elements = useElements();

const handlePayment = async () => {
  if (formData.paymentMethod === 'card') {
    const cardElement = elements.getElement(CardElement);
    
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });
    
    if (result.error) {
      setError(result.error.message);
    } else {
      // Process payment
      await processPayment({
        paymentMethodId: result.paymentMethod.id,
        amount: getCartTotal() + shipping
      });
    }
  }
};
```

### Phase 6: Real-time Updates

#### 6.1 WebSocket Integration
```javascript
// src/services/socketService.js
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL);

export const setupOrderTracking = (orderId, callback) => {
  socket.on(`order-${orderId}`, (update) => {
    callback(update);
  });
};

export const subscribeToOrderUpdates = (orderId) => {
  socket.emit('subscribe-order', orderId);
};
```

#### 6.2 Update Order Confirmation
```javascript
useEffect(() => {
  setupOrderTracking(orderNumber, (update) => {
    setOrderStatus(update.status);
    setEstimatedDelivery(update.estimatedDelivery);
  });
  
  subscribeToOrderUpdates(orderNumber);
  
  return () => socket.disconnect();
}, [orderNumber]);
```

## API Endpoints Reference

### Authentication
```
POST   /api/auth/login
POST   /api/auth/signup
POST   /api/auth/logout
POST   /api/auth/refresh-token
GET    /api/auth/profile
PUT    /api/auth/profile
```

### Products
```
GET    /api/products
GET    /api/products/:id
GET    /api/products?category=women&minPrice=100&maxPrice=5000
GET    /api/categories
GET    /api/categories/:id
```

### Cart
```
GET    /api/cart
POST   /api/cart
PUT    /api/cart/:itemId
DELETE /api/cart/:itemId
DELETE /api/cart (clear cart)
```

### Orders
```
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id (update status)
GET    /api/orders/:id/tracking
```

### Wishlist
```
GET    /api/wishlist
POST   /api/wishlist
DELETE /api/wishlist/:productId
```

## Error Handling

Create `src/services/errorHandler.js`:
```javascript
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      status: error.response.status,
      message: error.response.data.message || 'An error occurred'
    };
  } else if (error.request) {
    // Request made but no response
    return {
      status: 0,
      message: 'No response from server'
    };
  } else {
    // Other errors
    return {
      status: -1,
      message: error.message
    };
  }
};
```

## Environment Setup

### Development
```bash
VITE_API_URL=http://localhost:3000/api
VITE_APP_ENV=development
VITE_STRIPE_KEY=pk_test_xxx
```

### Production
```bash
VITE_API_URL=https://api.yourdomain.com/api
VITE_APP_ENV=production
VITE_STRIPE_KEY=pk_live_xxx
```

## Testing API Calls

### Using Postman
1. Create collection for endpoints
2. Set up environment variables
3. Test each endpoint
4. Save responses

### Using curl
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'

# Get products
curl http://localhost:3000/api/products

# Create order
curl -X POST http://localhost:3000/api/orders \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"items":[...],"total":1000}'
```

## Deployment Considerations

1. **Security**
   - Never expose API keys in frontend code
   - Use environment variables
   - Implement CORS properly
   - Validate all inputs

2. **Performance**
   - Cache products
   - Lazy load images
   - Implement pagination
   - Use CDN

3. **Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - User analytics
   - Log aggregation

4. **Scalability**
   - Database indexing
   - API rate limiting
   - Load balancing
   - Database replication

## Migration Checklist

- [ ] Set up backend API
- [ ] Create authentication system
- [ ] Implement product database
- [ ] Set up payment processing
- [ ] Create order management system
- [ ] Implement real-time updates
- [ ] Add error handling
- [ ] Set up monitoring
- [ ] Test all endpoints
- [ ] Deploy to production

---

**This guide provides a roadmap for integrating your backend API with the frontend application. Follow the phases sequentially for best results.**
