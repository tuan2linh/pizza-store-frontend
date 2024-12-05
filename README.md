# Pizza Store Frontend 🍕

A modern React-based web application for managing a pizza delivery business with features for both customers and administrators.

## Features

### Customer Features ✨

- 🛒 Shopping cart with real-time updates
- 🍕 Browse pizzas and other menu items with size options
- 💰 Apply vouchers and promotional discounts
- 📍 Save and manage multiple delivery addresses
- 📱 Responsive design for mobile devices
- 📦 Real-time order tracking
- 💳 Multiple payment methods (Cash/Bank transfer)
- 👤 User profile management
- 🔍 Product filtering and search

### Admin Features 👨‍💼

- 📊 Interactive analytics dashboard
- 📝 Comprehensive order management system
- 🏷️ Product catalog management
- 👥 Customer account management
- 🎉 Promotion campaign management
- 🎟️ Voucher system management
- 📈 Sales and revenue tracking
- 🚚 Delivery status management

## Tech Stack

- **Frontend:** React
- **State Management:** Redux
- **Styling:**
  - Tailwind CSS for utility-first styling
  - Ant Design components for UI elements
- **HTTP Client:** Axios
- **Routing:** React Router
- **Notifications:** React Toastify
- **Charts:** Chart.js with React-Chartjs-2

## Getting Started

1. Clone the repository:
  ```
  git clone [repository-url]
  ```
2. Install dependencies:
  ```
  npm install
  ```
3. Create environment file
  ```
  cp .env.example .env
  ```
4. Start development server:
```
npm start
```
7. Build for production:
 ```
 npm run build
 ``` 


## Project Structure
```
src/
├── assets/        # Static files
├── components/    # Reusable components
├── layouts/       # Layout components
├── pages/         # Page components
│   ├── Admin/     # Admin pages
│   └── User/      # Customer pages
├── redux/         # Redux store and actions
├── services/      # API services
└── utils/         # Utility functions
```
## Key Features In Detail

### Customer Interface

- **Menu Browsing:** Filter and search through pizza menu with detailed item views
- **Cart Management:** Add/remove items, adjust quantities, apply vouchers
- **Address Management:** Save multiple delivery addresses
- **Order Tracking:** Real-time updates on order status

### Admin Interface

- **Dashboard:** Real-time analytics and sales monitoring
- **Order Management:** Process orders through various stages (pending → completed)
- **Product Management:** Add/edit/delete menu items with pricing
- **User Management:** View and manage customer accounts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern food delivery applications
- Built with scalability and user experience in mind


















