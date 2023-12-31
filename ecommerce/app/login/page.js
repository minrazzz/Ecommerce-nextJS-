"use client";

import { login } from "@/backend/services/login/loginService";
import InputComponent from "@/components/form-elements/InputComponent";
import CompoLevelLoader from "@/components/loader/CompoLevelLoader";
import { GlobalContext } from "@/context/global-context";
import { loginFormControls } from "@/utils/nav-options";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormData = {
   email: "",
   password: "",
};

export default function page() {
   const [formData, setFormData] = useState(initialFormData);
   const {
      isAuthUser,
      setIsAuthUser,
      setUser,
      compoLevelLoader,
      setCompoLevelLoader,
   } = useContext(GlobalContext);

   const { pageLoader, setPageLoader } = useContext(GlobalContext);

   // console.log(formData);
   const router = useRouter();

   function isFormValid() {
      return formData &&
         formData.email &&
         formData.email.trim() !== "" &&
         formData.password &&
         formData.password.trim() !== ""
         ? true
         : false;
   }

   async function handleLogin() {
      setCompoLevelLoader({ loading: true, id: "" });
      const response = await login(formData);
      if (response.success) {
         toast.success(response?.message, {
            position: toast.POSITION.TOP_RIGHT,
         });
         setIsAuthUser(true);
         setUser(response?.finalData?.user);
         setFormData(initialFormData);
         Cookies.set("token", response?.finalData?.token);
         localStorage.setItem(
            "user",
            JSON.stringify(response?.finalData?.user)
         );
         setCompoLevelLoader({ loading: false, id: "" });
      } else {
         toast.error(response?.message, {
            position: toast.POSITION.TOP_RIGHT,
         });
         console.log(response?.message);
         setIsAuthUser(false);
         setCompoLevelLoader({ loading: false, id: "" });
      }
   }

   useEffect(() => {
      if (isAuthUser) router.push("/");
   }, [isAuthUser]);

   return (
      <div className="bg-white relative">
         <div className="  flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto  xl:px-5 lg:flex-row">
            <div className=" flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
               <div className=" w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                  <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                     <p className="w-full text-4xl font-medium text-center font-serif">
                        Login
                     </p>

                     <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                        {loginFormControls.map((item, key) =>
                           item.componentType === "input" ? (
                              <InputComponent
                                 key={key}
                                 type={item?.type}
                                 placeholder={item.placeholder}
                                 label={item.label}
                                 value={formData[item.id]}
                                 onChange={(e) =>
                                    setFormData({
                                       ...formData,
                                       [item.id]: e.target.value,
                                    })
                                 }
                              />
                           ) : null
                        )}
                        <button
                           className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out
                         focus:shadow font-medium uppercase tracking-wide"
                           disabled={!isFormValid()}
                           onClick={handleLogin}
                        >
                           {compoLevelLoader && compoLevelLoader.loading ? (
                              <CompoLevelLoader
                                 text={"signing in"}
                                 color={"#ffffff"}
                                 loading={
                                    compoLevelLoader && compoLevelLoader.loading
                                 }
                              />
                           ) : (
                              "Login"
                           )}
                        </button>
                        <div className="flex flex-col gap-2">
                           <p>New to website ?</p>
                           <button
                              className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out
                         focus:shadow font-medium uppercase tracking-wide "
                              onClick={() => router.push("/register")}
                           >
                              Register
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
