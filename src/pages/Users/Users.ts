import Greeting from "components/common/Greeting";
import Container from "./child/Container";
import { Common } from "redux/redux.types";
import { useTSElements } from "utils/hooks/useTSElements";

export default function Users(DOM: HTMLElement, data: Common) {
  const userData = data.user;

  useTSElements(
    DOM,
    /*html*/ `
        <section class='m-6'>
            <div id='greet'></div>
            <div id='container'></div>
        </section>
  `
  );

  // Reusable Greeting Component
  const greeting = DOM.querySelector("#greet") as HTMLElement;
  Greeting(
    greeting,
    "Here's the list of user registered available within your system."
  );

  const container = DOM.querySelector("#container") as HTMLElement;
  Container(container, userData);
}
