import * as m from "@/paraglide/messages";
import {
  EApplicationSource,
  EEmploymentType,
  EWorkLocation,
} from "@/shared/rest-api/interface";

export const employmentTypeLabelMap: Record<EEmploymentType, () => string> = {
  [EEmploymentType.FULL_TIME]: m.employment_type_label_FULL_TIME,
  [EEmploymentType.PART_TIME]: m.employment_type_label_PART_TIME,
  [EEmploymentType.CONTRACT]: m.employment_type_label_CONTRACT,
  [EEmploymentType.INTERNSHIP]: m.employment_type_label_INTERNSHIP,
  [EEmploymentType.FREELANCE]: m.employment_type_label_FREELANCE,
  [EEmploymentType.TEMPORARY]: m.employment_type_label_TEMPORARY,
};

export const workLocationLabelMap: Record<EWorkLocation, () => string> = {
  [EWorkLocation.REMOTE]: m.work_location_label_REMOTE,
  [EWorkLocation.HYBRID]: m.work_location_label_HYBRID,
  [EWorkLocation.ON_SITE]: m.work_location_label_ON_SITE,
  [EWorkLocation.FLEXIBLE]: m.work_location_label_FLEXIBLE,
  [EWorkLocation.OTHER]: m.work_location_label_OTHER,
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
