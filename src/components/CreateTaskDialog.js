import { Dialog, Button } from "@radix-ui/themes";
import React, { useState } from "react";
import CreateTaskForm from "./CreateTaskForm";
import { CardStackPlusIcon } from "@radix-ui/react-icons";

const CreateTaskDialog = React.memo(() => {
  let [open, setOpen] = useState(false);
  console.log("dialog rendered");

  const handleCreateTask = () => {
    console.log("created");
  };
  const handleSubmit = (formData) => {
    console.log("Submitted data:", formData);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button color="teal" onClick={handleCreateTask}>
          Create Task
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px" aria-describedby={undefined}>
        <Dialog.Title>
          <div className="flex gap-2 items-center">
            <div className="p-1.5 bg-teal-700 rounded-md">
              <CardStackPlusIcon color="white" />
            </div>
            Task 생성
          </div>
        </Dialog.Title>

        <CreateTaskForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
});

export default CreateTaskDialog;
