import React, { useEffect, useState } from "react";
import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../redux/cartSlice";

const Cart = () => {

  const [totalCost, setTotalCost] = useState(null);

  const cartItems = useSelector((store) => store.cart.items);

  useEffect(() => {
    calculateTotal();
    scrollToTop();
  }, [cartItems]);

  const calculateTotal = () => {
    let total = 0;
    if (cartItems.length === 0) {
      setTotalCost(0);
    } else {
      cartItems.forEach((item) => {
        let itemValue = item?.card?.info?.price
          ? item?.card?.info?.price / 100
          : item?.card?.info?.defaultPrice / 100;
        total += itemValue;
      });
      setTotalCost(Math.floor(total));
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    scrollToTop();
  }, []);

  return cartItems.length === 0 ? (
    <div className="flex items-center justify-center cart-height w-full mt-28 mb-16">
      <div>
        <img src={CDN_URL + "2xempty_cart_yfxml0"} alt="Empty Cart" />
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
  ) : (
    <div className="max-w-[900px] mx-auto p-[15px] mt-16">
      <div className="flex justify-between">
        <div className="text-[25px] font-extrabold m-5">Cart Items</div>
        <button
          className="bg-[#fc8019] my-5 text-white rounded-lg cursor-pointer font-bold shadow-lg px-4 py-2"
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          Clear cart
        </button>
      </div>

      {cartItems.map((item) => (
        <React.Fragment key={item?.card?.info?.id}>
          <div
            className="px-6 pt-1 flex md:flex-row md:justify-between flex-col-reverse gap-10"
            key={item?.card?.info?.id}
          >
            <div>
              <p>{item?.card?.info?.name}</p>
              <p>
                ₹{" "}
                {item?.card?.info?.price / 100 ||
                  item?.card?.info?.defaultPrice / 100}
              </p>
              <p>{item?.card?.info?.description}</p>
            </div>
            <div className="relative mx-auto">
              <div className="w-40 h-32">
                <img
                  src={CDN_URL + item?.card?.info?.imageId}
                  className="rounded-2xl w-full h-full object-cover"
                  alt={item?.card?.info?.name}
                />
              </div>
              <div className="absolute left-9 top-[105px]">
                <button
                  className="bg-white text-[#fc8019] font-bold shadow-lg px-4 py-2 rounded-lg"
                  onClick={() => {
                    dispatch(removeItem({ id: item?.card?.info?.id }));
                  }}
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
          <div className="border px-10 my-6" />
        </React.Fragment>
      ))}
      <div className="shadow-lg p-4 h-44 font-bold text-black">
        <p className="text-xl">Bill Details</p>
        <div className="flex justify-between">
          <p>Item Total :</p>
          <p>₹ {totalCost}</p>
        </div>
        <div className="border-2 px-10 my-2" />
        <div className="flex justify-between">
          <p>To Pay:</p>
          <p> ₹ {totalCost}</p>
        </div>
        <div className="w-72 mx-auto text-center p-2 bg-[#fc8019] my-2 text-white font-semibold cursor-pointer rounded-xl">
          Proceed to Pay
        </div>
      </div>
    </div>
  );
};

export default Cart;
