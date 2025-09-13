import {
  getProducts,
  getProduct,
  getServices,
  addProduct,
  deleteProduct,
  getBillers,
  getBiller,
  addBiller,
  deleteBiller,
  deletePackage,
  addPackage,
  getPackage,
  getPackages,
} from "../services/ProductService";
import { IBiller, IPackage, IProduct } from "../utils/type";

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
export async function addProductAction(payload: IProduct) {
  const response = await addProduct(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteProductAction(id: number) {
  const response = await deleteProduct(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for biller
export async function getBillersAction() {
  const response = await getBillers();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getBillerAction(id: string) {
  const response = await getBiller(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function addBillerAction(payload: IBiller) {
  const response = await addBiller(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteBillerAction(id: number) {
  const response = await deleteBiller(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for packages
export async function getPackagesAction() {
  const response = await getPackages();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getPackageAction(id: string) {
  const response = await getPackage(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function addPackageAction(payload: IPackage) {
  const response = await addPackage(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deletePackageAction(id: number) {
  const response = await deletePackage(id);
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
