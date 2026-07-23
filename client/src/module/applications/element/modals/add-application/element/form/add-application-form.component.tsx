import {
  employmentTypeLabelMap,
  sourceLabelMap,
  statusLabelMap,
  workLocationLabelMap,
} from "@/module/applications/constant/applications.constant";
import * as m from "@/paraglide/messages";
import { CompanyItemComponent } from "@/shared/components/item/company";
import {
  EApplicationSource,
  EApplicationStatus,
  EEmploymentType,
  EWorkLocation,
} from "@/shared/rest-api/interface";
import {
  Calendar,
  DateField,
  DatePicker,
  FieldError,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { MapPin } from "lucide-react";
import { Controller } from "react-hook-form";
import {
  ADD_APPLICATION_FORM_ID,
  useAddApplicationFormService,
} from "./add-application-form.service";

const AddApplicationFormComponent = () => {
  const thisService = useAddApplicationFormService();

  const currentDate = today(getLocalTimeZone());

  return (
    <form
      id={ADD_APPLICATION_FORM_ID}
      onSubmit={thisService.onSubmit}
      className="space-y-4"
    >
      <Controller
        control={thisService.control}
        name="company"
        render={({ field, fieldState }) => (
          <TextField isInvalid={fieldState.invalid} isRequired>
            <Label className="text-sm font-medium">
              {m.add_application_modal_company_label()}
            </Label>

            <div className="relative">
              <Input
                {...field}
                placeholder={m.add_application_modal_company_placeholder()}
                autoComplete="off"
                fullWidth
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <CompanyItemComponent company={field.value} />
              </div>
            </div>

            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        control={thisService.control}
        name="role"
        render={({ field, fieldState }) => (
          <TextField isInvalid={fieldState.invalid} isRequired>
            <Label className="text-sm font-medium">
              {m.add_application_modal_role_label()}
            </Label>

            <Input
              {...field}
              placeholder={m.add_application_modal_role_placeholder()}
              autoComplete="off"
            />

            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={thisService.control}
          name="status"
          render={({ field, fieldState }) => (
            <Select
              className="w-full"
              placeholder={m.add_application_modal_status_placeholder()}
              value={field.value || null}
              onChange={(value) => field.onChange(value ?? "")}
              isInvalid={fieldState.invalid}
              isRequired
            >
              <Label className="text-sm font-medium">
                {m.add_application_modal_status_label()}
              </Label>

              <Select.Trigger className="py-3 border-gray-200 border rounded-md">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {Object.values(EApplicationStatus).map((status) => {
                    const label = statusLabelMap[status]();

                    return (
                      <ListBox.Item key={status} id={status} textValue={label}>
                        {label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    );
                  })}
                </ListBox>
              </Select.Popover>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Select>
          )}
        />

        <Controller
          control={thisService.control}
          name="applied_at"
          render={({ field, fieldState }) => (
            <DatePicker
              isRequired
              isInvalid={fieldState.invalid}
              minValue={currentDate}
              name="applied_at"
              value={field.value}
              onChange={field.onChange}
            >
              <Label className="text-sm font-medium">
                {m.add_application_modal_applied_at_label()}
              </Label>

              <DateField.Group
                fullWidth
                className="py-[22px] border border-gray-200 rounded-md"
              >
                <DateField.Input>
                  {(segment) => <DateField.Segment segment={segment} />}
                </DateField.Input>
                <DateField.Suffix>
                  <DatePicker.Trigger>
                    <DatePicker.TriggerIndicator />
                  </DatePicker.Trigger>
                </DateField.Suffix>
              </DateField.Group>

              <FieldError>{fieldState.error?.message}</FieldError>

              <DatePicker.Popover>
                <Calendar aria-label="Event date">
                  <Calendar.Header>
                    <Calendar.YearPickerTrigger>
                      <Calendar.YearPickerTriggerHeading />
                      <Calendar.YearPickerTriggerIndicator />
                    </Calendar.YearPickerTrigger>

                    <Calendar.NavButton slot="previous" />

                    <Calendar.NavButton slot="next" />
                  </Calendar.Header>

                  <Calendar.Grid>
                    <Calendar.GridHeader>
                      {(day) => (
                        <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
                      )}
                    </Calendar.GridHeader>
                    <Calendar.GridBody>
                      {(date) => <Calendar.Cell date={date} />}
                    </Calendar.GridBody>
                  </Calendar.Grid>

                  <Calendar.YearPickerGrid>
                    <Calendar.YearPickerGridBody>
                      {({ year }) => <Calendar.YearPickerCell year={year} />}
                    </Calendar.YearPickerGridBody>
                  </Calendar.YearPickerGrid>
                </Calendar>
              </DatePicker.Popover>
            </DatePicker>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={thisService.control}
          name="employment_type"
          render={({ field, fieldState }) => (
            <Select
              className="w-full"
              placeholder={m.add_application_modal_employment_type_placeholder()}
              value={field.value || null}
              onChange={(value) => field.onChange(value ?? "")}
              isInvalid={fieldState.invalid}
            >
              <Label className="text-sm font-medium">
                {m.add_application_modal_employment_type_label()}
              </Label>

              <Select.Trigger className="py-3 border-gray-200 border rounded-md">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {Object.values(EEmploymentType).map((employmentType) => {
                    const label = employmentTypeLabelMap[employmentType]();

                    return (
                      <ListBox.Item
                        key={employmentType}
                        id={employmentType}
                        textValue={label}
                      >
                        {label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    );
                  })}
                </ListBox>
              </Select.Popover>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Select>
          )}
        />

        <Controller
          control={thisService.control}
          name="work_location"
          render={({ field, fieldState }) => (
            <Select
              className="w-full"
              placeholder={m.add_application_modal_work_location_placeholder()}
              value={field.value || null}
              onChange={(value) => field.onChange(value ?? "")}
              isInvalid={fieldState.invalid}
            >
              <Label className="text-sm font-medium">
                {m.add_application_modal_work_location_label()}
              </Label>

              <Select.Trigger className="py-3 border-gray-200 border rounded-md">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {Object.values(EWorkLocation).map((workLocation) => {
                    const label = workLocationLabelMap[workLocation]();

                    return (
                      <ListBox.Item
                        key={workLocation}
                        id={workLocation}
                        textValue={label}
                      >
                        {label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    );
                  })}
                </ListBox>
              </Select.Popover>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Select>
          )}
        />
      </div>

      <Controller
        control={thisService.control}
        name="address"
        render={({ field, fieldState }) => (
          <TextField isInvalid={fieldState.invalid}>
            <Label className="text-sm font-medium">
              {m.add_application_modal_location_label()}
            </Label>

            <div className="relative">
              <Input
                {...field}
                placeholder={m.add_application_modal_location_placeholder()}
                autoComplete="off"
                fullWidth
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer">
                <MapPin size={18} />
              </span>
            </div>

            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={thisService.control}
          name="source"
          render={({ field, fieldState }) => (
            <Select
              className="w-full"
              placeholder={m.add_application_modal_source_placeholder()}
              value={field.value || null}
              onChange={(value) => field.onChange(value ?? "")}
              isInvalid={fieldState.invalid}
            >
              <Label className="text-sm font-medium">
                {m.add_application_modal_source_label()}
              </Label>

              <Select.Trigger className="py-3 border-gray-200 border rounded-md">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {Object.values(EApplicationSource).map((source) => {
                    const label = sourceLabelMap[source]();

                    return (
                      <ListBox.Item key={source} id={source} textValue={label}>
                        {label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    );
                  })}
                </ListBox>
              </Select.Popover>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Select>
          )}
        />

        <Controller
          control={thisService.control}
          name="link"
          render={({ field, fieldState }) => (
            <TextField isInvalid={fieldState.invalid}>
              <Label className="text-sm font-medium">
                {m.add_application_modal_link_label()}
              </Label>

              <Input
                {...field}
                placeholder={m.add_application_modal_link_placeholder()}
                autoComplete="off"
              />

              <FieldError>{fieldState.error?.message}</FieldError>
            </TextField>
          )}
        />
      </div>

      <Controller
        control={thisService.control}
        name="notes"
        render={({ field, fieldState }) => (
          <TextField isInvalid={fieldState.invalid}>
            <Label className="text-sm font-medium">
              {m.add_application_modal_notes_label()}
            </Label>

            <TextArea
              {...field}
              placeholder={m.add_application_modal_notes_placeholder()}
              rows={6}
              style={{ resize: "none" }}
              maxLength={1000}
            />

            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />
    </form>
  );
};

export default AddApplicationFormComponent;
