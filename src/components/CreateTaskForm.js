import React from "react";
import { useForm } from "react-hook-form";
import { Button, Select, TextField } from "@radix-ui/themes";
import { userStore } from "../store/userStore";

const TASK_TYPES = {
  BUY: "물품 구매",
  DELIVER: "택배요청",
};

const DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const CreateTaskForm = ({ onSubmit, onCancel }) => {
  const { user } = userStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reporter: user.userName,
      taskType: "BUY",
      status: "Created",
    },
  });

  const taskType = watch("taskType");

  const onSubmitForm = (data) => {
    const now = new Date().toISOString();
    const formattedData = {
      ...data,
      createdAt: now,
      completedAt: null,
      dueDate: new Date(data.dueDate).toISOString(),
    };
    onSubmit(formattedData);
  };

  const renderFields = () => {
    const commonFields = (
      <div className="space-y-2">
        <div className="space-y-2">
          <label htmlFor="reporter" className="text-sm font-medium">
            Reporter
          </label>
          <TextField.Root
            id="reporter"
            value={user.userName}
            disabled
            {...register("reporter")}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="taskName">
            Task Name
          </label>
          <TextField.Root
            id="taskName"
            placeholder="Task 이름을 입력하세요"
            {...register("taskName", { required: "Task 이름은 필수입니다" })}
          />
          {errors.taskName && (
            <p className="text-sm text-red-500">{errors.taskName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="assignee">
            Assignee
          </label>
          <TextField.Root
            id="assignee"
            placeholder="담당자를 입력하세요"
            {...register("assignee", { required: "담당자는 필수입니다" })}
          />
          {errors.assignee && (
            <p className="text-sm text-red-500">{errors.assignee.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="taskType">
            Task Type
          </label>
          <Select.Root
            defaultValue="BUY"
            onValueChange={(value) => {
              const event = { target: { name: "taskType", value } };
              register("taskType").onChange(event);
            }}
          >
            <Select.Trigger className="w-full" />
            <Select.Content>
              {Object.entries(TASK_TYPES).map(([value, label]) => (
                <Select.Item key={value} value={value}>
                  {label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    );

    return <>{commonFields}</>;
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      {renderFields()}

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="dueDate">
          Due Date
        </label>
        <TextField.Root
          id="dueDate"
          placeholder="yyyy-mm-dd"
          {...register("dueDate", {
            required: "마감일은 필수입니다",
            pattern: {
              value: DATE_PATTERN,
              message: "yyyy-mm-dd 형태의 날짜 포맷이어야 합니다.",
            },
          })}
        />
        {errors.dueDate && (
          <p className="text-sm text-red-500">{errors.dueDate.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="soft" color="gray" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" color="teal">
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
