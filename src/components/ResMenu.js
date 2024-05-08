import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useResInfo from "../utils/useResInfo.js";
import star from "../star.png";

const ResMenu = () => {
  const { resMenuID } = useParams();

  const ResInfo = useResInfo(resMenuID); // custom hook

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

  return (
    <div className="flex flex-col gap-9 items-center">
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
      <span className="-my-6">~~MENU~~</span>
      <div>
        <input className="w-[800px] h-[50px] border-1 border-slate-200 rounded-xl placeholder: pl-[43%] placeholder: bg-slate-100"placeholder="Search for Dishes"
        ></input>

        <ul className="font-semibold  ">
          {itemCards.map((item) => (
            <div className="flex justify-between items-center w-[800px] h-[210px] shadow-md mt-2 ">
                <span className=" flex flex-col justify-center p-4">
                  {item.card.info.name}{" "}
                  <p>
                    {"₹"}{" "}{+item.card.info.price / 100 || 
                    item.card.info.defaultPrice / 100}
                  </p>
                  <div className="text-green-500 flex mt-2">
                    <img src={star} width={"20px"}></img>
                    {item?.card?.info?.ratings?.aggregatedRating?.rating}
                    {
                      <p className="text-gray-400 ">
                        (
                        {
                          item?.card?.info?.ratings?.aggregatedRating
                            ?.ratingCountV2
                        }
                        )
                      </p>
                    }
                  </div>
                  <p className="text-gray-400 mt-2">
                    {item.card.info.description}
                  </p>    
                </span>

                <span className="w-40 h-28 mr-3">
                  <img
                      className="rounded-xl w-20 h-20 object-cover" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.card?.info?.imageId}`}
                     alt={item.card.info.name}/>
                </span>

            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResMenu;
