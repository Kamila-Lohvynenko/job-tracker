"use client";

import * as m from "@/paraglide/messages";
import { useSigninMutation } from "@/shared/rest-api/api/signin";
import { useGetUserQuery } from "@/shared/rest-api/api/user";

const SigninModule = () => {
  const { mutateAsync: signinMutation } = useSigninMutation();
  const { data: userResponse } = useGetUserQuery();

  const handleSignin = async () => {
    const response = await signinMutation({
      email: "kamila.lohvynenko@gmail.com",
      password: "12345678",
    });
    console.log(response);
  };

  console.log(userResponse?.data ?? "No user");

  return (
    <div>
      <h1>{m.signin_title()}</h1>
      <button onClick={handleSignin}>Signin</button>
    </div>
  );
};

export default SigninModule;
