"use client";

import { APPLICATION_EVENT_CONFIG } from "@/module/application/constant";
import { IUpcomingApplicationEventDto } from "@/shared/rest-api/interface";
import { formatDate } from "@/shared/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

interface IDashboardUpcomingEventProps {
  event: IUpcomingApplicationEventDto;
}

const DashboardUpcomingEventComponent = (
  props: IDashboardUpcomingEventProps,
) => {
  const { event } = props;
  const { locale = "en" } = useParams<{ locale: string }>();
  const { color, Icon } = APPLICATION_EVENT_CONFIG[event.type];
  const formattedDate = event.eventDate
    ? formatDate(event.eventDate, locale)
    : null;

  return (
    <li>
      <Link
        href={`/applications/${event.applicationId}`}
        className="flex items-center gap-3 px-4 py-3 hover:bg-surface-soft"
      >
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: color }}
        >
          <Icon className="size-4 text-white" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{event.title}</p>
          <p className="truncate text-xs text-foreground-subtle">
            {event.company} · {event.role}
          </p>
        </div>

        {formattedDate && (
          <div className="shrink-0 text-right">
            <p className="text-sm font-medium whitespace-nowrap">
              {formattedDate.dateLabel}
            </p>
            <p className="text-xs text-foreground-subtle whitespace-nowrap">
              {formattedDate.timeLabel}
            </p>
          </div>
        )}
      </Link>
    </li>
  );
};

export default DashboardUpcomingEventComponent;
