import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, SetOnlineStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      SetOnlineStatus(false);
    });
    window.addEventListener("online", () => {
      SetOnlineStatus(true);
    });
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
