import React from 'react'
import star from "../images/star.png";
import { addItem } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';

const MenuCatList = ({data}) => {

  const dispatch=useDispatch();

  const handleAddItem=(item)=>{

      dispatch(addItem(item));
  };


  return (
    <div>
        
        <div className="font-semibold  ">
          {data.map((item) => ( 
            <div className="flex justify-between items-center w-[760px] h-[250px] shadow-sm mt-2 ">
                <span className=" flex flex-col justify-center p-4 w-[750px]">
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

                <span className="mr-3 w-3/12 flex justify-end ">  
                  <img
                      className="rounded-xl w-28 h-28 object-cover mr-3" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/"+item?.card?.info?.imageId}/>
                  <span className="absolute">
                    <button className="shadow-lg bg-white px-7 rounded-xl mt-24 mr-5 text-green-500 hover:bg-slate-100" onClick={()=>handleAddItem(item)}>ADD
                    </button>   
                  </span>
                     
                </span>

            </div>
          ))}

        </div> 
    </div>
  )
}

export default MenuCatList