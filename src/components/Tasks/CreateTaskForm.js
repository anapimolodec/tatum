import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Select, TextField } from "@radix-ui/themes";
import { userStore } from "../../lib/store/userStore";
import { ROLES } from "../../lib/constants/types";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  DATE_PATTERN,
  DIGIT_PATTERN,
  LETTERS_PATTERN,
  PHONE_PATTERN,
} from "../../lib/constants/types";
import { strings, getNestedString } from "../../lib/constants/strings";

const TASK_TYPES = ["물품구매", "택배요청"];

const CreateTaskForm = ({ onSubmit, onCancel }) => {
  const { user, users } = userStore();

  const defaultValues = {
    reporter: user.userName,
    assignee:
      user.userRole === ROLES.REGULAR
        ? user.userName
        : users[0]?.userName || "",
    status: "Created",
    taskType: TASK_TYPES[0],
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
    control,
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const taskType = watch("taskType");

  const availableAssignees = useMemo(() => {
    switch (user.userRole) {
      case ROLES.ADMIN:
        return users;
      case ROLES.PRIME:
        return users.filter((u) =>
          [ROLES.PRIME, ROLES.REGULAR, ROLES.VIEWER].includes(u.userRole)
        );
      case ROLES.REGULAR:
        return [user];
      default:
        return [];
    }
  }, [user, users]);

  const onSubmitForm = (data) => {
    const now = new Date().toISOString();

    let relevantData = {
      reporter: data.reporter,
      taskName: data.taskName,
      assignee: data.assignee,
      taskType: data.taskType,
      status: data.status,
      dueDate: new Date(data.dueDate).toISOString(),
      createdAt: now,
    };

    if (data.taskType === "물품구매") {
      relevantData = {
        ...relevantData,
        productName: data.productName,
        productCount: data.productCount,
      };
    } else if (data.taskType === "택배요청") {
      relevantData = {
        ...relevantData,
        recipient: data.recipient,
        recipientPhone: data.recipientPhone,
        recipientAddress: data.recipientAddress,
      };
    }

    onSubmit(relevantData);
  };

  const renderFields = () => {
    const commonFields = (
      <div className="space-y-3">
        <div className="space-y-1">
          <label htmlFor="reporter" className="text-sm font-medium">
            {getNestedString("tasks.reporter")}
          </label>
          <TextField.Root
            id="reporter"
            value={user.userName}
            disabled
            {...register("reporter")}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="taskName">
            {getNestedString("tasks.task_name")}*
          </label>
          <TextField.Root
            id="taskName"
            placeholder={getNestedString("tasks.type_task_name")}
            {...register("taskName", {
              required: getNestedString("errors.task_name"),
            })}
          />
          {errors.taskName && (
            <p className="text-sm text-red-500">{errors.taskName.message}</p>
          )}
        </div>

        <div className="space-y-1 flex flex-col">
          <label className="text-sm font-medium" htmlFor="assignee">
            {getNestedString("tasks.assignee")}
          </label>
          {user.userRole === ROLES.REGULAR ? (
            <TextField.Root
              id="assignee"
              value={user.userName}
              disabled
              {...register("assignee")}
            />
          ) : (
            <Controller
              name="assignee"
              control={control}
              rules={{ required: getNestedString("errors.assignee") }}
              render={({ field }) => (
                <Select.Root
                  defaultValue={users[0]?.userName || ""}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <Select.Trigger className="w-full" />
                  <Select.Content>
                    {availableAssignees.map((assignee) => (
                      <Select.Item
                        key={assignee.userName}
                        value={assignee.userName}
                      >
                        {assignee.userName} ({assignee.userRole})
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              )}
            />
          )}
          {errors.assignee && (
            <p className="text-sm text-red-500">{errors.assignee.message}</p>
          )}
        </div>

        <div className="space-y-1 flex flex-col">
          <label className="text-sm font-medium" htmlFor="taskType">
            {getNestedString("tasks.task_type")}
          </label>
          <Controller
            name="taskType"
            control={control}
            render={({ field }) => (
              <Select.Root
                defaultValue={TASK_TYPES[0]}
                onValueChange={(value) => {
                  field.onChange(value);

                  if (value === "물품구매") {
                    setValue("recipient", "");
                    setValue("recipientPhone", "");
                    setValue("recipientAddress", "");
                  } else {
                    setValue("productName", "");
                    setValue("productCount", "");
                  }
                }}
                value={field.value}
              >
                <Select.Trigger className="w-full" />
                <Select.Content>
                  {TASK_TYPES.map((value) => (
                    <Select.Item key={value} value={value}>
                      {value}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />
        </div>
      </div>
    );

    const taskTypeFields =
      taskType === TASK_TYPES[0] ? (
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="productName">
              {getNestedString("tasks.product_name")}
            </label>
            <TextField.Root
              id="productName"
              placeholder={getNestedString("tasks.type_product_name")}
              {...register("productName")}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="productCount">
              {getNestedString("tasks.product_count")}
            </label>
            <TextField.Root
              id="productCount"
              placeholder={getNestedString("tasks.type_product_count")}
              color={errors.productCount ? "red" : "gray"}
              {...register("productCount", {
                pattern: {
                  value: DIGIT_PATTERN,
                  message: getNestedString("errors.digit"),
                },
              })}
            />
            {errors.productCount && (
              <p className="text-sm text-red-500">
                {errors.productCount.message}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="recipient">
              {getNestedString("tasks.recipient_name")}
            </label>
            <TextField.Root
              id="recipient"
              placeholder={getNestedString("tasks.type_recipient_name")}
              {...register("recipient")}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="recipientPhone">
              {getNestedString("tasks.recipient_number")}
            </label>
            <TextField.Root
              id="recipientPhone"
              placeholder={getNestedString("tasks.type_recipient_number")}
              color={errors.recipientPhone ? "red" : "gray"}
              {...register("recipientPhone", {
                pattern: {
                  value: PHONE_PATTERN,
                  message: getNestedString("errors.phone"),
                },
              })}
            />
            {errors.recipientPhone && (
              <p className="text-sm text-red-500">
                {errors.recipientPhone.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="recipientAddress">
              {getNestedString("tasks.recipient_address")}
            </label>
            <TextField.Root
              id="recipientAddress"
              placeholder={getNestedString("tasks.type_recipient_address")}
              color={errors.recipientAddress ? "red" : "gray"}
              {...register("recipientAddress", {
                required: getNestedString("errors.address_required"),
                validate: {
                  containsLettersAndNumbers: (value) => {
                    const hasLetters = LETTERS_PATTERN.test(value);
                    const hasNumbers = DIGIT_PATTERN.test(value);
                    return (
                      (hasLetters && hasNumbers) ||
                      getNestedString("errors.address")
                    );
                  },
                },
              })}
            />
            {errors.recipientAddress && (
              <p className="text-sm text-red-500">
                {errors.recipientAddress.message}
              </p>
            )}
          </div>
        </div>
      );

    return (
      <div className="space-y-6">
        {commonFields}
        <hr />
        {taskTypeFields}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      {renderFields()}

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="dueDate">
          {getNestedString("tasks.due_date")}*
        </label>
        <TextField.Root
          id="dueDate"
          placeholder={getNestedString("tasks.type_due_date")}
          color={errors.dueDate ? "red" : "gray"}
          {...register("dueDate", {
            required: getNestedString("errors.due_date"),
            pattern: {
              value: DATE_PATTERN,
              message: getNestedString("tasks.type_due_date_format"),
            },
          })}
        />
        {errors.dueDate && (
          <p className="text-sm text-red-500">{errors.dueDate.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="soft" color="gray" type="button" onClick={onCancel}>
          {strings.cancel}
        </Button>
        <Button
          type="submit"
          color="teal"
          disabled={!isValid || !isDirty || Object.keys(errors).length > 0}
        >
          {isValid && isDirty && Object.keys(errors).length === 0 && (
            <CheckIcon width={20} height={20} />
          )}
          {strings.create}
        </Button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
