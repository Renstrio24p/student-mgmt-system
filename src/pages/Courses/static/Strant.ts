import { CourseType, generateCourseId } from "../types/CourseType";

export const StrandData: CourseType = [
    {
        id: generateCourseId(),
        image: 'https://img-c.udemycdn.com/course/750x422/984396_ed16_3.jpg',
        name: 'STEM',
        category: 'STRAND',
        desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur arcu eu ligula tempus mattis. Suspendisse pharetra porttitor congue. Duis scelerisque in velit nec ultricies.`,
        status: true,
        difficulty: 'easy',
        intructor: 'unknown',
        profile: '',
        date: '23rd of April 2024'
    },
]