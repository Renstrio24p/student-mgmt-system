import Greeting from "components/common/Greeting";
import { scriptElement } from "utils/purify/purify";
import CourseContainer from "./child/CourseContainer";

export default function Courses(DOM: HTMLElement) {

  DOM.innerHTML = (`
    <div class='m-6'>
      <div id='greet'></div>
      <div class='flex items-center justify-between mb-2'>
        <h1>Courses</h1>
        <select id="course-filter" class='bg-white shadow-sm p-1 text-sm'>
           <option value='all'>All</option>
           <option value='web development'>Web Development</option>
           <option value='UI Designing'>UI Designing</option>
           <option value='Android Development'>Android Development</option>
           <option value='App development'>App Development</option>
           <option value='Hardware Engineering'>Hardware Engineering</option>
        </select>
      </div>
      <div id='course'></div>
    </div>
  `);

  const greeting = DOM.querySelector('#greet') as HTMLElement;
  greeting.append(scriptElement);
  Greeting(greeting, "Here's the list of Courses for today.");

  const courseContainer = DOM.querySelector('#course') as HTMLElement;
  courseContainer.appendChild(scriptElement);

  // filtering Course
  const courseFilter = DOM.querySelector('#course-filter') as HTMLSelectElement;
  courseFilter.addEventListener('change', () => {
    CourseContainer(courseContainer, courseFilter.value);
  });

  CourseContainer(courseContainer, 'all');
}
