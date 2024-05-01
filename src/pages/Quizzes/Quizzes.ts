import Greeting from "components/common/Greeting";
import Quiz from "./child/Quiz";
import { useTSElements } from "utils/hooks/useTSElements";

export default function Quizzes(DOM: HTMLElement) {
  useTSElements(
    DOM,
    /*html*/ `
    <div class='m-6'>
      <div id='greet'></div>
      <h1>Quizzes</h1>
      <div id='quiz-container'></div>
    </div>
  `
  );

  const greeting = DOM.querySelector("#greet") as HTMLElement;
  Greeting(greeting, "List of Quizzes for your Students.");

  const quizContainer = DOM.querySelector("#quiz-container") as HTMLElement;
  Quiz(quizContainer);
}
