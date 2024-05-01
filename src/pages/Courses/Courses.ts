import Greeting from "components/common/Greeting";
import CourseContainer from "./child/CourseContainer";
import { useTSElements } from "utils/hooks/useTSElements";
import { useTSComponent } from "utils/hooks/useTSComponent";
import { useTSEvent } from "utils/hooks/useTSEvent";
import { useTSInput } from "utils/hooks/useTSInput";

export default function Courses(DOM: HTMLElement) {
  useTSElements(
    DOM,
    /*html*/ `
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
    </div>`
  );

  useTSComponent(
    "greet",
    DOM,
    Greeting,
    "Here's the list of Courses for today."
  );

  // filtering Course

  useTSEvent("course-filter", "change", () => {
    useTSComponent(
      "course",
      DOM,
      CourseContainer,
      useTSInput("course-filter", "select")
    );
  });

  useTSComponent("course", DOM, CourseContainer, "all");
}
