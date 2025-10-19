import {
  getRoutes,
  getRoute,
  getBusStations,
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
  getTrainStations,
  getSeats,
  getSeat,
  addSeat,
  deleteSeat,
  deleteBusRoute,
  addBusRoute,
  getBusRoutes,
  getBusRoute,
} from "../services/TrainService";
import {
  IBus,
  IBusRoute,
  IPark,
  ITrainRoute,
  ISchedule,
  ISeat,
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
export async function deleteParkAction(id: string) {
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
export async function addRouteAction(payload: ITrainRoute) {
  const response = await addRoute(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteRouteAction(id: string) {
  const response = await deleteRoute(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for Station
export async function getBusStationsAction() {
  const response = await getBusStations();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getTrainStationsAction() {
  const response = await getTrainStations();
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
export async function deleteStationAction(id: string) {
  const response = await deleteStation(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for Park
export async function getBusRoutesAction() {
  const response = await getBusRoutes();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getBusRouteAction(id: string) {
  const response = await getBusRoute(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function addBusRouteAction(payload: IBusRoute) {
  const response = await addBusRoute(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteBusRouteAction(id: string) {
  const response = await deleteBusRoute(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
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
export async function deleteBusAction(id: string) {
  const response = await deleteBus(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}

export async function getSeatsAction() {
  const response = await getSeats();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getSeatAction(id: string) {
  const response = await getSeat(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function addSeatAction(payload: ISeat) {
  const response = await addSeat(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteSeatAction(id: string) {
  const response = await deleteSeat(id);
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
export async function deleteScheduleAction(id: string) {
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
export async function deleteTrainAction(id: string) {
  const response = await deleteTrain(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
