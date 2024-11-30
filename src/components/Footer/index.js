//#region Imports
import React from 'react';
import logo from '../../assets/logo.png';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
//#endregion

//#region Footer Component
const Footer = () => {
    //#region Render
    return (
        <footer className="bg-gray-800 text-white py-8" style={{ backgroundImage: 'url(/path/to/background-image.jpg)', backgroundSize: 'cover' }}>
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left px-4 md:px-0">
                <div className="mb-4 md:mb-0">
                    <img src={logo} alt="Pizza Store Logo" className="mx-auto md:mx-0 mb-2" />
                    <p>&copy; 2023 Pizza Store. All rights reserved.</p>
                </div>
                <div className="mb-4 md:mb-0">
                    <p>Contact us: (123) 456-7890</p>
                    <p>Email: info@pizzastore.com</p>
                </div>
                <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-4">
                    <a href="/about" className="hover:underline">About Us</a>
                    <a href="/menu" className="hover:underline">Menu</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                </div>
                <div className="flex justify-center md:justify-start space-x-4 mt-4 md:mt-0">
                    <FaFacebook />
                    <FaTwitter />
                    <FaInstagram />
                </div>
            </div>
        </footer>
    );
    //#endregion
}
//#endregion

export default Footer;