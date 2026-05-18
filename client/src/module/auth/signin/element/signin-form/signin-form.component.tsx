import * as m from "@/paraglide/messages";
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import { Controller } from "react-hook-form";
import { SigninFormService } from "./signin-form.service";

// component
export const SigninFormComponent = () => {
  const thisService = SigninFormService();

  // return
  return (
    <form onSubmit={thisService.onSubmit} className="flex flex-col gap-5">
      <Controller
        control={thisService.control}
        name="email"
        render={({ field, fieldState }) => (
          <TextField isInvalid={fieldState.invalid}>
            <Label className="text-base">{m.signin_form_email_label()}</Label>

            <Input {...field} placeholder={m.signin_form_email_placeholder()} />

            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        control={thisService.control}
        name="password"
        render={({ field, fieldState }) => (
          <TextField isInvalid={fieldState.invalid}>
            <Label className="text-base">
              {m.signin_form_password_label()}
            </Label>

            <Input
              {...field}
              placeholder={m.signin_form_password_placeholder()}
            />

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
        {m.signin_form_submit_button_label()}
      </Button>
    </form>
  );
};
