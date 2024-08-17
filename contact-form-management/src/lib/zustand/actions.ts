import { Actions, GetAllMessagesParams, Store } from '../types';
import {
  login,
  postMessage,
  getCountries,
  logout,
  getAllMessages,
  getMessageById,
  readMessageById,
  deleteMessageById,
  getAllUsers,
  getUserById,
  addReaderUser,
  updateUserById,
} from '../utils/api';
import { removeTokenCookie, setTokenCookie } from '../cookies';

export const appActions: (
  get: () => Store,
  set: (
    partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
    replace?: boolean | undefined
  ) => void
) => Actions = (get, set) => ({
  login: async (username, password) => {
    const response = await login(username, password);
    if ('error' in response) {
      return response.error;
    }

    set({ user: response.data.user });
    await setTokenCookie(response.data.token);
    return '';
  },
  logout: async () => {
    const response = await logout();
    set({ user: null });
    await removeTokenCookie();
    return response;
  },
  postMessage: async (name, message, gender, country) => {
    const error = await postMessage(name, gender, country, message);
    if (error) {
      return error;
    }
    return '';
  },
  getCountries: async () => {
    const countries = await getCountries();
    return countries;
  },
  getAllMessages: async (params = { page: 1, pageSize: 10, sortField: 'creationDate', sortOrder: 'desc' }) => {
    const { page, pageSize, sortField, sortOrder } = params;
    const {
      messages,
      meta
    } = await getAllMessages({
      page,
      pageSize,
      sortField,
      sortOrder,
    });
    set({ messages, messagesMeta: meta });
    return {
      messages,
      meta,
    }
  },
  getMessageById: async (id: number) => {
    const message = await getMessageById(id);
    set({ selectedMessage: message });
    return message;
  },
  readMessageById: async (id: number) => {
    const response = await readMessageById(id);
    return response;
  },
  deleteMessageById: async (id: number) => {
    const errorInResponse = await deleteMessageById(id);
    if (!errorInResponse) {
      await get().getAllMessages();
    }
    return errorInResponse;
  },
  getAllUsers: async () => {
    const users = await getAllUsers();
    const readerUsers = users.slice(1);
    set({ users: readerUsers });
    return readerUsers;
  },
  getUserById: async (id: number) => {
    const user = await getUserById(id);
    set({ selectedUser: user });
    return user;
  },
  updateUserById: async (id, username, password, base64Photo) => {
    const response = await updateUserById(id, username, password, base64Photo);
    return response;
  },
  addReaderUser: async (username, password, base64Photo) => {
    const response = await addReaderUser(username, password, base64Photo);
    return response;
  },
});
