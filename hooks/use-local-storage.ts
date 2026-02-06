"use client";

import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") {
        return initialValue;
      }
      const storage = window.localStorage;
      if (!storage || typeof storage.getItem !== "function") {
        return initialValue;
      }
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      try {
        const storage =
          typeof window !== "undefined" ? window.localStorage : null;
        if (storage && typeof storage.setItem === "function") {
          storage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch {
        // Ignore localStorage errors (e.g. private mode, quota, or broken Node polyfill)
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
