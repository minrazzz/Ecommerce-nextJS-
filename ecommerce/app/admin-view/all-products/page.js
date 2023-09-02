import { getAllProducts } from "@/backend/services/getAllProducts/getAllProducts";
import CommonList from "@/components/comm-prod-compo/CommonList";

export default async function AdminAllNewProduct() {
   const getAllAdminProducts = await getAllProducts();
   // console.log(getAllAdminProducts.data);
   // console.log(allAdminProducts);
   return <CommonList data={getAllAdminProducts && getAllAdminProducts.data} />;
}
