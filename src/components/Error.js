import { useRouteError } from "react-router-dom";
import logo from "../logo.png";

const Error = () => {
    const err=useRouteError();
    console.log(err);
  return (
    <div className="error">
        <img src={logo}></img>
        <h1>Oooooooops.</h1>
        <h1>{err.status} : {err.statusText}</h1>
    </div>
  )
}

export default Error;