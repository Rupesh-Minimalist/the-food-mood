import { useState,useEffect } from "react";
import {MENU_API} from "../utils/constants";

const useResInfo = (resMenuID) => {

  const [ResInfo, setResInfo] = useState(null);
  

  useEffect(() => {
    Menufetch();
  }, []);

  async function Menufetch() {
    let response = await fetch(MENU_API+resMenuID);
    let ActualDATA = await response.json();
    setResInfo(ActualDATA.data);

    
   }
  return ResInfo;
};

export default useResInfo;