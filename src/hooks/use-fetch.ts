/** @format */

type ObjectType = {[key: string]: string | number | boolean};

interface IFetch {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: ObjectType;
  headers?: ObjectType;
  params?: ObjectType;
}

const useFetch = () => {
  const BASE_URL = 'https://stg.starzly.io/api';

  const fetchData = async ({
    headers = {},
    method = 'GET',
    params = {},
    url,
  }: IFetch) => {
    const req_headers = {
      Accept: 'application/json',
      ...headers,
    };

    const requestInfo: RequestInit = {
      method: method || 'GET',
      headers: req_headers,
    };

    Object.keys(params).forEach(key => {
      if (key === 'for') {
      } else {
        if (!params[key] || params[key] === 'false') {
          delete params[key];
        }
      }
    });

    Object.keys(params).forEach((key, index) => {
      if (params[key]) {
        if (index === 0) {
          url += `?${key}=${encodeURIComponent(params[key])}`;
        } else {
          url += `&${key}=${encodeURIComponent(params[key])}`;
        }
      }
    });
    console.log(url);
    const response = await fetch(url, requestInfo);
    // const response = await fetch(encodeURI(url), requestInfo);

    const data = await response.json();
    const statusCode = response.status;

    return {data, statusCode, response};
  };

  const feed = async ({
    params,
  }: {
    params: {
      page?: number;
      per_page?: number;
      app?: string | number;
      new?: boolean | number;
    };
  }) => {
    return await fetchData({
      params,
      url: `${BASE_URL}/featured-videos`,
    });
  };

  return {
    feed,
  };
};

export default useFetch;
