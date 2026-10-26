"use client";

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
          Back to Applications
        </p>
      </div>

      <Button
        onPress={thisService.openApplicationModal}
        className="bg-primary text-white hover:bg-primary-hover"
      >
        <PlusIcon className="size-4" />

        <span>Add Event</span>
      </Button>
    </div>
  );
};

export default ApplicationHeaderComponent;
