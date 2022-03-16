import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, Method } from 'axios';
type RequestParam = {
  url: string;
  method: Method;
  data?: any;
};

type QueryFn = BaseQueryFn<RequestParam, unknown, unknown>;

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): QueryFn =>
  async ({ url, method, data }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      const err: AxiosError = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data }
      };
    }
  };
export default axiosBaseQuery;
