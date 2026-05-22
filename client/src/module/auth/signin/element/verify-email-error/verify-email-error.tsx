"use client";

import * as m from "@/paraglide/messages";
import { Alert, Button } from "@heroui/react";
import { RefreshCcw } from "lucide-react";
import { VerifyEmailErrorService } from "./verify-email.service";

// props
interface VerifyEmailErrorProps {
  email: string;
}

// component
export const VerifyEmailError: React.FC<VerifyEmailErrorProps> = (props) => {
  const { email } = props;

  // services
  const thisService = VerifyEmailErrorService(email);

  // return
  return (
    <div>
      <Alert
        status="warning"
        className="bg-warning-soft text-warning rounded-sm"
      >
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{m.signin_verify_email_error_title()}</Alert.Title>
          <Alert.Description>
            {m.signin_verify_email_error_description()}
          </Alert.Description>

          <Button
            variant="outline"
            className="flex flex-wrap gap-3 mt-2 text-primary bg-background hover:text-primary-hover hover:bg-primary-soft rounded-sm"
            onClick={thisService.resendVerificationEmail}
          >
            <RefreshCcw size={16} />

            {m.signin_verify_email_error_resend_button_label()}
          </Button>
        </Alert.Content>
      </Alert>
    </div>
  );
};
