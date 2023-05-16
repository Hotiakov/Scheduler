import { StateSchema } from "app/provider/StoreProvider";

export const getScheduleInterval = (state: StateSchema) => state.schedule.currentDateInterval;
export const getScheduleType = (state: StateSchema) => state.schedule.type;