import React from "react";
import ReactDOM from "react-dom/client";

const El=()=>{
    return <h1 id="First">THE FOOD MOOD </h1>
    
}

const root=ReactDOM.createRoot(document.querySelector(".inject"));

root.render(<El/>);