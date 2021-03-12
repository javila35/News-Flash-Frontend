import * as React from 'react';
import { useHistory, useParams } from 'react-router';
import { useQuery } from 'react-query';
import { Container, Typography, Button } from "@material-ui/core";
import { api, UserShowResponse } from '../services/';
import { Loader } from "./Loader";
import BookmarkCard from "./BookmarkCard";
import { UserState } from "../App";

type UserProfileProps = {
    /** Abbreviated user object */
    currentUser: { username: string, id: number } | null;
    /** Removes current user from state */
    onDelete: React.Dispatch<React.SetStateAction<UserState>>;
}

type UserProfileParams = {
    /** Username from URL */
    username: string;
}

/** FIXME: Return type is deeply nested with two data layers */
// data: {
//     data: {
//         ...
//     }
// }
type UserProfileResponse = { data: UserShowResponse };

/**
 * TODO
 * [x] Refactor to FC
 * [x] Refactor to TS
 * [x] Type props
 * [x] Refactor to React-Query
 * [x] Refactor to Material UI
 * [ ] Remove double data layer from serialized response
 */

export const UserProfile: React.FC<UserProfileProps> = ({ currentUser, onDelete }) => {
    const { username } = useParams<UserProfileParams>();
    const history = useHistory();

    const { data, error, isLoading } = useQuery<UserProfileResponse, Error>(
        [`fetchUser${username}`, username],
        () => api.users.getUserToDisplay(username)
    );

    const editBio = () => {
        history.push("/edit-user");
    }

    const deleteUser = () => {
        if (currentUser) {
            const { id } = currentUser;
            api.users.deleteUser(id)
                .then((data) => {
                    if (data.status === "success") {
                        localStorage.removeItem("token");
                        onDelete(null);
                        history.push("/");
                    } else {
                        console.warn("Was not able to delete")
                    }
                });
        }
    }

    const renderBookmarks = () => {
        if (data) {
            const { bookmarks } = data.data.attributes;
            return bookmarks.map((bookmark, index) => {
                const { id } = bookmark;
                return <BookmarkCard key={index} bookmark={bookmark} bmID={id} handleClick={(id: number) => showBookmark(id)} />
            });
        }
    };

    const showBookmark = (bookmarkId: number) => {
        history.push(`/bookmarks/${bookmarkId}`);
    }

    const renderUserOptions = () => {
        return (
            <Container>
                <Button
                    variant="outlined"
                    onClick={editBio}
                >
                    Edit account details.
                </Button>
                <Button
                    variant="outlined"
                    onClick={deleteUser}
                >
                    Delete my account.
            </Button>
            </Container>
        );
    }

    const renderUserDetail = () => {
        if (data) {
            const { first_name, username, location, bio } = data.data.attributes;
            return (
                <Container>
                    <Typography variant="h5">Name: {first_name ? <>{first_name}</> : ""}</Typography>
                    <Typography variant="h5">Username: {username}</Typography>
                    <Typography variant="h6">Located In: {location ? <>{location}</> : "No location given"}</Typography>
                    <Typography variant="subtitle1">About me: {bio ? <>{bio}</> : "Enter some information about yourself!"}</Typography>
                    {currentUser?.username === username ? renderUserOptions() : null}
                </Container>
            );
        }
    }

    if (error) return (<>Could not fetch user + {error.message}</>)
    if (isLoading) return <Loader />
    return (
        <Container>
            {renderUserDetail()}
            <Typography variant="h2">Bookmarks</Typography>
            <Container>
                {renderBookmarks()!}
            </Container>
        </Container>
    )
}