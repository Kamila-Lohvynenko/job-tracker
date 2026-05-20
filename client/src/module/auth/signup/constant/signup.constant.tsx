import * as m from "@/paraglide/messages";
import { ChartLine, FileText, HandFist } from "lucide-react";

export const getAdvantages = () => {
  return [
    {
      icon: <FileText size={24} />,
      title: m.signup_advantages_item_1_title(),
      description: m.signup_advantages_item_1_description(),
    },
    {
      icon: <HandFist size={24} />,
      title: m.signup_advantages_item_2_title(),
      description: m.signup_advantages_item_2_description(),
    },
    {
      icon: <ChartLine size={24} />,
      title: m.signup_advantages_item_3_title(),
      description: m.signup_advantages_item_3_description(),
    },
  ];
};
