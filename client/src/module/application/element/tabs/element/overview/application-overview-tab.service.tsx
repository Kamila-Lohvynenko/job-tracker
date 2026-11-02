import { useGetApplicationQuery } from "@/shared/rest-api/api/applications";
import { useParams } from "next/navigation";

export const useApplicationOverviewTabService = () => {
  const { slug } = useParams<{ slug: string }>();

  const { isFetching, isFetched, data } = useGetApplicationQuery({ id: slug });

  return {
    isFetching,
    isFetched,
    application: data?.data,
  };
};
