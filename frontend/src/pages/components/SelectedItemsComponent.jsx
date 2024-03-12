import React, { createContext, useContext, useReducer } from 'react';

const SelectedItemsContext = createContext();

function selectedItemsReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload];
    default:
      return state;
  }
}

const initialState = [];

export function SelectedItemsProvider({ children }) {
  const [selectedItems, dispatch] = useReducer(selectedItemsReducer, initialState);

  const getSelectedItems = () => selectedItems;

  const updateSession = (items) => {
    // Your logic to update the session
    console.log('Updating session with items:', items);
  };

  const value = {
    selectedItems,
    dispatch,
    getSelectedItems,
    updateSession,
  };

  return (
    <SelectedItemsContext.Provider value={value}>
      {children}
    </SelectedItemsContext.Provider>
  );
}

export function useSelectedItems() {
  return useContext(SelectedItemsContext);
}
