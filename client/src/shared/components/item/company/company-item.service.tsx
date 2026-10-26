import {
  AmazonIcon,
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  MicrosoftIcon,
  NetflixIcon,
  SpotifyIcon,
} from "@/images";
import { Building2 } from "lucide-react";

// interface
type CompanyItemSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

const sizeMap: Record<CompanyItemSize, string> = {
  xs: "w-4 h-4",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-14 h-14",
  xl: "w-18 h-18",
  xxl: "w-22 h-22",
};

// service
export const useCompanyItemService = () => {
  const getCompanyIcon = (company: string, size: CompanyItemSize) => {
    const normalizedCompany = company.toLowerCase().trim();
    const sizeClass = sizeMap[size];

    switch (normalizedCompany) {
      case "apple":
        return <AppleIcon className={sizeClass} />;
      case "google":
        return <GoogleIcon className={sizeClass} />;
      case "facebook":
        return <FacebookIcon className={sizeClass} />;
      case "microsoft":
        return <MicrosoftIcon className={sizeClass} />;
      case "netflix":
        return <NetflixIcon className={sizeClass} />;
      case "spotify":
        return <SpotifyIcon className={sizeClass} />;
      case "amazon":
        return <AmazonIcon className={sizeClass} />;
      default:
        return <Building2 className={`${sizeClass} text-gray-500`} />;
    }
  };
  return {
    getCompanyIcon,
  };
};
