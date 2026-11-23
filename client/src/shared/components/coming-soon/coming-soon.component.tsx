import * as m from "@/paraglide/messages";
import { Construction } from "lucide-react";

export const ComingSoonComponent = () => {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary-soft text-primary">
        <Construction className="size-5" />
      </div>

      <h2 className="mt-4 text-lg font-semibold">{m.coming_soon_title()}</h2>

      <p className="mt-2 max-w-md text-sm text-foreground-subtle">
        {m.coming_soon_description()}
      </p>
    </div>
  );
};
