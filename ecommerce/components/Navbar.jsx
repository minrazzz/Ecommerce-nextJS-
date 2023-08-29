"use client";

import { GlobalContext } from "@/context/global-context";
import { adminNavOptions, navOptions } from "@/utils/nav-options";
import { Fragment, useContext } from "react";
import CommonModel from "./commonModel";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

function NavItems({ isModalView = false, isAdminView }) {
   return (
      <>
         <div
            className={`items-center justify-between w-full md:flex md:w-auto ${
               isModalView === true ? "" : "hidden"
            }`}
            id="nav-items"
         >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white">
               {isAdminView
                  ? adminNavOptions.map((item) => (
                       <li
                          key={item.id}
                          className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                       >
                          {item.label}
                       </li>
                    ))
                  : navOptions.map((item) => (
                       <li
                          key={item.id}
                          className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                       >
                          {item.label}
                       </li>
                    ))}
            </ul>
         </div>
      </>
   );
}

function HamburgerMenu({ setShowNavModal }) {
   return (
      <>
         <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => setShowNavModal(true)}
         >
            <span className="sr-only">Open main menu</span>
            <svg
               className="w-6 h-6"
               aria-hidden="true"
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
               ></path>
            </svg>
         </button>
      </>
   );
}

export default function Navbar() {
   const { showNavModal, setShowNavModal } = useContext(GlobalContext);
   const { user, isAuthUser, setIsAuthUser, setUser } =
      useContext(GlobalContext);
   const router = useRouter();
   const pathName = usePathname();
   // console.log(pathName);

   const isAdminView = pathName.includes("/admin-view");

   const handleLogout = () => {
      setIsAuthUser(false);
      setUser(null);
      Cookies.remove("token");
      localStorage.clear();
      router.push("/");
   };

   return (
      <>
         <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
               <div
                  onClick={() => router.push("/")}
                  className="flex items-center cursor-pointer"
               >
                  <span className="self-center text-2xl font-semibold whitespace-nowrap  ">
                     Ecom
                  </span>
               </div>
               <div className="flex md:order-2 gap-2">
                  {!isAdminView && isAuthUser ? (
                     <Fragment>
                        <button
                           className={
                              "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upper-case tracking-wide text-white rounded"
                           }
                        >
                           Account
                        </button>
                        <button
                           className={
                              "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upper-case tracking-wide text-white rounded"
                           }
                        >
                           Cart
                        </button>
                     </Fragment>
                  ) : null}
                  {isAuthUser && user?.role === "admin" ? (
                     isAdminView ? (
                        <button
                           className={
                              "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upper-case tracking-wide text-white rounded"
                           }
                           onClick={() => router.push("/")}
                        >
                           client
                        </button>
                     ) : (
                        <button
                           className={
                              "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upper-case tracking-wide text-white rounded"
                           }
                           onClick={() => router.push("/admin-view")}
                        >
                           Admin View
                        </button>
                     )
                  ) : null}
                  {isAuthUser ? (
                     <button
                        className={
                           "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upper-case tracking-wide text-white rounded"
                        }
                        onClick={handleLogout}
                     >
                        Logout
                     </button>
                  ) : (
                     <button
                        className={
                           "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upper-case tracking-wide text-white rounded"
                        }
                        onClick={() => router.push("/login")}
                     >
                        Login
                     </button>
                  )}

                  <HamburgerMenu setShowNavModal={setShowNavModal} />
               </div>

               <NavItems isAdminView={isAdminView} />
            </div>
         </nav>
         <CommonModel
            show={showNavModal}
            setShow={setShowNavModal}
            mainContent={
               <NavItems isModalView={true} isAdminView={isAdminView} />
            }
            showModalTitle={false}
         />
      </>
   );
}
