import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doLogout } from "../redux/action/userAction"
import { toast } from "react-toastify";
import { postLogout } from '../services/apiService';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = account?.isAuthenticated;
  const role = account?.role;
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Quản lý sản phẩm', icon: '🍕' },
    { path: '/admin/orders', label: 'Quản lý đơn hàng', icon: '🛒' },
    { path: '/admin/customers', label: 'Quản lý người dùng', icon: '👥' },
    { path: '/admin/promotions', label: 'Chương trình khuyến mãi', icon: '🎉' },
    { path: '/admin/vouchers', label: 'Quản lý Vouchers', icon: '🎟️' },
    { path: '#', label: 'Nhà cung cấp', icon: '🏢', isDeveloping: true },
    { path: '#', label: 'Quản lý nguyên liệu', icon: '🍅', isDeveloping: true },
    { path: '#', label: 'Hỗ trợ khách hàng', icon: '💬', isDeveloping: true },
  ];
  const handleDeveloper = () => {
    toast.info("👨‍💻 Đang phát triển");
  };
  const handleLogout = () => {
    try {
      postLogout().then((res) => {
          dispatch(doLogout());
          navigate("/login");
          toast.success("Đăng xuất thành công");
      });
    } catch (error) {
      toast.error("Đăng xuất thất bại");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-700 text-white p-4">
        <div className="mb-8 flex items-center gap-2">
          <img src="https://readymadeui.com/profile.webp" alt="Admin Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="text-xl font-bold">{account.username}</h2>
            <p className="text-sm text-gray-400">Manager</p>
          </div>
          
        </div>
        <hr className="border border-gray-400 w-1/2 mb-4" />
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.path}
              onClick={item.isDeveloping ? handleDeveloper : undefined}
              className={`flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer
                ${location.pathname === item.path ? 'bg-gray-700' : ''}`}
            >
              {item.isDeveloping ? (
                <div>
                  <span>{item.icon}</span>
                  {item.label}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center gap-2 w-full"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-auto pt-4">
          <hr className="border border-gray-400 w-1/2 mb-4" />
          <Link to="/" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700 transition-colors">
            🏠 Quay trở về trang chủ
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700 transition-colors w-full text-left"
          >
            🚪 Đăng xuất
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-[#e5e7eb]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;