import * as m from "@/paraglide/messages";
import { EApplicationEventType } from "@/shared/rest-api/interface/application-events";

// interfaces
type ApplicationEventTypeMessageKey =
  `application_event_type_${EApplicationEventType}`;

// service
export const ApplicationEventsListCardService = () => {
  const getApplicationEventTypeLabel = (type: EApplicationEventType) => {
    const key: ApplicationEventTypeMessageKey = `application_event_type_${type}`;

    return m[key]();
  };

  // return
  return {
    getApplicationEventTypeLabel,
  };
};
