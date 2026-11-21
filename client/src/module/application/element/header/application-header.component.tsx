"use client";

import * as m from "@/paraglide/messages";
import { Button } from "@heroui/react";
import { MoveLeft, PlusIcon } from "lucide-react";
import { useApplicationHeaderService } from "./application-header.service";

const ApplicationHeaderComponent = () => {
  const thisService = useApplicationHeaderService();

  //return
  return (
    <div className="flex items-center justify-between mb-7">
      <div
        className="flex items-center gap-2 text-foreground-subtle cursor-pointer"
        onClick={thisService.goBackToApplications}
      >
        <MoveLeft className="size-4" />

        <p className="text-foreground-subtle font-medium">
          {m.header_back_to_dashboard_link_label()}
        </p>
      </div>

      <Button
        onPress={thisService.openApplicationModal}
        className="bg-primary text-white hover:bg-primary-hover"
      >
        <PlusIcon className="size-4" />

        <span>{m.application_header_add_event_button_label()}</span>
      </Button>
    </div>
  );
};

export default ApplicationHeaderComponent;
