import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAudioChallenge, initAudioChallenge } from './audioChallengeSlice';

interface Props {
  children: JSX.Element | (JSX.Element | null | boolean)[] | null | boolean;
}

export default function AudioChallengeInit({ children }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAudioChallenge());
    return () => {
      dispatch(clearAudioChallenge());
    };
  }, []);

  return <>{children}</>;
}
