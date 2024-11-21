"use client";
import { Dialog, Button } from "@radix-ui/themes";
import React, { useState } from "react";
import CreateTaskForm from "./CreateTaskForm";
import { CardStackPlusIcon } from "@radix-ui/react-icons";
import { taskStore } from "../../lib/store/taskStore";
import { getNestedString } from "../../lib/constants/strings";

const CreateTaskDialog = React.memo(({ onTaskCreated }) => {
  let [open, setOpen] = useState(false);
  const createTask = taskStore((state) => state.createTask);

  const handleSubmit = (formData) => {
    createTask(formData);
    setOpen(false);
    onTaskCreated();
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button color="teal">Create Task</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px" aria-describedby={undefined}>
        <Dialog.Title>
          <div className="flex gap-2 items-center">
            <div className="p-1.5 bg-teal-700 rounded-md">
              <CardStackPlusIcon color="white" />
            </div>
            {getNestedString("tasks.create_task")}
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
