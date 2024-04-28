import { createAsyncThunk } from "@reduxjs/toolkit";
import { StudentData, UserData } from "./redux.types";
import { axiosInstance } from "./redux.state";

export const postStudentData = createAsyncThunk(
    'student/postStudentData',
    async (userData: StudentData) => {
        try {
            const res = await axiosInstance.post('/api/add?type=student', userData);
            alert(`${res.statusText = `${res.data.name} added successfully..`}`);
            window.location.href = '/dashboard/student/';
            return res.data;
        } catch (error) {
            throw new Error('Error Adding Student Data');
        }
    }
);

// Add Data API for User
export const postUserData = createAsyncThunk(
    'user/postUserData',
    async (userData: UserData) => {
        try {
            const res = await axiosInstance.post('/api/add?type=users', userData);
            alert(`${res.statusText = `${res.data.name} added successfully..`}`);
            window.location.href = '/dashboard/users/';
            return res.data;
        } catch (error) {
            throw new Error('Error Adding User Data');
        }
    }
);