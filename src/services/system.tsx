import { WEBSOCKET } from "@/constants/common";

export const connectSystemEvents = () => {
  const systemEventsWebsocketUrl = "/events/system";
  return new WebSocket(`${WEBSOCKET}${systemEventsWebsocketUrl}`);
};
