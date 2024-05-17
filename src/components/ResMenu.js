import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useResInfo from "../utils/useResInfo.js";
import star from "../star.png";
import logo from "../logo.png";
import MenuCategory from "./MenuCategory.js";
import { useContext, useState } from "react";
import userContext from "../utils/UserContext.js";

const ResMenu = () => {
  const { resMenuID } = useParams();

  const ResInfo = useResInfo(resMenuID); // custom hook

  const {greeting}=useContext(userContext)

  // const [showIndex,setshowIndex]=useState(0)

  if (ResInfo === null) {
    return <Shimmer />;
  }

  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    totalRatingsString,
    areaName,
  } = ResInfo?.cards[2]?.card?.card?.info; // destructuring
  const { itemCards } =
    ResInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  const { minDeliveryTime, maxDeliveryTime } =
    ResInfo?.cards[2]?.card?.card?.info.sla;
  const { amount } = ResInfo?.cards[2]?.card?.card?.info.feeDetails;

 const Category=ResInfo.cards[4].groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c)=>c.card?.card?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

 console.log(Category);

  return (
    <>
    <div className="flex flex-col gap-9 items-center mt-24 mb-4">
      <div>
        <div className="w-[800px]  flex flex-col justify-around rounded-2xl shadow-xl p-6">
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
        </div>
        <div>
          <h3>{cuisines.join(", ")}</h3>
        </div>
        <div className="flex font-bold">
          <img src={star} width={"25px"}></img>
          <span>{avgRating}</span>
          <pre> </pre>
          <span>({totalRatingsString})</span>
          <pre> ~ </pre>
          <h3>{costForTwoMessage}</h3>
        </div>
        <div>
          <p className="font-semibold">Outlet: {areaName}</p>
          <span className="font-semibold">
            {minDeliveryTime}-{maxDeliveryTime} mins
          </span>
          <h1>₹{amount / 100} Delivery fee will apply</h1>
        </div>
        </div>

        <span className="ml-[45%] pt-10">~~MENU~~</span>

        <div>
         <input className="w-[800px] h-[50px] border-1 border-slate-200 rounded-xl placeholder: pl-[43%] placeholder: bg-slate-100"placeholder="Search for Dishes"
         ></input>
        </div>
      </div>

      <div>
        {Category.map((cat,index)=>
            <MenuCategory 
            data={cat?.card?.card} 
            key={cat?.card?.card?.title}
            // showItems={index===showIndex ? true:false}   // Lifting the state up
            // setshowIndex={()=>setshowIndex(index)}
            />

        )}
      </div>

      


    </div>
    <p className="py-6 absolute left-2/4 -translate-x-2/4">{greeting}</p>
    </>
  );
};

export default ResMenu;


