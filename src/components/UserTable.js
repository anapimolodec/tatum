import { Table } from "@radix-ui/themes";
import { getNestedString } from "../constants/strings";
import { formatDate } from "../constants/functions";

const UserTable = ({ visibleUsers }) => {
  return (
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
  );
};

export default UserTable;
