import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { useQuery } from "@tanstack/react-query";
import { ROLES } from "../constants/types";
import SearchBar from "../components/SearchBar";
import { getNestedString, strings } from "../constants/strings";
import SelectedCount from "../components/SelectedCount";
import Filters from "../components/Filters";
import { handleOptionChange } from "../constants/functions";
import UserTable from "../components/UserTable";
import EmptyCard from "../components/EmptyCard";

const fetchUsers = async () => {
  const response = await fetch("/data/user_list.json");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

const ALL = "ALL";

const UsersPage = () => {
  const { user } = useStore();
  const [selectedRoles, setSelectedRoles] = useState([ALL]);
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
  const availableRoles = [ALL, ...uniqueRoles];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (!user || user.userRole === ROLES.VIEWER) {
    return (
      <EmptyCard
        title={"Restricted"}
        desc={"Sorry, you cannot access this page"}
      />
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
