import MenuPageShimmer from "../shimmer/MenuPageShimmer";
import { useParams } from "react-router-dom";
import useResInfo from "../utils/useResInfo.js";
import star from "../images/star.png";
import MenuCategory from "./MenuCategory.js";
import { useState, useEffect } from "react";
import { scrollToTop } from "../utils/helper.js";

const ResMenu = () => {
  const { resMenuID } = useParams();
  const ResInfo = useResInfo(resMenuID); // custom hook

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    scrollToTop();
  }, []);

  if (ResInfo === null) {
    return <MenuPageShimmer />;
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

  const Category = ResInfo.cards[4].groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  const filteredCategories = Category.map((cat) => {
    const filteredItems = cat.card.card.itemCards.filter((item) =>
      item.card.info.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, card: { ...cat.card, card: { ...cat.card.card, itemCards: filteredItems } } };
  }).filter(cat => cat.card.card.itemCards.length > 0);

  return (
    <>
      <div className="flex flex-col gap-9 items-center mt-24 mb-16 px-4 md:px-8">
        <div className="w-full max-w-3xl">
          <div className="flex flex-col justify-around rounded-2xl shadow-xl p-6 bg-white">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
            </div>
            <div>
              <h3 className="text-sm md:text-base">{cuisines.join(", ")}</h3>
            </div>
            <div className="flex items-center font-bold text-sm md:text-base">
              <img src={star} width={"20px"} alt="star" className="mr-1" />
              <span>{avgRating}</span>
              <span> ({totalRatingsString})</span>
              <span className="mx-2">~</span>
              <h3>{costForTwoMessage}</h3>
            </div>
            <div className="text-sm md:text-base">
              <p className="font-semibold">Outlet: {areaName}</p>
              <span className="font-semibold">
                {minDeliveryTime}-{maxDeliveryTime} mins
              </span>
              <div className="border my-2"></div>
              <h1>₹{amount / 100} Delivery fee will apply</h1>
            </div>
          </div>

          <div className="text-center mt-5 text-lg md:text-xl">~~ MENU ~~</div>

          <div className="mt-6">
            <input
              className="w-full h-[50px] border-1 border-slate-200 rounded-xl placeholder:text-center bg-slate-100 p-3"
              placeholder="Search for Dishes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full max-w-3xl">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <MenuCategory
                data={cat?.card?.card}
                key={cat?.card?.card?.title}
              />
            ))
          ) : (
            <div className="text-center mt-5">No dishes found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResMenu;
