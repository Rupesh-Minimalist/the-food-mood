import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import { aboutCompany, contact, locationObject } from "../utils/constants";
import { useContext } from "react";
import userContext from "../utils/UserContext";

const Footer = () => {

    const {greeting}=useContext(userContext); // userContext
  return (
    <footer className="bg-purple-900 ">
       <div className="max-w-[1200px] mx-auto p-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2">
          <ul className="flex flex-col ">
            <li className="flex items-center">
              <Link to="/">
                <img src={logo} alt="logo" className="w-40 inline mr-3 relative -left-3" />
              </Link>
              <span className="font-semibold text-2xl text-orange-500"></span>
            </li>
            <li className="text-gray-400 my-2">
              &copy; 2024 TFM Technologies
            </li>
          </ul>
          <ul className="flex flex-col">
            <li className="font-semibold text-xl mb-1 text-orange-500">Company</li>
            {aboutCompany.map((item, ind) => (
              <li
                key={ind}
                className="text-white hover:text-orange-500  cursor-pointer my-1"
              >
                {item}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col">
            <li className="font-semibold text-xl mb-1 text-orange-500">Contact Us</li>
            {contact.map((item, ind) => (
              <li
                key={ind}
                className="text-white hover:text-orange-500 cursor-pointer my-1"
              >
                {item}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col ">
            <li className="font-semibold text-xl text-orange-500">We Deliver to:</li>

            {locationObject.map((loc, ind) => (
              <li
                key={ind}
                className="text-white hover:text-orange-500 cursor-pointer my-1"
              >
                {loc.city}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="py-6  text-white  bg-purple-900 w-full text-center ">{greeting}</p> 
    </footer>
  );
};

export default Footer;