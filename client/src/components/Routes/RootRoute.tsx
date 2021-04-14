import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { isLoadingStore, userStore } from '../LoginPage/userSlice';
import Spinner from '../common/Spinner';

interface Props {
  from: string;
}

export default function RootRoute({ from }: Props) {
  const user = useSelector(userStore);
  const loading = useSelector(isLoadingStore);

  return loading ? (
    <Spinner />
  ) : (
    <Redirect from={from} to={user.userId ? '/home' : '/promo'} />
  );
}
