import React, { useEffect, useState } from "react";
import { CDN_URL, NON_VEG_ICON, VEG_ICON } from "../utils/constants";
import { Link } from "react-router-dom";

import { scrollToTop } from "../utils/helper";

const Cart = () => {
  

  useEffect(() => {
    
    scrollToTop();
  }, []);

  

  return (
    <div className="flex items-center justify-center cart-height w-full mt-28">
      <div>
        <img src={CDN_URL + "2xempty_cart_yfxml0"} />
        <div className="text-center my-3 font-bold text-xl">
          Your cart is empty!
        </div>
        <Link to="/">
          <div className="text-center p-2 bg-[#fc8019] mx-8 text-white font-semibold cursor-pointer rounded-xl">
            SEE RESTAURANTS NEAR YOU
          </div>
        </Link>
      </div>
    </div>
  ) 
};

export default Cart;