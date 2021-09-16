import React from "react";
import { useUsers } from "./useUsers";

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export const UserSelector = (props: SelectProps) => {
  const { users, isLoadingUsers, usersLoadingError } = useUsers();

  if (isLoadingUsers) {
    return (
      <select disabled {...props}>
        <option value="">Loading users...</option>
      </select>
    );
  }

  if (!!usersLoadingError) {
    return <span className="error">{usersLoadingError}</span>;
  }

  return (
    <select {...props}>
      <option value="">- Select user -</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};
