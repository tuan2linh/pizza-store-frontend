import React from "react";
import { useState, useEffect } from "react";
import { getUserCart, createOrder, applyVoucherToOrder, checkVoucher, getUserProfile, addUserAddress } from "../../services/apiService";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useDispatch, useSelector } from 'react-redux';  // Add useDispatch
import { useNavigate } from "react-router-dom";

const Order = () => {
    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");
    const [address, setAddress] = useState("");
    const [deliveryType, setDeliveryType] = useState("delivery"); // 'delivery' or 'scheduled'
    const [deliveryTime, setDeliveryTime] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash"); // 'cash', 'creditCard', 'atm', 'viMomo', 'viZaloPay', 'viShopeePay'
    const [cart, setCart] = useState({});
    const [itemsCart, setItemsCart] = useState([]);
    const [addressError, setAddressError] = useState("");
    const [customerNameError, setCustomerNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [voucherCode, setVoucherCode] = useState("");
    const [voucherDiscount, setVoucherDiscount] = useState(0);
    const [userAddresses, setUserAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isAddressModified, setIsAddressModified] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Add dispatch
    const currentCount = useSelector(state => state.cart.itemCount); // Move this to component level

    useEffect(() => {
        getCart();
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await getUserProfile();
            if (response && response.success === true && response.data.addresses.length > 0) {
                setUserAddresses(response.data.addresses);
                // Set default address (first address)
                const defaultAddress = response.data.addresses[0];
                setSelectedAddressId(defaultAddress._id);
                setCustomerName(defaultAddress.recipientName);
                setEmail(defaultAddress.recipientEmail);
                setPhone(defaultAddress.recipientPhone);
                setAddress(defaultAddress.address);
            }
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        }
    };

    const getCart = async () => {
        try {
            const response = await getUserCart();
            if (response && response.data) {
                setCart(response.data);
                setItemsCart(response.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const sizeMapping = {
        small: 'Nhỏ',
        medium: 'Vừa',
        large: 'Lớn'
    };

    const totalPrice = itemsCart.reduce(
        (sum, item) => sum + item.subTotal,
        0
    );
    const PromotionDiscount = 0; // Replace with actual promotion discount
    let deliveryFee = 0; // Replace with actual delivery fee
    if (itemsCart.length > 0) {
        deliveryFee = 30000;
    }
    const finalTotal = totalPrice - PromotionDiscount - voucherDiscount + deliveryFee;

    const validateAddress = (value) => {
        const addressPattern = /^[^,]+,[^,]+,[^,]+,[^,]+$/;
        if (!value) {
            setAddressError("Địa chỉ không được để trống");
            return false;
        }
        if (!addressPattern.test(value)) {
            setAddressError("Địa chỉ phải theo định dạng: Tên đường, Phường, Quận, Thành phố");
            return false;
        }
        setAddressError("");
        return true;
    };

    const validateCustomerName = (value) => {
        if (!value.trim()) {
            setCustomerNameError("Tên khách hàng không được để trống");
            return false;
        }
        setCustomerNameError("");
        return true;
    };

    const validateEmail = (value) => {
        if (!value.trim()) {
            setEmailError("Email không được để trống");
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            setEmailError("Email không hợp lệ");
            return false;
        }
        setEmailError("");
        return true;
    };

    const validatePhone = (value) => {
        if (!value.trim()) {
            setPhoneError("Số điện thoại không được để trống");
            return false;
        }
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(value)) {
            setPhoneError("Số điện thoại không hợp lệ (10 số)");
            return false;
        }
        setPhoneError("");
        return true;
    };

    const handleAddressInput = (e) => {
        const value = e.target.value;
        setAddress(value);
        validateAddress(value);
    };

    const handleCheckVoucher = async () => {
        try {
            console.log(voucherCode);
            const response = await checkVoucher(voucherCode);
            if (response && response.success === true) {
                setVoucherDiscount(response?.data?.discount_amount);
                toast.success("Mã giảm giá hợp lệ");
            } else {
                setVoucherDiscount(0);
                toast.error(response?.message || "Mã giảm giá không hợp lệ");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleOrder = async () => {
        const isCustomerNameValid = validateCustomerName(customerName);
        const isEmailValid = validateEmail(email);
        const isPhoneValid = validatePhone(phone);
        const isAddressValid = validateAddress(address);

        if (!isCustomerNameValid || !isEmailValid || !isPhoneValid || !isAddressValid) {
            return;
        }
        const [street, ward, district, city] = address.split(",").map(item => item.trim());
        deliveryFee = 30000;
        const orderData = {
            customerInfo: {
                name: customerName,
                phone: phone,
                email: email,
                address: {
                    street,
                    ward,
                    district,
                    city,
                    notes: ""
                }
            },
            paymentDetails: {
                method: paymentMethod
            },
            deliveryInfo: {
                type: deliveryType,
            },
            deliveryFee: deliveryFee,
            specialInstructions: note
        };
        try {
            const response = await createOrder(orderData);

            if (response && response.success===true) {
                toast.success("Đặt hàng thành công");
                deliveryFee = 0;
                if (voucherDiscount > 0) {
                    const applyVoucherResponse = await applyVoucherToOrder(response.data._id,voucherCode);
                    if (applyVoucherResponse && applyVoucherResponse.success === true) {
                        toast.success("Áp dụng mã giảm giá thành công");
                    } else {
                        toast.error(applyVoucherResponse?.message || "Áp dụng mã giảm giá không thành công");
                    }
                }    
                navigate('/user/orders');
                dispatch({ type: 'SET_CART_ITEMS_COUNT', payload: 0 });
            }
            else {
                toast.error(response?.message || "Đặt hàng thất bại");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddressChange = (addressId) => {
        const selectedAddress = userAddresses.find(addr => addr._id === addressId);
        if (selectedAddress) {
            setSelectedAddressId(addressId);
            setCustomerName(selectedAddress.recipientName);
            setEmail(selectedAddress.recipientEmail);
            setPhone(selectedAddress.recipientPhone);
            setAddress(selectedAddress.address);
        }
    };

    const handleDevelop = () => {
        toast.info("Chức năng đang phát triển");
    };

    const handleSaveNewAddress = async () => {
        const newAddress = {
            recipientName: customerName,
            recipientEmail: email,
            recipientPhone: phone,
            address: address
        };

        try {
            const response = await addUserAddress(newAddress);
            if (response && response.success === true) {
                toast.success("Đã lưu địa chỉ mới thành công");
                fetchUserProfile(); // Refresh the address list
                setIsAddressModified(false);
            } else {
                toast.error(response?.message || "Lưu địa chỉ thất bại");
            }
        } catch (error) {
            console.error('Failed to save address:', error);
            toast.error("Lưu địa chỉ thất bại");
        }
    };

    const handleInputChange = (setter, validator, value) => {
        setter(value);
        if (validator) validator(value);
        setIsAddressModified(true);
    };

    return (
        <>
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 gap-6">
                    {/* Cột trái - 3/4 */}
                    <div className="col-span-3">
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            {/* Thông tin người dùng */}
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h2 className="text-lg font-medium mb-4">
                                    Thông tin người dùng
                                </h2>
                                {/* Add address selection dropdown */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Địa chỉ giao hàng (Chọn từ thông tin đã lưu)
                                    </label>
                                    <Select
                                        className="w-full"
                                        value={selectedAddressId}
                                        onChange={handleAddressChange}
                                        options={userAddresses.map(addr => ({
                                            value: addr._id,
                                            label: `${addr.recipientName} - ${addr.address}`
                                        }))}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="customerName"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Tên khách hàng
                                    </label>
                                    <input
                                        type="text"
                                        id="customerName"
                                        className={`shadow appearance-none border ${customerNameError ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        placeholder="Nhập tên khách hàng"
                                        value={customerName}
                                        onChange={(e) => handleInputChange(setCustomerName, validateCustomerName, e.target.value)}
                                    />
                                    {customerNameError && (
                                        <p className="text-red-500 text-xs italic mt-1">{customerNameError}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`shadow appearance-none border ${emailError ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        placeholder="Nhập email của bạn"
                                        value={email}
                                        onChange={(e) => handleInputChange(setEmail, validateEmail, e.target.value)}
                                    />
                                    {emailError && (
                                        <p className="text-red-500 text-xs italic mt-1">{emailError}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="phone"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className={`shadow appearance-none border ${phoneError ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        placeholder="Nhập số điện thoại của bạn"
                                        value={phone}
                                        onChange={(e) => handleInputChange(setPhone, validatePhone, e.target.value)}
                                    />
                                    {phoneError && (
                                        <p className="text-red-500 text-xs italic mt-1">{phoneError}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="address"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Địa chỉ
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        className={`shadow appearance-none border ${addressError ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        placeholder="Nhập theo định dạng: Tên đường, Phường, Quận, Thành phố"
                                        value={address}
                                        onChange={(e) => handleInputChange(setAddress, validateAddress, e.target.value)}
                                    />
                                    {addressError && (
                                        <p className="text-red-500 text-xs italic mt-1">{addressError}</p>
                                    )}
                                </div>
                                {isAddressModified && (
                                    <div className="mb-4">
                                        <button
                                            onClick={handleSaveNewAddress}
                                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
                                        >
                                            Lưu địa chỉ mới
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* Thông tin đặt hàng */}
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h2 className="text-lg font-medium mb-4">Thông tin đặt hàng</h2>
                                {/* Add voucher input section */}
                                <div className="mb-4">
                                    <div className="flex items-center">
                                        <input 
                                            type="text"
                                            className="border-blue-300 border-b py-2 px-3 w-full focus:border focus:border-blue-500 placeholder-gray-600 font-bold text-xs" 
                                            placeholder="Nhập Mã Khuyến Mãi" 
                                            style={{ height: '42px' }}
                                            value={voucherCode}
                                            onChange={(e) => setVoucherCode(e.target.value)}
                                        />
                                        <div className='w-1/3'>
                                            <button
                                                onClick={handleCheckVoucher}
                                                className="bg-[#0078ae] hover:bg-[#005f8a] text-xs text-white font-bold rounded-r flex items-center justify-center w-full" 
                                                style={{ height: '42px' }}
                                            >
                                                Áp Dụng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Existing note textarea */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="note"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Ghi chú
                                    </label>
                                    <textarea
                                        id="note"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Nhập ghi chú cho đơn hàng"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="delivery"
                                                name="deliveryType"
                                                value="delivery"
                                                checked={deliveryType === "delivery"}
                                                onChange={(e) => setDeliveryType(e.target.value)}
                                                className="mr-2"
                                            />
                                            <label htmlFor="delivery">
                                                Đặt hàng - Giao hàng ngay
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="scheduled"
                                                name="deliveryType"
                                                value="scheduled"
                                                checked={deliveryType === "scheduled"}
                                                // onChange={(e) => setDeliveryType(e.target.value)}
                                                onClick={handleDevelop}
                                                className="mr-2"
                                            />
                                            <label htmlFor="scheduled">Đặt hàng - Hẹn giờ giao</label>
                                        </div>
                                    </div>
                                </div>

                                {deliveryType === "scheduled" && (
                                    <div className="space-y-4">
                                        <div className="mb-4">
                                            <label
                                                htmlFor="deliveryTime"
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                            >
                                                Chọn giờ giao
                                            </label>
                                            <input
                                                type="time"
                                                id="deliveryTime"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                value={deliveryTime}
                                                onChange={(e) => setDeliveryTime(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Phương thức thanh toán */}
                        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                            {/* Phương thúc thanh toán */}
                            <h2 className="text-lg font-medium mb-4">
                                Phương thức thanh toán
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center p-3 ml-12 mr-8 border-b hover:border-orange-300 cursor-pointer">
                                    <input
                                        type="radio"
                                        id="atm"
                                        name="paymentMethod"
                                        value="atm"
                                        checked={paymentMethod === "atm"}
                                        // onChange={(e) => setPaymentMethod(e.target.value)}
                                        onClick={handleDevelop}
                                        className="mr-3"
                                    />
                                    <img
                                        src="https://img.dominos.vn/icon-payment-method-atm.png"
                                        alt="ATM"
                                        className="w-8 h-8 mr-2"
                                    />
                                    <label htmlFor="atm">ATM</label>
                                </div>
                                <div className="flex items-center p-3 ml-12 mr-8 border-b hover:border-orange-300 cursor-pointer">
                                    <input
                                        type="radio"
                                        id="creditCard"
                                        name="paymentMethod"
                                        value="creditCard"
                                        checked={paymentMethod === "creditCard"}
                                        // onChange={(e) => setPaymentMethod(e.target.value)}
                                        onClick={handleDevelop}
                                        className="mr-3"
                                    />
                                    <img
                                        src="https://img.dominos.vn/icon-payment-method-credit.png"
                                        alt="Credit Card"
                                        className="w-8 h-8 mr-2"
                                    />
                                    <label htmlFor="creditCard">Thẻ tín dụng / ghi nợ</label>
                                </div>
                                <div className="flex items-center p-3 ml-12 mr-8 border-b hover:border-orange-300 cursor-pointer">
                                    <input
                                        type="radio"
                                        id="viMomo"
                                        name="paymentMethod"
                                        value="viMomo"
                                        // checked={paymentMethod === "viMomo"}
                                        onClick={handleDevelop}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mr-3"
                                    />
                                    <img
                                        src="https://img.dominos.vn/icon-payment-method-mo-mo.png"
                                        alt="MoMo"
                                        className="w-8 h-8 mr-2"
                                    />
                                    <label htmlFor="viMomo">Ví MoMo</label>
                                </div>
                                <div className="flex items-center p-3 ml-12 mr-8 border-b hover:border-orange-300 cursor-pointer">
                                    <input
                                        type="radio"
                                        id="viZaloPay"
                                        name="paymentMethod"
                                        value="viZaloPay"
                                        checked={paymentMethod === "viZaloPay"}
                                        onClick={handleDevelop}
                                        // onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mr-3"
                                    />
                                    <img
                                        src="https://img.dominos.vn/icon-payment-method-zalo-pay.png"
                                        alt="ZaloPay"
                                        className="w-8 h-8 mr-2"
                                    />
                                    <label htmlFor="viZaloPay">Ví ZaloPay</label>
                                </div>
                                <div className="flex items-center p-3 ml-12 mr-8 border-b hover:border-orange-300 cursor-pointer">
                                    <input
                                        type="radio"
                                        id="viShopeePay"
                                        name="paymentMethod"
                                        value="viShopeePay"
                                        checked={paymentMethod === "viShopeePay"}
                                        // onChange={(e) => setPaymentMethod(e.target.value)}
                                        onClick={handleDevelop}
                                        className="mr-3"
                                    />
                                    <img
                                        src="https://img.dominos.vn/shoppepay.png"
                                        alt="ShopeePay"
                                        className="w-8 h-8 mr-2"
                                    />
                                    <label htmlFor="viShopeePay">Ví ShopeePay</label>
                                </div>
                                <div className="flex items-center p-3 ml-12 mr-8 border-b hover:border-orange-300 cursor-pointer">
                                    <input
                                        type="radio"
                                        id="cash"
                                        name="paymentMethod"
                                        value="cash"
                                        checked={paymentMethod === "cash"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mr-3"
                                    />
                                    <img
                                        src="https://img.dominos.vn/cash.png"
                                        alt="Cash"
                                        className="w-8 h-8 mr-2"
                                    />
                                    <label htmlFor="cash">Tiền mặt</label>
                                </div>
                            </div>
                        </div>
                        {/* Nút hoàn tất thanh toán */}
                        <div className="flex justify-center">
                            <button 
                            onClick={handleOrder}
                            className="bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded">
                                HOÀN TẤT ĐẶT HÀNG
                            </button>
                        </div>
                    </div>

                    {/* Cột phải - 1/4 */}
                    <div className="col-span-1">
                        {/* Giỏ hàng */}
                        <div className="bg-white rounded-lg shadow-md mb-5 p-4 h-full">
                            <h2 className="text-lg font-medium mb-4">Đơn hàng của bạn</h2>
                            {/* Price summary section */}
                            <div className="space-y-2 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span>Tổng</span>
                                    <span>{totalPrice.toLocaleString("vi-VN")}₫</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Giảm K.Mãi</span>
                                    <span>-{PromotionDiscount.toLocaleString("vi-VN")}₫</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Giảm Voucher</span>
                                    <span>-{voucherDiscount.toLocaleString("vi-VN")}₫</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Phí Giao Hàng</span>
                                    <span>{deliveryFee.toLocaleString("vi-VN")}₫</span>
                                </div>
                                <hr />
                                <div className="flex justify-between font-bold pt-2">
                                    <span>Tổng cộng</span>
                                    <span>{finalTotal.toLocaleString("vi-VN")}₫</span>
                                </div>
                            </div>
                            {/* Products list */}
                            <div className="space-y-4">
                                {itemsCart.map((item, index) => (
                                    <div key={index} className="flex items-center mb-4">
                                        <img
                                            src={item.productId.image}
                                            alt={item.productId.name}
                                            className="w-20 h-20 object-cover mr-4"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-lg font-medium mb-2 w-4/5">
                                                    {item.productId.name}
                                                </h3>
                                                <span className="text-sm font-medium text-gray-500">
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-2">
                                                {item.subTotal.toLocaleString("vi-VN")}₫
                                            </p>
                                            <div className="text-sm text-gray-500">
                                                Cỡ: {sizeMapping[item.size] || item.size}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Order;
