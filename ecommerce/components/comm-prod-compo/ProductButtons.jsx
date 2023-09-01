"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function ProductButtons() {
   const pathName = usePathname();

   const isAdminView = pathName.includes("admin-view");

   return isAdminView ? (
      <>
         <button className="mt-1.5 flex w-full justify-center bg-black hover:bg-gray-500 hover:duration-75 hover:ease-in-out hover:transition-all  hover:text-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
            update
         </button>
         <button className="mt-1.5 flex w-full justify-center bg-red-700 hover:bg-red-600 hover:transition-all hover:duration-100 hover:ease-in-out px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
            delete
         </button>
      </>
   ) : (
      <>
         <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
            Add To Cart
         </button>
      </>
   );
}
