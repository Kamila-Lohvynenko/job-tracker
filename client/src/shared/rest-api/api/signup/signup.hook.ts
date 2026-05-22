import { useMutation } from "@tanstack/react-query";
import { ESignupKey } from "../../interface";
import { signupApi } from "./signup.api";

// signup mutation
export const useSignupMutation = () => {
  return useMutation({
    mutationKey: [ESignupKey.SIGNUP_MUTATION],
    mutationFn: signupApi,
  });
};
