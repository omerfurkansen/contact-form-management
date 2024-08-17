import { styled } from '@mui/material/styles';
import { Box, Avatar, BottomNavigation, MenuItem, Drawer } from '@mui/material';
import HoverMenu from 'material-ui-popup-state/HoverMenu';

export const UserMenuWrapper = styled(HoverMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    marginTop: theme.spacing(-1),
    background: 'transparent',
    borderRadius: theme.vars.shape.borderRadius,
    boxShadow: 'none',
  },
}));

export const UserMenu = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  marginTop: theme.spacing(1),
  borderRadius: theme.vars.shape.borderRadius,
  border: `1px solid ${theme.vars.palette.divider}`,
  boxShadow: `0 2px 10px ${theme.vars.palette.divider}`,
  background: theme.vars.palette.background.paper,
}));

export const UsernameMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.vars.palette.text.secondary,
  '&:hover': {
    background: 'transparent',
    cursor: 'default',
  },
}));

export const DropdownMenuItem = styled(MenuItem)(({ theme }) => ({
  gap: theme.spacing(0.5),
  '&:hover': {
    background: 'transparent',
    textDecoration: 'underline',
  },
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.vars.palette.primary.contrastText,
}));

export const BottomNavigationWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
}));

export const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  width: '100%',
  borderTop: `1px solid ${theme.vars.palette.divider}`,
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 240,
    padding: theme.spacing(2),
    borderLeft: `1px solid ${theme.vars.palette.divider}`,
    borderRadius: `${theme.vars.shape.borderRadius} 0 0 ${theme.vars.shape.borderRadius}`,
  },
}));
