import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  getBusRoutesAction,
  addBusRouteAction,
  deleteBusRouteAction,
} from "../../../../serviceAction/TrainActions";
import { App } from "antd";
import { Common } from "../../../../utils/Common";
import {
  addBusScheduleAction,
  addBusTypeAction,
  deleteBusScheduleAction,
  deleteBusTypeAction,
  getBusesViaAdminAction,
  getBusProvidersAction,
  getBusSchedulesAction,
  getBusTypesAction,
  getBusManifestAction,
  getRouteViaAdminAction,
} from "../../../../serviceAction/BusActions";
export function useBusProviders() {
  const {
    isPending,
    data: busProviders = [],
    error,
  } = useQuery({
    queryKey: ["busproviders"],
    queryFn: getBusProvidersAction,
    refetchOnWindowFocus: false,
  });
  return { isPending, busProviders, error };
}
export function useBusTypes() {
  const {
    isPending: loading,
    data: busTypes = [],
    error,
  } = useQuery({
    queryKey: ["bustypes"],
    queryFn: getBusTypesAction,
    refetchOnWindowFocus: false,
  });
  return { loading, busTypes, error };
}
export function useAddBusType() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: addBusType, isPending: isAdding } = useMutation({
    mutationFn: addBusTypeAction,
    onSuccess: (response) => {
      notification.success({
        message: "Add Bus Type",
        description: response.statusDescription,
      });
    },
    onError: (error) => {
      notification.error({
        message: "Add Bus Type",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["bustypes"] }),
  });
  return { isAdding, addBusType };
}
export function useDeleteBusType() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: deleteBusType, isPending: isdeleting } = useMutation({
    mutationFn: deleteBusTypeAction,
    onSuccess: (response) => {
      notification.success({
        message: "Delete Bus Type",
        description: response.statusDescription,
      });
    },
    onError: (error) => {
      notification.error({
        message: "Delete Bus Type",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["bustypes"] }),
  });
  return { isdeleting, deleteBusType };
}

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
  const client = useQueryClient();
  const { mutate: addRoute, isPending: isAdding } = useMutation({
    mutationFn: addBusRouteAction,
    onError: (error) => {
      notification.error({
        message: "Add Bus Route",
        description: Common.formatError(error),
      });
    },
    onSuccess: (response) => {
      notification.success({
        message: "Add Bus Route",
        description: response.statusDescription,
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["busroutes"] }),
  });
  return { isAdding, addRoute };
}
export function useDeleteTRoute() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: deleteRoute, isPending: isdeleting } = useMutation({
    mutationFn: deleteBusRouteAction,
    onSuccess: (response) => {
      notification.success({
        message: "Delete Bus Route",
        description: response.statusDescription,
      });
    },
    onError: (error) => {
      notification.error({
        message: "Delete Bus Route",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["busroutes"] }),
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
  const client = useQueryClient();
  const { mutate: addStation, isPending: isAdding } = useMutation({
    mutationFn: addStationAction,
    onSuccess: (response) => {
      notification.success({
        message: "Add Station",
        description: response.statusDescription,
      });
    },
    onError: (error) => {
      notification.error({
        message: "Add Station",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["busstations"] }),
  });
  return { isAdding, addStation };
}
export function useDeleteStation() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: deleteStation, isPending: isdeleting } = useMutation({
    mutationFn: deleteStationAction,
    onSuccess: (response) => {
      notification.success({
        message: "Delete Station",
        description: response.statusDescription,
      });
    },
    onError: (error) => {
      notification.error({
        message: "Delete Station",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["busstations"] }),
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
  const client = useQueryClient();
  const { mutate: addBus, isPending: isAdding } = useMutation({
    mutationFn: addBusAction,
    onSuccess: (response) => {
      notification.success({
        message: "Add Bus",
        description: response.statusDescription,
      });
    },
    onError: (error) => {
      notification.error({
        message: "Add Bus",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["buses"] }),
  });
  return { isAdding, addBus };
}
export function useDeleteBus() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: deleteBus, isPending: isdeleting } = useMutation({
    mutationFn: deleteBusAction,
    onSuccess: (response) => {
      notification.success({
        message: "Delete Bus",
        description: response.statusDescription,
      });
    },
    onError: (error) => {
      notification.error({
        message: "Delete Bus",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["buses"] }),
  });
  return { isdeleting, deleteBus };
}
export function useBusSchedules() {
  const {
    isPending: loading,
    data: schedules = [],
    error,
  } = useQuery({
    queryKey: ["busschedules"],
    queryFn: getBusSchedulesAction,
    refetchOnWindowFocus: false,
  });
  return { loading, schedules, error };
}
export function useAddBusSchedule() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: addSchedule, isPending: isAdding } = useMutation({
    mutationFn: addBusScheduleAction,
    onSuccess: (data) => {
      notification.success({
        description: data.statusDescription,
        message: "Add Schedule",
      });
    },
    onError: (error) => {
      notification.error({
        message: "Add Schedule",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["busschedules"] }),
  });
  return { isAdding, addSchedule };
}
export function useDeleteBusSchedule() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: deleteSchedule, isPending: isdeleting } = useMutation({
    mutationFn: deleteBusScheduleAction,
    onSuccess: (data) => {
      notification.success({
        description: data.statusDescription,
        message: "Delete Schedule",
      });
    },
    onError: (error) => {
      notification.error({
        message: "Delete Schedule",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["schedules"] }),
  });
  return { isdeleting, deleteSchedule };
}
export function useManifest(tripId: number) {
  const {
    isPending: loading,
    data: manifest = [],
    error,
  } = useQuery({
    queryKey: ["manifest", tripId],
    queryFn: () => getBusManifestAction(tripId),
    enabled: !!tripId, // only run when selected
    staleTime: 5 * 60 * 1000, // cache for 5 mins
  });
  return { loading, manifest, error };
}
export function useRoutesViaAdmin(providerId: number) {
  const {
    isPending: loadingRoutes,
    data: routes = [],
    error,
  } = useQuery({
    queryKey: ["busroutes", providerId],
    queryFn: () => getRouteViaAdminAction(providerId),
    enabled: !!providerId, // only run when selected
    staleTime: 5 * 60 * 1000, // cache for 5 mins
  });
  return { loadingRoutes, routes, error };
}
export function useBusesViaAdmin(providerId: number) {
  const {
    isPending: loadingBuses,
    data: buses = [],
    error,
  } = useQuery({
    queryKey: ["buses", providerId],
    queryFn: () => getBusesViaAdminAction(providerId),
    enabled: !!providerId, // only run when selected
    staleTime: 5 * 60 * 1000, // cache for 5 mins
  });
  return { loadingBuses, buses, error };
}
