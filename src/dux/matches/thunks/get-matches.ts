import store from '../../';
import { get, set } from '../';
import { getMatches } from 'api/match';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getMatchesThunk = createAsyncThunk(
  'matches/getAll',
  async (academyId: string) => {
    const result = await getMatches(academyId);
    return result;
  }
);

export default getMatchesThunk;
