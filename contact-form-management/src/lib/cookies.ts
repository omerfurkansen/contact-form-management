'use server';

import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { Locale, defaultLocale } from '@/i18n/config';

export const setTokenCookie = async (token: string) => {
  cookies().set('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
};

export const getTokenCookie = async (request?: NextRequest) => {
  const allCookies = request?.cookies || cookies();
  const token = allCookies.get('token')?.value;
  return token;
};

export const removeTokenCookie = async () => {
  cookies().delete('token');
};

export async function getUserLocale() {
  return cookies().get('NEXT_LOCALE')?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  cookies().set('NEXT_LOCALE', locale);
}
