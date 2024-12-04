//#region Imports
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserCart, updateQuantity, removeItemFromCart } from '../../services/apiService';
import { toast } from 'react-toastify';
//#endregion

//#region CartItem Component
const CartItem = ({ image, name, price, quantity, onUpdateQuantity, onDelete }) => {
  const [quantity1, setquantity1] = useState(quantity);

  const handleIncrease = () => {
    const newQuantity = quantity1 + 1;
    onUpdateQuantity(newQuantity);
    setquantity1(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity1 > 1) {
      const newQuantity = quantity1 - 1;
      onUpdateQuantity(newQuantity);
      setquantity1(newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img src={image} alt={name} className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <ul className="text-xs text-gray-500 mt-1 mb-2">
          <li>- Đế bánh dày</li>
          <li>- Thêm phô mai</li>
          <li>- Sốt cà chua</li>
        </ul>
        <div className="flex items-center justify-between">
          <div className="flex items-center border rounded-lg">
            <button onClick={handleDecrease} className="px-2 py-1 hover:bg-gray-100">-</button>
            <span className="px-4 py-1">{quantity1}</span> 
            <button onClick={handleIncrease} className="px-2 py-1 hover:bg-gray-100">+</button>
          </div>
          <span className="font-bold">{(price * quantity1).toLocaleString()}đ</span>
        </div>
      </div>
      <button onClick={onDelete} className="p-2 hover:bg-gray-100 rounded-full">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
//#endregion

//#region CartSidebar Component
const CartSidebar = ({ isOpen, onClose }) => {
  //#region Hooks and Handlers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [itemsCart, setItemsCart] = useState([]);

  // Add new useEffect to monitor isOpen changes
  useEffect(() => {
    if (isOpen) {
      getCart();
    }
  }, [isOpen]);

  const handleDelete = async (itemId) => {
    try {
      const response = await removeItemFromCart(itemId);
      if (response && response.success === true) {
        // Update local state immediately
        setItemsCart(prevItems => {
          const newItems = prevItems.filter(item => item._id !== itemId);
          // Update Redux store with new count
          dispatch({ type: 'SET_CART_ITEMS_COUNT', payload: newItems.length });
          return newItems;
        });
        // Update cart totals
        setCart(prevCart => ({
          ...prevCart,
          totalAmount: prevCart.totalAmount - (
            prevCart.items.find(item => item._id === itemId)?.price *
            prevCart.items.find(item => item._id === itemId)?.quantity || 0
          )
        }));
        toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
      } else {
        toast.error('Không thể xóa sản phẩm. Vui lòng thử lại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng');
      console.error(error);
    }
  };

  const handleOrder = () => {
    navigate('/order');
    onClose();
  };

  const getCart = async () => {
    try {
      const response = await getUserCart();
      if (response && response.data) {
        setCart(response.data);
        setItemsCart(response.data.items);
        // Dispatch action to update cart items count
        dispatch({ type: 'SET_CART_ITEMS_COUNT', payload: response.data.items.length });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      const update = await updateQuantity(itemId, quantity);
      if (update) {
        getCart();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div 
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Giỏ hàng</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {itemsCart.map((item, index) => (
              <CartItem
                image={item.productId.image}
                name={item.productId.name}
                price={item.price}
                quantity={item.quantity}
                onUpdateQuantity={(quantity) => handleUpdateQuantity(item._id, quantity)}
                onDelete={() => handleDelete(item._id)}
              />
            ))}
          </div>

          <div className="border-t pt-4 mt-auto">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Tổng cộng:</span>
              <span className="font-bold">
                {cart.totalAmount !== undefined ? cart.totalAmount.toLocaleString() : '0'}đ
              </span>
            </div>
            <button 
              className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-orange-500"
              onClick={handleOrder}
            >
              Tiến hành đặt hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
//#endregion

export default CartSidebar;