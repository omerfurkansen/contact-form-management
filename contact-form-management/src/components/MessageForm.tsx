'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '../lib/zustand/provider';
import { TextareaAutosize, Box, TextField, RadioGroup, Radio, FormControlLabel, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { messageFormSchema } from '../lib/utils/validationSchema';
import { useSnackbar } from '../context/SnackbarContext';
import { StyledForm, GenderLabel, GenderTextField, SubmitButton, TextareaErrorTypography } from './styled';
import { useTranslations } from 'next-intl';
import { type Gender } from '../lib/types';

export default function MessageForm() {
  const t = useTranslations('MessageForm');
  const { postMessage, getCountries } = useAppStore((store) => store);
  const { showSnackbar } = useSnackbar();
  const [countries, setCountries] = useState<string[]>([]);

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } = useFormik({
    initialValues: { name: '', gender: 'female' as Gender, country: 'Türkiye', message: '' },
    validationSchema: messageFormSchema(
      { name: t('nameRequired'), message: t('messageRequired') },
      { name: t('maxNameLength'), message: t('maxMessageLength') }
    ),
    onSubmit: async (values) => {
      const error = await postMessage(values.name, values.message, values.gender, values.country);
      if (error) {
        showSnackbar(error, 'error');
      } else {
        showSnackbar(t('thankYou'), 'success');
      }
    },
  });

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getCountries();
      setCountries(countries);
    };

    fetchCountries();
  }, [getCountries]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextField
        name="name"
        label={t('name')}
        value={values.name}
        onChange={handleChange}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
        autoComplete="off"
      />
      <Box>
        <GenderLabel id="gender-radio-group">{t('gender')}</GenderLabel>
        <RadioGroup
          aria-labelledby="gender-radio-group"
          name="gender"
          value={values.gender}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label={<GenderTextField gender="male" label={{ male: t('male') }} />}
          />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label={<GenderTextField gender="female" label={{ female: t('female') }} />}
          />
        </RadioGroup>
      </Box>
      <Autocomplete
        disableClearable
        options={countries}
        value={values.country}
        onChange={(e, value) => handleChange({ target: { name: 'country', value } })}
        renderInput={(params) => <TextField {...params} label={t('country')} />}
      />
      <TextField
        name="message"
        label={t('message')}
        value={values.message}
        onChange={handleChange}
        error={touched.message && Boolean(errors.message)}
        helperText={touched.message && errors.message}
        autoComplete="off"
        InputProps={{
          inputComponent: TextareaAutosize,
          inputProps: { minRows: 3, sx: { padding: '14px 16.5px 30px 16.5px', resize: 'none' } },
          endAdornment: <TextareaErrorTypography messageLength={values.message.length} />,
          sx: { padding: 0 },
        }}
      />
      <SubmitButton
        isSubmitting={isSubmitting}
        isDisabled={isSubmitting || Object.values(values).some((value) => value === '') || values.message.length > 500}
        label={t('submit')}
      />
    </StyledForm>
  );
}
