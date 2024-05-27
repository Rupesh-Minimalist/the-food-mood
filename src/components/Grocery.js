import { useEffect } from "react";
import { scrollToTop } from "../utils/helper";

const Grocery=()=>{

    useEffect(() => {
        scrollToTop();
      }, []);

      
    return(
        <>
        <div className="flex justify-center mb-36">
        <h1 className="text-gray-300 mt-40 font-extrabold text-center text-5xl">Welcome To The Food Mood Grocery <br></br>COMING VERY SOON...</h1>
        </div>
        </>
    );
}

export default Grocery;