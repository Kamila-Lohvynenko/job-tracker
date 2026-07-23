"use client";

import SigninImage from "@/images/signin.png";
import * as m from "@/paraglide/messages";
import Image from "next/image";
import { SigninFormComponent } from "./element/signin-form";

import { ERoutes } from "@/shared/routes/routes.interface";
import { Card } from "@heroui/react";
import NextLink from "next/link";

// component
const SigninModule = () => {
  // return
  return (
    <div className="flex items-center justify-center min-h-screen w-full gap-24">
      <div className="hidden lg:block">
        <h2 className="text-3xl font-bold mb-4">
          {m.signin_advantages_title()}
        </h2>

        <p className="text-gray-500 mb-8">
          {m.signin_advantages_description()}
        </p>

        <Image
          src={SigninImage}
          loading="eager"
          alt="Signin"
          className="w-[300px] h-[300px]"
        />
      </div>

      <Card className="p-8 md:px-14 w-full max-w-lg shadow-xl">
        <h1 className="text-2xl font-bold">{m.signin_page_title()}</h1>
        <p className=" text-gray-500">{m.signin_page_description()}</p>

        <SigninFormComponent />

        <div className="text-center text-sm">
          <span className="text-gray-500">{m.signin_dont_have_account()} </span>

          <NextLink
            href={ERoutes.SIGNUP}
            className="text-primary hover:text-primary-hover"
          >
            {m.signup()}
          </NextLink>
        </div>
      </Card>
    </div>
  );
};

export default SigninModule;
