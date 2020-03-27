import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ClusterDashboard from '../cluster-dashboard/ClusterDashboard';

interface RouteType {
  path?: string;
  exact?: boolean;
  component?: any; //eslint-disable-line @typescript-eslint/no-explicit-any
  routes?: string[];
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route: RouteType): JSX.Element {
  return (
    <Route
      path={route.path}
      render={props => (  //eslint-disable-line @typescript-eslint/explicit-function-return-type
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

const AppRouting: React.FC = () => {
  const RedirectComponent = (): JSX.Element => <Redirect to="/home" />
  RedirectComponent.displayName = "RedirectToHomeComponent"

  const routes: RouteType[] = [
    {
      path: `${process.env.PUBLIC_URL}/`,
      exact: true,
      component: RedirectComponent
    },
    {
      path: `${process.env.PUBLIC_URL}/home`,
      component: ClusterDashboard
    },
    {
      path: "*",
      component: RedirectComponent
    }
  ];

  return (
    <Fragment>
      <Switch>
        {
          routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))
        }
      </Switch>
    </Fragment>
  );
}

export default AppRouting;
