import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { clearSavannah, initSavannah } from './savannahSlice';

interface Props {
  children: JSX.Element | (JSX.Element | null | boolean)[] | null | boolean;
}

export default function SavannahInit({ children }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initSavannah());
    return () => {
      dispatch(clearSavannah());
    };
  }, []);

  return <>{children}</>;
}
