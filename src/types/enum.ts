import findKey from 'lodash/findKey';
import get from 'lodash/get';

export enum EnumerationType {
  Integer,
  String
}

export interface SimpleEnumerationDropdownOption<T> {
  id: T;
  name: string;
  displayText: string;
}

export interface SimpleEnumerationSwitcherOption<T> {
  id: T;
  name: string;
  displayText: string;
}

export interface EnumFormatterOptions {
  attribute?: string;
  key?: string;
  defaultValue?: any;
}

export type EnumerationDropdownOption<T, U> = SimpleEnumerationDropdownOption<T> & U;
export type EnumerationSwitcherOption<T, U> = SimpleEnumerationSwitcherOption<T> & U;

export interface Enumeration<T, U> {
  valueOf: (predicate: any) => T;
  findBy: (predicate: any, ...args) => U | any;
  get: (...args) => U | undefined;
  toArray: () => U[];
  toSelectionOptions: (valueMap?: { [key: string]: object }) => EnumerationDropdownOption<T, U>[];
  singleDisplayText: string;
  pluralDisplayText: string;
  enumerationType: EnumerationType;
}

export interface EnumerationObject {
  id: number | string;
  name: string;
}

const parsers = {
  [EnumerationType.Integer](x: string): number | undefined {
    const num = parseInt(x, 10);
    return Number.isNaN(num)
      ? undefined
      : num;
  },
  [EnumerationType.String](x: string) {
    return x;
  },
};

export function createEnum<T, U>(
  object: any,
  options: {
    enumerationType?: EnumerationType;
    singleDisplayText: string;
    pluralDisplayText: string;
  },
): Enumeration<T, U> {
  const { enumerationType, singleDisplayText, pluralDisplayText } = options;

  Object.entries(object).forEach(([key, value]) => {
    const val = value;
    (val as any).id = enumerationType === EnumerationType.Integer
      ? parseInt(key, 10)
      : key;
  });

  const asArray: EnumerationObject[] = Object.entries(object).map(([, value]) => value as EnumerationObject);

  Object.defineProperties(object, {
    singleDisplayText: {
      value: singleDisplayText,
      enumerable: false,
    },
    pluralDisplayText: {
      value: pluralDisplayText,
      enumerable: false,
    },
    enumerationType: {
      value: enumerationType,
      enumerable: false,
    },
    valueOf: {
      value: (predicate) => parsers[enumerationType](findKey(object, predicate)),
      enumerable: false,
    },
    findBy: {
      value: (predicate, ...args) => {
        const theObject = object[findKey(object, predicate)];
        if (args.length) {
          return get.call(null, theObject, ...args);
        }
        return theObject;
      },
      enumerable: false,
    },
    get: {
      value: (...args) => get.call(null, object, ...args),
      enumerable: false,
    },
    toArray: {
      value: () => asArray,
      enumerable: false,
    },
    toSelectionOptions: {
      value: (valueMap) => asArray.map((item) => {
        if (valueMap && valueMap[item.id]) {
          return {
            ...valueMap[item.id],
            id: item.id,
            displayText: item.name,
          };
        }
        return {
          id: item.id,
          displayText: item.name,
        };
      }),
      enumerable: false,
    },
  });

  return object;
}
