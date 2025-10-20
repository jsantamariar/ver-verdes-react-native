import React, { createContext, useContext, useState } from "react";

interface SavedDestinationsContextType {
  savedDestinations: Set<string>;
  toggleSave: (title: string) => void;
}

const SavedDestinationsContext = createContext<
  SavedDestinationsContextType | undefined
>(undefined);

export const SavedDestinationsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [savedDestinations, setSavedDestinations] = useState<Set<string>>(
    new Set()
  );

  const toggleSave = (title: string) => {
    setSavedDestinations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  return (
    <SavedDestinationsContext.Provider
      value={{ savedDestinations, toggleSave }}
    >
      {children}
    </SavedDestinationsContext.Provider>
  );
};

export const useSavedDestinations = () => {
  const context = useContext(SavedDestinationsContext);
  if (!context) {
    throw new Error(
      "useSavedDestinations must be used within SavedDestinationsProvider"
    );
  }
  return context;
};
