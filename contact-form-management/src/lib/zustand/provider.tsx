'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import { type Store } from '../types';

import { createAppStore, initAppStore } from './store';

export type StoreApi = ReturnType<typeof createAppStore>;

export const StoreContext = createContext<StoreApi | null>(null);

export interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<StoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createAppStore(initAppStore());
  }

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
}

export const useAppStore = <T,>(selector: (store: Store) => T): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error('useAppStore must be used within an StoreProvider');
  }

  return useStore(storeContext, selector);
};
