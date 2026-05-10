import { useQuery } from "@tanstack/react-query";
import { EUserKey } from "../../interface";
import { getUserApi } from "./user.api";

// get user hook
export const useGetUserQuery = () => {
  return useQuery({
    queryKey: [EUserKey.USER_QUERY],
    queryFn: getUserApi,
  });
};
