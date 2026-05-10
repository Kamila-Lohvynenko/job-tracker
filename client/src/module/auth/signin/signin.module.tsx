"use client";

import { SelectThemeComponent } from "@/shared/components/select/theme";
import { useSigninMutation } from "@/shared/rest-api/api/signin";
import { useGetUserQuery } from "@/shared/rest-api/api/user";

const SigninModule = () => {
  const { mutateAsync: signinMutation } = useSigninMutation();
  const { data: user } = useGetUserQuery();

  const handleSignin = async () => {
    const response = await signinMutation({
      email: "kamila.lohvynenko@gmail.com",
      password: "12345678",
    });
    console.log(response);
  };

  console.log(user);

  return (
    <div>
      <SelectThemeComponent />
      <button onClick={handleSignin}>Signin</button>
    </div>
  );
};

export default SigninModule;
