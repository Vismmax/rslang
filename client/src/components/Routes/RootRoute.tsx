import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { userStore } from '../LoginPage/userSlice';

interface Props {
  from: string;
}

export default function RootRoute({ from }: Props) {
  const user = useSelector(userStore);

  return user.userId ? (
    <Redirect from={from} to='/home' />
  ) : (
    <Redirect from={from} to='/promo' />
  );
}
