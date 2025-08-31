import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getBusStationsAction,
  getRoutesAction,
  getParksAction,
  getBusesAction,
  getTrainsAction,
  addRouteAction,
  deleteRouteAction,
  addStationAction,
  deleteStationAction,
  addParkAction,
  deleteParkAction,
  addBusAction,
  deleteBusAction,
  addTrainAction,
  deleteTrainAction,
  getSchedulesAction,
  addScheduleAction,
  deleteScheduleAction,
} from "../../../../serviceAction/TrainActions";
import { message } from "antd";
import { Common } from "../../../../utils/Common";
export function useTRoutes() {
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
export function useAddTRoute() {
  const { mutate: addRoute, isPending: isAdding } = useMutation({
    mutationFn: addRouteAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addRoute };
}
export function useDeleteTRoute() {
  const { mutate: deleteRoute, isPending: isdeleting } = useMutation({
    mutationFn: deleteRouteAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteRoute };
}
export function useStations() {
  const {
    isPending: loading,
    data: stations = [],
    error,
  } = useQuery({
    queryKey: ["busstations"],
    queryFn: getBusStationsAction,
    refetchOnWindowFocus: false,
  });
  return { loading, stations, error };
}
export function useAddStation() {
  const { mutate: addStation, isPending: isAdding } = useMutation({
    mutationFn: addStationAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addStation };
}
export function useDeleteStation() {
  const { mutate: deleteStation, isPending: isdeleting } = useMutation({
    mutationFn: deleteStationAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteStation };
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
export function useAddPark() {
  const { mutate: addPark, isPending: isAdding } = useMutation({
    mutationFn: addParkAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addPark };
}
export function useDeletePark() {
  const { mutate: deletePark, isPending: isdeleting } = useMutation({
    mutationFn: deleteParkAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deletePark };
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
export function useAddBus() {
  const { mutate: addBus, isPending: isAdding } = useMutation({
    mutationFn: addBusAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addBus };
}
export function useDeleteBus() {
  const { mutate: deleteBus, isPending: isdeleting } = useMutation({
    mutationFn: deleteBusAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteBus };
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
export function useAddTrain() {
  const { mutate: addTrain, isPending: isAdding } = useMutation({
    mutationFn: addTrainAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addTrain };
}
export function useDeleteTrain() {
  const { mutate: deleteTrain, isPending: isdeleting } = useMutation({
    mutationFn: deleteTrainAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteTrain };
}
export function useTSchedules() {
  const {
    isPending: loading,
    data: schedules = [],
    error,
  } = useQuery({
    queryKey: ["schedules"],
    queryFn: getSchedulesAction,
    refetchOnWindowFocus: false,
  });
  return { loading, schedules, error };
}
export function useAddTSchedule() {
  const { mutate: addSchedule, isPending: isAdding } = useMutation({
    mutationFn: addScheduleAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addSchedule };
}
export function useDeleteTSchedule() {
  const { mutate: deleteSchedule, isPending: isdeleting } = useMutation({
    mutationFn: deleteScheduleAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteSchedule };
}
