"use client";

import ProductButtons from "./ProductButtons";
import ProductTile from "./ProductTile";
// const data = [1, 2, 3, 4, 5];

export default function CommonList({ data }) {
   return (
      <section className="bg-white py-12 sm:py-15">
         <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
               {data && data.length
                  ? data.map((item) => (
                       <article className="relative flex flex-col overflow-hidden border cursor-pointer">
                          <ProductTile item={item} key={item} />
                          <ProductButtons item={item} key={item._id} />
                       </article>
                    ))
                  : null}
            </div>
         </div>
      </section>
   );
}
