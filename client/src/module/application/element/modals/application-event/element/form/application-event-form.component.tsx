import * as m from "@/paraglide/messages";
import { EventStatusChipComponent } from "@/shared/components/chip/event-status";
import { EventTypeChipComponent } from "@/shared/components/chip/event-type-chip";
import { eventStatusLabelMap, eventTypeLabelMap } from "@/shared/constant";
import {
  EApplicationEventStatus,
  EApplicationEventType,
} from "@/shared/rest-api/interface";
import {
  Calendar,
  Checkbox,
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
import { Controller } from "react-hook-form";
import {
  APPLICATION_EVENT_FORM_ID,
  useApplicationEventFormService,
} from "./application-event-form.service";

const ApplicationEventFormComponent = () => {
  const thisService = useApplicationEventFormService();

  return (
    <form
      id={APPLICATION_EVENT_FORM_ID}
      onSubmit={thisService.onSubmit}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={thisService.control}
          name="type"
          render={({ field, fieldState }) => (
            <Select
              className="w-full"
              placeholder={m.application_event_modal_type_placeholder()}
              value={field.value || null}
              onChange={(value) => field.onChange(value)}
              isInvalid={fieldState.invalid}
              isRequired
            >
              <Label className="text-sm font-medium">
                {m.application_event_modal_type_label()}
              </Label>

              <Select.Trigger className="rounded-md border border-border py-2">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {Object.values(EApplicationEventType).map((type) => (
                    <ListBox.Item
                      key={type}
                      id={type}
                      textValue={eventTypeLabelMap[type]()}
                    >
                      <EventTypeChipComponent type={type} variant="light" />
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Select>
          )}
        />

        <Controller
          control={thisService.control}
          name="status"
          render={({ field, fieldState }) => (
            <Select
              className="w-full"
              placeholder={m.application_event_modal_status_placeholder()}
              value={field.value || null}
              onChange={(value) => field.onChange(value)}
              isInvalid={fieldState.invalid}
              isRequired
            >
              <Label className="text-sm font-medium">
                {m.application_event_modal_status_label()}
              </Label>

              <Select.Trigger className="rounded-md border border-border py-2">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {Object.values(EApplicationEventStatus).map((status) => (
                    <ListBox.Item
                      key={status}
                      id={status}
                      textValue={eventStatusLabelMap[status]()}
                    >
                      <EventStatusChipComponent
                        status={status}
                        variant="light"
                      />
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Select>
          )}
        />
      </div>

      <Controller
        control={thisService.control}
        name="title"
        render={({ field, fieldState }) => (
          <TextField isInvalid={fieldState.invalid} isRequired>
            <Label className="text-sm font-medium">
              {m.application_event_modal_title_label()}
            </Label>

            <Input
              {...field}
              placeholder={m.application_event_modal_title_placeholder()}
              autoComplete="off"
            />

            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        control={thisService.control}
        name="description"
        render={({ field, fieldState }) => (
          <TextField isInvalid={fieldState.invalid}>
            <Label className="text-sm font-medium">
              {m.application_event_modal_description_label()}
            </Label>

            <TextArea
              {...field}
              placeholder={m.application_event_modal_description_placeholder()}
              rows={4}
              style={{ resize: "none" }}
              maxLength={1000}
            />

            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        control={thisService.control}
        name="eventDate"
        render={({ field, fieldState }) => (
          <DatePicker
            className="w-full"
            isRequired
            isInvalid={fieldState.invalid}
            name="eventDate"
            value={field.value}
            onChange={field.onChange}
          >
            <Label className="text-sm font-medium">
              {m.application_event_modal_date_label()}
            </Label>

            <DateField.Group fullWidth>
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
              <Calendar aria-label={m.application_event_modal_date_label()}>
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
                    {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
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

      <Controller
        control={thisService.control}
        name="updateApplicationStatus"
        render={({ field }) => (
          <Checkbox
            isSelected={field.value}
            onChange={field.onChange}
            name={field.name}
          >
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>

            <Checkbox.Content className="text-sm font-medium">
              {m.application_event_modal_update_status_label()}
            </Checkbox.Content>
          </Checkbox>
        )}
      />
    </form>
  );
};

export default ApplicationEventFormComponent;
