const ResCard=(props)=>{  //or direct destructiing: ResCard=({img,ResName,cuisine,ratings})=>{   
    const {resDATA}=props;
    return (
        <div className="rounded-2xl flex flex-col justify-around items-center h-96 w-60 hover:scale-[103%] transition-all shadow-xl mb-6  "   >
            <img className=" rounded-2xl w-56 h-60 mx-2 my-2" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+resDATA.info.cloudinaryImageId} ></img>
            <h2 className="truncate max-w-[200px] line-clamp-2 text-xl font-bold">{resDATA.info.name}</h2>
            <h4 className="truncate max-w-[200px] line-clamp-2 ">{resDATA.info.cuisines.join(", ")}</h4>
            <h5 ><pre>{"Ratings: "}<span className="text-green-500">{resDATA.info.avgRating}</span>    {resDATA.info.sla.deliveryTime + " mins"}</pre></h5>
        </div> 
    )
}

export default ResCard;