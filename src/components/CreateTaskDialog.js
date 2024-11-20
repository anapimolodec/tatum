import { Dialog, Button } from "@radix-ui/themes";
import React, { useState } from "react";
import CreateTaskForm from "./CreateTaskForm";

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
        <Dialog.Title>Edit profile</Dialog.Title>

        <CreateTaskForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
});

export default CreateTaskDialog;
