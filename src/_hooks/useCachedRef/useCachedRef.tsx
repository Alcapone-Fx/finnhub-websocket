import { useRef, useEffect, useCallback } from 'react';

type CacheableRef<T> = React.MutableRefObject<T>;

interface CachedRefResult<T> {
  ref: CacheableRef<T>;
  setValue: (value: T) => void;
}

export const useCachedRef = <T,>(
  key: string,
  initialValue: T
): CachedRefResult<T> => {
  const cachedValue = localStorage.getItem(key);
  const initial = cachedValue ? JSON.parse(cachedValue) : initialValue;

  const ref = useRef<T>(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(ref.current));
  }, [key]);

  const setValue = useCallback(
    (value: T) => {
      ref.current = value;
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  return { ref, setValue };
};
