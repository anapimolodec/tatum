"use client";

import React, { useState, useMemo } from "react";
import { userStore } from "../../lib/store/userStore";
import { ROLES } from "../../lib/constants/types";
import SearchBar from "../SearchBar";
import { getNestedString } from "../../lib/constants/strings";
import SelectedCount from "../SelectedCount";
import Filters from "../Filters";
import { handleOptionChange } from "../../lib/constants/functions";
import TaskTable from "./TaskTable";
import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const ALL = "ALL";

const TasksPage = () => {
  const { user, tasks, isLoading, error } = userStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("taskName");
  const [selectedTypes, setSelectedTypes] = useState([ALL]);
  const [selectedStatuses, setSelectedStatuses] = useState([ALL]);
  const [showAlert, setShowAlert] = useState(false);

  const handleTaskCreated = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const { uniqueTypes, uniqueStatuses } = useMemo(() => {
    const types = new Set(tasks.map((task) => task.taskType));
    const statuses = new Set(tasks.map((task) => task.status));
    return {
      uniqueTypes: [...types],
      uniqueStatuses: [...statuses],
    };
  }, [tasks]);

  const availableTypes = [ALL, ...uniqueTypes];
  const availableStatuses = [ALL, ...uniqueStatuses];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getVisibleTasks = () => {
    let filteredTasks;

    switch (user.userRole) {
      case ROLES.ADMIN:
      case ROLES.PRIME:
        filteredTasks = tasks;
        break;
      case ROLES.REGULAR:
        filteredTasks = tasks.filter((task) => task.reporter === user.userName);
        break;
      case ROLES.VIEWER:
        filteredTasks = tasks.filter((task) => task.assignee === user.userName);
        break;
      default:
        return [];
    }

    if (!selectedTypes.includes(ALL)) {
      filteredTasks = filteredTasks.filter((task) =>
        selectedTypes.includes(task.taskType)
      );
    }

    if (!selectedStatuses.includes(ALL)) {
      filteredTasks = filteredTasks.filter((task) =>
        selectedStatuses.includes(task.status)
      );
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredTasks = filteredTasks.filter((task) =>
        task[searchField].toLowerCase().includes(searchLower)
      );
    }

    return filteredTasks.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const visibleTasks = getVisibleTasks();

  const options = [
    { id: "taskName", name: "Task Name" },
    { id: "reporter", name: "Reporter" },
    { id: "taskDescription", name: "Task Description" },
    { id: "assignee", name: "Assignee" },
  ];

  return (
    <div className="space-y-4">
      <div className="border-b pb-4 my-10 space-y-4">
        {showAlert && (
          <Callout.Root
            color="teal"
            className="w-full animate-slide-in-right z-50"
          >
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              <span className="font-bold">
                {getNestedString("tasks.success_title")}
              </span>
              <br />
              <span>{getNestedString("tasks.success_message")}</span>
            </Callout.Text>
          </Callout.Root>
        )}
        <SearchBar
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          setSearchField={setSearchField}
          options={options}
          showButton={user.userRole !== ROLES.VIEWER}
          onTaskCreated={handleTaskCreated}
        />
        <div className="flex flex-col space-y-4">
          <SelectedCount count={visibleTasks.length} />
          <hr className="h-1 border-black" />
          <Filters
            title="Task Type"
            items={availableTypes}
            selectedItems={selectedTypes}
            onItemChange={(values) =>
              handleOptionChange(
                values,
                selectedTypes,
                setSelectedTypes,
                uniqueTypes
              )
            }
          />
          <hr className="h-1" />
          <Filters
            title="Status"
            items={availableStatuses}
            selectedItems={selectedStatuses}
            onItemChange={(values) =>
              handleOptionChange(
                values,
                selectedStatuses,
                setSelectedStatuses,
                uniqueStatuses
              )
            }
          />
        </div>
      </div>

      <TaskTable visibleTasks={visibleTasks} />
    </div>
  );
};

export default TasksPage;
