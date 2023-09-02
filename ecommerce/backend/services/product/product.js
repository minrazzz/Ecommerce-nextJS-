// add new product service

import Cookies from "js-cookie";

const customHeaders = {
   "content-type": "application/json",
   Authorization: `Bearer${Cookies.get("token")}`,
};

export const addNewproduct = async (formData) => {
   try {
      const response = await fetch("/api/admin/add-product", {
         method: "POST",
         headers: customHeaders,
         cache: "no-store",
         body: JSON.stringify(formData),
      });
      const data = await response.json();
      return data;
   } catch (error) {
      console.log(error);
   }
};

export const updateProduct = async (formData) => {
   try {
      const response = await fetch("/api/admin/update-product", {
         method: "PUT",
         headers: customHeaders,
         body: JSON.stringify(formData),
      });
      const data = await response.json();
      return data;
   } catch (error) {
      console.log(error, "updateProduct");
   }
};

export const deleteProduct = async (id) => {
   try {
      const response = await fetch(`/api/admin/delete-product?id=${id}`, {
         method: "DELETE",
         headers: customHeaders,
      });
      const data = await response.json();
      return data;
   } catch (error) {
      console.log(error);
   }
};
