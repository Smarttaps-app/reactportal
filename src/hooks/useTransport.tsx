import { useQuery } from "@tanstack/react-query";
import {
  getStationsAction,
  getRoutesAction,
  getParksAction,
  getBusesAction,
  getTrainsAction,
} from "../serviceAction/TrainActions";
export function useRoutes() {
  const {
    isPending: loading,
    data: routes = [],
    error,
  } = useQuery({
    queryKey: ["routes"],
    queryFn: getRoutesAction,
    refetchOnWindowFocus: false,
  });
  return { loading, routes, error };
}
export function useStations() {
  const {
    isPending: loading,
    data: stations = [],
    error,
  } = useQuery({
    queryKey: ["stations"],
    queryFn: getStationsAction,
    refetchOnWindowFocus: false,
  });
  return { loading, stations, error };
}
export function useParks() {
  const {
    isPending: loading,
    data: parks = [],
    error,
  } = useQuery({
    queryKey: ["parks"],
    queryFn: getParksAction,
    refetchOnWindowFocus: false,
  });
  return { loading, parks, error };
}
export function useBuses() {
  const {
    isPending: loading,
    data: buses = [],
    error,
  } = useQuery({
    queryKey: ["buses"],
    queryFn: getBusesAction,
    refetchOnWindowFocus: false,
  });
  return { loading, buses, error };
}
export function useTrains() {
  const {
    isPending: loading,
    data: trains = [],
    error,
  } = useQuery({
    queryKey: ["trains"],
    queryFn: getTrainsAction,
    refetchOnWindowFocus: false,
  });
  return { loading, trains, error };
}
