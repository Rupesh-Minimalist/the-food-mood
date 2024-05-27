import { useEffect } from "react";
import { scrollToTop } from "../utils/helper";

const Contact=()=>{

    useEffect(() => {
        scrollToTop();
      }, []);

    return(
        <div className="text-gray-300 mt-40 mb-20 font-extrabold text-center text-2xl">
            <h1 className="contactbtn">Contact Us</h1>
            <h3 className="contactbtn">EMAIL: care@thefoodmood.com</h3>
            <h3 className="contactbtn">Phone: 0532-45421456</h3>
        </div>
        
        
    );
}

export default Contact;