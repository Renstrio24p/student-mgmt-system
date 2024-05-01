import Greeting from "components/common/Greeting";
import { useTSElements } from "utils/hooks/useTSElements";

export default function Exams(DOM: HTMLElement) {
  useTSElements(
    DOM,
    /*html*/ `
    <div class='m-6'>
      <div id='greet'></div>
      <h1>Exam List</h1>
    </div>
  `
  );

  const greeting = DOM.querySelector("#greet") as HTMLElement;
  Greeting(greeting, "Examination Questionaires.");
}
