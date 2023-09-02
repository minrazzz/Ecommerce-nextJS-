"use client";

import { useRouter } from "next/navigation";
import ProductButtons from "./ProductButtons";
import ProductTile from "./ProductTile";
import { useEffect } from "react";

export default function CommonList({ data }) {
   const router = useRouter();

   // whenever we add and update a prod,this will reload the page and we get new product
   useEffect(() => {
      router.refresh();
   }, []);

   return (
      <section className="bg-white py-12 sm:py-15">
         <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
               {data && data.length
                  ? data.map((item, key) => (
                       <article
                          key={item._id}
                          className="relative flex flex-col overflow-hidden border cursor-pointer"
                       >
                          <ProductTile item={item} />
                          <ProductButtons item={item} />
                       </article>
                    ))
                  : null}
            </div>
         </div>
      </section>
   );
}
