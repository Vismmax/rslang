import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userStore } from '../LoginPage/userSlice';
import { setBackRoute } from './routeSlice';

interface Props {
  from: string;
}

export default function RootRoute({ from }: Props) {
  // const dispatch = useDispatch();
  const user = useSelector(userStore);

  // if (!user.userId) dispatch(setBackRoute(path));

  return user.userId ? (
    <Redirect from={from} to='/home' />
  ) : (
    <Redirect from={from} to='/promo' />
  );
}
