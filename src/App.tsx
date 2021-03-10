import * as React from 'react';
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Typography } from "@material-ui/core";
import { api, UserDTO } from "./services/";
import './App.css';
import {
  ArticleBrowser,
  Bookmark,
  EditUser,
  Navigation,
  Search,
  SignUp,
  UserBrowser,
  UserProfile,
  WelcomePage,
} from './components';

const queryClient = new QueryClient();

export type UserState = UserDTO | null;

export const App: React.FC = () => {
  const token = localStorage.getItem("token");
  const [currentUser, setCurrentUser] = React.useState<UserState>(null);

  React.useEffect(() => {
    /** TODO: Type data response */
    if (token) {
      api.auth.getCurrentUser().then(data => {
        setCurrentUser(data.user);
      });
    };
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Container>
          <Navigation currentUser={currentUser ? currentUser : null} onAuth={setCurrentUser} />
          <Typography variant="h2">News-Flash!</Typography>
        </Container>
        <Router>
          <Switch>
            <div className="App">
              <Route exact path="/top_articles"
                render={() => <ArticleBrowser category="" />} />
              <Route exact path="/sports_articles"
                render={() => <ArticleBrowser category="Sports" />} />
              <Route exact path="/business_articles"
                render={() => <ArticleBrowser category="Business" />} />
              <Route exact path="/"
                render={() => <WelcomePage currentUser={currentUser} />} />
              <Route exact path="/tech_articles"
                render={() => <ArticleBrowser category="Technology" />} />
              <Route exact path="/health_articles"
                render={() => <ArticleBrowser category="Health" />} />
              <Route path="/search/:query" component={Search} />
              <Route exact path="/users/:username" component={UserProfile} />
              <Route exact path="/bookmarks/:id"
                render={props => <Bookmark {...props} />} />
              {/* TODO: Pass a sign up method??? */}
              <Route exact path="/sign-up/" component={SignUp} />
              <Route exact path="/users" component={UserBrowser} />
              <Route exact path="/edit-user"
                render={props => <EditUser {...props} />} />
            </div>
          </Switch>
        </Router>
      </QueryClientProvider>
    </>
  );
};