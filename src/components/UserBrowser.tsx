import * as React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { AllUsersResponse, api } from "../services/api";
import Loader from "../components/Loader";

export const UserBrowser: React.FC = () => {
    const { isLoading, error, data } = useQuery<AllUsersResponse, Error>("allUsers", api.users.getAllUsers);

    function renderUsers() {
        if (data) {
            return data.map((user, index) => {
                return <li key={index}><Link to={`/users/${user}`}>{user}</Link></li>
            });
        }
    };

    if (isLoading) return <Loader />;
    if (error) return (<>{"Unable to fetch data " + error.message}</>);
    return (
        <ul className="user-list">
            {renderUsers()}
        </ul>
    );
};

export default UserBrowser;