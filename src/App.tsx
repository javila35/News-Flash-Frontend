import * as React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { api, GetCurrentUserResponse, UserState } from "./services/";
import "./App.css";
import {
  AppBar,
  ArticleBrowser,
  Bookmark,
  EditUser,
  Loader,
  Search,
  SignUp,
  UserBrowser,
  UserProfile,
  WelcomePage,
} from "./components";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  const token = () => localStorage.getItem("token");
  const [currentUser, setCurrentUser] = React.useState<UserState>(null);

  /** Method to pass AppBar for logout */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  React.useEffect(() => {
    if (token()) {
      api.auth.getCurrentUser().then((data: GetCurrentUserResponse) => {
        if (data.status === 200) {
          setCurrentUser(data.user);
          return;
        }
        console.error("Unable to fetch user. Error:::", data);
        return;
      });
    }
  }, []);

  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <div>
            <AppBar
              currentUser={currentUser}
              onLogin={setCurrentUser}
              onLogout={handleLogout}
            />
            <Switch>
              <Route
                exact
                path="/top_articles"
                render={() => <ArticleBrowser category="" />}
              />
              <Route
                exact
                path="/sports_articles"
                render={() => <ArticleBrowser category="Sports" />}
              />
              <Route
                exact
                path="/business_articles"
                render={() => <ArticleBrowser category="Business" />}
              />
              <Route
                exact
                path="/"
                render={() => <WelcomePage currentUser={currentUser} />}
              />
              <Route
                exact
                path="/tech_articles"
                render={() => <ArticleBrowser category="Technology" />}
              />
              <Route
                exact
                path="/health_articles"
                render={() => <ArticleBrowser category="Health" />}
              />
              <Route path="/search/:query" component={Search} />
              <Route
                exact
                path="/users/:username"
                render={() => {
                  return (
                    <UserProfile
                      onDelete={setCurrentUser}
                      currentUser={
                        currentUser
                          ? {
                              username: currentUser.username,
                              id: currentUser.id,
                            }
                          : null
                      }
                    />
                  );
                }}
              />
              <Route
                exact
                path="/bookmarks/:id"
                render={() => <Bookmark currentUser={currentUser!} />}
              />
              {/* TODO: Pass a sign up method??? */}
              <Route
                exact
                path="/sign-up/"
                render={() => <SignUp setCurrentUser={setCurrentUser} />}
              />
              <Route exact path="/users" component={UserBrowser} />
              <Route
                exact
                path="/edit-user"
                render={
                  currentUser
                    ? () => (
                        <EditUser
                          currentUser={currentUser}
                          updateCurrentUser={setCurrentUser}
                        />
                      )
                    : () => <Loader />
                }
              />
            </Switch>
          </div>
        </QueryClientProvider>
      </Router>
    </>
  );
};
