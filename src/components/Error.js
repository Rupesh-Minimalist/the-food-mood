import { useRouteError } from "react-router-dom";
import logo from "../images/logo.png";

const Error = () => {
    const err=useRouteError();
  return (
    <div className="">
        <img src={logo}></img>
        <h1>Oooooooops.</h1>
        <h1>{err.status} : {err.statusText}</h1>
    </div>
  )
}

export default Error;