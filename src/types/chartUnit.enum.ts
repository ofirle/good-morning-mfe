import { createEnum, EnumerationObject, EnumerationType } from './enum';

export enum ChartUnit {
  Time = 'time',
  Currency = 'currency',
  Percentages = 'percentages',
  Raw = 'raw'
}

export interface ChartUnitObject extends EnumerationObject {
  sign: string;
}

export const chartUnitEnum = createEnum<ChartUnit, ChartUnitObject>(
  {
    [ChartUnit.Time]: {
      sign: ' sec',
    },
    [ChartUnit.Currency]: {
      sign: '¢',
    },
    [ChartUnit.Percentages]: {
      sign: '%',
    },
    [ChartUnit.Raw]: {
      sign: '',
    },
  },
  {
    enumerationType: EnumerationType.String,
    singleDisplayText: 'Chart Unit',
    pluralDisplayText: 'Chart Units',
  },
);
