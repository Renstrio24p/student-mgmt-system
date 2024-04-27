import { toCapitalized } from "components/tools/toCapitalized";
import { CourseType } from "../types/CourseType";

export default function Card(DOM: HTMLElement, Course: CourseType) {

    const courses = Course.map((course) => {
        let difficultyClass = '';
        if (course.difficulty === 'easy') {
            difficultyClass = 'bg-teal-600';
        } else if (course.difficulty === 'intermediate') {
            difficultyClass = 'bg-yellow-500';
        } else {
            difficultyClass = 'bg-red-400';
        }

        return (`
            <div key=${course.id} class='group card relative overflow-hidden rounded-sm shadow-lg cursor-pointer'>
                <img class='absolute inset-0 object-cover w-full h-full opacity-20' src='https://i.pinimg.com/736x/07/d8/67/07d867d81eab5a0a0c8489d59ed4696c.jpg' alt='bg-image'/>
                <div class='relative overflow-hidden w-full h-[200px]'>
                    <img class='w-full h-full transition duration-500 ease-in-out transform group-hover:scale-150' src='${course.image}' alt='${course.name}' />
                </div>
                <div class='px-2 py-4'>
                    <h2 class='mb-2'>${course.name}</h2>
                    <p class='text-[12px]'>${course.desc}</p>
                    <div class="absolute top-1 right-1 ${difficultyClass} py-0 px-2 rounded-sm">
                        <p class='text-[12px]'>${toCapitalized(course.difficulty)}</p>
                    </div>
                    <div class='flex gap-4 my-3 items-center'>
                        <img class='w-[40px] rounded-full' src='${course.profile}' alt='intructor profile' />
                        <div class='text-[12px]'>
                            <h2 class='font-semibold'>By. ${course.intructor}</h2>
                            <p class='text-[10px]'>Created on ${course.date}</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }).join("");

    // Main UI

    DOM.innerHTML = (`
        <div class='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-content-stretch gap-4'>
            ${courses}
        </div>
    `);
}
