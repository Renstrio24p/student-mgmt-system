import Card from "./Card";
import { CourseType } from "../types/CourseType";
import { useTSElements } from "utils/hooks/useTSElements";
import { courses } from "../static/Data";
import { useTSComponent } from "utils/hooks/useTSComponent";

export default function CourseContainer(DOM: HTMLElement, filter: string) {
  let filteredCourses: CourseType = courses;

  if (filter !== "all") {
    filteredCourses = courses.filter(
      course => course.category.toLowerCase() === filter.toLowerCase()
    );
  }

  useTSElements(
    DOM,
    /*html*/ `
       <div>
          <div id='card'></div>
       </div>
    `
  );

  useTSComponent("card", DOM, Card, filteredCourses);
}
