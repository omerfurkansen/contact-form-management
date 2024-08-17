import type { Metadata } from 'next';
import './globals.css';
import { SnackbarProvider } from '@/src/context/SnackbarContext';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { Experimental_CssVarsProvider as CssVarsProvider, CssBaseline } from '@mui/material';
import { StoreProvider } from '@/src/lib/zustand/provider';
import theme from '@/src/styles/theme';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: {
    template: '%s | Contact Form Management System',
    default: 'Home | Contact Form Management System',
  },
  description: 'A contact form management system',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <StoreProvider>
            <AppRouterCacheProvider>
              <CssVarsProvider theme={theme} defaultMode="system" modeStorageKey="theme" colorSchemeStorageKey="theme">
                <InitColorSchemeScript defaultMode="system" modeStorageKey="theme" colorSchemeStorageKey="theme" />
                <CssBaseline enableColorScheme={true} />
                <SnackbarProvider>{children}</SnackbarProvider>
              </CssVarsProvider>
            </AppRouterCacheProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
