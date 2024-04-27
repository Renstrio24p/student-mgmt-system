type Difficulty = 'easy' | 'intermediate' | 'Advanced';

export type CourseType = {
    id: number,
    category: string,
    image: string,
    name: string,
    desc: string,
    status: boolean,
    difficulty: Difficulty,
    intructor: string,
    profile: string,
    date: string
}[];

let courseIdCounter = 0;

export function generateCourseId(): number {
    return ++courseIdCounter;
}
