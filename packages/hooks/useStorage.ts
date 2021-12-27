import { useEffect, useState } from 'react';

export default function useStorage<T>(key: string): [T, (value: T) => void] {
  const [value, setValue] = useState({} as T);

  useEffect(() => {
    const currentValue = window.localStorage.getItem(key);

    if (currentValue) {
      setValue(JSON.parse(currentValue));
    }
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
