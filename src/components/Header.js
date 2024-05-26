import { useState } from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex justify-around items-center shadow-xl bg-gray-100 fixed top-0 w-full z-10">
      <div className="flex items-center justify-between w-full p-4 md:p-0">
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
        <ul className="flex flex-col md:flex-row items-center p-4 md:p-0 gap-4 md:gap-14">
          <li className="hover:text-[#F35800] hover:scale-110 transition-all">
            <Link className="navbtn hovering" to="/">Home</Link>
          </li>
          <li className="hover:text-[#F35800] hover:scale-110 transition-all">
            <Link className="navbtn hovering" to="/grocery">Grocery</Link>
          </li>
          <li className="hover:text-[#F35800] hover:scale-110 transition-all">
            <Link className="navbtn hovering" to="/about">About</Link>
          </li>
          <li className="hover:text-[#F35800] hover:scale-110 transition-all">
            <Link className="navbtn hovering" to="/contact">Contact</Link>
          </li>
          <li className="hover:text-[#F35800] hover:scale-110 transition-all pr-5">
            <Link className="" to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
