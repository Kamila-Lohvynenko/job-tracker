"use client";

import * as m from "@/paraglide/messages";
import { SignupFormComponent } from "./element/signup-form";

import { ERoutes } from "@/shared/routes/routes.interface";
import { Card } from "@heroui/react";
import NextLink from "next/link";
import { SignupAdvantagesComponent } from "./element/advantages";

const SignupModule = () => {
  return (
    <div className="flex items-center justify-center min-h-screen gap-14">
      <SignupAdvantagesComponent />

      <Card className="p-8 md:px-14 w-full max-w-lg shadow-xl">
        <h2 className="text-2xl font-bold">{m.signup_page_title()}</h2>

        <SignupFormComponent />

        <div className="text-center text-sm">
          <span className="text-gray-500">{m.signup_have_account()} </span>

          <NextLink
            href={ERoutes.SIGNIN}
            className="text-primary hover:text-primary-hover"
          >
            {m.signin()}
          </NextLink>
        </div>
      </Card>
    </div>
  );
};

export default SignupModule;
