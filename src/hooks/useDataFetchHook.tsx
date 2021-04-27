import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import debounce from 'lodash/debounce';
import { useHistory, useLocation } from 'react-router-dom';
import { buildUrl } from '../services/utils.service';

export type DataFetchHookType = {
  useQueryString?: boolean | undefined,
  defaultFilters: {
    [key: string]: any[]
    _order?: string[]
    _sort?: string[]
    _limit?: number[]
    _page?: number[]
  },
  httpConfig: AxiosRequestConfig,
  debounceDelay?: number | undefined
};

function queryToJson(location: any) {
  if (!location.search) {
    return {};
  }
  const e = new URLSearchParams(location.search);
  const o: any = {};
  e.forEach((value, key: string) => {
    if (!o[key]) {
      o[key] = [];
    }
    o[key].push(value);
  });
  return o;
}

const useDataFetchHook = (params: DataFetchHookType) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const location = useLocation();
  const queryParams = params.useQueryString ? queryToJson(location) : {};
  const [filters, setFilters] = useState({
    ...params.defaultFilters,
    ...queryParams
  });
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const queryString = buildUrl(filters);
    const urlQueryString = buildUrl({
      ...filters,
      embed: []
    });
    const url = `${params.httpConfig.url}${queryString}`;
    axios({ ...params.httpConfig, url }).then(res => {
      setLoading(false);
      setData((res.data));
      if (params.useQueryString) {
        history.push(`?${urlQueryString}`);
      }
    }).catch(() => setLoading(false));
  }, [filters]);

  const applyFilters = (key: any, value: any) => {
    setFilters((state: any) => ({ ...state, [key]: value }));
  };

  const applyMultipleFilters = (_filters: any) => {
    setFilters((state: any) => ({ ...state, ..._filters }));
  };

  const applyFiltersDebounced = debounce(applyFilters, params.debounceDelay || 700);

  return {
    setFilters,
    applyFilters,
    applyFiltersDebounced,
    data,
    loading,
    filters,
    applyMultipleFilters
  };
};

export default useDataFetchHook;


