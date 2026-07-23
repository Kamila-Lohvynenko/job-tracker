"use client";

import { Button } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import { useApplicationsHeaderService } from "./applications-header.service";

const ApplicationsHeaderComponent = () => {
  const thisService = useApplicationsHeaderService();

  //return
  return (
    <div className="flex items-center justify-between mb-7">
      <h1 className="text-3xl font-bold">Applications</h1>

      <Button
        onPress={thisService.openAddApplicationModal}
        className="bg-primary text-white hover:bg-primary-hover"
      >
        <PlusIcon className="size-4" />

        <span>Add Application</span>
      </Button>
    </div>
  );
};

export default ApplicationsHeaderComponent;
