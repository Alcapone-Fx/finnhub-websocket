import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type CacheableState<T> = [T, Dispatch<SetStateAction<T>>];

export const useCachedState = <T,>(
  key: string,
  initialState: T
): CacheableState<T> => {
  const cachedState = localStorage.getItem(key);
  const initial = cachedState ? JSON.parse(cachedState) : initialState;

  const [state, setState] = useState<T>(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
