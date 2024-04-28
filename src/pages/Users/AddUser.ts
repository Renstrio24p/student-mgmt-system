import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

const fetchResourceData = createAsyncThunk(
  'resource/fetchResourceData',
  async (type: string) => {
    try {
      const response = await axiosInstance.get(`/api/getall?type=${type}`);
      return response.data.data;
    } catch (error) {
      throw new Error(`Error fetching ${type} data`);
    }
  }
);

const postResourceData = createAsyncThunk(
  'resource/postResourceData',
  async ({ type, data }: { type: string, data: any }) => {
    try {
      await axiosInstance.post(`/api/${type}`, data);
    } catch (error) {
      throw new Error(`Error posting ${type} data`);
    }
  }
);

const resourceSlice = createSlice({
  name: 'resource',
  initialState: { data: [], status: 'idle' } as { data: any[], status: 'idle' | 'loading' | 'succeeded' | 'failed' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResourceData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResourceData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchResourceData.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(postResourceData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postResourceData.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(postResourceData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

const initialState: { resource: { data: any[], status: 'idle' | 'loading' | 'succeeded' | 'failed' } } = {
  resource: { data: [], status: 'idle' },
};

export const store = configureStore({
  reducer: {
    resource: resourceSlice.reducer,
  },
  preloadedState: initialState,
});

export const fetchStudentData = () => fetchResourceData('students');
export const fetchUserData = () => fetchResourceData('users');
export const postStudentData = (data: any) => postResourceData({ type: 'students', data });
export const postUserData = (data: any) => postResourceData({ type: 'users', data });

export const studentDataSelector = (state: any) => state.resource.data.filter((item: any) => item.type === 'students');
export const userDataSelector = (state: any) => state.resource.data.filter((item: any) => item.type === 'users');
