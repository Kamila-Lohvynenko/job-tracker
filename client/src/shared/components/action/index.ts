import dynamic from "next/dynamic";

export const ActionComponent = dynamic(() => import("./action.component"));
