import veg from "../veg.png";
import star from "../star.png";

const ResCard=(props)=>{  //or direct destructiing: ResCard=({img,ResName,cuisine,ratings})=>{   
    const {resDATA}=props;
    return (
        <div className="">
          <div className="rounded-2xl flex flex-col h-[280px] w-[280px] hover:scale-[98%] transition-all shadow-md mb-16  mt-2 z-10">
            <div className="w-[265px] h-44 mb-4">
                <img className="  rounded-2xl object-cover w-full h-full mx-2 my-2 " src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+resDATA.info.cloudinaryImageId} ></img>
            </div>
            <h2 className="truncate max-w-[500px] line-clamp-8 text-xl font-bold pl-3">{resDATA.info.name}</h2>
            <h5 className="pl-3 flex gap-4" ><span className="text-green-500 flex "><img src={star} className="w-5"></img>{resDATA.info.avgRating}</span> {resDATA.info.sla.deliveryTime + " mins"}</h5>
            <h4 className="truncate max-w-[200px] line-clamp-7 pl-3">{resDATA.info.cuisines.join(", ")}</h4>
            
          </div>  
        </div> 
    )
}

export const ProResCard=(ResCard)=>{
    return(props)=>{
        return(

            <div >
                <label className="flex gap-1 absolute mt-3 px-2 py-1 bg-green-300 rounded-r-xl ">VEG <img src={veg} width={"24px"}></img></label>
                
                <ResCard {...props}/>
            </div>

        )
    }
}

export default ResCard;