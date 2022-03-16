import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../axiosBaseQuery';
export { default as getUsers } from './get-users';
export { default as createUser } from './create-user';
export { default as getProfile } from './get-profile';
export { default as getUserMatches } from './user-matches';

export const userAPI = createApi({
  reducerPath: 'participants',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_API_ROOT
  }),
  endpoints: build => ({
    getUsers: build.query({
      query: academyId => ({
        url: `/users/${academyId}`,
        method: 'get'
      })
    })
  })
});

export const { useGetUsersQuery } = userAPI;
