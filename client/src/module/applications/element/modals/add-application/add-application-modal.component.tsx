"use client";

import { Button, Modal } from "@heroui/react";
import { FilePlusCorner } from "lucide-react";
import { useAddApplicationModalService } from "./add-application-modal.service";
import { AddApplicationFormComponent } from "./element/form";
import { ADD_APPLICATION_FORM_ID } from "./element/form/add-application-form.service";

const AddApplicationModalComponent = () => {
  const thisService = useAddApplicationModalService();

  return (
    <Modal.Backdrop
      isOpen={thisService.isOpen}
      onOpenChange={thisService.closeModal}
    >
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-[560px]">
          <Modal.Header className="flex items-center gap-3">
            <Modal.Icon className="bg-primary-soft text-primary size-11">
              <FilePlusCorner className="size-5" />
            </Modal.Icon>

            <Modal.Heading>Add New Application</Modal.Heading>
          </Modal.Header>

          <div className="my-4">
            <AddApplicationFormComponent />
          </div>

          <Modal.Footer>
            <Button
              slot="close"
              variant="secondary"
              className="bg-gray-200 text-primary hover:bg-gray-300"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              form={ADD_APPLICATION_FORM_ID}
              className="bg-primary text-white hover:bg-primary-hover"
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};

export default AddApplicationModalComponent;
