
export type StudentType = {
    _id?: number | number,
    name: string,
    image: string,
    address: string,
    tel: string | number,
    course: string[],
    date: string,
    desc: string,
    email: string,
    password: string,
}[]

let courseIdCounter = 0;

export function generateStudentId(): number {
    return ++courseIdCounter;
}