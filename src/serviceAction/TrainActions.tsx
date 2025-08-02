import {
  getRoutes,
  getRoute,
  getStations,
  getStation,
  getParks,
  getBuses,
  getTrains,
  addPark,
  deletePark,
  addTrain,
  deleteTrain,
  deleteBus,
  addBus,
  deleteStation,
  addStation,
  addRoute,
  deleteRoute,
  deleteSchedule,
  addSchedule,
  getSchedules,
} from "../services/TrainService";
import {
  IBus,
  IPark,
  IRoute,
  ISchedule,
  IStation,
  ITrain,
} from "../utils/type";
// action for Park
export async function getParksAction() {
  const response = await getParks();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function addParkAction(payload: IPark) {
  const response = await addPark(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteParkAction(id: number) {
  const response = await deletePark(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for Routes
export async function getRoutesAction() {
  const response = await getRoutes();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getRouteAction(id: string) {
  const response = await getRoute(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function addRouteAction(payload: IRoute) {
  const response = await addRoute(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteRouteAction(id: number) {
  const response = await deleteRoute(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for Station
export async function getStationsAction() {
  const response = await getStations();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getStationAction(id: string) {
  const response = await getStation(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function addStationAction(payload: IStation) {
  const response = await addStation(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteStationAction(id: number) {
  const response = await deleteStation(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for Park
export async function getBusesAction() {
  const response = await getBuses();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function addBusAction(payload: IBus) {
  const response = await addBus(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteBusAction(id: number) {
  const response = await deleteBus(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for Park
export async function getSchedulesAction() {
  const response = await getSchedules();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function addScheduleAction(payload: ISchedule) {
  const response = await addSchedule(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteScheduleAction(id: number) {
  const response = await deleteSchedule(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for Park
export async function getTrainsAction() {
  const response = await getTrains();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function addTrainAction(payload: ITrain) {
  const response = await addTrain(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteTrainAction(id: number) {
  const response = await deleteTrain(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
