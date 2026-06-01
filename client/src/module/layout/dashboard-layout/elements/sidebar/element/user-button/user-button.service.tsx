import { useGetUserQuery } from "@/shared/rest-api/api/user";

export const useUserButtonService = () => {
  const { data, isLoading } = useGetUserQuery();

  const userName = data?.data?.name?.split(" ")[0];
  const userLastName = data?.data?.name?.split(" ")[1];
  const userFallback = `${userName?.[0]?.toUpperCase() ?? ""}${userLastName?.[0]?.toUpperCase() ?? ""}`;

  return {
    userName,
    userEmail: data?.data?.email,
    userFallback,
    isLoading,
  };
};
