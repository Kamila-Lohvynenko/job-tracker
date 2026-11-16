"use client";

import * as m from "@/paraglide/messages";
import { Button, Modal } from "@heroui/react";
import { CalendarPlus } from "lucide-react";
import { useApplicationEventModalService } from "./application-event-modal.service";
import { ApplicationEventFormComponent } from "./element/form";
import { APPLICATION_EVENT_FORM_ID } from "./element/form/application-event-form.service";

const ApplicationEventModalComponent = () => {
  const thisService = useApplicationEventModalService();

  return (
    <Modal.Backdrop
      isOpen={thisService.isOpen}
      onOpenChange={thisService.closeModal}
    >
      <Modal.Container>
        <Modal.Dialog className="overflow-scroll sm:max-w-140">
          <Modal.Header className="flex items-center gap-3">
            <Modal.Icon className="bg-primary-soft text-primary size-11">
              <CalendarPlus className="size-5" />
            </Modal.Icon>

            <Modal.Heading>
              {thisService.isEdit
                ? m.application_event_modal_edit_title()
                : m.application_event_modal_create_title()}
            </Modal.Heading>
          </Modal.Header>

          <div className="my-4">
            <ApplicationEventFormComponent />
          </div>

          <Modal.Footer>
            <Button
              slot="close"
              variant="secondary"
              className="bg-gray-200 text-primary hover:bg-gray-300"
            >
              {m.application_event_modal_cancel_button_label()}
            </Button>

            <Button
              type="submit"
              form={APPLICATION_EVENT_FORM_ID}
              className="bg-primary text-white hover:bg-primary-hover"
            >
              {m.application_event_modal_confirm_button_label()}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};

export default ApplicationEventModalComponent;
