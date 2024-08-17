import { type GetAllMessagesParams, type Gender } from './types';

interface CountryCount {
  country: string;
  count: number;
}

interface GenderCount {
  maleCount: number;
  femaleCount: number;
}

export const getCountByCountry = (arrData: { country: string; gender: Gender }[]): CountryCount[] => {
  const countryCountMap: Record<string, number> = {};

  arrData.forEach((message) => {
    countryCountMap[message.country] = (countryCountMap[message.country] || 0) + 1;
  });

  const sortedCountryCounts = Object.entries(countryCountMap)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);

  return sortedCountryCounts;
};

export const getCountByGender = (arrData: { country: string; gender: Gender }[]): GenderCount => {
  const genderCount: GenderCount = { maleCount: 0, femaleCount: 0 };

  arrData.forEach((message) => {
    if (message.gender === 'male') {
      genderCount.maleCount += 1;
    } else if (message.gender === 'female') {
      genderCount.femaleCount += 1;
    }
  });

  return genderCount;
};

export const getSortField = (sortField: string, t: any): GetAllMessagesParams['sortField'] => {
  let newSortField: GetAllMessagesParams['sortField'];
  switch (sortField) {
    case t('name'):
      newSortField = 'name';
      break;
    case t('country'):
      newSortField = 'country';
      break;
    case t('gender'):
      newSortField = 'gender';
      break;
    default:
      newSortField = 'creationDate';
      break;
  }

  return newSortField;
};
