import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getRoutesAction,
  getTrainsAction,
  addRouteAction,
  deleteRouteAction,
  addStationAction,
  deleteStationAction,
  addTrainAction,
  deleteTrainAction,
  getSchedulesAction,
  addScheduleAction,
  deleteScheduleAction,
  getTrainStationsAction,
  getSeatsAction,
  addSeatAction,
  deleteSeatAction,
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
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addRoute };
}
export function useDeleteTRoute() {
  const { mutate: deleteRoute, isPending: isdeleting } = useMutation({
    mutationFn: deleteRouteAction,
    onError: (error) => {
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
    queryKey: ["trainstations"],
    queryFn: getTrainStationsAction,
    refetchOnWindowFocus: false,
  });
  return { loading, stations, error };
}
export function useAddStation() {
  const { mutate: addStation, isPending: isAdding } = useMutation({
    mutationFn: addStationAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addStation };
}
export function useDeleteStation() {
  const { mutate: deleteStation, isPending: isdeleting } = useMutation({
    mutationFn: deleteStationAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteStation };
}

export function useSeats() {
  const {
    isPending: loading,
    data: seats = [],
    error,
  } = useQuery({
    queryKey: ["seats"],
    queryFn: getSeatsAction,
    refetchOnWindowFocus: false,
  });
  return { loading, seats, error };
}
export function useAddSeat() {
  const { mutate: addSeat, isPending: isAdding } = useMutation({
    mutationFn: addSeatAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addSeat };
}
export function useDeleteSeat() {
  const { mutate: deleteSeat, isPending: isdeleting } = useMutation({
    mutationFn: deleteSeatAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteSeat };
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
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addTrain };
}
export function useDeleteTrain() {
  const { mutate: deleteTrain, isPending: isdeleting } = useMutation({
    mutationFn: deleteTrainAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteTrain };
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
  const { mutate: addSchedule, isPending: isAdding } = useMutation({
    mutationFn: addScheduleAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addSchedule };
}
export function useDeleteSchedule() {
  const { mutate: deleteSchedule, isPending: isdeleting } = useMutation({
    mutationFn: deleteScheduleAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteSchedule };
}
