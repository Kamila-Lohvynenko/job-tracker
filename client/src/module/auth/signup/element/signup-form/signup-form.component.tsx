import * as m from "@/paraglide/messages";
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import { Controller } from "react-hook-form";
import { PasswordRequirementComponent } from "../password-requirement";
import { SignupFormService } from "./signup-form.service";

// component
export const SignupFormComponent = () => {
  const thisService = SignupFormService();

  const { passwordRules, onSubmit } = thisService;
  // return
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <Controller
        control={thisService.control}
        name="name"
        render={({ field, fieldState }) => (
          <TextField isInvalid={fieldState.invalid}>
            <Label className="text-base">{m.signup_form_name_label()}</Label>

            <Input {...field} placeholder={m.signup_form_name_placeholder()} />

            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

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

      <div>
        <Controller
          control={thisService.control}
          name="password"
          render={({ field, fieldState }) => (
            <TextField isInvalid={fieldState.invalid}>
              <Label className="text-base">
                {m.signup_form_password_label()}
              </Label>

              <Input
                {...field}
                placeholder={m.signup_form_password_placeholder()}
              />

              <FieldError>{fieldState.error?.message}</FieldError>
            </TextField>
          )}
        />
        <div className="mt-2 flex flex-col gap-1 pl-3">
          <PasswordRequirementComponent
            isValid={passwordRules.minLength}
            label={m.signup_form_password_requirements_min_length()}
          />

          <PasswordRequirementComponent
            isValid={passwordRules.hasNumber}
            label={m.signup_form_password_requirements_has_number()}
          />

          <PasswordRequirementComponent
            isValid={passwordRules.hasUppercase}
            label={m.signup_form_password_requirements_has_uppercase()}
          />
        </div>{" "}
      </div>

      <Controller
        control={thisService.control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <TextField isInvalid={fieldState.invalid}>
            <Label className="text-base">
              {m.signup_form_confirm_password_label()}
            </Label>

            <Input
              {...field}
              placeholder={m.signup_form_confirm_password_placeholder()}
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
        {m.signup_form_submit_button_label()}
      </Button>
    </form>
  );
};
