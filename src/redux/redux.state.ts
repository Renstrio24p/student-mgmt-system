import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { StudentState, UserState } from './redux.types';
import { updateStudentData, updateUserData } from './redux.update';
import { postStudentData, postUserData } from './redux.add';
import { deleteStudentData, deleteUserData } from './redux.delete';
import { loginUser } from './redux.auth';

// Define initial state
const initialSliderState: StudentState = {
    studentData: [],
    status: 'idle',
    error: null,
};

const initialUserState: UserState = {
    userData: [],
    status: 'idle',
    error: null,
};

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
});

export const fetchStudentData = createAsyncThunk(
    'student/fetchStudentData',
    async () => {
        try {
            const response = await axiosInstance.get('/api/getall?type=students');
            return response.data.data;
        } catch (error) {
            throw new Error('Error fetching slider data');
        }
    }
);

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async () => {
        try {
            const response = await axiosInstance.get('/api/getall?type=users');
            return response.data.data;
        } catch (error) {
            throw new Error('Error fetching user data');
        }
    }
);

const updateSlice = createSlice({
    name: 'update',
    initialState: {
        status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserData.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            })
            .addCase(updateStudentData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateStudentData.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updateStudentData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            });
    },
});

const deleteSlice = createSlice({
    name: 'delete',
    initialState: {
        status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteUserData.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(deleteUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            })
            .addCase(deleteStudentData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteStudentData.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(deleteStudentData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            });
    },
});

// Create a slider slice
const studentSlice = createSlice({
    name: 'student',
    initialState: initialSliderState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStudentData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.studentData = action.payload;
            })
            .addCase(fetchStudentData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            })
            .addCase(postStudentData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postStudentData.fulfilled, (state, _action) => {
                state.status = 'succeeded';
            })
            .addCase(postStudentData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            });
    },
});


// Create a user slice
// Create a user slice
const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            })
            .addCase(postUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postUserData.fulfilled, (state, _action) => {
                state.status = 'succeeded';
            })
            .addCase(postUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload.userData;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.payload as AxiosError).message || 'Unknown error';
            });
    },
});


// Export actions and reducers
export const { } = studentSlice.actions;
export const { } = userSlice.actions;
export const { } = deleteSlice.actions;
export const { } = updateSlice.actions;

// Combine reducers and export the store
export default configureStore({
    reducer: {
        student: studentSlice.reducer,
        user: userSlice.reducer,
        delete: deleteSlice.reducer,
        update: updateSlice.reducer,
    }
});
