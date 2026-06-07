import {
  EApplicationSource,
  EApplicationStatus,
  EEmploymentType,
} from "@/shared/rest-api/interface";

export interface IApplicationsFilter {
  status: EApplicationStatus[];
  source: EApplicationSource[];
  employmentType: EEmploymentType[];
  appliedFrom: string;
  appliedTo: string;
}
