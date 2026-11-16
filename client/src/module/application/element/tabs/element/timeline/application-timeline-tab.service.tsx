import { useGetApplicationEventsQuery } from "@/shared/rest-api/api/application-events";
import { useParams } from "next/navigation";

export const ApplicationTimelineTabService = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: applicationEvents, isLoading } = useGetApplicationEventsQuery({
    applicationId: slug,
  });

  return {
    applicationEvents: applicationEvents?.data,
    isLoading,
  };
};
