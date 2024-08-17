'use client';

import { useTransition } from 'react';
import { usePopupState, bindHover, bindMenu, bindToggle } from 'material-ui-popup-state/hooks';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
  Box,
  useColorScheme,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Logout,
  Mail,
  MailOutline,
  People,
  PeopleOutline,
  InsertChart,
  InsertChartOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Translate,
} from '@mui/icons-material';
import { useAppStore } from '../../lib/zustand/provider';
import { useRouter, usePathname } from 'next/navigation';
import { useSnackbar } from '../../context/SnackbarContext';
import { READER_ROUTES, ADMIN_ROUTES, USER_ROLE } from '../../lib/constants';
import { setUserLocale, getUserLocale } from '../../lib/cookies';
import { useTranslations } from 'next-intl';
import LinearLoader from '../LinearLoader';
import * as S from './styled';
import logo from '../../../assets/logo.png';
import Image from 'next/image';

export default function AppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user } = useAppStore((store) => store);
  const { showSnackbar } = useSnackbar();
  const { mode, systemMode, setMode } = useColorScheme();
  const isDarkMode = systemMode === 'dark' || mode === 'dark';
  const t = useTranslations('AppBar');
  const userMenuState = usePopupState({ variant: 'popover', popupId: 'userMenu' });
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    userMenuState.close();
    const responseMessage = await logout();
    if (responseMessage.includes('error')) {
      showSnackbar(responseMessage, 'error');
    } else {
      showSnackbar(t('loggedOut'), 'success');
      router.push('/login');
    }
  };

  const toggleColorMode = () => {
    setMode(isDarkMode ? 'light' : 'dark');
  };

  const handleLocaleChange = async () => {
    const userLocale = await getUserLocale();
    const locale = userLocale === 'en' ? 'tr' : 'en';
    startTransition(async () => {
      await setUserLocale(locale);
    });
  };

  const navigationIcons = [
    { icon: <MailOutline />, selected: <Mail />, tooltip: t('messages'), routePathname: '/messages' },
    { icon: <PeopleOutline />, selected: <People />, tooltip: t('users'), routePathname: '/users' },
    { icon: <InsertChartOutlined />, selected: <InsertChart />, tooltip: t('reports'), routePathname: '/reports' },
  ];

  const renderNavigationIcons = (screenSize: 'desktop' | 'mobile' = 'desktop') => {
    const routes = user?.role === USER_ROLE.ADMIN ? ADMIN_ROUTES : READER_ROUTES;

    if (screenSize === 'mobile') {
      return navigationIcons
        .filter((icon) => routes.includes(icon.routePathname))
        .map((icon) => (
          <BottomNavigationAction
            key={icon.routePathname}
            label={icon.tooltip}
            icon={pathname === icon.routePathname ? icon.selected : icon.icon}
            onClick={() => router.push(icon.routePathname)}
          />
        ));
    }

    return navigationIcons
      .filter((icon) => routes.includes(icon.routePathname))
      .map((icon) => (
        <Tooltip key={icon.routePathname} title={icon.tooltip}>
          <IconButton color="inherit" onClick={() => router.push(icon.routePathname)}>
            {pathname === icon.routePathname ? icon.selected : icon.icon}
          </IconButton>
        </Tooltip>
      ));
  };

  const renderUserMenuItems = () => (
    <>
      <S.UsernameMenuItem onClick={userMenuState.close}>{user?.username}</S.UsernameMenuItem>
      <S.DropdownMenuItem onClick={toggleColorMode}>
        {isDarkMode ? (
          <LightModeOutlined color="primary" fontSize="small" />
        ) : (
          <DarkModeOutlined color="primary" fontSize="small" />
        )}
        {isDarkMode ? t('lightMode') : t('darkMode')}
      </S.DropdownMenuItem>
      <S.DropdownMenuItem onClick={handleLocaleChange}>
        <Translate color="primary" fontSize="small" />
        {t('changeLanguage')}
      </S.DropdownMenuItem>
      <S.DropdownMenuItem onClick={handleLogout}>
        <Logout color="primary" fontSize="small" />
        {t('logout')}
      </S.DropdownMenuItem>
    </>
  );

  return (
    <MuiAppBar position="static" sx={{ boxSizing: 'content-box', height: 'var(--header-height)' }}>
      {isPending && <LinearLoader />}
      <Toolbar>
        <Typography component="div" sx={{ flexGrow: 1 }} fontSize={{ xs: '.8rem', sm: '1rem' }} display='flex' alignItems='center' gap={1}>
          <Image src={logo} alt={t('appTitle')} width={30} height={30} />
          {t('appTitle')}
        </Typography>
        <Box display="flex" alignItems="center">
          {!isMobile && (
            <>
              <S.UserMenuWrapper
                {...bindMenu(userMenuState)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <S.UserMenu>{renderUserMenuItems()}</S.UserMenu>
              </S.UserMenuWrapper>
              <Box>{renderNavigationIcons('desktop')}</Box>
            </>
          )}
          <IconButton color="inherit" {...(isMobile ? bindToggle(userMenuState) : bindHover(userMenuState))}>
            <S.UserAvatar alt={user?.username} src={user?.base64Photo} />
          </IconButton>
        </Box>
      </Toolbar>
      {isMobile && (
        <>
          <S.StyledDrawer anchor="right" open={userMenuState.isOpen} onClose={userMenuState.close}>
            {renderUserMenuItems()}
          </S.StyledDrawer>
          <S.BottomNavigationWrapper>
            <S.StyledBottomNavigation showLabels>{renderNavigationIcons('mobile')}</S.StyledBottomNavigation>
          </S.BottomNavigationWrapper>
        </>
      )}
    </MuiAppBar>
  );
}
