import { Placeholder } from "components/types/Placeholder";
import { StudentType } from "pages/Students/types/Student";

export interface UserData {
    name: string;
    email: string;
    role: string;
    password: string;
    image: string;
}

export interface StudentData {
    name: string,
    course: string[],
    address: string,
    date: string,
    desc: string
}

export type Common = {
    student: StudentType
    user: Placeholder
}

export type StudentState = {
    studentData: StudentType,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
}

export type UserState = {
    userData: Placeholder,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
}