import * as React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { List, ListItem } from "@material-ui/core";
import { UserIndexResponse, api } from "../services";
import { Loader } from "../components";

export const UserBrowser: React.FC = () => {
  const { isLoading, error, data } = useQuery<UserIndexResponse, Error>(
    "allUsers",
    api.users.getAllUsers
  );

  const renderUsers = () => {
    if (data) {
      return data.map((username, index) => {
        return (
          <ListItem key={index}>
            <Link to={`/users/${username}`}>{username}</Link>
          </ListItem>
        );
      });
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <>{"Unable to fetch data " + error.message}</>;
  return <List>{renderUsers()}</List>;
};
