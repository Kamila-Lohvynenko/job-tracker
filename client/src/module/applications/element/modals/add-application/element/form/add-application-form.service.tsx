import { useApplicationsStore } from "@/module/applications/applications.store";
import { EApplicationStatus } from "@/shared/rest-api/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, today } from "@internationalized/date";
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
  applied_at: today(getLocalTimeZone()),
  source: "",
  link: "",
  employment_type: "",
  work_location: "",
  address: "",
  salary: "",
  currency: "",
  notes: "",
};

export function useAddApplicationFormService() {
  const handleApplicationsStore = useApplicationsStore(
    (state) => state.handleApplicationsStore,
  );

  const addApplicationSchema = createAddApplicationSchema();
  const { control, handleSubmit } = useForm<AddApplicationSchema>({
    resolver: zodResolver(addApplicationSchema),
    defaultValues: formDefaultValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    handleApplicationsStore({ modalType: null });
  });

  return {
    control,
    onSubmit,
  };
}
