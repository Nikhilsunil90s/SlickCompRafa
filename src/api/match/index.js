import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../axiosBaseQuery';
export { default as getMatchById } from './get-match-by-id';
export { default as getMatches } from './get-matches';
export { default as putMatch } from './put-match';
export { default as postMatch } from './post-match';
export { default as postMatchResult } from './post-match-result';

export const matchesAPI = createApi({
  reducerPath: 'matches',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_API_ROOT
  }),
  endpoints: build => ({
    getMatches: build.query({
      query: academyId => ({
        url: `/matches/${academyId}`,
        method: 'get'
      })
    }),
    getMatchById: build.query({
      query: ({ matchId, academyId }) => ({
        url: `/match/${matchId}/${academyId}`
      })
    }),
    getMatchResult: build.query({
      query: ({ matchId, academyId }) => ({
        url: `/match-result/${matchId}/${academyId}`
      })
    })
  })
});

export const {
  useGetMatchesQuery,
  useGetMatchByIdQuery,
  useGetMatchResultQuery
} = matchesAPI;
