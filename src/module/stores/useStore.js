import React, { createContext, useReducer, useContext } from 'react';
import reducer, { initialState } from './ui';

const StoreContext = createContext(initialState);

export const StoreProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = store => {
  const { state, dispatch } = useContext(StoreContext);
  return { state, dispatch };
};
