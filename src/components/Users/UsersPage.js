"use client";

import React, { useState } from "react";
import { userStore } from "../../lib/store/userStore";
import { ROLES } from "../../lib/constants/types";
import SearchBar from "../SearchBar";
import { getNestedString, strings } from "../../lib/constants/strings";
import SelectedCount from "../SelectedCount";
import Filters from "../Filters";
import { handleOptionChange } from "../../lib/constants/functions";
import UserTable from "./UserTable";
import EmptyCard from "../EmptyCard";

const ALL = "ALL";

const UsersPage = () => {
  const { user, users, isLoading, error } = userStore();
  const [selectedRoles, setSelectedRoles] = useState([ALL]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("userEmail");

  if (!user) {
    return null;
  }
  const uniqueRoles = [...new Set(users.map((user) => user.userRole))];
  const availableRoles = [ALL, ...uniqueRoles];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (!user || user.userRole === ROLES.VIEWER) {
    return (
      <EmptyCard title={strings.restricted} desc={strings.restricted_text} />
    );
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

    if (!selectedRoles.includes(ALL)) {
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
          <SelectedCount count={visibleUsers.length} />
          <hr className="h-1 my-4 border-black" />
          <Filters
            title={getNestedString("users.user_roles")}
            items={availableRoles}
            selectedItems={selectedRoles}
            onItemChange={(values) =>
              handleOptionChange(
                values,
                selectedRoles,
                setSelectedRoles,
                uniqueRoles
              )
            }
          />
        </div>
      </div>
      <UserTable visibleUsers={visibleUsers} />
    </div>
  );
};

export default UsersPage;
