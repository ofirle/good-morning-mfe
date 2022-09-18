import { SortOrder } from 'antd/lib/table/interface';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Model } from '../types/model';

export const buildParams = (obj: any, excludeFilters?: any) => {
  const filterFunc = excludeFilters
    ? (f) => !excludeFilters[f]
    : () => true;
  const params = Object.keys(obj)
    .filter(filterFunc)
    .reduce((acc: any, next) => {
      const values = (obj[next] || [])
        .reduce((a: any, n: any) => {
          if (n) {
            a.push(`${next}=${n}`);
          }
          return a;
        }, [])
        .join('&');
      acc.push(values);
      return acc;
    }, []);
  return params.filter(Boolean).join('&');
};

export const buildBaseUrl = () => `${window.platforms.apiHost}/${window.platforms.apiVersion}/${window.platforms.platform}`;

export const buildFullUrl = (action: string, model?: typeof Model, obj = {}) => {
  let url = buildBaseUrl();
  url += model
    ? `/${model.plural}`
    : '';
  url += action
    ? `/${action}`
    : '';
  url += `?${buildParams(obj)}`;

  return url;
};

export const filterToSortObject = (key: string, filters: any): SortOrder => {
  if (filters._sort[0] && filters._sort[0] === key) {
    if (filters._order[0] && filters._order[0]) {
      return toTableSortOrder(filters._order[0]);
    }
  }
  return null;
};

export function updateToken() {
  const getAuthorizationValue = () => {
    const adminAuth = window.localStorage.getItem('supersonic_admin_auth_session');
    const partnersAuth = window.localStorage.getItem('supersonic_partners_auth_session');
    try {
      const parsed = JSON.parse(adminAuth || partnersAuth || '');
      return `Bearer ${parsed.token}`;
    } catch (e) {
      return null;
    }
  };
  const token = getAuthorizationValue();
  if (token) {
    axios.defaults.headers.common.authorization = token;
  }
}

export const toTableSortOrder = (order: string) => (order === 'asc'
  ? 'ascend'
  : 'descend');

export const toAPISortOrder = (order: string) => (order === 'ascend'
  ? 'asc'
  : 'desc');

export const getFetch = ({ url, ...params }) => (
  axios({
    url: `${buildBaseUrl()}${url}`,
    ...params,
  })
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => {
      throw err;
    })
);

export const arrayToMap = (array = [], key = 'id') => (
  array.reduce((acc, item) => {
    acc.set(item[key], item);
    return acc;
  }, new Map())
);
