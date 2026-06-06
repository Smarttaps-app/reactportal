import { api } from "../utils/AxiosInstance";
import {
  IBusRoute,
  IPark,
  IStation,
  ITrainRoute,
  ISchedule,
  ISeat,
  ITrain,
  IBus,
} from "../utils/type";
// service for Routes
export const getRoutes = async () => await api.get(`admin/routes`);
export const getRoute = async (id: string) =>
  await api.get(`admin/route/${id}`);
export const addRoute = async (payload: ITrainRoute) =>
  await api.post(`admin/route/add`, payload);
export const deleteRoute = async (id: string) =>
  await api.delete(`admin/route/${id}/delete`);

// service for Seat
export const getSeats = async () => await api.get(`admin/seats`);
export const getSeat = async (id: string) => await api.get(`admin/seat/${id}`);
export const addSeat = async (payload: ISeat) =>
  await api.post(`admin/seat/add`, payload);
export const deleteSeat = async (id: string) =>
  await api.delete(`admin/seat/${id}/delete`);

// service for Stations
export const getBusStations = async () => await api.get(`admin/bus/stations`);
export const getTrainStations = async () =>
  await api.get(`admin/train/stations`);
export const getStation = async (id: string) =>
  await api.get(`admin/station/${id}`);
export const addStation = async (payload: IStation | FormData) =>
  await api.post(`admin/station/add`, payload);
export const deleteStation = async (id: string) =>
  await api.delete(`admin/station/${id}/delete`);
// service for parks
export const getParks = async () => await api.get(`admin/parks`);
export const getPark = async (id: string) => await api.get(`admin/park/${id}`);
export const addPark = async (payload: IPark) =>
  await api.post(`admin/park/add`, payload);
export const deletePark = async (id: string) =>
  await api.delete(`admin/park/${id}/delete`);
// service for buses
export const getBusRoutes = async () => await api.get(`admin/bus/routes`);
export const getBusRoute = async (id: string) =>
  await api.get(`admin/bus/route/${id}`);
export const addBusRoute = async (payload: IBusRoute) =>
  await api.post(`admin/bus/route/add`, payload);
export const deleteBusRoute = async (id: string) =>
  await api.delete(`admin/bus/route/${id}/delete`);
export const getBuses = async () => await api.get(`admin/buses`);
export const getBus = async (id: string) => await api.get(`admin/bus/${id}`);
export const addBus = async (payload: IBus | FormData) =>
  await api.post(`admin/bus/add`, payload);
export const deleteBus = async (id: string) =>
  await api.delete(`admin/bus/${id}/delete`);
// service for buses
export const getSchedules = async () => await api.get(`admin/schedules`);
export const getSchedule = async (id: string) =>
  await api.get(`admin/schedule/${id}`);
export const addSchedule = async (payload: ISchedule) =>
  await api.post(`admin/schedule/add`, payload);
export const deleteSchedule = async (id: string) =>
  await api.delete(`admin/schedule/${id}/delete`);
// service for parks
export const getTrains = async () => await api.get(`admin/trains`);
export const getTrain = async (id: string) =>
  await api.get(`admin/train/${id}`);
export const addTrain = async (payload: ITrain) =>
  await api.post(`admin/train/add`, payload);
export const deleteTrain = async (id: string) =>
  await api.delete(`admin/train/${id}/delete`);
