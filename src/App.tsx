import * as React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  api,
  UserProvider,
  GetCurrentUserResponse,
  UserState,
} from "./services/";
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
import "./App.css";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  const token = () => localStorage.getItem("token");
  const [currentUser, setCurrentUser] = React.useState<UserState>(null);

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
          <UserProvider>
            <div>
              <AppBar />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <WelcomePage currentUser={currentUser} />}
                />
                <Route
                  exact
                  path="/top"
                  render={() => (
                    <ArticleBrowser category="" currentUser={currentUser} />
                  )}
                />
                <Route
                  exact
                  path="/sports"
                  render={() => (
                    <ArticleBrowser
                      currentUser={currentUser}
                      category="Sports"
                    />
                  )}
                />
                <Route
                  exact
                  path="/business"
                  render={() => (
                    <ArticleBrowser
                      currentUser={currentUser}
                      category="Business"
                    />
                  )}
                />
                <Route
                  exact
                  path="/tech"
                  render={() => (
                    <ArticleBrowser
                      currentUser={currentUser}
                      category="Technology"
                    />
                  )}
                />
                <Route
                  exact
                  path="/health"
                  render={() => (
                    <ArticleBrowser
                      currentUser={currentUser}
                      category="Health"
                    />
                  )}
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
          </UserProvider>
        </QueryClientProvider>
      </Router>
    </>
  );
};
