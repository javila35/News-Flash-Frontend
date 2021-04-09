import * as React from "react";
import { useHistory, useParams } from "react-router";
import { useQuery } from "react-query";
import { Button, Container, Typography, makeStyles } from "@material-ui/core";
import { api, UserShowResponse } from "../services/";
import { Loader } from "./Loader";
import { BookmarkCard } from "./BookmarkCard";
import { useCurrentUserContext } from "../services";

const classes = {
  bookmarkContainer: {
    marginTop: "1em",
  },
  mainContainer: {
    marginTop: "1em",
  },
};

const useStyles = makeStyles(classes);

type UserProfileParams = {
  /** Username from URL */
  username: string;
};

// TODO Remove double data layer from serialized response
//  ! Fix: Return type is deeply nested with two data layers */
// data: {
//     data: {
//         ...
//     }
// }
type UserProfileResponse = { data: UserShowResponse };

export const UserProfile: React.FC = () => {
  const { username } = useParams<UserProfileParams>();
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const { bookmarkContainer, mainContainer } = useStyles();
  const history = useHistory();

  const { data, error, isLoading } = useQuery<UserProfileResponse, Error>(
    [`fetchUser${username}`, username],
    () => api.users.getUserToDisplay(username)
  );

  const editBio = () => {
    history.push("/edit-user");
  };

  // TODO Add a toast, or extra button to user wants to delete
  const deleteUser = () => {
    if (currentUser) {
      const { id } = currentUser;
      api.users.deleteUser(id).then((data) => {
        if (data.status === "success") {
          localStorage.removeItem("token");
          setCurrentUser(null);
          history.push("/");
        } else {
          // TODO: Turn this into toast
          console.warn("Was not able to delete");
        }
      });
    }
  };

  const renderBookmarks = () => {
    if (data) {
      const { bookmarks } = data.data.attributes;
      return bookmarks.map((bookmark, index) => (
        <BookmarkCard
          key={index}
          bookmark={bookmark}
          handleClick={showBookmark}
        />
      ));
    }
  };

  const showBookmark = (bookmarkId: number) => {
    history.push(`/bookmarks/${bookmarkId}`);
  };

  const renderUserOptions = () => {
    return (
      <Container>
        <Button variant="outlined" onClick={editBio}>
          Edit account details.
        </Button>
        <Button variant="outlined" onClick={deleteUser}>
          Delete my account.
        </Button>
      </Container>
    );
  };

  const renderUserDetail = () => {
    if (data) {
      const { first_name, username, location, bio } = data.data.attributes;
      return (
        <Container className={mainContainer}>
          <Typography variant="h5">
            Name: {first_name ? <>{first_name}</> : ""}
          </Typography>
          <Typography variant="h5">Username: {username}</Typography>
          <Typography variant="h6">
            Located In: {location ? <>{location}</> : "No location given"}
          </Typography>
          <Typography variant="subtitle1">
            About me:{" "}
            {bio ? <>{bio}</> : "Enter some information about yourself!"}
          </Typography>
          {currentUser?.username === username && renderUserOptions()}
        </Container>
      );
    }
  };

  if (error) return <>Could not fetch user + {error.message}</>;
  if (isLoading) return <Loader />;
  return (
    <Container className={mainContainer}>
      {renderUserDetail()}
      <Container className={bookmarkContainer}>
        <Typography variant="h2">Bookmarks</Typography>
        {renderBookmarks()}
      </Container>
    </Container>
  );
};
