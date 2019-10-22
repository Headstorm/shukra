import React from 'react';
import ClusterDashboard from '../cluster-dashboard/ClusterDashboard';
import { Switch, Route, Redirect } from 'react-router-dom';

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

const AppRouting: React.FC = () => {

  const RedirectComponent = () => <Redirect to="/home"/>
  RedirectComponent.displayName = "RedirectToHomeComponent"

  const routes = [
    {
      path: "/",
      exact: true,
      component: RedirectComponent
    },
    {
      path: "/home",
      component: ClusterDashboard
    },
    {
      path: "*",
      component: RedirectComponent
    }
  ];

  return (
    <React.Fragment>
      <Switch>
        {
          routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))
        }
      </Switch>
    </React.Fragment>
  );
}

export default AppRouting;
