import React, { useState, createContext } from 'react';
import { ITodo, IUser } from '../typings';

export const StoreContext = createContext({
  user: null,
  todos: [],
  setUser: (_params: any) => undefined,
  setTodos: (_params: any) => undefined,
  clearUser: (_params: any | undefined) => undefined,
});

const StoreContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [todos, setTodos] = useState<ITodo[]>([]);

  const clearUser = () => setUser(null);

  return (
    <StoreContext.Provider value={{ user, todos, setUser, setTodos, clearUser }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
