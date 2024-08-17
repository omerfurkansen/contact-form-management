import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { State, Store } from '../types';
import { appActions } from './actions';

export const initAppStore = (): State => ({
  user: null,
  messages: [],
  messagesMeta: {
    page: 1,
    pageSize: 10,
    totalMessages: 0,
    totalPages: 0,
  },
  selectedMessage: null,
  users: [],
  selectedUser: null,
});

export const defaultInitState: State = {
  user: null,
  messages: [],
  messagesMeta: {
    page: 1,
    pageSize: 10,
    totalMessages: 0,
    totalPages: 0,
  },
  selectedMessage: null,
  users: [],
  selectedUser: null,
};

export const createAppStore = (initState = defaultInitState) =>
  create<Store>()(
    persist(
      (set, get) => ({
        ...initState,
        ...appActions(get, set),
      }),
      {
        name: 'app-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ user: state.user }),
      }
    )
  );
