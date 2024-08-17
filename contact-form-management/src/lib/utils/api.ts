import axios, { AxiosError } from 'axios';
import { API_BASE_URL, ENDPOINT } from '@/src/lib/constants';
import { getTokenCookie } from '@/src/lib/cookies';
import { User, Message, LoginResponse, GetAllMessagesParams, GetAllMessagesMetaResponse } from '@/src/lib/types';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const withErrorHandling =
  (fn: Function) =>
  async (...args: any[]) => {
    try {
      await fn(...args);
      return '';
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      return axiosError.response?.data.error || 'An error occurred';
    }
  };

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post(ENDPOINT.LOGIN, { username, password });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    return { error: axiosError.response?.data.error || 'An error occurred' };
  }
};

export const postMessage = withErrorHandling(
  async (
    name: Message['name'],
    gender: Message['gender'],
    country: Message['country'],
    message: Message['message']
  ): Promise<void> => {
    await api.post(ENDPOINT.POST_MESSAGE, {
      name,
      gender,
      country,
      message,
    });
  }
);

export const verifyToken = async (token: string | undefined): Promise<User | null> => {
  try {
    if (!token) {
      return null;
    }

    const response = await api.post(ENDPOINT.VERIFY_TOKEN, undefined, { headers: { token } });
    return response.data.data.user;
  } catch (error) {
    await logout();
    return null;
  }
};

export const getCountries = async (): Promise<string[]> => {
  try {
    const response = await api.get(ENDPOINT.GET_COUNTRIES);
    return response.data.data.countries;
  } catch (error) {
    return [];
  }
};

export const logout = withErrorHandling(async (): Promise<void> => {
  const token = await getTokenCookie();
  await api.post(ENDPOINT.LOGOUT, undefined, { headers: { token } });
});

export const getAllMessages: (params: GetAllMessagesParams) => Promise<{ messages: Message[]; meta: GetAllMessagesMetaResponse }> = async ({
  page = 1,
  pageSize = 10,
  sortField = 'creationDate',
  sortOrder = 'desc'
}) => {
  const token = await getTokenCookie();

  try {
    const response = await api.get(ENDPOINT.GET_ALL_MESSAGES, {
      headers: { token },
      params: { page, pageSize, sortField, sortOrder },
    });
    return {
      messages: response.data.data.messages,
      meta: response.data.meta,
    };
  } catch (error) {
    return {
      messages: [],
      meta: {
        meta: {
          totalMessages: 0,
          totalPages: 0,
          page: 0,
          pageSize: 0,
        },
      },
    };
  }
};

export const getMessageById = async (id: number): Promise<Message | null> => {
  const token = await getTokenCookie();

  try {
    const response = await api.get(ENDPOINT.GET_MESSAGE_BY_ID + id, { headers: { token } });
    return response.data.data.message;
  } catch (error) {
    return null;
  }
};

export const readMessageById = withErrorHandling(async (id: number): Promise<void> => {
  const token = await getTokenCookie();
  await api.post(ENDPOINT.READ_MESSAGE_BY_ID + id, undefined, { headers: { token } });
});

export const deleteMessageById = withErrorHandling(async (id: number): Promise<void> => {
  const token = await getTokenCookie();
  await api.post(ENDPOINT.DELETE_MESSAGE_BY_ID + id, undefined, { headers: { token } });
});

export const getAllUsers = async (): Promise<User[]> => {
  const token = await getTokenCookie();

  try {
    const response = await api.get(ENDPOINT.GET_ALL_USERS, { headers: { token } });
    return response.data.data.users;
  } catch (error) {
    return [];
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  const token = await getTokenCookie();

  try {
    const response = await api.get(ENDPOINT.GET_USER_BY_ID + id, { headers: { token } });
    return response.data.data.user;
  } catch (error) {
    return null;
  }
};

export const updateUserById = withErrorHandling(
  async (
    id: number,
    username: User['username'],
    password: User['password'],
    base64Photo: [User['base64Photo']]
  ): Promise<void> => {
    const token = await getTokenCookie();
    await api.post(ENDPOINT.UPDATE_USER_BY_ID + id, { username, password, base64Photo }, { headers: { token } });
  }
);

export const addReaderUser = withErrorHandling(
  async (username: User['username'], password: User['password'], base64Photo: User['base64Photo']): Promise<void> => {
    const token = await getTokenCookie();
    await api.post(ENDPOINT.ADD_READER_USER, { username, password, base64Photo }, { headers: { token } });
  }
);
