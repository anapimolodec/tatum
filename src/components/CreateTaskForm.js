import React, { useMemo, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Select, TextField } from "@radix-ui/themes";
import { userStore } from "../store/userStore";
import { ROLES } from "../constants/types";
import { useQueryClient } from "@tanstack/react-query";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  DATE_PATTERN,
  DIGIT_PATTERN,
  ADDRESS_PATTERN,
  LETTERS_PATTERN,
  PHONE_PATTERN,
} from "../constants/types";

const TASK_TYPES = ["물품 구매", "택배요청"];

const CreateTaskForm = ({ onSubmit, onCancel }) => {
  const { user } = userStore();
  const queryClient = useQueryClient();
  const usersDataRef = useRef(queryClient.getQueryData(["users"]) || []);
  const users = usersDataRef.current;

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

    if (data.taskType === "물품 구매") {
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
            Reporter
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
            Task Name *
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

        <div className="space-y-1 flex flex-col">
          <label className="text-sm font-medium" htmlFor="assignee">
            Assignee
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
              rules={{ required: "담당자를 선택해주세요" }}
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
            Task Type *
          </label>
          <Controller
            name="taskType"
            control={control}
            render={({ field }) => (
              <Select.Root
                defaultValue={TASK_TYPES[0]}
                onValueChange={(value) => {
                  field.onChange(value);

                  if (value === "물품 구매") {
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
              물품명
            </label>
            <TextField.Root
              id="productName"
              placeholder="물품 명을 입력하세요"
              {...register("productName")}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="productCount">
              물품 갯수
            </label>
            <TextField.Root
              id="productCount"
              placeholder="물품 갯수를 입력하세요"
              color={errors.productCount ? "red" : "gray"}
              {...register("productCount", {
                pattern: {
                  value: DIGIT_PATTERN,
                  message: "숫자 형태여야 합니다",
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
              수신자 명
            </label>
            <TextField.Root
              id="recipient"
              placeholder="김홍도"
              {...register("recipient")}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="recipientPhone">
              수신자 전화번호
            </label>
            <TextField.Root
              id="recipientPhone"
              placeholder="010-2222-3333"
              color={errors.recipientPhone ? "red" : "gray"}
              {...register("recipientPhone", {
                pattern: {
                  value: PHONE_PATTERN,
                  message: "올바른 휴대폰 번호를 입력해주세요",
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
              수신자 주소
            </label>
            <TextField.Root
              id="recipientAddress"
              placeholder="아스타나 123"
              color={errors.recipientAddress ? "red" : "gray"}
              {...register("recipientAddress", {
                validate: {
                  containsLettersAndNumbers: (value) => {
                    const hasLetters = LETTERS_PATTERN.test(value);
                    const hasNumbers = DIGIT_PATTERN.test(value);
                    return (
                      (hasLetters && hasNumbers) ||
                      "주소는 글자와 숫자를 모두 포함해야 합니다"
                    );
                  },
                },
                pattern: {
                  value: ADDRESS_PATTERN,
                  message: "올바른 주소를 입력해주세요",
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
          Due Date *
        </label>
        <TextField.Root
          id="dueDate"
          placeholder="yyyy-mm-dd"
          color={errors.dueDate ? "red" : "gray"}
          {...register("dueDate", {
            required: "마감일을 입력해 주세요",
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
        <Button
          type="submit"
          color="teal"
          disabled={!isValid || !isDirty || Object.keys(errors).length > 0}
        >
          {isValid && isDirty && Object.keys(errors).length === 0 && (
            <CheckIcon width={20} height={20} />
          )}
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
