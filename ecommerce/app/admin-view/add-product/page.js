"use client";

import TileComponent from "@/components/TileComponent/TileComponent";
import InputComponent from "@/components/form-elements/InputComponent";
import SelectComponent from "@/components/form-elements/SelectComponent";
import {
   firebaseConfig,
   firebaseStorageURL,
} from "@/utils/firebase-config/firebaseConfig";

import {
   AvailableSizes,
   adminAddProductformControls,
} from "@/utils/nav-options";
import { initializeApp } from "firebase/app";
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

const createUniqueFileName = (getFile) => {
   const timeStamp = Date.now();
   const randomStringValue = Math.random().toString(36).substring(2, 12); //to generate random string between 2 and 12 not include 12

   return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUploadingImageToFirebase(file) {
   const getFileName = createUniqueFileName(file);
   const storageReference = ref(storage, `ecommerce/${getFileName}`);
   const uploadImage = uploadBytesResumable(storageReference, file);

   return new Promise((resolve, reject) => {
      //passing state next or observer, error and complete callback
      uploadImage.on(
         "state_changed",
         (snapshot) => {},
         (error) => {
            console.log(error);
            reject(error);
         },
         () => {
            getDownloadURL(uploadImage.snapshot.ref)
               .then((downloadUrl) => resolve(downloadUrl))
               .catch((error) => reject(error));
         }
      );
   });
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

const initialFormData = {
   name: "",
   price: 0,
   description: "",
   category: "men",
   sizes: [],
   deliveryInfo: "",
   onSale: "no",
   imageUrl: "",
   priceDrop: 0,
};

export default function AdminAddNewProduct() {
   const [formData, setFormData] = useState(initialFormData);

   async function handleImage(event) {
      // console.log(event.target.files[0]);
      const extractImageUrl = await helperForUploadingImageToFirebase(
         event.target.files[0]
      );
      // console.log(extractImageUrl);
      if (extractImageUrl !== "") {
         setFormData({
            ...formData,
            imageUrl: extractImageUrl,
         });
      }
   }

   function handleTileClick(getCurrentItem) {
      let cpySizes = [...formData.sizes];
      const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);

      //if any of the id is not matched above then the index becomes -1
      if (index === -1) {
         cpySizes.push(getCurrentItem);
      } else {
         cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
      }
      setFormData({
         ...formData,
         sizes: cpySizes,
      });
   }

   console.log(formData);

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
                  <TileComponent
                     data={AvailableSizes}
                     onClick={handleTileClick}
                     selected={formData.sizes}
                  />
               </div>

               {adminAddProductformControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                     <InputComponent
                        key={controlItem.id}
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        value={initialFormData[controlItem.id]}
                        onChange={(e) =>
                           setFormData({
                              ...formData,
                              [controlItem.id]: e.target.value,
                           })
                        }
                     />
                  ) : controlItem.componentType === "select" ? (
                     <SelectComponent
                        key={controlItem.id}
                        label={controlItem.label}
                        options={controlItem.options}
                        value={initialFormData[controlItem.id]}
                        onChange={(e) =>
                           setFormData({
                              ...formData,
                              [controlItem.id]: e.target.value,
                           })
                        }
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
