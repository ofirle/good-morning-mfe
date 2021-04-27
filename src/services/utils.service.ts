import { SortOrder } from 'antd/lib/table/interface';

export const buildUrl = (obj: any) =>
  Object.keys(obj)
    .reduce((acc, next) => {
      const values = obj[next]
        .reduce((a: any, n: any) => {
          a.push(`${next}=${n}`);
          return a;
        }, [])
        .join('&');
      acc.push(values);
      return acc;
    }, [])
    .join('&');

export const filterToSortObject = (key: string, filters: any): SortOrder => {
  if (filters._sort[0] && filters._sort[0] === key) {
    if (filters._order[0] && filters._order[0]) {
      return toTableSortOrder(filters._order[0]);
    }
  }
  return null;
};

export const toTableSortOrder = (order: string) => (order === 'asc' ? 'ascend' : 'descend');

export const toAPISortOrder = (order: string) => (order === 'ascend' ? 'asc' : 'desc');

export const parseToken = () => {
  const authStr = window.localStorage.getItem('supersonic_admin_auth_session');
  try {
    const parsed = JSON.parse(authStr);
    return `Bearer ${parsed.token}`;
  } catch (e) {
    return null;
  }
};
