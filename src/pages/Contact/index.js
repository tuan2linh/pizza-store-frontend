import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaUser, FaPaperPlane, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  return (
    <div className="bg-gray-50">
      {/* Map Section - Full width */}
      <div className="w-full h-[400px] mb-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2!2d106.7!3d10.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ4JzAwLjAiTiAxMDbCsDQyJzAwLjAiRQ!5e0!3m2!1svi!2s!4v1234567890!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-12">Liên Hệ Với Chúng Tôi</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Information - 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 h-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Thông tin liên hệ</h2>
                <div className="space-y-8">
                  {/* Contact Items */}
                  <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                    <FaMapMarkerAlt className="text-orange-500 text-2xl mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Địa chỉ</h3>
                      <p className="text-gray-600">123 Đường ABC, Quận XYZ, TP.HCM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                    <FaPhoneAlt className="text-orange-500 text-xl mt-1" />
                    <div>
                      <h3 className="font-semibold">Hotline</h3>
                      <p className="text-gray-600">1900 1234</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                    <FaEnvelope className="text-orange-500 text-xl mt-1" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">info@pizzastore.com</p>
                    </div>
                  </div>
                </div>

                {/* Adding Operating Hours */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-semibold mb-4">Giờ làm việc</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Thứ 2 - Thứ 6: 8:00 - 22:00</p>
                    <p>Thứ 7 - Chủ nhật: 8:00 - 23:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Gửi tin nhắn</h2>
                <form className="space-y-6">
                  {/* Name Input */}
                  <div className="transform transition-all duration-300 hover:scale-[1.01]">
                    <label className="block text-gray-700 mb-2">Họ và tên</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="w-full pl-10 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Nhập họ và tên"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="transform transition-all duration-300 hover:scale-[1.01]">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        className="w-full pl-10 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Nhập địa chỉ email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="transform transition-all duration-300 hover:scale-[1.01]">
                    <label className="block text-gray-700 mb-2">Nội dung tin nhắn</label>
                    <textarea
                      rows="5"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Nhập nội dung tin nhắn"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <button
                    type="button"
                    className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 
                    transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg 
                    flex items-center justify-center space-x-2"
                    onClick={() => toast.info('Tính năng này đang được phát triển')}
                  >
                    <FaPaperPlane className="animate-bounce" />
                    <span>Gửi tin nhắn</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;