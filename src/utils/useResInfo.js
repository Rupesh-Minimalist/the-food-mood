import { useState,useEffect } from "react";

const useResInfo = (resMenuID) => {

  const [ResInfo, setResInfo] = useState(null);
  

  useEffect(() => {
    Menufetch();
  }, []);

  async function Menufetch() {
    let response = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.8466937&lng=80.94616599999999&restaurantId=" +
        resMenuID +
        "&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER"
    );
    let ActualDATA = await response.json();
    setResInfo(ActualDATA.data);

    
   }
  return ResInfo;
};

export default useResInfo;