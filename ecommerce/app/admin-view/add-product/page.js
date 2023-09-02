"use client";

import { addNewproduct } from "@/backend/services/product/product";
import TileComponent from "@/components/TileComponent/TileComponent";
import InputComponent from "@/components/form-elements/InputComponent";
import SelectComponent from "@/components/form-elements/SelectComponent";
import CompoLevelLoader from "@/components/loader/CompoLevelLoader";
import { GlobalContext } from "@/context/global-context";
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
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

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
   Price: 0,
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
   console.log(formData.price);
   const { compoLevelLoader, setCompoLevelLoader } = useContext(GlobalContext);
   const router = useRouter();

   async function handleImage(event) {
      event.preventDefault();
      const extractImageUrl = await helperForUploadingImageToFirebase(
         event.target.files[0]
      );
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

   async function handleAddProduct() {
      setCompoLevelLoader({ loading: true, id: "" });
      const response = await addNewproduct(formData);

      if (response.success) {
         setCompoLevelLoader({ loading: false, id: "" });
         toast.success(response?.message, {
            position: toast.POSITION.TOP_RIGHT,
         });
         setFormData(initialFormData);
         setTimeout(() => {
            router.push("/admin-view/all-products");
         }, 1000);
      } else {
         setCompoLevelLoader({ loading: false, id: "" });
         toast.error(response?.message, {
            position: toast.POSITION.TOP_RIGHT,
         });
      }
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
                  <TileComponent
                     data={AvailableSizes}
                     onClick={handleTileClick}
                     selected={formData.sizes}
                  />
               </div>

               {adminAddProductformControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                     <InputComponent
                        name={controlItem.id}
                        key={controlItem.id}
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        value={formData[controlItem.id]}
                        onChange={(event) =>
                           setFormData((prev) => ({
                              ...prev,
                              [controlItem.id]: event.target.value,
                           }))
                        }
                     />
                  ) : controlItem.componentType === "select" ? (
                     <SelectComponent
                        name={controlItem.id}
                        key={controlItem.id}
                        label={controlItem.label}
                        options={controlItem.options}
                        value={formData[controlItem.id]}
                        onChange={(event) =>
                           setFormData((prev) => ({
                              ...prev,
                              [controlItem.id]: event.target.value,
                           }))
                        }
                     />
                  ) : null
               )}
               <button
                  onClick={handleAddProduct}
                  className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white uppercase font-medium tracking-wide"
               >
                  {compoLevelLoader && compoLevelLoader.loading ? (
                     <CompoLevelLoader
                        text={"Adding Product"}
                        color={"#ffffff"}
                        loading={compoLevelLoader && compoLevelLoader.loading}
                     />
                  ) : (
                     "Add Product"
                  )}
               </button>
            </div>
         </div>
      </div>
   );
}
