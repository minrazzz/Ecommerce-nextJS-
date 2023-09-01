// add new product service

import Cookies from "js-cookie";

export const addNewproduct = async (formData) => {
   try {
      const response = await fetch("/api/admin/add-product", {
         method: "POST",
         // headers: {
         //    "content-type": "application/json",
         //    Authorization: `Bearer${Cookies.get("token")}`,
         // },
         cache: "no-store",
         body: JSON.stringify(formData),
      });
      const data = response.json();
      return data;
   } catch (error) {
      console.log(error);
   }
};
