"use client";

import { deleteProduct } from "@/backend/services/product/product";
import { GlobalContext } from "@/context/global-context";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import CompoLevelLoader from "../loader/CompoLevelLoader";

export default function ProductButtons({ item }) {
   const { setCurrentUpdatedProduct, compoLevelLoader, setCompoLevelLoader } =
      useContext(GlobalContext);
   const pathName = usePathname();
   const router = useRouter();

   const isAdminView = pathName.includes("admin-view");

   const handleDeleteProduct = async (item) => {
      setCompoLevelLoader({ loading: true, id: item._id });
      try {
         const data = await deleteProduct(item._id);
         if (data.success) {
            setCompoLevelLoader({ loading: false, id: item._id });
            router.refresh();
         }
      } catch (error) {
         setCompoLevelLoader({ loading: false, id: item._id });
         console.log(error);
      }
   };

   return isAdminView ? (
      <>
         <button
            className="mt-1.5 flex w-full justify-center bg-black hover:bg-gray-500 hover:duration-75 hover:ease-in-out hover:transition-all  hover:text-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            onClick={() => {
               setCurrentUpdatedProduct(item);
               router.push("/admin-view/add-product");
            }}
         >
            update
         </button>
         <button
            className="mt-1.5 flex w-full justify-center bg-red-700 hover:bg-red-600 hover:transition-all hover:duration-100 hover:ease-in-out px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            onClick={() => handleDeleteProduct(item)}
         >
            {compoLevelLoader &&
            compoLevelLoader.loading &&
            item._id === compoLevelLoader.id ? (
               <CompoLevelLoader
                  text={"Deleting"}
                  color={"#ffffff"}
                  loading={compoLevelLoader && compoLevelLoader.loading}
               />
            ) : (
               "Delete"
            )}
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
