import { createContext, useState, useEffect } from "react";
import type { ItemMenu, ModalMessage } from "config/interfaces";

const AppContext = createContext<any>(null);

const AppProvider = ({ children }: any) => {
  const [isLogin, setLogin] = useState<boolean>(false),
    [user, setUser] = useState<object>({}),
    [menu, setMenu] = useState<Array<ItemMenu>>([]),
    [modalMessage, setModalMessage] = useState<ModalMessage>({ title: "", message: "", body: undefined }),
    [modalResponse, setModalResponse] = useState<boolean>(),
    [toastMessage, setToastMessage] = useState<Array<string>>([]);

  useEffect(() => {
    !isLogin ? (setMenu([]), setToastMessage([])) : null;
    if (user) {
      setUser(user);
    }
  }, [isLogin, user]);

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setLogin,
        setUser,
        menu,
        setMenu,
        toastMessage,
        setToastMessage,
        modalMessage,
        setModalMessage,
        modalResponse,
        setModalResponse
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export {AppContext,AppProvider}