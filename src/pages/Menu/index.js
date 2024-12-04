//#region Imports
import React, { useState, useEffect } from 'react';
import { FaPizzaSlice, FaFish, FaDrumstickBite, FaBacon, FaLeaf, FaList, FaUtensils, FaIceCream, FaCoffee } from 'react-icons/fa';
import { LuBeef } from "react-icons/lu";
import { useLocation } from 'react-router-dom';
import ProductDetailModal from '../../components/ProductDetailModal';
import { getAllProducts,getProductById,getProductsByCategory, getProductsBySubCategory } from '../../services/apiService';
//#endregion

//#region Menu Component
function Menu() {   
    const location = useLocation();
    const [activeMainCategory, setActiveMainCategory] = useState(
      location.state?.activeMainCategory || 'pizza'
    );
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [pizzaData, setPizzaData] = useState([]);
    const [chickenData, setChickenData] = useState([]);
    const [drinkData, setDrinkData] = useState([]);
    const [pastaData, setPastaData] = useState([]);
    const [appetizerData, setAppetizerData] = useState([]);
    const [dessertData, setDessertData] = useState([]);

    useEffect(() => {
      if (location.state?.activeMainCategory) {
        setActiveMainCategory(location.state.activeMainCategory);
      }
    }, [location.state]);

    // Add this new useEffect for scroll to top
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        getAllProduct();
        getAllChickens();
        getAllDrinks();
        getAllPastas();
        getAllAppetizers();
        getAllDesserts();
    }, []);

    useEffect(() => {
        getAllPizzas();
    }, [activeCategory]);


    const handleProductClick = (product, type) => {
        setSelectedProduct({ ...product, productType: type });
        setIsModalOpen(true);
    };
    const getAllProduct = async () => {
        try {
            const response = await getAllProducts();
            if (response) {
                setProducts(response.data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    //#endregion
    
    //#region Category Definitions
    const mainCategories = {
        pizza: { name: 'Pizza', icon: <FaPizzaSlice /> },
        chicken: { name: 'Gà', icon: <FaDrumstickBite /> },
        pasta: { name: 'Mì Ý', icon: <FaUtensils /> },
        appetizers: { name: 'Khai Vị', icon: <FaUtensils /> },
        desserts: { name: 'Tráng Miệng', icon: <FaIceCream /> },
        drinks: { name: 'Thức Uống', icon: <FaCoffee /> }
    };

    const categories = {
        all: { name: 'Tất Cả', icon: <FaList /> },
        beef: { name: 'Pizza Bò', icon: <LuBeef /> },
        seafood: { name: 'Pizza Hải Sản', icon: <FaFish /> },
        chicken: { name: 'Pizza Gà', icon: <FaDrumstickBite /> },
        pork: { name: 'Pizza Heo', icon: <FaBacon /> },
        vegetarian: { name: 'Pizza Chay', icon: <FaLeaf /> }
    };
    //#endregion

    //#region Helper Functions
    const getAllPizzas = async () => {
        try {
            if(activeCategory === 'all'){
                const response = await getProductsByCategory('pizza');
                if (response && response.success===true) {
                    setPizzaData(response.data);
                }
            }
            else{
                const response = await getProductsBySubCategory(activeCategory);
                if (response && response.success===true) {
                    setPizzaData(response.data);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    const getAllChickens = async () => {
        try {
            const response = await getProductsByCategory('chicken');
            if (response && response.success===true) {
                setChickenData(response.data);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    const getAllPastas = async () => {
        try {
            const response = await getProductsByCategory('pasta');
            if (response && response.success===true) {
                setPastaData(response.data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const getAllAppetizers = async () => {
        try {
            const response = await getProductsByCategory('appetizers');
            if (response && response.success===true) {
                setAppetizerData(response.data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const getAllDesserts = async () => {
        try {
            const response = await getProductsByCategory('desserts');
            if (response && response.success===true) {
                setDessertData(response.data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const getAllDrinks = async () => {
        try {
            const response = await getProductsByCategory('drinks');
            if (response && response.success===true) {
                setDrinkData(response.data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    //#endregion

    //#region Section Renderers
    const renderPizzaSection = () => (
        <>
            <div className="flex flex-wrap gap-4 mb-8">
                {Object.entries(categories).map(([key, { name, icon }]) => (
                    <button
                        key={key}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-base ${activeCategory === key
                            ? 'bg-orange-400 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        onClick={() => setActiveCategory(key)}
                    >
                        {icon}
                        {name}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pizzaData.map((pizza) => (
                    <div key={pizza.id} 
                         className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs flex flex-col justify-between h-80 cursor-pointer"
                         onClick={() => handleProductClick(pizza, 'pizza')}>
                        <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                            <img
                                src={pizza.image}
                                alt={pizza.name}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                        </div>
                        <div className="p-3">
                        <h3 className="text-lg font-bold mb-1 text-center text-[#0078ae] hover:underline cursor-pointer">{pizza.name}</h3>
                        </div>
                        <div className="p-3 text-center">
                            <div className="text-sm font-bold">
                                <p>Medium - {pizza?.price?.medium?.toLocaleString()}đ</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
    const renderChickenSection = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {chickenData.map((chicken) => (
                <div key={chicken.id} 
                     className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs flex flex-col justify-between h-80 cursor-pointer"
                     onClick={() => handleProductClick(chicken, 'chicken')}>
                    <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                        <img
                            src={chicken.image}
                            alt={chicken.name}
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                    </div>
                    <div className="p-3">
                        <h3 className="text-lg font-bold mb-1 text-center text-[#0078ae] hover:underline cursor-pointer">{chicken.name}</h3>
                    </div>
                    <div className="p-3 text-center">
                        <div className="text-sm font-bold">
                            <p>{chicken?.price?.medium?.toLocaleString()}đ</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    const renderDrinkSection = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {drinkData.map((drink) => (
                <div key={drink.id} 
                     className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs flex flex-col justify-between h-80 cursor-pointer"
                     onClick={() => handleProductClick(drink, 'drink')}>
                    <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                        <img
                            src={drink.image}
                            alt={drink.name}
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                    </div>
                    <div className="p-3">
                        <h3 className="text-lg font-bold mb-1 text-center text-[#0078ae] hover:underline cursor-pointer">{drink.name}</h3>
                        <p className="text-sm text-gray-600 text-center">{drink.description}</p>
                    </div>
                    <div className="p-3 text-center">
                        <div className="text-sm font-bold">
                            <p>Medium - {drink.price.medium.toLocaleString()}đ</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    const renderPastaSection = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pastaData.map((pasta) => (
                <div key={pasta.id} 
                     className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs flex flex-col justify-between h-80 cursor-pointer"
                     onClick={() => handleProductClick(pasta, 'pasta')}>
                    <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                        <img
                            src={pasta.image}
                            alt={pasta.name}
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                    </div>
                    <div className="p-3">
                        <h3 className="text-lg font-bold mb-1 text-center text-[#0078ae] hover:underline cursor-pointer">{pasta.name}</h3>
                        <p className="text-sm text-gray-600 text-center">{pasta.description}</p>
                    </div>
                    <div className="p-3 text-center">
                        <div className="text-sm font-bold">
                            <p>Medium - {pasta.price.medium.toLocaleString()}đ</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    const renderAppetizerSection = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {appetizerData.map((appetizer) => (
                <div key={appetizer.id} 
                     className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs flex flex-col justify-between h-80 cursor-pointer"
                     onClick={() => handleProductClick(appetizer, 'appetizer')}>
                    <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                        <img
                            src={appetizer.image}
                            alt={appetizer.name}
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                    </div>
                    <div className="p-3">
                        <h3 className="text-lg font-bold mb-1 text-center text-[#0078ae] hover:underline cursor-pointer">{appetizer.name}</h3>
                        <p className="text-sm text-gray-600 text-center">{appetizer.description}</p>
                    </div>
                    <div className="p-3 text-center">
                        <div className="text-sm font-bold">
                            <p>Medium - {appetizer.price.medium.toLocaleString()}đ</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    const renderDessertSection = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dessertData.map((dessert) => (
                <div key={dessert.id} 
                     className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs flex flex-col justify-between h-80 cursor-pointer"
                     onClick={() => handleProductClick(dessert, 'dessert')}>
                    <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                        <img
                            src={dessert.image}
                            alt={dessert.name}
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                    </div>
                    <div className="p-3">
                        <h3 className="text-lg font-bold mb-1 text-center text-[#0078ae] hover:underline cursor-pointer">{dessert.name}</h3>
                        <p className="text-sm text-gray-600 text-center">{dessert.description}</p>
                    </div>
                    <div className="p-3 text-center">
                        <div className="text-sm font-bold">
                            <p>Medium - {dessert.price.medium.toLocaleString()}đ</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    //#endregion

    //#region Main Render
    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    {Object.entries(mainCategories).map(([key, { name, icon }]) => (
                        <button
                            key={key}
                            className={`flex items-center gap-2 px-6 py-3 text-lg font-semibold ${activeMainCategory === key
                                ? 'bg-orange-400 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                                onClick={() => {
                                    setTimeout(() => {
                                        setActiveMainCategory(key);
                                    }, 100); // 300ms delay
                                }}
                        >
                            {icon}
                            {name}
                        </button>
                    ))}
                </div>

                {/* Conditional Rendering of Sections */}
                {activeMainCategory === 'pizza' && renderPizzaSection()}
                {activeMainCategory === 'chicken' && renderChickenSection()}
                {activeMainCategory === 'pasta' && renderPastaSection()}
                {activeMainCategory === 'appetizers' && renderAppetizerSection()}
                {activeMainCategory === 'desserts' && renderDessertSection()}
                {activeMainCategory === 'drinks' && renderDrinkSection()}
            </div>
            <ProductDetailModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
    //#endregion
}
//#endregion

export default Menu;