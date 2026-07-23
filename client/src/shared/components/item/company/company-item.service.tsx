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

export const useCompanyItemService = () => {
  const getCompanyIcon = (company: string) => {
    const normalizedCompany = company.toLowerCase().trim();
    switch (normalizedCompany) {
      case "apple":
        return <AppleIcon className="w-4 h-4" />;
      case "google":
        return <GoogleIcon className="w-4 h-4" />;
      case "facebook":
        return <FacebookIcon className="w-4 h-4" />;
      case "microsoft":
        return <MicrosoftIcon className="w-4 h-4" />;
      case "netflix":
        return <NetflixIcon className="w-4 h-4" />;
      case "spotify":
        return <SpotifyIcon className="w-4 h-4" />;
      case "amazon":
        return <AmazonIcon className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4 text-gray-500" />;
    }
  };
  return {
    getCompanyIcon,
  };
};
