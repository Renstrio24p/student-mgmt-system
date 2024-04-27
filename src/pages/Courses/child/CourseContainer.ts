import { scriptElement } from "utils/purify/purify";
import Card from "./Card";
import { CourseType } from "../types/CourseType";
import { courses } from "../static/Data";

export default function CourseContainer(DOM: HTMLElement, filter: string) {

    let filteredCourses: CourseType = courses;

    if (filter !== 'all') {
        filteredCourses = courses.filter(course => course.category.toLowerCase() === filter.toLowerCase());
    }

    DOM.innerHTML = (`
       <div>
          <div id='card'></div>
       </div>
    `);

    const card = DOM.querySelector('#card') as HTMLElement;
    card.appendChild(scriptElement);
    Card(card, filteredCourses);
}
