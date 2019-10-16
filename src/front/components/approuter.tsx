import {
  Route,
  HashRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import PageNotFound from "./pageNotFound";
import Admin from "./admin";
import { ReactElement } from "react";
import * as React from "react";
import Main from "./main";
import withAppHeader from "../hoc/withAppHeader";

const adminProps = ["Plats", "Boissons", "Desserts"];

const AppRouter = (): ReactElement => {
  return (
    <Router>
      <div>
        <Switch>
          <Redirect exact={true} from="/" to="/main" />
          <Route path="/main" component={Main} />
          <Route
            path="/admin"
            render={() =>
              withAppHeader(
                <Admin itemsToAdmin={adminProps} />,
                "Restauratec",
                "utensils"
              )
            }
          />
          <Route path="/index" component={PageNotFound} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
