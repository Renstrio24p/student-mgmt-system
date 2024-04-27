import Greeting from "components/common/Greeting";
import { scriptElement } from "utils/purify/purify";

export default function Exams(DOM: HTMLElement) {

  DOM.innerHTML = (`
    <div class='m-6'>
      <div id='greet'></div>
      <h1>Exam List</h1>
    </div>
  `);

  const greeting = DOM.querySelector('#greet') as HTMLElement
  greeting.append(scriptElement)
  Greeting(greeting, "Examination Questionaires.")

}