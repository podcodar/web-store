import { useEffect, useState } from 'react';

export default function useStorage(key: string, defaultValue: any) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const currentValue = window.localStorage.getItem(key);

    if (currentValue) {
      setValue(currentValue);
    }
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
