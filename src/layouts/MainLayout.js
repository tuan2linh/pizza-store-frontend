import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CartSidebar from '../components/CartSidebar';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = account?.isAuthenticated;
  const location = useLocation();

  const handleCartToggle = () => {
    if (location.pathname === '/cart') {
      return;
    }
    if (!isAuthenticated) {
      toast.error("Please login to continue");
      return;
    }
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 bg-white">
        <Header onCartClick={handleCartToggle} />
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;