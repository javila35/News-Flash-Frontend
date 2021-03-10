import * as React from 'react';
import { api, UserShowResponse } from '../services/';
import { Container, Typography } from "@material-ui/core";
import Loader from '../components/Loader';
import BookmarkCard from '../components/BookmarkCard';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router';

type UserProfileParams = {
    /** Username from URL */
    username: string;
}

/** Return type is deeply nested with two data layers */
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
 * [ ] Type state and props
 * [x] Refactor to React-Query
 * [ ] Refactor to Material UI
 * [ ] Remove double data layer from serialized response
 */

export const UserProfile: React.FC = (props) => {
    const { username } = useParams<UserProfileParams>();
    const history = useHistory();

    const { data, error, isLoading } = useQuery<UserProfileResponse, Error>(
        [`fetchUser${username}`, username],
        () => api.users.getUserToDisplay(username)
    );

    const editBio = () => {
        history.push("/edit-user");
    }

    /** TODO:
     * Get id
     * Pass API to deleteUser
     * Remove user from app state
     */
    const deleteUser = (id: number) => {
        api.users.deleteUser(id)
            .then(() => {
                localStorage.removeItem("token");
                // props.removeCurrentUser();
                history.push("/");
            })
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

    const showUserDetail = () => {
        if (data) {
            const { first_name, username, location, bio, id } = data.data.attributes;
            return (
                <Container>
                    <Typography variant="h5">Name: {first_name ? <>{first_name}</> : ""}</Typography>
                    <Typography variant="h5">Username: {username}</Typography>
                    <Typography variant="h6">Located In: {location ? <>{location}</> : "No location given"}</Typography>
                    <Typography variant="subtitle1">About me: {bio ? <>{bio}</> : "Enter some information about yourself!"}</Typography>
                    {/* TODO: Implement edit / delete user logic after setting current user. */}
                    {/* {props.currentUser.username === username ? <><button onClick={editBio}>Edit account details.</button><button onClick={(id: number) => deleteUser(id)}>Delete my account.</button></> : null} */}
                </Container>
            );
        }
    };

    if (error) return (<>Could not fetch user + {error.message}</>)
    if (isLoading) return <Loader />
    return (
        <Container>
            {showUserDetail()}
            <Typography variant="h2">Bookmarks</Typography>
            <Container>
                {renderBookmarks()!}
            </Container>
        </Container>
    )
}