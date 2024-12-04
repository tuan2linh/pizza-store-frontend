import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postLogin, postRegister } from "../../services/apiService"
import { useDispatch } from "react-redux";
import { doLogin, doRegister } from "../../redux/action/userAction";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo.png";

function LoginModal({ onClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("login");
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleLogin = async () => {
        if (!username) {
            toast.error('Invalid username')
            return;
        }
        if (!password) {
            toast.error('Invalid password')
            return;
        }
        console.log("Đăng nhập");
        let data = await postLogin(username, password);
        if (data?.message === "Login successful") {
            // Add username to data before dispatching
            dispatch(doLogin(data));
            if (data?.role !== "user") {
                navigate('/admin')
            }
            else {
                navigate('/')
                onClose();
            }
            toast.success(data.message);
        }
        else {
            toast.error(data.message);
        }
    };

    const handleRegister = async () => {
        if (!username) {
            toast.error('Invalid username')
            return;
        }
        if (!fullName) {
            toast.error('Invalid full name')
            return;
        }
        if (!phoneNumber) {
            toast.error('Invalid phone number')
            return;
        }
        if (!email) {
            toast.error('Invalid email')
            return;
        }
        if (!password) {
            toast.error('Invalid password')
            return;
        }
        if (!confirmPassword) {
            toast.error('Invalid confirm password')
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Password and confirm password do not match')
            return;
        }
        console.log("Đăng ký");
        let data = await postRegister(username, password, email, fullName, phoneNumber);
        if (data?.message === "User registered successfully") {
            dispatch(doRegister(data));
            navigate('/')
            onClose();
            toast.success(data.message);
        }
        else {
            toast.error(data.message);
        }
    }

    const handleForgotPassword = () => {
            toast.info(`Please contact the administrator for password recovery`);
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-[800px] my-6 mx-auto">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-br from-gray-50 to-gray-100 outline-none focus:outline-none">
                        <button
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10 transition-colors duration-200"
                            onClick={onClose}
                        >
                            <span className="text-2xl">&times;</span>
                        </button>

                        <div className="flex">
                            <div className="w-1/2 bg-orange-100 rounded-l-lg relative">
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black bg-opacity-40 text-white rounded-l-lg">
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="w-32 mb-4"
                                    />
                                    <h2 className="text-2xl font-bold mb-2">Chào mừng đến với Pizza Store</h2>
                                    <p className="text-sm">Nơi những chiếc bánh pizza thơm ngon được làm ra với tình yêu</p>
                                </div>
                                <img
                                    src="https://dominos.vn/img/bg/modal-signin-signup.png"
                                    alt="Login"
                                    className="w-full h-full object-cover rounded-l-lg"
                                />
                            </div>

                            <div className="w-1/2 p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100">
                                <div className="flex mb-8 border-b border-gray-200">
                                    <button
                                        className={`pb-4 px-4 font-medium transition-all duration-200 ${activeTab === "login"
                                            ? "border-b-2 border-orange-500 text-orange-500 bg-white shadow-sm"
                                            : "text-gray-600 hover:text-gray-800"
                                            }`}
                                        onClick={() => setActiveTab("login")}
                                    >
                                        Đăng nhập
                                    </button>
                                    <button
                                        className={`pb-4 px-4 font-medium transition-all duration-200 ${activeTab === "register"
                                            ? "border-b-2 border-orange-500 text-orange-500 bg-white shadow-sm"
                                            : "text-gray-600 hover:text-gray-800"
                                            }`}
                                        onClick={() => setActiveTab("register")}
                                    >
                                        Tạo tài khoản
                                    </button>
                                </div>
                                {activeTab === "login" ? (
                                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
                                        <div className="relative">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Tên người dùng
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <FaUser />
                                                </span>
                                                <input
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                                    placeholder="Nhập tên người dùng"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Mật khẩu
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <FaLock />
                                                </span>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                                    placeholder="Nhập mật khẩu"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <a href="#" className="text-orange-500 text-sm hover:text-orange-600 transition-colors" onClick={handleForgotPassword}>
                                                Quên mật khẩu?
                                            </a>
                                        </div>
                                        <button
                                            onClick={handleLogin}
                                            className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transform hover:scale-[1.02] transition-all duration-200 font-semibold"
                                        >
                                            Đăng nhập
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 bg-white p-6 rounded-lg shadow-sm">
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Tên người dùng
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <FaUser />
                                                </span>
                                                <input
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                                    placeholder="Nhập tên người dùng"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Họ và tên
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <FaUser />
                                                </span>
                                                <input
                                                    type="text"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                                    placeholder="Nhập họ và tên"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Số điện thoại
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <FaPhone />
                                                </span>
                                                <input
                                                    type="tel"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                                    placeholder="Nhập số điện thoại"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Email
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <FaEnvelope />
                                                </span>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                                    placeholder="Nhập địa chỉ email"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Mật khẩu
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <FaLock />
                                                </span>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                                    placeholder="Nhập mật khẩu"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Xác nhận mật khẩu
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <FaLock />
                                                </span>
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                                    placeholder="Nhập lại mật khẩu"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 mt-4">
                                            <input
                                                type="checkbox"
                                                id="terms"
                                                className="mt-1"
                                                checked={agreeToTerms}
                                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                            />
                                            <label htmlFor="terms" className="text-sm text-gray-600">
                                                Tôi xác nhận thông tin trên là chính xác và đồng ý với{" "}
                                                <a href="#" className="text-orange-500 hover:underline">
                                                    điều khoản sử dụng
                                                </a>{" "}
                                                của cửa hàng
                                            </label>
                                        </div>
                                        <button
                                            onClick={handleRegister}
                                            className={`w-full p-3 rounded-lg transition-colors ${agreeToTerms
                                                ? "bg-orange-400 hover:bg-orange-600 text-white"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                }`}
                                            disabled={!agreeToTerms}
                                        >
                                            Tạo tài khoản
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-40 fixed inset-0 z-40 bg-gray-900"></div>
        </>
    );
}

export default LoginModal;
