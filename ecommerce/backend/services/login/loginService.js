export const login = async (formData) => {
   try {
      const response = await fetch("/api/login", {
         method: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(formData), //while sending payload we convert it to json
      });

      const data = response.json();
      return data;
   } catch (error) {
      console.log(error);
   }
};
