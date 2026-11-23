import * as m from "@/paraglide/messages";

import { ComingSoonComponent } from "@/shared/components/coming-soon";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-3xl font-bold">{m.analytics_page_title()}</h1>

      <ComingSoonComponent />
    </div>
  );
}
