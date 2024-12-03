import React from 'react';
import { Routes, Route } from 'react-router-dom' // Remove BrowserRouter
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Promotion from './pages/Promotion'
import OrderList from './pages/OrderList'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Order from './pages/Order'
import Stores from './pages/Stores';
import Dashboard from './pages/Admin/Dashboard'
import ProductAdmin from './pages/Admin/ProductAdmin';
import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './pages/Admin/PrivateRoute';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full mx-auto flex-1">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/promotion" element={<Promotion />} />
            <Route path="/order-list" element={<OrderList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/stores" element={<Stores />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='admin' element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='products' element={<ProductAdmin />}/>
              <Route path='orders' element={<h1>Orders</h1>} />
              <Route path='customers' element={<h1>Customers</h1>} />
              <Route path='promotions' element={<h1>Promotions</h1>} />
              <Route path='vouchers' element={<h1>Vouchers</h1>} />
              <Route path='suppliers' element={<h1>Suppliers</h1>} />
              <Route path='materials' element={<h1>Materials</h1>} />
              <Route path='support' element={<h1>Customer Support</h1>} />
            </Route>
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;