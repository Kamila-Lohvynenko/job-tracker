"use client";

import * as m from "@/paraglide/messages";
import {
  Alert,
  Button,
  FieldError,
  InputOTP,
  REGEXP_ONLY_DIGITS,
  TextField,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { VerifyEmailFormService } from "./verify-email-form.service";

// component
export const VerifyEmailFormComponent = () => {
  const thisService = VerifyEmailFormService();
  const { control, onSubmit, isVerifyEmailPending, isInvalidCodeError, error } =
    thisService;

  // return
  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Controller
          control={control}
          name="code"
          render={({ field, fieldState }) => (
            <TextField
              isInvalid={fieldState.invalid}
              aria-label="Verification code"
            >
              <InputOTP
                {...field}
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                onComplete={onSubmit}
              >
                <InputOTP.Group>
                  <InputOTP.Slot index={0} />
                  <InputOTP.Slot index={1} />
                  <InputOTP.Slot index={2} />
                </InputOTP.Group>
                <InputOTP.Separator className="hidden sm:block" />
                <InputOTP.Group>
                  <InputOTP.Slot index={3} />
                  <InputOTP.Slot index={4} />
                  <InputOTP.Slot index={5} />
                </InputOTP.Group>
              </InputOTP>

              <FieldError>{fieldState.error?.message}</FieldError>
            </TextField>
          )}
        />

        <Button
          type="submit"
          fullWidth
          className="bg-primary text-white hover:bg-primary-hover rounded-sm"
          size="lg"
          isPending={isVerifyEmailPending}
        >
          {m.verify_email_form_submit_button_label()}
        </Button>
      </form>

      {isInvalidCodeError && (
        <Alert
          status="warning"
          className="bg-warning-soft text-warning rounded-sm"
        >
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>
              {m.verify_email_form_error_invalid_code_title()}
            </Alert.Title>
            <Alert.Description>
              {m.verify_email_form_error_invalid_code_description()}
            </Alert.Description>
          </Alert.Content>
        </Alert>
      )}

      {error && (
        <Alert
          status="danger"
          className="bg-danger-soft text-danger rounded-sm"
        >
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{m.common_error_title()}</Alert.Title>
            <Alert.Description>
              {m.common_error_description()}
            </Alert.Description>
          </Alert.Content>
        </Alert>
      )}
    </>
  );
};
