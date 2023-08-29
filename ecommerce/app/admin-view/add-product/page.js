"use client";

import TileComponent from "@/components/TileComponent/TileComponent";
import InputComponent from "@/components/form-elements/InputComponent";
import SelectComponent from "@/components/form-elements/SelectComponent";
import {
   AvailableSizes,
   adminAddProductformControls,
} from "@/utils/nav-options";

export default function AdminAddNewProduct() {
   function handleImage() {
      console.log("hello");
   }

   return (
      <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
         <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
            <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8 ">
               <input
                  accept="image/*"
                  max="1000000"
                  type="file"
                  onChange={handleImage}
               />
               <div className="flex gap-2 flex-col">
                  <label>Available Sizes</label>
                  <TileComponent data={AvailableSizes} />
               </div>
               {adminAddProductformControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                     <InputComponent
                        key={controlItem.id}
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                     />
                  ) : controlItem.componentType === "select" ? (
                     <SelectComponent
                        key={controlItem.id}
                        label={controlItem.label}
                        options={controlItem.options}
                     />
                  ) : null
               )}
               <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white uppercase font-medium tracking-wide">
                  Add Product
               </button>
            </div>
         </div>
      </div>
   );
}
