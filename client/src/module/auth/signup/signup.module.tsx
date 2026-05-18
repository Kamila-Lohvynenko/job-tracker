"use client";

import LogoImage from "@/images/signin.png";
import * as m from "@/paraglide/messages";
import Image from "next/image";
import { SignupFormComponent } from "./element/signup-form";

import { ERoutes } from "@/shared/routes/routes.interface";
import { Card } from "@heroui/react";
import NextLink from "next/link";

const SignupModule = () => {
  return (
    <div className="flex items-center justify-center gap-4 min-h-screen">
      <Image src={LogoImage} alt="Logo" width={800} height={800} />

      <Card className="p-7 w-full max-w-md">
        <h1 className="text-2xl font-bold">{m.signup_page_title()}</h1>

        <SignupFormComponent />

        <div>
          <span>{m.signup_have_account()} </span>

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
