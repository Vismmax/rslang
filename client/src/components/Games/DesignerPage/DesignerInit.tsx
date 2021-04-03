import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearDesigner, initDesigner } from './designerSlice';

interface Props {
  children: JSX.Element | (JSX.Element | null | boolean)[] | null | boolean;
}

export default function DesignerInit({ children }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initDesigner());
    return () => {
      dispatch(clearDesigner());
    };
  }, []);

  return <>{children}</>;
}
