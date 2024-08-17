'use client';

import { BarChart, PieChart } from '@mui/x-charts';
import { useAppStore } from '@/src/lib/zustand/provider';
import { useEffect, useMemo, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { getCountByCountry, getCountByGender } from '../lib/helper';
import { useTranslations } from 'next-intl';
import LinearLoader from './LinearLoader';

export default function Reports() {
  const t = useTranslations('Reports');
  const { messages, getAllMessages } = useAppStore((store) => store);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      await getAllMessages();
      setIsLoading(false);
    };

    fetchMessages();
  }, [getAllMessages]);

  const countryData = useMemo(() => getCountByCountry(messages), [messages]);
  const genderData = useMemo(() => getCountByGender(messages), [messages]);

  if (isLoading || !messages) {
    return <LinearLoader />;
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexDirection={{ xs: 'column', md: 'row' }}
      overflow="auto"
      p={{ xs: 0, md: 4 }}
      border={{ xs: 'none', md: '1px solid var(--palette-divider)' }}
      borderRadius={{ xs: 0, md: 1 }}
      bgcolor="var(--palette-background)"
      boxShadow={{ xs: 'none', md: '0 2px 10px var(--palette-divider)' }}
    >
      <Box
        width={{ xs: '100%', md: '48%' }}
        gap={2}
        display={'flex'}
        flexDirection={'column'}
        height={{ xs: 400, md: 500 }}
      >
        <Typography variant="h5">{t('messageCountByCountry')}</Typography>
        <BarChart
          yAxis={[{ scaleType: 'band', data: countryData.map((item) => item.country) }]}
          series={[
            {
              data: countryData.map((item) => item.count),
              label: t('messageCountByCountry'),
              color: 'var(--palette-primary-main)',
            },
          ]}
          margin={{ left: 120 }}
          layout="horizontal"
        />
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box
        width={{ xs: '100%', md: '48%' }}
        gap={2}
        display={'flex'}
        flexDirection={'column'}
        height={{ xs: 250, md: 320 }}
      >
        <Typography variant="h5">{t('messageCountByGender')}</Typography>
        <PieChart
          colors={['#FFC0CB', '#6495ED']}
          series={[
            {
              data: [
                { value: genderData.femaleCount, label: t('female') },
                { value: genderData.maleCount, label: t('male') },
              ],
              arcLabel: (d) => `${((d.value / (genderData.femaleCount + genderData.maleCount)) * 100).toFixed()}%`,
              cornerRadius: 8,
            },
          ]}
        />
      </Box>
    </Box>
  );
}
