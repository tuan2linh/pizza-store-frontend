import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import menu_1 from '../../assets/menu_1.png';
import menu_2 from '../../assets/menu_2.png';
import menu_3 from '../../assets/menu_3.png';
import menu_4 from '../../assets/menu_4.png';
import menu_5 from '../../assets/menu_5.png';
import menu_6 from '../../assets/menu_6.png';
import menu_7 from '../../assets/menu_7.png';
import menu_8 from '../../assets/menu_8.png';
import { getAllProducts } from '../../services/apiService';
import { toast } from 'react-toastify';
import ProductDetailModal from '../../components/ProductDetailModal';

const Home = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bannerSlides = [
    {
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=80",
      title: "Đặt pizza ngon nhất tại đây",
      subtitle: "Chế biến từ nguyên liệu tươi ngon",
      buttonText: "Xem thực đơn",
      path: "/menu"
    },
    {
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      title: "Pizza chất lượng cao",
      subtitle: "Tận hưởng hương vị tuyệt vời",
      buttonText: "Đặt hàng ngay",
      path: "/menu"
    },
    {
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143",
      title: "Đưa đến lựa chọn tốt nhất",
      subtitle: "Chất lượng hàng đầu, giá cả hợp lý",
      buttonText: "Khuyến mãi hấp dẫn",
      path: "/menu"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentBannerIndex(index);
  };

  const handleBannerNext = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % bannerSlides.length);
  };

  const handleBannerPrev = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendedItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + recommendedItems.length) % recommendedItems.length);
  };

  const getRecommendedItems = () => {
    const start = currentIndex;
    const end = (currentIndex + 4) % recommendedItems.length;
    if (start < end) {
      return recommendedItems.slice(start, end);
    } else {
      return [...recommendedItems.slice(start), ...recommendedItems.slice(0, end)];
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    try {
      const response = await getAllProducts();
      if (response) {
        setProducts(response.data);
        // Filter and randomize products when they're first loaded
        const filteredProducts = response.data.filter(product => 
          product.mainCategories?.includes('pizza') || product.mainCategories?.includes('chicken')
        );
        const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());
        setRecommendedItems(shuffled.slice(0, 10));
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleFeatureNotAvailable = () => {
    toast.info('Tính năng này hiện đang được phát triển');
  };

    const menuItems = [
    { name: 'Salad', image: menu_1, path: '/menu' },
    { name: 'Rolls', image: menu_2, path: '/menu' },
    { name: 'Deserts', image: menu_3, path: '/menu' },
    { name: 'Sandwich', image: menu_4, path: '/menu' },
    { name: 'Cake', image: menu_5, path: '/menu' },
    { name: 'Pure Veg', image: menu_6, path: '/menu' },
    { name: 'Pasta', image: menu_7, path: '/menu' },
    { name: 'Noodles', image: menu_8, path: '/menu' },
  ];

return (
    <div className='w-[80%] mx-auto'>
      <div className="relative h-[34vw] my-[30px] mx-auto overflow-hidden rounded-2xl">
        {bannerSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateX(${(index - currentBannerIndex) * 100}%)`,
            }}
          >
            <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] animate-[fadeIn_3s] text-white">
              <h2 className="text-[max(4.5vw,22px)] font-medium text-white drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-white text-[1vw]">{slide.subtitle}</p>
              <button 
                onClick={() => navigate(slide.path)}
                className="border-none text-black font-medium py-[1vw] px-[2.3vw] bg-white text-[max(1vw,13px)] rounded-[50px]"
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
        
        {/* Navigation arrows */}
        <button 
          onClick={handleBannerPrev} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center text-3xl transition-all hover:scale-110"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-8 h-8"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button 
          onClick={handleBannerNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center text-3xl transition-all hover:scale-110"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-8 h-8"
          >
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentBannerIndex === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="home-container">
        <div className="container mx-auto flex justify-between">
          <div className="flex items-center">
            <img
              className="object-contain w-6 h-6 mr-4" // Added margin-right
              src="//bizweb.dktcdn.net/100/527/383/themes/964940/assets/policies_icon_1.png?1730347951357"
              alt="Giao hàng miễn phí trong 24h"
            />
            <div className="pl-2"> {/* Added padding-left */}
              <p className="font-bold">Giao hàng hỏa tốc</p>
              <p className="text-sm">Nội thành TP. HCM trong 1h</p>
            </div>
          </div>

          <div className="flex items-center">
            <img
              className="object-contain w-6 h-6 mr-4" // Added margin-right
              src="//bizweb.dktcdn.net/100/527/383/themes/964940/assets/policies_icon_2.png?1730347951357"
              alt="Giao hàng miễn phí trong 24h"
            />
            <div className="pl-2"> {/* Added padding-left */}
              <p className="font-bold">Sản phẩm luôn mới</p>
              <p className="text-sm">Nhập mới nguyên liệu hàng ngày</p>
            </div>
          </div>
          <div className="flex items-center">
            <img
              className="object-contain w-6 h-6 mr-4"
              src='//bizweb.dktcdn.net/100/527/383/themes/964940/assets/policies_icon_3.png?1730347951357'
              alt="Hỗ trợ 24/7"

            />
            <div className="pl-2">
              <p className="font-bold">Hỗ trợ 24/7</p>
              <p className="text-sm">Hỗ trợ khách hàng 24/7</p>
            </div>
          </div>
          <div className="flex items-center">
            <img
              className="object-contain w-6 h-6 mr-4" // Added margin-right
              src="//bizweb.dktcdn.net/100/527/383/themes/964940/assets/policies_icon_4.png?1730347951357"
              alt="Giao hàng miễn phí trong 24h"
            />
            <div className="pl-2"> {/* Added padding-left */}
              <p className="font-bold">Deal hot bùng nổ</p>
              <p className="text-sm">Flash sale giảm giá cực sốc</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto flex justify-between mt-10">
          {[
            { code: 'EGA50...', expiry: 'HSD: 28/12/2024', description: 'Giảm 15% cho đơn hàng giá trị tối thiểu 500k. Mã giảm tối đa 25k' },
            { code: 'EGA30...', expiry: 'HSD: 20/02/2024', description: 'Giảm 20k cho đơn hàng giá trị tối thiểu 500k. Mã giảm tối đa 25k' },
            { code: 'FREESH...', expiry: 'HSD: 30/12/2024', description: 'Miễn phí vận chuyển cho đơn hàng tối thiểu 1 triệu. Tối đa 3 mã giảm giá đơn hàng.' },
            { code: '500K...', expiry: 'HSD: 30/12/2024', description: 'Nhận ưu đãi lớn cho đơn hàng từ 500k. Áp dụng cho khu vực Tp.HCM' },
          ].map((coupon, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:bg-yellow-100 w-1/4 m-2 flex flex-col h-[200px]"
            >
              {/* Header */}
              <div className="flex justify-between mb-2">
                <p className="font-bold">Mã: {coupon.code}</p>
                <p className="text-gray-500">{coupon.expiry}</p>
              </div>

              {/* Description with fixed height and overflow handling */}
              <p className="text-sm mb-auto overflow-y-auto flex-1">{coupon.description}</p>

              {/* Button container fixed to bottom */}
              <div className="flex justify-between mt-4 pt-2 border-t">
                <button 
                  onClick={handleFeatureNotAvailable} 
                  className="border border-red-500 text-red-500 px-3 py-1 rounded-md hover:bg-red-100"
                >
                  Điều kiện
                </button>
                <button 
                  onClick={handleFeatureNotAvailable}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Sao chép
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="container mx-auto py-8">
          <div className="recommend mt-8 rounded-lg p-6 border border-gray-200 shadow-lg relative">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Có Thể Bạn Sẽ Thích</h2>
            <div className="relative">
              <button 
                onClick={handlePrev} 
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-gray-50 transition-all"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex overflow-hidden mx-2">
                {getRecommendedItems().map((item, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-1/4 p-2"
                    onClick={() => {
                      setSelectedProduct({ ...item, productType: item.mainCategories?.[0] });
                      setIsModalOpen(true);
                    }}
                  >
                    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col h-full">
                      <div className="relative group">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-48 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
                      </div>
                      <div className="flex flex-col flex-grow mt-4">
                        <div className="relative group">
                          <h3 className="text-lg font-medium text-[#0078ae] truncate hover:text-[#00698e] mb-1">
                            {item.name}
                          </h3>
                          <div className="absolute invisible group-hover:visible bg-black/80 text-white p-2 rounded-md 
                            text-sm min-w-[200px] max-w-[300px] bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50
                            whitespace-normal break-words text-center">
                            {item.name}
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                              border-4 border-transparent border-t-black/80"></div>
                          </div>
                        </div>
                        <div className="mt-auto pt-4 text-center">
                          <span className="text-lg font-bold text-orange-500 block mb-3">
                            {item.price.medium.toLocaleString('vi-VN')}₫
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={handleNext} 
                className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-gray-50 transition-all"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto py-8">
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl font-bold text-red-500">Thực đơn nổi bật</h2>
          </div>
          <div className="grid grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => navigate(item.path)}
              >
                <div className="relative rounded-full overflow-hidden w-[150px] h-[150px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black opacity-25 hover:opacity-0 transition-opacity duration-300"></div>
                </div>
                <p className="text-center mt-4 font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Testimonials Section */}
        <div className="container mx-auto py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Khách hàng nói gì về chúng tôi</h2>
            <p className="text-gray-600 mt-3">Những đánh giá chân thực từ khách hàng</p>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                name: "Nguyễn Văn A",
                role: "Khách hàng thường xuyên",
                image: "https://randomuser.me/api/portraits/men/1.jpg",
                comment: "Pizza ở đây rất ngon, đặc biệt là đế bánh giòn tan. Dịch vụ giao hàng nhanh và nhân viên rất thân thiện.",
                rating: 5
              },
              {
                name: "Trần Thị B",
                role: "Food Blogger",
                image: "https://randomuser.me/api/portraits/women/2.jpg",
                comment: "Là một food blogger, tôi đã thử nhiều pizza nhưng ở đây là một trong những nơi làm pizza ngon nhất mà tôi từng ăn.",
                rating: 5
              },
              {
                name: "Lê Văn C",
                role: "Khách hàng mới",
                image: "https://randomuser.me/api/portraits/men/3.jpg",
                comment: "Lần đầu đặt thử và rất hài lòng với chất lượng. Chắc chắn sẽ quay lại lần sau.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      {i < testimonial.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
