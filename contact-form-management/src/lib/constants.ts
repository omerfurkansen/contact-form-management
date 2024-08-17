export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const ENDPOINT = {
  VERIFY_TOKEN: '/user/check-login',
  LOGIN: '/user/login',
  LOGOUT: '/user/logout',
  POST_MESSAGE: '/message/add',
  GET_ALL_MESSAGES: '/messages',
  GET_MESSAGE_BY_ID: '/message/',
  READ_MESSAGE_BY_ID: '/message/read/',
  DELETE_MESSAGE_BY_ID: '/message/delete/',
  GET_ALL_USERS: '/users',
  GET_USER_BY_ID: '/user/',
  UPDATE_USER_BY_ID: '/user/update/',
  ADD_READER_USER: '/user/add-reader',
  GET_COUNTRIES: '/countries',
};
export const USER_ROLE = {
  ADMIN: 'admin',
  READER: 'reader',
};
export const READER_ROUTES = ['/messages'];
export const ADMIN_ROUTES = ['/users', '/reports', ...READER_ROUTES];
