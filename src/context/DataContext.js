import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};


