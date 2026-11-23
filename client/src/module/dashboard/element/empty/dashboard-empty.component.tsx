"use client";

import * as m from "@/paraglide/messages";
import { Button } from "@heroui/react";
import { PlusIcon } from "lucide-react";

interface IDashboardEmptyProps {
  onAdd: () => void;
}

const DashboardEmptyComponent = (props: IDashboardEmptyProps) => {
  const { onAdd } = props;

  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-border bg-surface px-6 py-12 text-center">
      <h2 className="text-lg font-semibold">{m.dashboard_empty_title()}</h2>

      <p className="mt-2 max-w-md text-sm text-foreground-subtle">
        {m.dashboard_empty_description()}
      </p>

      <Button
        onPress={onAdd}
        className="mt-6 bg-primary text-white hover:bg-primary-hover"
      >
        <PlusIcon className="size-4" />

        <span>{m.applications_add_button_label()}</span>
      </Button>
    </div>
  );
};

export default DashboardEmptyComponent;
