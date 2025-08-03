import {
  getProducts,
  getProduct,
  getServices,
} from "../services/ProductService";

// action for payment
export async function getProductsAction() {
  const response = await getProducts();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getProductAction(id: string) {
  const response = await getProduct(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for services
export async function getServicesAction() {
  const response = await getServices();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
