import React, { lazy,Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Error from "./components/Error.js";
import ResMenu from "./components/ResMenu.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import Grocery from "./components/Grocery.js"; because Lazy function
import userContext from "./utils/UserContext.js";
import Footer from "./components/Footer.js";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import appStore from "./redux/appStore.js";
    
const Applayout=()=>{
    return(
    <div className="Applayout">
       <Provider store={appStore}>
        <userContext.Provider value={{greeting:"Made With 💜 In India "}} >
            <Header/>
            <Outlet/>
            <Footer/>
        </userContext.Provider>
       </Provider>      
    </div>
    
    )
}

const Grocery=lazy(()=> import("./components/Grocery.js"));

const AppRouter=createBrowserRouter([
    {
        path:"/",
        element:<Applayout/>,
        errorElement:<Error/>,
        children:
        [
            {
                path:"/",
                element:(  
                    <Body/>  
                )
            },
            {
                path:"/about",
                element:<About/>
            },
            {
                path:"/contact",
                element:<Contact/>
            },
            {
                path:"/grocery",
                element:<Suspense fallback={<h1 className="fallback">LOADING GROCERY STORE.</h1>}>
                            <Grocery/>
                        </Suspense>
            },
            {
                path:"/cart",
                element:<Cart/>
            },
            {
                path:"/restaurant/:resMenuID",
                element:<ResMenu/>
            },
        ]
    },
   
])


const root=ReactDOM.createRoot(document.querySelector(".inject"));

root.render(<RouterProvider router={AppRouter}/>);