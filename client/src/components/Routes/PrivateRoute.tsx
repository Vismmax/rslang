import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userStore } from '../LoginPage/userSlice';
import { setBackRoute } from './routeSlice';

interface Props {
  path: string;
  component: any;
}

export default function PrivateRoute({ path, component, ...rest }: Props) {
  const dispatch = useDispatch();
  const user = useSelector(userStore);

  if (!user.userId) dispatch(setBackRoute(path));

  return user.userId ? (
    <Route path={path} component={component} {...rest} />
  ) : (
    <Redirect to='/login' />
  );
}
