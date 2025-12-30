import { EventTriggerDetails } from "@/types/event.types";
import toYaml from "./toYaml";

export const generateEventYaml = (data: EventTriggerDetails): string => {
  const eventSource = data.eventSource;

  return `${toYaml(eventSource)}`;
};
