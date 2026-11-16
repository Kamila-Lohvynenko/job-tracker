"use client";

import { useParams } from "next/navigation";

import { formatDate } from "@/shared/utils";

import { IApplicationEventDto } from "@/shared/rest-api/interface/application-events";

import { APPLICATION_EVENT_CONFIG } from "@/module/application/constant";
import { ApplicationEventsListCardService } from "./application-events-list-card.service";

// interfaces
interface IApplicationEventsListCardComponentProps {
  applicationEvent: IApplicationEventDto;
}

// component
export const ApplicationEventsListCardComponent = (
  props: IApplicationEventsListCardComponentProps,
) => {
  const { applicationEvent } = props;
  const thisService = ApplicationEventsListCardService();

  const { locale = "en" } = useParams<{ locale: string }>();

  const { color, Icon, textColor } =
    APPLICATION_EVENT_CONFIG[applicationEvent.type];

  const formattedDate = applicationEvent.eventDate
    ? formatDate(applicationEvent.eventDate, locale)
    : null;

  // render
  return (
    <div className="flex items-start gap-2">
      {formattedDate && (
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium" style={{ color: textColor }}>
            {formattedDate.dateLabel}
          </span>

          <span className="text-xs opacity-70" style={{ color: textColor }}>
            {formattedDate.timeLabel}
          </span>
        </div>
      )}

      <div
        className="flex h-8 w-8 items-center justify-center rounded-full"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-3 w-3 text-white" />
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-medium" style={{ color: textColor }}>
          {thisService.getApplicationEventTypeLabel(applicationEvent.type)}
        </p>

        <p className="text-xs text-foreground-subtle">
          {applicationEvent.description}
        </p>
      </div>
    </div>
  );
};
