import {
  DefaultSearchIcon,
  GlassdoorIcon,
  IndeedIcon,
  LinkedInIcon,
} from "@/images";
import { EApplicationSource } from "@/shared/rest-api/interface/applications";
import { Cable, Earth, MailIcon, UserIcon } from "lucide-react";

export const useSourceItemService = () => {
  const getSourceIcon = (source: string) => {
    switch (source) {
      case EApplicationSource.LINKEDIN:
        return <LinkedInIcon className="w-4 h-4" />;
      case EApplicationSource.INDEED:
        return <IndeedIcon className="w-4 h-4" />;
      case EApplicationSource.GLASSDOOR:
        return <GlassdoorIcon className="w-4 h-4" />;
      case EApplicationSource.REFERRAL:
        return <Cable className="w-4 h-4 text-gray-500" />;
      case EApplicationSource.RECRUITER:
        return <UserIcon className="w-4 h-4 text-gray-500" />;
      case EApplicationSource.EMAIL:
        return <MailIcon className="w-4 h-4 text-gray-500" />;
      case EApplicationSource.COMPANY_WEBSITE:
        return <Earth className="w-4 h-4 text-gray-500" />;
      default:
        return <DefaultSearchIcon className="w-4 h-4 text-gray-500" />;
    }
  };
  return {
    getSourceIcon,
  };
};
