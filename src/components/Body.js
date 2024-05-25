import { useEffect, useState } from "react";
import ResCard , {ProResCard} from "./ResCard";
import HomeShimmer from "../shimmer/HomeShimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import search from "../search.png";

const Body = () => {
 
  const [ListOfRes,SetListOfRes]= useState([]);// []=resLIST to use mock
  const [UpdatedSearch,SetUpdatedSearch]=useState([]);

  const [InputValue,SetInputValue]=useState("");

  const [activeButton, setActiveButton] = useState("Clear");

  const ProResCardList=ProResCard(ResCard);
 
  useEffect(()=>{
    fetcher();

  },[]);

  async function fetcher(){

    let response= await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.8466937&lng=80.94616599999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    let ActualDATA= await response.json();

    let rest=ActualDATA?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    SetListOfRes(rest);
    SetUpdatedSearch(rest);
    
  }

  const handleSearch=()=>{
    const filteredSearch=ListOfRes.filter((res)=>
    res.info.name.toLowerCase().includes(InputValue.toLowerCase())
    );
    
    SetUpdatedSearch(filteredSearch);
  }
  
  // const handleTopRes=() =>{
  //   const filteredList = UpdatedSearch.filter((res) => res.info.avgRating>4.4);

  //   SetUpdatedSearch(filteredList); /// updating the state variable
  // }

  // const handleFastest=()=>{
  //   const HighToLow=UpdatedSearch.filter((res)=>res.info.sla.deliveryTime<25);
  //   SetUpdatedSearch(HighToLow);
  // }

  const onlineStatus=useOnlineStatus();

  if(onlineStatus===false) 
     return (
     <h1 className="font-bold text-4xl text-gray-300 absolute left-52 top-52"> You are Offline ! Check your Internet Connection</h1>
    );

  if(ListOfRes.length===0){
    return <HomeShimmer/>
  }

  const filters = [
    {
      name: "Clear",
      filterFunc: () => {
        SetUpdatedSearch(ListOfRes);
      },
    },
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
        const onlyVeg = ListOfRes.filter((rest) => rest.info.veg == true);
        SetUpdatedSearch(onlyVeg);
      },
    },
    {
      name: "Less than 300",
      filterFunc: () => {
        const lessThan300 = ListOfRes.filter(
          (rest) => rest.info.costForTwo.match(/\d+/)[0] < 300 == true
        );
        SetUpdatedSearch(lessThan300);
      },
    },
    
  ];

  const handleClick = (filter) => {
    setActiveButton(filter.name);
  };

  return (
    <div className=" mt-16 mb-10  shadow-md h-auto  " >
      <div className="flex justify-between pt-10 px-11">
        <div className=" flex">
        <input className="p-3 rounded-l-xl w-[530px] border-2" type="text" placeholder="Search For Dishes & Restaurants" 
        value={InputValue} 
        onChange={(evt)=>{SetInputValue(evt.target.value);}}/>

        <button className="bg-[#F35800] rounded-r-lg text-white p-3 " onClick={handleSearch}><img src={search} width={"20px"}></img></button>
        </div>
        

        {filters.map((filter, index) => (
            <button
              key={index}
              className={`border px-3  shadow-sm rounded-[18px] ${
                activeButton === filter.name &&
                "border-4 font-bold text-[#fc8019]"
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

      <div className="flex justify-center flex-wrap gap-x-5 mt-6 ">
        {UpdatedSearch.map((res) => (
          <Link to={"restaurant/"+res.info.id} key={res.info.id}>

            {res.info.veg ?(<ProResCardList resDATA={res}/>): (<ResCard resDATA={res}/>) }
            

          </Link> 
        ))}
        
      </div> 

      
    </div>
  );
};

export default Body;
