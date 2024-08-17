import * as yup from 'yup';

export const loginSchema = (t: { username: string; password: string }) =>
  yup.object({
    username: yup.string().required(t.username),
    password: yup.string().required(t.password),
  });

export const messageFormSchema = (
  required: { name: string; message: string },
  max: { name: string; message: string }
) =>
  yup.object({
    name: yup.string().required(required.name).max(50, max.name),
    message: yup.string().required(required.message).max(500, max.message),
    gender: yup.string().required(),
    country: yup.string().required(),
  });

export const userFormSchema = (
  required: { username: string; password: string; photo: string },
  max: { username: string; password: string }
) =>
  yup.object({
    username: yup.string().required(required.username).max(10, max.username),
    password: yup.string().required(required.password).max(10, max.password),
    base64Photo: yup.string().required(required.photo),
  });
