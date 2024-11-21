"use client";

import { Table } from "@radix-ui/themes";
import { strings, getNestedString } from "../../lib/constants/strings";
import { formatDate } from "../../lib/constants/functions";
import { RowsIcon } from "@radix-ui/react-icons";
import EmptyCard from "../EmptyCard";

const TaskTable = ({ visibleTasks }) => {
  if (visibleTasks.length === 0)
    return <EmptyCard title={strings.no_tasks} desc={strings.no_result_text} />;
  return (
    <Table.Root variant="ghost" layout="fixed">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>
            <div className="flex gap-2">
              <RowsIcon color="teal" />
              {getNestedString("tasks.task_name")}
            </div>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            {getNestedString("tasks.task_type")}
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            {getNestedString("tasks.created_at")}
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            {getNestedString("tasks.due_date")}
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            {getNestedString("tasks.reporter")}
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            {getNestedString("tasks.description")}
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            {getNestedString("tasks.assignee")}
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            {getNestedString("tasks.status")}
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {visibleTasks.map((task, index) => (
          <Table.Row key={index}>
            <Table.Cell>{task.taskName}</Table.Cell>
            <Table.Cell>{task.taskType}</Table.Cell>
            <Table.Cell>{formatDate(task.createdAt)}</Table.Cell>
            <Table.Cell>{task.dueDate}</Table.Cell>
            <Table.Cell>{task.reporter}</Table.Cell>
            <Table.Cell>{task.taskDescription}</Table.Cell>
            <Table.Cell>{task.assignee}</Table.Cell>
            <Table.Cell>{task.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TaskTable;
