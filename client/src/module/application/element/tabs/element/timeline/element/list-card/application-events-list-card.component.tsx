"use client";

import { useParams } from "next/navigation";

import { formatDate } from "@/shared/utils";

import { IApplicationEventDto } from "@/shared/rest-api/interface/application-events";

import { APPLICATION_EVENT_CONFIG } from "@/module/application/constant";
import { ApplicationEventsListCardService } from "./application-events-list-card.service";

// interfaces
interface IApplicationEventsListCardComponentProps {
  applicationEvent: IApplicationEventDto;
  isFirst: boolean;
  isLast: boolean;
}

// component
export const ApplicationEventsListCardComponent = (
  props: IApplicationEventsListCardComponentProps,
) => {
  const { applicationEvent, isFirst, isLast } = props;
  const thisService = ApplicationEventsListCardService();

  const { locale = "en" } = useParams<{ locale: string }>();

  const { color, Icon, textColor, backgroundColor } =
    APPLICATION_EVENT_CONFIG[applicationEvent.type];

  const formattedDate = applicationEvent.eventDate
    ? formatDate(applicationEvent.eventDate, locale)
    : null;

  // render
  return (
    <div className="grid w-full grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-3 md:grid-cols-[9rem_2.5rem_minmax(0,1fr)] md:gap-x-4">
      <div className="col-start-1 row-start-1 hidden flex-col py-2 mt-2.5 leading-tight md:flex">
        {formattedDate && (
          <>
            <span
              className="text-sm font-medium whitespace-nowrap"
              style={{ color: textColor }}
            >
              {formattedDate.dateLabel}
            </span>

            <span
              className="text-xs whitespace-nowrap opacity-70"
              style={{ color: textColor }}
            >
              {formattedDate.timeLabel}
            </span>
          </>
        )}
      </div>

      <div className="relative col-start-1 row-start-1 flex justify-center self-stretch md:col-start-2">
        {!(isFirst && isLast) && (
          <span
            className="absolute left-1/2 w-px -translate-x-1/2 bg-foreground-disabled"
            style={{
              top: isFirst ? "calc(0.5rem + 0.625rem + 1rem)" : 0,
              bottom: isLast ? "calc(100% - 0.5rem - 0.625rem - 1rem)" : 0,
            }}
          />
        )}

        <div
          className="relative z-10 mt-4.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: color }}
        >
          <Icon className="h-3 w-3 text-white" />
        </div>
      </div>

      <div className="col-start-2 row-start-1 min-w-0 py-2 md:col-start-3">
        <div
          className="flex flex-col rounded-md p-2.5"
          style={{ backgroundColor }}
        >
          <p className="text-base font-medium" style={{ color: textColor }}>
            {thisService.getApplicationEventTypeLabel(applicationEvent.type)}
          </p>

          <p className="text-xs text-foreground-subtle">
            {applicationEvent.description}
          </p>

          {formattedDate && (
            <div className="mt-2 flex gap-x-2 leading-tight md:hidden">
              <span
                className="text-xs whitespace-nowrap"
                style={{ color: textColor }}
              >
                {formattedDate.dateLabel}
              </span>

              <span
                className="text-xs whitespace-nowrap opacity-70"
                style={{ color: textColor }}
              >
                {formattedDate.timeLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
