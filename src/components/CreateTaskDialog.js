import { Dialog, Button } from "@radix-ui/themes";
import React from "react";
import CreateTaskForm from "./CreateTaskForm";

const CreateTaskDialog = React.memo(() => {
  console.log("dialog rendered");

  const handleCreateTask = () => {
    console.log("created");
  };
  const handleSubmit = (formData) => {
    console.log("Submitted data:", formData);
    // Handle the submission
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="teal" onClick={handleCreateTask}>
          Create Task
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px" aria-describedby={undefined}>
        <Dialog.Title>Edit profile</Dialog.Title>

        <CreateTaskForm
          onSubmit={handleSubmit}
          onCancel={() => {
            /* handle cancel */
          }}
        />

        <div className="flex">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
});

export default CreateTaskDialog;
