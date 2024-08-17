export type UserRole = 'reader' | 'admin';

export type User = {
  id: number;
  username: string;
  password: string;
  role: UserRole;
  base64Photo: string;
};

export type Country = string;
export type Gender = 'female' | 'male';

export type Message = {
  id: number;
  name: string;
  message: string;
  gender: Gender;
  country: Country;
  read: 'true' | 'false';
  creationDate: string;
};

export type AuthState = {
  user: User | null;
};

export type AuthActions = {
  login: (username: string, password: string) => Promise<string>;
  logout: () => Promise<string>;
};

export type MessageState = {
  messages: Message[];
  selectedMessage: Message | null;
  messagesMeta: GetAllMessagesMetaResponse;
};

export type MessageActions = {
  getCountries: () => Promise<string[]>;
  postMessage: (
    name: Message['name'],
    message: Message['message'],
    gender: Message['gender'],
    country: Message['country']
  ) => Promise<string>;
  getAllMessages: (params?: GetAllMessagesParams) => Promise<{ messages: Message[]; meta: GetAllMessagesMetaResponse }>;
  getMessageById: (id: number) => Promise<Message | null>;
  readMessageById: (id: number) => Promise<string>;
  deleteMessageById: (id: number) => Promise<string>;
};

export type UsersState = {
  users: User[];
  selectedUser: User | null;
};

export type UsersActions = {
  getAllUsers: () => Promise<User[]>;
  getUserById: (id: number) => Promise<User | null>;
  updateUserById: (
    id: User['id'],
    username: User['username'],
    password: User['password'],
    base64Photo: User['base64Photo']
  ) => Promise<string>;
  addReaderUser: (
    username: User['username'],
    password: User['password'],
    base64Photo: User['base64Photo']
  ) => Promise<string>;
};

export type State = AuthState & MessageState & UsersState;
export type Actions = AuthActions & MessageActions & UsersActions;
export type Store = State & Actions;

export type LoginSuccessResponse = {
  data: {
    token: string;
    user: User;
  };
};

export type LoginErrorResponse = {
  error: string;
};

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

export type GetAllMessagesParams = {
  page: number;
  pageSize: 5 | 10 | 20 | 100;
  sortField: 'creationDate' | 'name' | 'gender' | 'country';
  sortOrder: 'desc' | 'asc';
};

export type GetAllMessagesMetaResponse = {
  totalMessages: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
