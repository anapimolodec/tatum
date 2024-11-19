import React, { useState } from "react";
import { Table, CheckboxGroup } from "@radix-ui/themes";
import { formatDate } from "../constants/functions";
import { useStore } from "../store/useStore";
import { useQuery } from "@tanstack/react-query";
import { ROLES } from "../constants/types";
import SearchBar from "../components/SearchBar";
import { getNestedString, strings } from "../constants/strings";

const fetchUsers = async () => {
  const response = await fetch("/data/user_list.json");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

const ALL_ROLES = "ALL";

const UsersPage = () => {
  const { user } = useStore();
  const [selectedRoles, setSelectedRoles] = useState([ALL_ROLES]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("userEmail");

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: !!user && user.userRole !== ROLES.VIEWER,
  });

  const uniqueRoles = [...new Set(users.map((user) => user.userRole))];
  const availableRoles = [ALL_ROLES, ...uniqueRoles];

  const handleRoleChange = (newValues) => {
    const clickedRole =
      newValues.length > selectedRoles.length
        ? newValues.find((role) => !selectedRoles.includes(role))
        : selectedRoles.find((role) => !newValues.includes(role));

    if (clickedRole === ALL_ROLES) {
      if (selectedRoles.includes(ALL_ROLES)) {
        return;
      } else {
        setSelectedRoles([ALL_ROLES, ...uniqueRoles]);
        return;
      }
    }

    if (clickedRole !== ALL_ROLES) {
      setSelectedRoles([clickedRole]);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  //TODO: make it less childish
  if (!user || user.userRole === ROLES.VIEWER) {
    return <p>you cant see sorry T.T</p>;
  }

  if (isLoading) {
    return <p>{strings.loading}</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const getVisibleUsers = () => {
    let filteredUsers;

    switch (user.userRole) {
      case ROLES.ADMIN:
      case ROLES.PRIME:
        filteredUsers = users;
        break;
      case ROLES.REGULAR:
        filteredUsers = users.filter((u) => u.userEmail === user.userEmail);
        break;
      default:
        return [];
    }

    if (!selectedRoles.includes(ALL_ROLES)) {
      filteredUsers = filteredUsers.filter((u) =>
        selectedRoles.includes(u.userRole)
      );
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredUsers = filteredUsers.filter((u) =>
        u[searchField].toLowerCase().includes(searchLower)
      );
    }

    return filteredUsers;
  };

  const visibleUsers = getVisibleUsers();
  const options = [
    { id: "userName", name: "User Name" },
    { id: "userPhone", name: "User Phone" },
    { id: "userEmail", name: "User Email" },
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
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="text-sm text-teal-700 font-bold">
              {strings.selected}
            </span>
            <span className="inline-flex items-center justify-center w-5 h-5 p-3 border border-solid border-teal-700 text-xs text-teal-700 rounded-full font-bold">
              {visibleUsers.length}
            </span>
          </div>
          <hr className="h-1 my-3 border-black" />
          <CheckboxGroup.Root
            className="flex flex-wrap gap-4"
            value={selectedRoles}
            onValueChange={handleRoleChange}
            color="teal"
          >
            <div className="flex gap-10">
              <h4 className="text-sm font-bold text-gray-700">
                {getNestedString("users.user_roles")}
              </h4>
              {availableRoles.map((role) => (
                <div key={role} className="flex items-center gap-2">
                  <CheckboxGroup.Item
                    value={role}
                    className="w-[16px] h-[16px] rounded border border-gray-300 bg-white data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                    id={role}
                  />
                  <label className="text-sm text-gray-700" htmlFor={role}>
                    {role}
                  </label>
                </div>
              ))}
            </div>
          </CheckboxGroup.Root>
        </div>
      </div>

      <Table.Root variant="ghost" layout="fixed">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              {getNestedString("users.user_name")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {getNestedString("users.user_email")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {getNestedString("users.user_role")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {getNestedString("users.user_phone")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {getNestedString("users.created_at")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {getNestedString("users.last_logged_in")}
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {visibleUsers.map((user, index) => (
            <Table.Row key={index}>
              <Table.Cell>{user.userName}</Table.Cell>
              <Table.Cell>{user.userEmail}</Table.Cell>
              <Table.Cell>{user.userRole}</Table.Cell>
              <Table.Cell>{user.userPhone}</Table.Cell>
              <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
              <Table.Cell>{formatDate(user.lastLoggedInAt)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default UsersPage;
