import * as m from "@/paraglide/messages";
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { SigninFormService } from "./signin-form.service";

// component
export const SigninFormComponent = () => {
  const thisService = SigninFormService();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // return
  return (
    <form onSubmit={thisService.onSubmit} className="flex flex-col gap-5">
      <Controller
        control={thisService.control}
        name="email"
        render={({ field, fieldState }) => (
          <TextField isInvalid={fieldState.invalid}>
            <Label className="text-base">{m.signin_form_email_label()}</Label>

            <Input
              {...field}
              placeholder={m.signin_form_email_placeholder()}
              type={isPasswordVisible ? "text" : "password"}
            />

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

            <div className="relative">
              <Input
                {...field}
                placeholder={m.signin_form_password_placeholder()}
                type={isPasswordVisible ? "text" : "password"}
                className="w-full pr-10"
              />

              <button
                type="button"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

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
