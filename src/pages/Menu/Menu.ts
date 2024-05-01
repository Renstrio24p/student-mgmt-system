import Statistics from "components/sections/Statistics";
import Welcome from "components/sections/Welcome";
import { useTSComponent } from "utils/hooks/useTSComponent";
import { useTSElements } from "utils/hooks/useTSElements";

// Menu Component Parent Section

export default function Menu(DOM: HTMLElement) {
  useTSElements(
    DOM,
    /*html*/ `
      <section id='welcome' class='m-6'></section>
      <section id='statistics' class='m-6'></section>
  `
  );

  useTSComponent("welcome", DOM, Welcome);
  useTSComponent("statistics", DOM, Statistics);
}
