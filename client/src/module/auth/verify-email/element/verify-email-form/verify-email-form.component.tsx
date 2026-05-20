"use client";

import * as m from "@/paraglide/messages";
import {
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
  const { control, onSubmit } = thisService;

  // return
  return (
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
      >
        {m.verify_email_form_submit_button_label()}
      </Button>
    </form>
  );
};
