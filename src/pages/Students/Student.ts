import Greeting from "components/common/Greeting";
import { scriptElement } from "utils/purify/purify";
import StudentContainer from "./child/StudentContainer";
import { Common } from "redux/redux.types";

export default function Student(DOM: HTMLElement, data: Common) {

  const studentData = data.student

  DOM.innerHTML = (`
    <div class='m-6'>
      <div id='greet'></div>
      <div id='container'></div>
    </div>
  `);

  const greeting = DOM.querySelector('#greet') as HTMLElement
  greeting.append(scriptElement)
  Greeting(greeting, "Enrolles for this year.")

  const container = DOM.querySelector('#container') as HTMLElement
  container.appendChild(scriptElement)
  StudentContainer(container, studentData)
}