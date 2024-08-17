import { AccessTime, DoneAll } from '@mui/icons-material';
import { ChipOwnProps, Chip } from '@mui/material';

export function StatusChip({ read, labels }: { read: string; labels: { read: string; unread: string } }) {
  const isRead = read === 'true';
  const readValues: ChipOwnProps = { label: labels.read, color: 'primary', icon: <DoneAll />, variant: 'outlined' };
  const unreadValues: ChipOwnProps = {
    label: labels.unread,
    color: 'secondary',
    icon: <AccessTime />,
    variant: 'filled',
  };
  const { label, color, icon, variant } = isRead ? readValues : unreadValues;
  return <Chip label={label} color={color} size="small" icon={icon} variant={variant} sx={{ width: 110 }} />;
}
