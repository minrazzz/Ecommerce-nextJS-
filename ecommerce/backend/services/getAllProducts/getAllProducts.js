export const getAllProducts = async () => {
   try {
      const response = await fetch(
         "http://localhost:3000/api/admin/all-products",
         {
            method: "GET",
            cache: "no-store",
         }
      );
      const data = response.json();
      return data;
   } catch (error) {
      console.log(error);
   }
};
