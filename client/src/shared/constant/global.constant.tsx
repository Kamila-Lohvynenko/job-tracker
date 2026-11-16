import * as m from "@/paraglide/messages";
import {
  EApplicationEventStatus,
  EApplicationEventType,
  EApplicationSource,
  EEmploymentType,
  ELocation,
} from "@/shared/rest-api/interface";

export const employmentTypeLabelMap: Record<EEmploymentType, () => string> = {
  [EEmploymentType.FULL_TIME]: m.employment_type_label_FULL_TIME,
  [EEmploymentType.PART_TIME]: m.employment_type_label_PART_TIME,
  [EEmploymentType.CONTRACT]: m.employment_type_label_CONTRACT,
  [EEmploymentType.INTERNSHIP]: m.employment_type_label_INTERNSHIP,
  [EEmploymentType.FREELANCE]: m.employment_type_label_FREELANCE,
  [EEmploymentType.TEMPORARY]: m.employment_type_label_TEMPORARY,
};

export const locationLabelMap: Record<ELocation, () => string> = {
  [ELocation.REMOTE]: m.location_label_REMOTE,
  [ELocation.HYBRID]: m.location_label_HYBRID,
  [ELocation.ON_SITE]: m.location_label_ON_SITE,
  [ELocation.FLEXIBLE]: m.location_label_FLEXIBLE,
  [ELocation.OTHER]: m.location_label_OTHER,
};

export const eventTypeLabelMap: Record<EApplicationEventType, () => string> = {
  [EApplicationEventType.APPLICATION_SUBMITTED]:
    m.application_event_type_APPLICATION_SUBMITTED,
  [EApplicationEventType.HR_INTERVIEW]: m.application_event_type_HR_INTERVIEW,
  [EApplicationEventType.INTERVIEW]: m.application_event_type_INTERVIEW,
  [EApplicationEventType.TECHNICAL_INTERVIEW]:
    m.application_event_type_TECHNICAL_INTERVIEW,
  [EApplicationEventType.LIVE_CODING]: m.application_event_type_LIVE_CODING,
  [EApplicationEventType.SYSTEM_DESIGN]: m.application_event_type_SYSTEM_DESIGN,
  [EApplicationEventType.TAKE_HOME_TASK]:
    m.application_event_type_TAKE_HOME_TASK,
  [EApplicationEventType.FINAL_INTERVIEW]:
    m.application_event_type_FINAL_INTERVIEW,
  [EApplicationEventType.OFFER]: m.application_event_type_OFFER,
  [EApplicationEventType.REJECTION]: m.application_event_type_REJECTION,
  [EApplicationEventType.WITHDRAWN]: m.application_event_type_WITHDRAWN,
  [EApplicationEventType.FOLLOW_UP]: m.application_event_type_FOLLOW_UP,
  [EApplicationEventType.NOTE]: m.application_event_type_NOTE,
  [EApplicationEventType.CUSTOM]: m.application_event_type_CUSTOM,
};

export const eventStatusLabelMap: Record<
  EApplicationEventStatus,
  () => string
> = {
  [EApplicationEventStatus.SCHEDULED]: m.application_event_status_SCHEDULED,
  [EApplicationEventStatus.COMPLETED]: m.application_event_status_COMPLETED,
  [EApplicationEventStatus.CANCELLED]: m.application_event_status_CANCELLED,
};

export const sourceLabelMap: Record<EApplicationSource, () => string> = {
  [EApplicationSource.LINKEDIN]: m.source_label_LINKEDIN,
  [EApplicationSource.INDEED]: m.source_label_INDEED,
  [EApplicationSource.COMPANY_WEBSITE]: m.source_label_COMPANY_WEBSITE,
  [EApplicationSource.WELLFOUND]: m.source_label_WELLFOUND,
  [EApplicationSource.GLASSDOOR]: m.source_label_GLASSDOOR,
  [EApplicationSource.REFERRAL]: m.source_label_REFERRAL,
  [EApplicationSource.RECRUITER]: m.source_label_RECRUITER,
  [EApplicationSource.EMAIL]: m.source_label_EMAIL,
  [EApplicationSource.OTHER]: m.source_label_OTHER,
};
