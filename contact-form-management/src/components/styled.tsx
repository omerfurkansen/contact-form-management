import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  TextField,
  TextFieldProps,
  TextareaAutosize,
  Toolbar,
  Typography,
  TableContainer,
  TableCell,
  TableRow,
  styled,
  TablePagination,
} from '@mui/material';
import { Female, Male } from '@mui/icons-material';
import { type Gender } from '../lib/types';

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  textAlign: 'center',
}));

export const GoToHomepageButton = styled(Button)({
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline',
  },
});

export const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  border: `1px solid ${theme.vars.palette.divider}`,
  borderRadius: theme.vars.shape.borderRadius,
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    width: '70%',
  },

  [theme.breakpoints.up('md')]: {
    width: '50%',
  },
}));

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  border: `1px solid ${theme.vars.palette.divider}`,
  borderRadius: theme.vars.shape.borderRadius,
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const GenderTextField = ({ gender, label }: { gender: Gender; label: { male?: string; female?: string } }) => (
  <Box display="flex" alignItems="center" textTransform="capitalize" ml={-0.5}>
    {gender === 'female' ? <Female /> : <Male />}
    {gender === 'female' ? label.female : label.male}
  </Box>
);

export const DetailTextField = ({
  label = '',
  value = '',
  withTextArea = false,
  startAdornment = null,
}: TextFieldProps & { withTextArea?: boolean; startAdornment?: React.ReactNode }): JSX.Element => (
  <TextField
    label={label}
    value={value}
    InputProps={{
      readOnly: true,
      startAdornment,
      ...(withTextArea && {
        inputComponent: TextareaAutosize,
        inputProps: { minRows: 3, sx: { padding: '14px 16.5px 30px 16.5px', resize: 'none' } },
        sx: { padding: 0 },
      }),
    }}
  />
);

export const GenderLabel = styled(FormLabel)({
  fontSize: '0.75rem',
  marginBottom: '0.5rem',
});

export const SubmitButton = ({
  isSubmitting,
  isDisabled,
  label,
}: {
  isSubmitting: boolean;
  isDisabled: boolean;
  label: string | React.ReactNode;
}) => (
  <Button type="submit" variant="contained" color="primary" disabled={isDisabled} sx={{ height: '40px' }}>
    {isSubmitting ? <CircularProgress size={20} color="inherit" /> : label}
  </Button>
);

export const TextareaErrorTypography = ({ messageLength }: { messageLength: number }) => (
  <Typography
    variant="caption"
    sx={{
      position: 'absolute',
      bottom: '8px',
      right: '16.5px',
      color: messageLength > 500 ? 'error.main' : 'text.secondary',
      alignSelf: 'flex-end',
    }}
  >
    {messageLength}/500
  </Typography>
);

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: 'auto',
  boxSizing: 'content-box',
  border: `1px solid ${theme.vars.palette.divider}`,
  borderRadius: theme.vars.shape.borderRadius,
  boxShadow: `0 2px 10px ${theme.vars.palette.divider}`,
  height: `calc(var(--content-height) - var(--header-height) - ${theme.spacing(16)})`,
  maxHeight: '745px',

  [theme.breakpoints.down('md')]: {
    height: `calc(var(--content-height) - var(--header-height) * 2 - ${theme.spacing(16)})`,
    maxHeight: '460px',
  },
}));

export const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.vars.palette.primary.main,
  color: theme.vars.palette.primary.contrastText,

  '&:last-child': {
    paddingRight: theme.spacing(3),
    textAlign: 'right',
  },

  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  },
}));

export const BodyTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.vars.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const BodyCell = styled(TableCell)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  },
}));

export const BodyTypography = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export function BodyCellWithWidth({ content, width }: { content: string | React.ReactNode; width: number }) {
  return (
    <BodyCell sx={{ width: width, maxWidth: width }}>
      {typeof content === 'string' ? <BodyTypography variant="body2">{content}</BodyTypography> : content}
    </BodyCell>
  );
}

export const StyledTablePagination = styled(TablePagination)<{component: keyof JSX.IntrinsicElements}>(({ theme }) => ({
  backgroundColor: theme.vars.palette.background.paper,
  borderRadius: theme.vars.shape.borderRadius,

  '& .MuiTablePagination-toolbar': {
    padding: 0,
  },

  [theme.breakpoints.down('md')]: {
    '& .MuiTablePagination-input, & .MuiTablePagination-select, & .MuiTablePagination-selectLabel': {
      display: 'none',
    },
  },
}));

export const StyledTableButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(1),
  height: '52px',
  marginTop: theme.spacing(2),
}));
