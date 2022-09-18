import { createEnum, EnumerationObject, EnumerationType } from './enum';

export enum CohortBreakdown {
  None = 'none',
  MediaSource = 'media_source',
  Title = 'published_id',
  Country = 'country_code',
}

// tslint:disable-next-line:no-empty-interface
export interface CohortBreakdownObject extends EnumerationObject {}

export const cohortBreakdownEnum = createEnum<CohortBreakdown, CohortBreakdownObject>(
  {
    [CohortBreakdown.MediaSource]: {
      name: 'Media Source',
    },
    [CohortBreakdown.Title]: {
      name: 'Title',
    },
    [CohortBreakdown.Country]: {
      name: 'Country',
    },
  },
  {
    enumerationType: EnumerationType.String,
    singleDisplayText: 'Breakdown',
    pluralDisplayText: 'Breakdowns',
  },
);
