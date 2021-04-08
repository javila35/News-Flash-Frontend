import * as React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  api,
  GetCurrentUserResponse,
  useCurrentUserContext,
} from "./services/";
import {
  AppBar,
  ArticleBrowser,
  Bookmark,
  EditUser,
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
  const { setCurrentUser } = useCurrentUserContext();

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
  }, [setCurrentUser]);

  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <div>
            <AppBar />
            <Switch>
              <Route exact path="/" component={WelcomePage} />
              <Route
                exact
                path="/top"
                render={() => <ArticleBrowser category="" />}
              />
              <Route
                exact
                path="/sports"
                render={() => <ArticleBrowser category="Sports" />}
              />
              <Route
                exact
                path="/business"
                render={() => <ArticleBrowser category="Business" />}
              />
              <Route
                exact
                path="/tech"
                render={() => <ArticleBrowser category="Technology" />}
              />
              <Route
                exact
                path="/health"
                render={() => <ArticleBrowser category="Health" />}
              />
              <Route path="/search/:query" component={Search} />
              <Route exact path="/users/:username" component={UserProfile} />
              <Route exact path="/bookmarks/:id" component={Bookmark} />
              <Route exact path="/sign-up/" component={SignUp} />
              <Route exact path="/users" component={UserBrowser} />
              <Route exact path="/edit-user" component={EditUser} />
            </Switch>
          </div>
        </QueryClientProvider>
      </Router>
    </>
  );
};
