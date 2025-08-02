import { api } from "../utils/AxiosInstance";
import {
  IBus,
  IPark,
  IRoute,
  ISchedule,
  IStation,
  ITrain,
} from "../utils/type";
// service for Routes
export const getRoutes = async () => await api.get(`admin/routes`);
export const getRoute = async (id: string) =>
  await api.get(`admin/route/${id}`);
export const addRoute = async (payload: IRoute) =>
  await api.post(`admin/route/add`, payload);
export const deleteRoute = async (id: number) =>
  await api.delete(`admin/route/${id}/delete`);
// service for Stations
export const getStations = async () => await api.get(`admin/stations`);
export const getStation = async (id: string) =>
  await api.get(`admin/station/${id}`);
export const addStation = async (payload: IStation) =>
  await api.post(`admin/station/add`, payload);
export const deleteStation = async (id: number) =>
  await api.delete(`admin/station/${id}/delete`);
// service for parks
export const getParks = async () => await api.get(`admin/parks`);
export const getPark = async (id: string) => await api.get(`admin/park/${id}`);
export const addPark = async (payload: IPark) =>
  await api.post(`admin/park/add`, payload);
export const deletePark = async (id: number) =>
  await api.delete(`admin/park/${id}/delete`);
// service for buses
export const getBuses = async () => await api.get(`admin/buses`);
export const getBus = async (id: string) => await api.get(`admin/bus/${id}`);
export const addBus = async (payload: IBus) =>
  await api.post(`admin/bus/add`, payload);
export const deleteBus = async (id: number) =>
  await api.delete(`admin/bus/${id}/delete`);
// service for buses
export const getSchedules = async () => await api.get(`admin/schedules`);
export const getSchedule = async (id: string) =>
  await api.get(`admin/schedule/${id}`);
export const addSchedule = async (payload: ISchedule) =>
  await api.post(`admin/schedule/add`, payload);
export const deleteSchedule = async (id: number) =>
  await api.delete(`admin/schedule/${id}/delete`);
// service for parks
export const getTrains = async () => await api.get(`admin/trains`);
export const getTrain = async (id: string) =>
  await api.get(`admin/train/${id}`);
export const addTrain = async (payload: ITrain) =>
  await api.post(`admin/train/add`, payload);
export const deleteTrain = async (id: number) =>
  await api.delete(`admin/train/${id}/delete`);
