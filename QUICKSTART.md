# Quick Start Guide - Fashion Website E-Commerce

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd "d:\fashion website\my-app"
npm install --legacy-peer-deps
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to the URL shown (usually `http://localhost:5173`)

---

## 🎯 Testing the Application

### Entry Point - Country Selector
1. You'll see a full-screen country selector
2. Click any country flag to proceed to the homepage
3. The selected country appears in the header

### Home Page
1. See auto-rotating promotional banners (5-second interval)
2. Browse featured categories
3. View new arrivals and best sellers
4. Click on any product to see details

### Product Browsing
1. Click on a category (Women, Men, Kids, etc.)
2. Use filters: Price range, Colors, Sizes
3. Sort by: Latest, Price (Low-High), Price (High-Low)
4. Click product image to view details

### Shopping Cart
1. Add items from product pages
2. View cart icon badge with item count
3. Adjust quantities or remove items
4. Proceed to checkout

### Checkout Flow
1. Fill in personal information
2. Enter shipping address
3. Select payment method (COD, Card, or Bank Transfer)
4. Place order
5. See order confirmation with tracking info

### User Account
1. Click "Sign Up" to create account
2. Or "Login" with existing credentials
3. View profile, orders, addresses, and wishlist
4. Add/remove items from wishlist

---

## 📊 Mock Data Included

### Products
- **15 sample products** across all categories
- Each with: name, price, discount, colors, sizes, fabric info

### Categories
- Women, Men, Kids, Accessories, Fragrances

### Countries
- Pakistan, USA, UK, Saudi Arabia, UAE, Canada, Australia

### Promo Banners
- Mega Sale, New Arrivals, Summer Collection

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#1a1a1a',      // Change primary color
  secondary: '#c41e3a',    // Change secondary color
  accent: '#f0f0f0',       // Change accent color
}
```

### Add Products
Edit `src/data/mockData.js`:
```javascript
{
  id: 16,
  name: 'Your Product Name',
  category: 'women',
  price: 4500,
  originalPrice: 5500,
  image: 'image-url',
  sale: true,
  discount: 18,
  colors: ['Red', 'Blue'],
  sizes: ['S', 'M', 'L'],
  fabric: 'Cotton',
  description: 'Product description'
}
```

### Modify Categories
Edit `src/data/mockData.js` CATEGORIES array

---

## 🔧 File Overview

| File | Purpose |
|------|---------|
| `App.jsx` | Main app with routing |
| `src/context/AppContext.jsx` | State management |
| `src/data/mockData.js` | Mock products & data |
| `src/components/Header.jsx` | Navigation header |
| `src/components/ProductCard.jsx` | Product display |
| `src/pages/*.jsx` | Page components |
| `tailwind.config.js` | Tailwind settings |
| `index.css` | Global styles |

---

## 💡 Key Shortcuts

| Feature | Path | Component |
|---------|------|-----------|
| Home | `/home` | HomePage.jsx |
| Category | `/category/:slug` | CategoryPage.jsx |
| Product | `/product/:id` | ProductDetailPage.jsx |
| Cart | `/cart` | CartPage.jsx |
| Checkout | `/checkout` | CheckoutPage.jsx |
| Login | `/login` | LoginPage.jsx |
| Signup | `/signup` | SignupPage.jsx |
| Profile | `/profile` | ProfilePage.jsx |
| Wishlist | `/wishlist` | WishlistPage.jsx |

---

## 🎓 What You Can Learn

✅ React Hooks (useState, useEffect, useContext)
✅ React Router v6 (Routes, Link, useNavigate, useParams)
✅ Tailwind CSS responsive design
✅ Context API for state management
✅ Component composition and reusability
✅ Form handling and validation
✅ E-commerce patterns and flows
✅ Mobile-responsive design

---

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill the process or use a different port
npm run dev -- --port 5174
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Tailwind Not Working
- Make sure `npm run dev` is running
- Check that files are imported correctly
- Verify index.css has @tailwind directives

### Images Not Loading
- Check image URLs in mockData.js
- Ensure URLs are accessible
- Consider using local images in `public/` folder

---

## 📞 Support

For questions about:
- **React:** Check [React docs](https://react.dev)
- **Tailwind:** Check [Tailwind docs](https://tailwindcss.com)
- **React Router:** Check [Router docs](https://reactrouter.com)

---

## 🎉 Ready to Explore!

1. Run `npm run dev`
2. Open the application
3. Start with country selection
4. Explore all features
5. Test the shopping flow
6. Check mobile responsiveness

**Enjoy building and exploring this e-commerce platform!**
