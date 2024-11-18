import React from "react";
import { Table } from "@radix-ui/themes";
import { formatDate } from "../constants/functions";
import { useStore } from "../store/useStore";

import { useQuery } from "@tanstack/react-query";
import { ROLES } from "../constants/types";

const fetchUsers = async () => {
  const response = await fetch("/data/user_list.json");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

const UsersPage = () => {
  const { user } = useStore();

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: !!user && user.userRole !== ROLES.VIEWER,
  });

  if (!user || user.userRole === ROLES.VIEWER) {
    return <p>you cant see sorry</p>;
  }

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const getVisibleUsers = () => {
    switch (user.userRole) {
      case ROLES.ADMIN:
      case ROLES.PRIME:
        return users;
      case ROLES.REGULAR:
        return users.filter((u) => u.userEmail === user.userEmail);
      default:
        return [];
    }
  };

  const visibleUsers = getVisibleUsers();

  return (
    <div className="space-y-4">
      {visibleUsers.length === 0 ? (
        <p>no users</p>
      ) : (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>User Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>User Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>User Role</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>User Phone</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Last Logged In</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {visibleUsers.map((user, index) => (
              <Table.Row key={index}>
                <Table.Cell className="font-medium">{user.userName}</Table.Cell>
                <Table.Cell>{user.userEmail}</Table.Cell>
                <Table.Cell>{user.userRole}</Table.Cell>
                <Table.Cell>{user.userPhone}</Table.Cell>
                <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
                <Table.Cell>{formatDate(user.lastLoggedInAt)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};

export default UsersPage;
