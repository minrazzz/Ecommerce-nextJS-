"use client";
import { registerNewUser } from "@/backend/services/register/register";
import InputComponent from "@/components/form-elements/InputComponent";
import SelectComponent from "@/components/form-elements/SelectComponent";
import PageLoader from "@/components/loader/PageLoader";
import { GlobalContext } from "@/context/global-context";
import { registrationFormControls } from "@/utils/nav-options";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const initialFormData = {
   name: "",
   email: "",
   password: "",
   role: "Role",
};

export default function register() {
   const [formData, setFormData] = useState(initialFormData);
   const [isRegistered, setIsRegistered] = useState(false);
   const { pageLoader, setPageLoader } = useContext(GlobalContext);
   const router = useRouter();

   function isFormValid() {
      return formData &&
         formData.name &&
         formData.name.trim() !== "" &&
         formData.email &&
         formData.email.trim() !== "" &&
         formData.password &&
         formData.password.trim() !== ""
         ? true
         : false;
   }

   async function handleRegisterOnSubmit() {
      setPageLoader(true);

      const data = await registerNewUser(formData);
      console.log(data);
      if (data.success) {
         setIsRegistered(true);
         setFormData(initialFormData);
      } else {
      }
   }

   return (
      <div className="bg-white relative">
         <div className="  flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto  xl:px-5 lg:flex-row">
            <div className=" flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
               <div className=" w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                  <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                     <p className="w-full text-4xl font-medium text-center font-serif">
                        {isRegistered
                           ? "Registration Successfull !"
                           : "Sign up for an account"}
                     </p>
                     {isRegistered ? (
                        <button
                           className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out
                         focus:shadow font-medium uppercase tracking-wide "
                           onClick={() => router.push("/login")}
                        >
                           Login
                        </button>
                     ) : (
                        <>
                           <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                              {registrationFormControls.map((item, key) =>
                                 item.componentType === "input" ? (
                                    <InputComponent
                                       key={key}
                                       type={item.type}
                                       placeholder={item.placeholder}
                                       label={item.label}
                                       onChange={(event) => {
                                          setFormData({
                                             ...formData,
                                             [item.id]: event.target.value,
                                          });
                                       }}
                                       value={formData[item.id]}
                                    />
                                 ) : item.componentType === "select" ? (
                                    <SelectComponent
                                       key={key}
                                       options={item.options}
                                       label={item.label}
                                       onChange={(event) => {
                                          setFormData({
                                             ...formData,
                                             [item.id]: event.target.value,
                                          });
                                       }}
                                       value={formData[item.id]}
                                    />
                                 ) : null
                              )}
                              <button
                                 className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out
                         focus:shadow font-medium uppercase tracking-wide "
                                 disabled={!isFormValid()}
                                 onClick={handleRegisterOnSubmit}
                              >
                                 {pageLoader ? (
                                    <PageLoader
                                       text={"Registering"}
                                       color={"#ffffff"}
                                       loading={pageLoader}
                                    />
                                 ) : (
                                    "Register"
                                 )}
                              </button>
                           </div>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
