import { useEffect, useState } from "react";
import ResCard from "./ResCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import search from "../search.png";

const Body = () => {
 
  const [ListOfRes,SetListOfRes]= useState([]);// []=resLIST to use mock
  const [UpdatedSearch,SetUpdatedSearch]=useState([]);

  const [InputValue,SetInputValue]=useState("");
 
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
  
  const handleTopRes=() =>{
    const filteredList = UpdatedSearch.filter((res) => res.info.avgRating>4.4);

    SetUpdatedSearch(filteredList); /// updating the state variable
  }

  const handleFastest=()=>{
    const HighToLow=UpdatedSearch.filter((res)=>res.info.sla.deliveryTime<25);
    SetUpdatedSearch(HighToLow);
  }

  const onlineStatus=useOnlineStatus();

  if(onlineStatus===false) 
     return (
     <h1 className="Online">You are Offline ! Check your Internet Connection</h1>
    );

  if(ListOfRes.length===0){
    return <Shimmer/>
  }

  return (
    <div className="bg-gray-100 mx-3 rounded-xl shadow-2xl h-auto mb-4 " >
      <div className="Search flex justify-end ">
        <input className="p-3 rounded-l-xl w-96  mt-4" type="text" placeholder="Search For Dishes & Restaurants" 
        value={InputValue} 
        onChange={(evt)=>{SetInputValue(evt.target.value);}}/>

        <button className="bg-[#F35800] rounded-r-lg px-5 mt-4 text-white" onClick={handleSearch}><img src={search} width={"20px"}></img></button>

        <div className="flex justify-center mt-4 gap-7 ml-[124px]">
         <button className="bg-white shadow-md tracking-wider rounded-xl px-3  hover:scale-[102%] transition-all" onClick={handleTopRes}>Top Restaurants</button>
          <button className="bg-white shadow-md tracking-wider rounded-xl px-3 mr-5 hover:scale-[102%] transition-all" onClick={handleFastest}>Fastest</button>
      </div>
        

      </div>

      

      <div className="flex justify-center flex-wrap gap-9  mt-4 ">
        {/* Typical way 
                  <ResCard resDATA={resLIST[1]}/>
                  <ResCard resDATA={resLIST[15]}/>
                  <ResCard resDATA={resLIST[3]}/> */}

        {UpdatedSearch.map((res) => (
          <Link className="card" to={"restaurant/"+res.info.id} key={res.info.id}><ResCard resDATA={res}/></Link> 
        ))}
      </div> 
    </div>
  );
};

export default Body;
