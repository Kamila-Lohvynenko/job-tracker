import { useApplicationsStore } from "@/module/applications/applications.store";
import * as m from "@/paraglide/messages";
import { useCreateApplicationMutation } from "@/shared/rest-api/api/applications";
import {
  EApplicationsKey,
  EApplicationStatus,
  ICreateApplicationRequest,
} from "@/shared/rest-api/interface";
import { toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AddApplicationSchema,
  createAddApplicationSchema,
} from "../../add-application.schema";

export const ADD_APPLICATION_FORM_ID = "add-application-form";

const formDefaultValues: AddApplicationSchema = {
  company: "",
  role: "",
  status: EApplicationStatus.WISHLIST,
  appliedAt: today(getLocalTimeZone()),
  source: null,
  link: "",
  employmentType: null,
  workLocation: null,
  address: "",
  salary: "",
  currency: "",
  notes: "",
};

export function useAddApplicationFormService() {
  const [isLoading, setIsLoading] = useState(false);
  const handleApplicationsStore = useApplicationsStore(
    (state) => state.handleApplicationsStore,
  );

  const addApplicationSchema = createAddApplicationSchema();
  const { control, handleSubmit } = useForm<AddApplicationSchema>({
    resolver: zodResolver(addApplicationSchema),
    defaultValues: formDefaultValues,
  });

  const { mutateAsync: createApplicationMutation } =
    useCreateApplicationMutation();
  const queryClient = useQueryClient();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    try {
      const payload: ICreateApplicationRequest = {
        company: data.company,
        role: data.role,
        status: data.status,
        source: data.source,
        jobLink: data.link || undefined,
        location: data.address || undefined,
        employmentType: data.employmentType,
        workLocation: data.workLocation,
        currency: data.currency || undefined,
        notes: data.notes || undefined,
        appliedAt: data.appliedAt.toDate(getLocalTimeZone()).toISOString(),
      };

      const response = await createApplicationMutation(payload);

      if (response.success) {
        await queryClient.refetchQueries({
          queryKey: [EApplicationsKey.APPLICATIONS_QUERY],
        });
        handleApplicationsStore({ modalType: null });
        toast.success(m.add_application_modal_toast_success());
      } else {
        toast.danger(m.add_application_modal_toast_error());
      }
    } catch {
      toast.danger(m.add_application_modal_toast_error());
    } finally {
      setIsLoading(false);
    }
  });

  return {
    control,
    onSubmit,
    isLoading,
  };
}
