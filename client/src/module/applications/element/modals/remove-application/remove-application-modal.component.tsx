"use client";

import * as m from "@/paraglide/messages";
import { Button, Modal } from "@heroui/react";
import { Trash } from "lucide-react";
import { useRemoveApplicationModalService } from "./remove-application-modal.service";

const RemoveApplicationModalComponent = () => {
  const thisService = useRemoveApplicationModalService();

  return (
    <Modal.Backdrop
      isOpen={thisService.isOpen}
      onOpenChange={thisService.closeModal}
    >
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-[420px]">
          <Modal.Header className="flex items-center gap-3">
            <Modal.Icon className="bg-danger-soft text-danger size-11">
              <Trash className="size-5" />
            </Modal.Icon>

            <Modal.Heading>{m.remove_application_modal_title()}</Modal.Heading>
          </Modal.Header>

          <p className="my-4 text-sm text-foreground-subtle">
            {m.remove_application_modal_description()}
          </p>

          <Modal.Footer>
            <Button
              slot="close"
              variant="secondary"
              className="bg-gray-200 text-gray-500 hover:bg-gray-300"
            >
              {m.remove_application_modal_cancel_button_label()}
            </Button>

            <Button
              variant="danger"
              isDisabled={thisService.isPending}
              onPress={thisService.onConfirm}
            >
              {m.remove_application_modal_confirm_button_label()}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};

export default RemoveApplicationModalComponent;
