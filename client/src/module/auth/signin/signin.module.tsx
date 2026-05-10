"use client";

import { useSigninMutation } from "@/shared/rest-api/api/signin";
import { useGetUserQuery } from "@/shared/rest-api/api/user";

const SigninModule = () => {
  const { mutateAsync: signinMutation } = useSigninMutation();
  const { data: user } = useGetUserQuery();

  const handleSignin = async () => {
    const response = await signinMutation({
      email: "test@gmail.com",
      password: "12345678",
    });
    console.log(response);
  };

  console.log(user);

  return (
    <div>
      <button onClick={handleSignin}>Signin</button>
    </div>
  );
};

export default SigninModule;
