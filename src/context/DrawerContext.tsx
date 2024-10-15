import { ReactNode, createContext, useContext, useState } from 'react';

const DrawerContext = createContext({
  isOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

interface DrawerProviderProps {
    children: ReactNode;
}

export const useDrawerContext = () => useContext(DrawerContext);

export function DrawerProvider({ children } : DrawerProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const value = { isOpen, openDrawer, closeDrawer };

  return (
    <DrawerContext.Provider value={value}>
      {children}
    </DrawerContext.Provider>
  );
}

