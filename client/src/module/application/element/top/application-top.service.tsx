import { useGetApplicationQuery } from "@/shared/rest-api/api/applications";

export const useApplicationTopService = (applicationId: string) => {
  const { isFetching, isFetched, data } = useGetApplicationQuery({
    id: applicationId,
  });
  return {
    application: data?.data,
    isFetching,
    isFetched,
  };
};
