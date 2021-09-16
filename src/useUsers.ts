import { useEffect, useState } from "react";
import { User } from "./types";
import { usersAPI } from "./constants";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      fetch(usersAPI)
        .then((res) => res.json())
        .then((fetchedUsers) => setUsers(fetchedUsers))
        .then(() => setLoading(false))
        .catch((error) => {
          setUsers([]);
          setError("An error occurred while loading users.");
          setLoading(false);
        });
    }, 1000);
  }, []);

  return {
    users: users.map(({ id, name }) => ({ id, name })),
    isLoadingUsers: isLoading,
    usersLoadingError: error
  };
};
