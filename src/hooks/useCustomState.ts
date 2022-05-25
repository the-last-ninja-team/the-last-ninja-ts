import { useState } from 'react';

type StateType<T> = T | undefined;

export const useCustomState = <T>(init?: StateType<T>): [StateType<Partial<T>>, (value: Partial<T>) => void] => {
  const [state, setState] = useState<StateType<Partial<T>>>(init);

  const handleSetState = (value: Partial<T>) => {
    setState({ ...state, ...value });
  };

  return [state, handleSetState];
};
