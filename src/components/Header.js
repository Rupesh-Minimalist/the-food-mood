import { useState } from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {

  const [btnName,setbtnName]=useState("Login")
  const onlineStatus=useOnlineStatus();
  

  return (
    <div className="flex justify-between items-center shadow-xl m-3 bg-gray-100 rounded-md ">
      <div className="">
        <img className="w-36 mix-blend-multiply " src={logo} alt="Logo" />
      </div>

      <div >
        <ul className="flex items-center p-4 gap-14 text-xl font-semibold ">
          <li>
            {onlineStatus? "🟢":"🔴"}
          </li>
          <li className="hover:text-[#F35800] hover:scale-110 transition-all"> 
            <Link className="navbtn hovering" to="/">Home</Link></li>
          <li className="hover:text-[#F35800] hover:scale-110 transition-all"> 
            <Link className="navbtn hovering" to="/grocery">Grocery</Link>
          </li>  
          <li className="hover:text-[#F35800] hover:scale-110 transition-all">
            <Link className="navbtn hovering" to="/about">About Us</Link>
          </li>
          <li className="hover:text-[#F35800] hover:scale-110 transition-all"> 
            <Link className="navbtn hovering" to="/contact">Contact Us</Link>
          </li>

          <li className="hover:text-[#F35800] hover:scale-110 transition-all">Cart</li>
          <button className= "bg-[#8828C6] text-white rounded-lg p-2 hover:scale-110 transition-all " onClick={()=>{
            {
              if(btnName==="Login")
              {
                setbtnName("Logout")
              }
              else{
                setbtnName("Login")
              }
            }
              
          }}>{btnName}</button>
          
        </ul>
      </div>
    </div>
  );
};

export default Header;
