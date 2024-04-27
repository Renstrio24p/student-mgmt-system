import Greeting from "components/common/Greeting";
import { scriptElement } from "utils/purify/purify";
import Quiz from "./child/Quiz";

export default function Quizzes(DOM: HTMLElement) {

  DOM.innerHTML = (`
    <div class='m-6'>
      <div id='greet'></div>
      <h1>Quizzes</h1>
      <div id='quiz-container'></div>
    </div>
  `);

  const greeting = DOM.querySelector('#greet') as HTMLElement
  greeting.appendChild(scriptElement)
  Greeting(greeting, "List of Quizzes for your Students.")

  const quizContainer = DOM.querySelector('#quiz-container') as HTMLElement
  quizContainer.appendChild(scriptElement)
  Quiz(quizContainer)

}