import { useMutation } from "@tanstack/react-query";
import { ESigninKey } from "../../interface";
import { signinApi } from "./signin.api";

// signin mutation
export const useSigninMutation = () => {
  return useMutation({
    mutationKey: [ESigninKey.SIGNIN_MUTATION],
    mutationFn: signinApi,
  });
};
