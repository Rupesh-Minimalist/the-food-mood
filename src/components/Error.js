import { useRouteError } from "react-router-dom";
import logo from "../images/logo.png";

const Error = () => {
    const err=useRouteError();
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
        <img src={logo} className="w-96"></img>
        <h1 className="relative left-32">Oooooooops.</h1>
        {/* <h1>{err.status} : {err.statusText}</h1> */}
    </div>
  )
}

export default Error;