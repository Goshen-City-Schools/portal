import { useMemo, useCallback } from "react";

export const useLocalStorage = (key) => {
  const setItem = useCallback(
    (value) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error while saving to localStorage:", error);
      }
    },
    [key]
  );

  const getItem = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error("Error while reading from localStorage:", error);
      return undefined;
    }
  }, [key]);

  // You can also use useMemo to memoize the functions
  const memoizedSetItem = useMemo(() => setItem, [setItem]);
  const memoizedGetItem = useMemo(() => getItem, [getItem]);

  return { setItem: memoizedSetItem, getItem: memoizedGetItem };
};
