"use client";

import VerifyEmailImage from "@/images/verify-email.png";
import * as m from "@/paraglide/messages";
import { ERoutes } from "@/shared/routes/routes.interface";
import { Button, Card } from "@heroui/react";
import { MoveLeft, RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { VerifyEmailFormComponent } from "./element/verify-email-form";

// component
const VerifyEmailModule = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[calc(100vh-92px)] w-full md:min-h-[calc(100vh-104px)] lg:gap-14 lg:flex-row">
      <div className="max-w-[335px] sm:max-w-full">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 sm:text-center lg:text-left">
          {m.verify_email_page_title()}
        </h2>

        <p className="text-gray-500 mb-8">
          {m.verify_email_page_description()}
        </p>

        <Image
          src={VerifyEmailImage}
          loading="eager"
          alt="Signin"
          className="w-[130px] h-[100px] sm:w-[300px] sm:h-[230px] mx-auto sm:mb-4"
        />
      </div>

      <Card className="py-8 px-6 sm:px-14 w-full max-w-[335px] sm:max-w-lg shadow-xl">
        <h2 className="text-2xl font-bold">{m.verify_email_form_title()}</h2>
        <p className="text-gray-500">{m.verify_email_form_description()}</p>

        <VerifyEmailFormComponent />

        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="text-gray-500">
            {m.verify_email_form_resend_button_description()}
          </span>

          <Button
            variant="secondary"
            className="flex flex-wrap gap-3 text-primary bg-transparent hover:text-primary-hover hover:bg-primary-soft"
          >
            <RefreshCcw size={16} />

            {m.verify_email_form_resend_button_label()}
          </Button>
        </div>

        <Link
          href={ERoutes.SIGNIN}
          className="flex items-center justify-center gap-2 text-primary text-sm hover:text-primary-hover"
        >
          <MoveLeft size={16} />

          {m.verify_email_back_to_signin_link_label()}
        </Link>
      </Card>
    </div>
  );
};

export default VerifyEmailModule;
