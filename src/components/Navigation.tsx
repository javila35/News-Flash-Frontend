import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import {
    Button,
    Drawer,
    List,
    ListItem,
    TextField
} from "@material-ui/core";
import { Login } from "./Login";
import { UserState } from '../services/api';

type NavProps = {
    /** User being passed down from App level state */
    currentUser: UserState
}

/**
 * TODO
 * [ ] Refactor to MUI
 * [x] Refactor to FC
 * [x] Refactor to TS
 * [x] Type state and props
 * [x] Add isOpen state
 */
export const Navigation: React.FC<NavProps> = ({ currentUser }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const history = useHistory();
    const searchEl = React.useRef<HTMLInputElement>(null);

    const renderNavMenu = () => {
        const token = localStorage.getItem("token");
        return (
            <>
                {token ? null : showLogin()}
                <List>
                    <ListItem onClick={() => setOpen(!open)}><Link to="/">Home</Link></ListItem>
                    <ListItem onClick={() => setOpen(!open)}><Link to="/top">Top US Articles</Link></ListItem>
                    <ListItem onClick={() => setOpen(!open)}><Link to="/tech">Technology</Link></ListItem>
                    <ListItem onClick={() => setOpen(!open)}><Link to="/health">Health</Link></ListItem>
                    <ListItem onClick={() => setOpen(!open)}><Link to="/business">Business</Link></ListItem>
                    <ListItem onClick={() => setOpen(!open)}><Link to="/sports">Sports</Link></ListItem>
                    <ListItem onClick={() => setOpen(!open)}>
                        {(token && currentUser?.username) ?
                            <Link to={`/users/${currentUser.username}`}>My Account</Link> :
                            <Link to={'/sign-up'}>Sign Up</Link>
                        }
                    </ListItem>
                    <ListItem onClick={() => setOpen(!open)}><Link to="/users/">Users</Link></ListItem>
                    {token ? <ListItem onClick={() => setOpen(!open)}><Link to="/" onClick={() => showLogout()}>Log Out</Link></ListItem> : null}
                </List >
                <form onSubmit={(e) => search(e)}>
                    <TextField
                        type="text"
                        size="small"
                        label="Search"
                        name="query"
                        variant="outlined"
                        inputRef={searchEl}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        Search Headlines
                    </Button>
                </form>
            </>
        );
    }

    const search = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchEl && searchEl.current) {
            const query = searchEl.current.value;
            history.push(`/search/${query}`)
        }
    };

    const showLogin = () => {
        return <Login />;
    };

    const showLogout = () => {
        localStorage.removeItem("token");
        /** TODO: Pass down logout method */
        // removeCurrentUser();
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Menu</Button>
            <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
            >
                {renderNavMenu()}
            </Drawer>
        </>
    )
};