import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getBusStationsAction,
  getParksAction,
  getBusesAction,
  addStationAction,
  deleteStationAction,
  addParkAction,
  deleteParkAction,
  addBusAction,
  deleteBusAction,
  getSchedulesAction,
  addScheduleAction,
  deleteScheduleAction,
  getBusRoutesAction,
  addBusRouteAction,
  deleteBusRouteAction,
} from "../../../../serviceAction/TrainActions";
import { App } from "antd";
import { Common } from "../../../../utils/Common";
export function useTRoutes() {
  const {
    isPending: loading,
    data: routes = [],
    error,
  } = useQuery({
    queryKey: ["busroutes"],
    queryFn: getBusRoutesAction,
    refetchOnWindowFocus: false,
  });
  return { loading, routes, error };
}
export function useAddTRoute() {
  const { notification } = App.useApp();
  const { mutate: addRoute, isPending: isAdding } = useMutation({
    mutationFn: addBusRouteAction,
    onError: (error) => {
      notification.error({
        message: "Delete Schedule",
        description: Common.formatError(error),
      });
    },
  });
  return { isAdding, addRoute };
}
export function useDeleteTRoute() {
  const { notification } = App.useApp();
  const { mutate: deleteRoute, isPending: isdeleting } = useMutation({
    mutationFn: deleteBusRouteAction,
    onError: (error) => {
      notification.error({
        message: "Delete Schedule",
        description: Common.formatError(error),
      });
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
  const { notification } = App.useApp();
  const { mutate: addStation, isPending: isAdding } = useMutation({
    mutationFn: addStationAction,
    onError: (error) => {
      notification.error({
        message: "Delete Schedule",
        description: Common.formatError(error),
      });
    },
  });
  return { isAdding, addStation };
}
export function useDeleteStation() {
  const { notification } = App.useApp();
  const { mutate: deleteStation, isPending: isdeleting } = useMutation({
    mutationFn: deleteStationAction,
    onError: (error) => {
      notification.error({
        message: "Delete Schedule",
        description: Common.formatError(error),
      });
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
  const { notification } = App.useApp();
  const { mutate: addPark, isPending: isAdding } = useMutation({
    mutationFn: addParkAction,
    onError: (error) => {
      notification.error({
        message: "Add Park",
        description: Common.formatError(error),
      });
    },
  });
  return { isAdding, addPark };
}
export function useDeletePark() {
  const { notification } = App.useApp();
  const { mutate: deletePark, isPending: isdeleting } = useMutation({
    mutationFn: deleteParkAction,
    onError: (error) => {
      notification.error({
        message: "Delete Park",
        description: Common.formatError(error),
      });
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
  const { notification } = App.useApp();
  const { mutate: addBus, isPending: isAdding } = useMutation({
    mutationFn: addBusAction,
    onError: (error) => {
      notification.error({
        message: "Add Bus",
        description: Common.formatError(error),
      });
    },
  });
  return { isAdding, addBus };
}
export function useDeleteBus() {
  const { notification } = App.useApp();
  const { mutate: deleteBus, isPending: isdeleting } = useMutation({
    mutationFn: deleteBusAction,
    onError: (error) => {
      notification.error({
        message: "Delete Bus",
        description: Common.formatError(error),
      });
    },
  });
  return { isdeleting, deleteBus };
}
export function useSchedules() {
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
export function useAddSchedule() {
  const { notification } = App.useApp();
  const { mutate: addSchedule, isPending: isAdding } = useMutation({
    mutationFn: addScheduleAction,
    onError: (error) => {
      notification.error({
        message: "Delete Schedule",
        description: Common.formatError(error),
      });
    },
  });
  return { isAdding, addSchedule };
}
export function useDeleteSchedule() {
  const { notification } = App.useApp();
  const { mutate: deleteSchedule, isPending: isdeleting } = useMutation({
    mutationFn: deleteScheduleAction,
    onError: (error) => {
      notification.error({
        message: "Delete Schedule",
        description: Common.formatError(error),
      });
    },
  });
  return { isdeleting, deleteSchedule };
}
