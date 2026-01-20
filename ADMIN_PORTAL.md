# Admin Portal Documentation

## Overview
Professional admin dashboard for managing Fashion Website e-commerce store.

## Access Admin Portal

### Login
- Navigate to: `http://localhost:5175/admin/login`
- **Email:** admin@fashionwebsite.com
- **Password:** admin123

### Dashboard
Once logged in, you'll have access to:

## Admin Features

### 1. 📊 Dashboard
- **Overview Stats:** Total orders, products, revenue, customers
- **Recent Orders:** Latest 5 orders with status
- **Sales Overview:** Revenue trend visualization
- **Top Categories:** Category performance metrics

### 2. 📦 Products Management
- View all products with images
- Search and filter products
- Add new products
- Edit product details
- Delete products
- Track stock levels
- Manage product status (Active/On Sale)

### 3. 📋 Orders Management
- View all customer orders
- Filter by status (Pending, Processing, Shipped, Delivered)
- Search orders by ID or customer name
- View order details
- Update order status
- Download order reports

### 4. 👥 Customers Management
- View all registered customers
- Customer profile cards showing:
  - Contact information
  - Total orders and spending
  - Join date
  - Quick actions (View Profile, Message)
- Search by name or email

### 5. 🏷️ Categories Management
- View all product categories
- Add new categories
- Edit category details
- View product count per category
- Manage category status
- Update category images

### 6. 📈 Analytics & Reports
- Revenue trends
- Sales by category
- Top selling products
- Conversion rates
- Customer metrics
- Export data functionality

## Admin Navigation

### Sidebar Menu
- 📊 Dashboard - Overview and key metrics
- 📋 Orders - Order management and tracking
- 📦 Products - Product catalog management
- 🏷️ Categories - Category administration
- 👥 Customers - Customer management
- 📈 Analytics - Reports and insights
- 🚪 Logout - Exit admin portal

## Key Features

### Real-time Updates
- Dashboard metrics update in real-time
- Order status tracking
- Inventory management

### Search & Filter
- Powerful search across all modules
- Advanced filtering options
- Quick access to important information

### Responsive Design
- Mobile-friendly interface
- Tablet and desktop optimization
- Touch-friendly controls

### Data Management
- Add/Edit/Delete operations
- Bulk actions
- Data export functionality
- Pagination for large datasets

## Admin Demo Credentials

```
Email: admin@fashionwebsite.com
Password: admin123
```

## Security Considerations

> **Note:** This is a demo/frontend admin portal. For production:
> - Implement proper authentication and authorization
> - Add password hashing and encryption
> - Implement role-based access control (RBAC)
> - Add audit logs
> - Implement CSRF protection
> - Add rate limiting
> - Use HTTPS only

## URL Routes

- `/admin/login` - Admin login page
- `/admin/dashboard` - Main dashboard
- `/admin/products` - Products management
- `/admin/orders` - Orders management
- `/admin/customers` - Customers management
- `/admin/categories` - Categories management
- `/admin/analytics` - Analytics and reports

## Styling

The admin portal uses:
- **Color Scheme:** Primary (#1a1a1a), Secondary (#c41e3a)
- **Framework:** Tailwind CSS
- **Icons:** Lucide React
- **Responsive:** Mobile-first design

## Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced analytics with charts
- [ ] Inventory alerts
- [ ] Customer segmentation
- [ ] Email marketing integration
- [ ] Report scheduling
- [ ] Multi-user admin roles
- [ ] Activity audit logs
- [ ] Backup and restore functionality
- [ ] Multi-language support

## Support

For issues or questions, contact: support@fashionwebsite.com
