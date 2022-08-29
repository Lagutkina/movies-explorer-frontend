import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, children, ready, ...props }) => {
  return (
    <Route {...props}>
      {() => (loggedIn ? children : ready ? <Redirect to="/" /> : <></>)}
    </Route>
  );
};

export default ProtectedRoute;
