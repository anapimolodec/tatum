import React, { useState, useMemo } from "react";
import { useStore } from "../store/useStore";
import { useQuery } from "@tanstack/react-query";
import { ROLES } from "../constants/types";
import SearchBar from "../components/SearchBar";
import { strings } from "../constants/strings";
import SelectedCount from "../components/SelectedCount";
import Filters from "../components/Filters";
import { handleOptionChange } from "../constants/functions";
import TaskTable from "../components/TaskTable";

const fetchTasks = async () => {
  const response = await fetch("/data/task_list.json");
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
};

const ALL = "ALL";

const TasksPage = () => {
  const { user } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("taskName");
  const [selectedTypes, setSelectedTypes] = useState([ALL]);
  const [selectedStatuses, setSelectedStatuses] = useState([ALL]);

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    enabled: !!user,
  });

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
        filteredTasks = tasks.filter(
          (task) => task.reporter === user.userEmail
        );
        break;
      case ROLES.VIEWER:
        filteredTasks = tasks.filter(
          (task) => task.assignee === user.userEmail
        );
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

    return filteredTasks;
  };

  if (isLoading) return <p>{strings.loading}</p>;
  if (error) return <p>{error.message}</p>;

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
        <SearchBar
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          setSearchField={setSearchField}
          options={options}
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
