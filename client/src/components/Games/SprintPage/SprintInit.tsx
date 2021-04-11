import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { clearSprint, initSprint } from './sprintSlice';

interface Props {
  children: JSX.Element | (JSX.Element | null | boolean)[] | null | boolean;
}

export default function SprintInit({ children }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initSprint());
    return () => {
      dispatch(clearSprint());
    };
  }, []);

  return <>{children}</>;
}
