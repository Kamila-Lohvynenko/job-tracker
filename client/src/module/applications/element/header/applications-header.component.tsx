"use client";

import * as m from "@/paraglide/messages";
import { Button } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import { useApplicationsHeaderService } from "./applications-header.service";

const ApplicationsHeaderComponent = () => {
  const thisService = useApplicationsHeaderService();

  //return
  return (
    <div className="flex items-center justify-between mb-7">
      <h1 className="text-3xl font-bold">{m.applications_page_title()}</h1>

      <Button
        onPress={thisService.openAddApplicationModal}
        className="bg-primary text-white hover:bg-primary-hover"
      >
        <PlusIcon className="size-4" />

        <span>{m.applications_add_button_label()}</span>
      </Button>
    </div>
  );
};

export default ApplicationsHeaderComponent;
