'use client';

import { Button } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function AddButton({ label }: { label: string }) {
  const router = useRouter();
  return (
    <Button variant="contained" startIcon={<PersonAdd />} onClick={() => router.push('/users/new')}>
      {label}
    </Button>
  );
}
