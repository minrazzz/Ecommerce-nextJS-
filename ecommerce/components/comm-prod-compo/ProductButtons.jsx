"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function ProductButtons() {
   const pathName = usePathname();

   const isAdminView = pathName.includes("admin-view");

   return isAdminView ? (
      <>
         <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
            update
         </button>
         <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
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
