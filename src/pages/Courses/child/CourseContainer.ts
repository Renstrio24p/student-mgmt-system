import Card from "./Card";
import { CourseType } from "../types/CourseType";
import { courses } from "../static/Data";
import { useTSElements } from "utils/hooks/useTSElements";

export default function CourseContainer(DOM: HTMLElement, filter: string) {

    let filteredCourses: CourseType = courses;

    if (filter !== 'all') {
        filteredCourses = courses.filter(course => course.category.toLowerCase() === filter.toLowerCase());
    }

    useTSElements(DOM, (`
       <div>
          <div id='card'></div>
       </div>
    `));

    const card = DOM.querySelector('#card') as HTMLElement;
    Card(card, filteredCourses);
}
