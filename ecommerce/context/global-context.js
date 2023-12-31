"use client";

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null); //store a createContext in a variable name

//then create a function that takes {children} as parameter and then return the GlobalContext.provider with value props wrap {children} inside it
export default function GlobalState({ children }) {
   const [showNavModal, setShowNavModal] = useState(false);
   const [isAuthUser, setIsAuthUser] = useState(null);
   const [user, setUser] = useState(null);
   const [pageLoader, setPageLoader] = useState(false);
   const [compoLevelLoader, setCompoLevelLoader] = useState({
      loading: false,
      id: "",
   });
   const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);

   //since when we reload the children page the state of the hooks gets null
   useEffect(() => {
      // console.log(Cookies.get("token"));
      if (Cookies.get("token") !== undefined) {
         setIsAuthUser(true);
         const userData = localStorage.getItem("user");
         const parseUserData = JSON.parse(userData);
         setUser(parseUserData);
      } else {
         setIsAuthUser(false);
      }
   }, [Cookies]);

   return (
      <GlobalContext.Provider
         value={{
            showNavModal,
            setShowNavModal,
            isAuthUser,
            setIsAuthUser,
            user,
            setUser,
            pageLoader,
            setPageLoader,
            compoLevelLoader,
            setCompoLevelLoader,
            currentUpdatedProduct,
            setCurrentUpdatedProduct,
         }}
      >
         {children}
      </GlobalContext.Provider>
   );
}
