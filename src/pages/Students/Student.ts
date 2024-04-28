import Greeting from "components/common/Greeting";
import StudentContainer from "./child/StudentContainer";
import { Common } from "redux/redux.types";
import { useTSElements } from "utils/hooks/useTSElements";

export default function Student(DOM: HTMLElement, data: Common) {

  const studentData = data.student

  useTSElements(DOM, (`
    <div class='m-6'>
      <div id='greet'></div>
      <div id='container'></div>
    </div>
  `));

  const greeting = DOM.querySelector('#greet') as HTMLElement
  Greeting(greeting, "Enrolles for this year.")

  const container = DOM.querySelector('#container') as HTMLElement
  StudentContainer(container, studentData)
}