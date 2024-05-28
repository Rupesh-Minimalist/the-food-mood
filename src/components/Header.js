import { useState } from "react";
import logo from "../images/logo.png"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoHomeOutline } from "react-icons/io5";
import { CiShoppingBasket } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RiContactsLine } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItems=useSelector((store)=>store.cart.items) // subscribing
 
  return (
    <div className="flex justify-between items-center shadow-xl bg-gray-100 fixed top-0 w-full z-20">
      <div className="flex items-center justify-between  p-4 md:p-0">
        <Link to="/">
          <img className="w-32 md:w-52 mix-blend-multiply" src={logo} alt="Logo" />
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isMenuOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}></path>
            </svg>
          </button>
        </div>
      </div>

      <div className={`flex-col md:flex md:flex-row md:items-center md:gap-14 text-xl font-semibold ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
        <ul className="flex flex-col md:flex-row  items-center p-4 md:p-0 gap-4 md:gap-14">
          <li className="hover:text-[#F35800] hover:scale-105 transition-all ">
            <Link to="/">
              <span className="flex gap-1 items-center">
               <IoHomeOutline /> 
                Home
              </span>
            </Link>
          </li>
          <li className="hover:text-[#F35800] hover:scale-105 transition-all">
            <Link to="/grocery">
              <span className="flex items-center gap-1">
               <CiShoppingBasket />
                Grocery
              </span>
            </Link>
          </li>
          <li className="hover:text-[#F35800] hover:scale-105 transition-all">
            <Link  to="/about">
             <span className="flex items-center gap-1">
               <IoInformationCircleOutline />
                About
             </span>
              
            </Link>
          </li>
          <li className="hover:text-[#F35800] hover:scale-105 transition-all">
            <Link to="/contact">
              <span className="flex items-center gap-1">
                <RiContactsLine />
                Contact
              </span>
              
            </Link>
          </li>
          <li className="hover:text-[#F35800] hover:scale-105 transition-all pr-5">
            <Link  to="/cart">
              <span className="flex items-center gap-1">
              <FiShoppingCart />
              ({cartItems.length})
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
