import { useEffect, useState } from "react";
import ResCard, { ProResCard } from "./ResCard";
import HomeShimmer from "../shimmer/HomeShimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import search from "../search.png";
import Categories from "./Categories";

const Body = () => {
  const [ListOfRes, SetListOfRes] = useState([]);
  const [UpdatedSearch, SetUpdatedSearch] = useState([]);
  const [InputValue, SetInputValue] = useState("");
  const [activeButton, setActiveButton] = useState("Clear");
  const [carouselImages, setCarouselImages] = useState([]);

  const ProResCardList = ProResCard(ResCard);

  useEffect(() => {
    fetchRestaurants();
    fetcher();
  }, []);

  async function fetcher() {
    try {
      let response = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.8466937&lng=80.94616599999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
      let ActualDATA = await response.json();
      let rest = ActualDATA?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      SetListOfRes(rest);
      SetUpdatedSearch(rest);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const fetchRestaurants = async () => {
    try {
      const response = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.8466937&lng=80.94616599999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
      const data = await response.json();
      const Actual = data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info || [];
      setCarouselImages(Actual);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    const filteredSearch = ListOfRes.filter((res) =>
      res.info.name.toLowerCase().includes(InputValue.toLowerCase())
    );
    SetUpdatedSearch(filteredSearch);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) 
    return (
      <h1 className="font-bold text-4xl text-gray-300 py-32 text-center  ">You are Offline! Check your Internet Connection</h1>
    );

  if (ListOfRes.length === 0) {
    return <HomeShimmer/>
  }

  const filters = [
    {
      name: "Fast Delivery",
      filterFunc: () => {
        const fastDelivery = ListOfRes.filter(
          (rest) => rest.info.sla.deliveryTime < 30
        );
        SetUpdatedSearch(fastDelivery);
      },
    },
    {
      name: "Top Rated",
      filterFunc: () => {
        const topRated = ListOfRes.filter(
          (rest) => rest.info.avgRating > 4
        );
        SetUpdatedSearch(topRated);
      },
    },
    {
      name: "Pure Veg",
      filterFunc: () => {
        const onlyVeg = ListOfRes.filter((rest) => rest.info.veg === true);
        SetUpdatedSearch(onlyVeg);
      },
    },
    {
      name: "Less than 300",
      filterFunc: () => {
        const lessThan300 = ListOfRes.filter(
          (rest) => parseInt(rest.info.costForTwo.match(/\d+/)[0]) < 300
        );
        SetUpdatedSearch(lessThan300);
      },
    },
    {
      name: "Clear",
      filterFunc: () => {
        SetUpdatedSearch(ListOfRes);
      },
    },
  ];

  const handleClick = (filter) => {
    setActiveButton(filter.name);
  };

  return (
    <>
      <Categories carouselImages={carouselImages} />

      <div className="h-auto mx-24 mt-3 mb-5 ">
        <div className="flex justify-around pt-5 flex-wrap ">
          <div className="flex-wrap  md:flex gap-6 m">
            <div className="flex">
              <input
                className="p-3 rounded-l-xl w-[400px] md:border-2 "
                type="text"
                placeholder="Search For Dishes & Restaurants"
                value={InputValue}
                onChange={(evt) => { SetInputValue(evt.target.value); }}
                onKeyDown={handleKeyDown}
              />
              <button className="bg-[#F35800] rounded-r-lg text-white p-3" onClick={handleSearch}>
                <img src={search} width={"20px"} alt="search" />
              </button>
            </div>
            <div className="flex gap-2">
              {filters.map((filter, index) => (
                <button
                  key={index}
                  className={`border px-3 shadow-sm rounded-[18px] ${
                    activeButton === filter.name && "border-4 font-bold text-[#fc8019]"
                  }`}
                  onClick={() => {
                    filter.filterFunc();
                    handleClick(filter);
                  }}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-3 place-items-center px-[10px] pt-3">
          {UpdatedSearch.map((res) => (
            <Link to={"restaurant/" + res.info.id} key={res.info.id}>
              {res.info.veg ? (
                <ProResCardList resDATA={res} />
              ) : (
                <ResCard resDATA={res} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Body;
