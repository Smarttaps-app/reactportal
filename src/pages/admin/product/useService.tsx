import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addBillerAction,
  addPackageAction,
  addProductAction,
  deleteBillerAction,
  deletePackageAction,
  deleteProductAction,
  fetchPackageAction,
  getBillersAction,
  getPackagesAction,
  getProductsAction,
  refreshProviderAction,
  switchBillerAction,
} from "../../../serviceAction/ProductActions";
import { App } from "antd";
import { Common } from "../../../utils/Common";

export function useProducts() {
  const {
    isPending: loading,
    data: products = [],
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsAction,
    refetchOnWindowFocus: false,
  });
  return { loading, products, error };
}
export function useAddProduct() {
  const { message } = App.useApp();
  const { mutate: addProduct, isPending: isAdding } = useMutation({
    mutationFn: addProductAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addProduct };
}
export function useRefreshProvider() {
  const { message } = App.useApp();
  const { mutate: refreshProvider, isPending: fetching } = useMutation({
    mutationFn: refreshProviderAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { fetching, refreshProvider };
}
export function useDeleteProduct() {
  const { message } = App.useApp();
  const { mutate: deleteProduct, isPending: isdeleting } = useMutation({
    mutationFn: deleteProductAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteProduct };
}
export function useBillers() {
  const {
    isPending: loading,
    data: billers = [],
    error,
  } = useQuery({
    queryKey: ["billers"],
    queryFn: getBillersAction,
    refetchOnWindowFocus: false,
  });
  return { loading, billers, error };
}
export function useAddBiller() {
  const { message } = App.useApp();
  const { mutate: addBiller, isPending: isAdding } = useMutation({
    mutationFn: addBillerAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addBiller };
}
export function useDeleteBiller() {
  const { message } = App.useApp();
  const { mutate: deleteBiller, isPending: isdeleting } = useMutation({
    mutationFn: deleteBillerAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteBiller };
}
export function useSwitchBiller() {
  const { message } = App.useApp();
  const { mutate: switchProvider, isPending: isAdding } = useMutation({
    mutationFn: switchBillerAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, switchProvider };
}
export function usePackages() {
  const {
    isPending: loading,
    data: packages = [],
    error,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: getPackagesAction,
    refetchOnWindowFocus: false,
  });
  return { loading, packages, error };
}
export function useAddPackage() {
  const { message } = App.useApp();
  const { mutate: addPackage, isPending: isAdding } = useMutation({
    mutationFn: addPackageAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addPackage };
}
export function useDeletePackage() {
  const { message } = App.useApp();
  const { mutate: deletePackage, isPending: isdeleting } = useMutation({
    mutationFn: deletePackageAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deletePackage };
}
export function useFetchPackage() {
  const { message } = App.useApp();
  const { mutate: fetchPackage, isPending: isAdding } = useMutation({
    mutationFn: fetchPackageAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, fetchPackage };
}
