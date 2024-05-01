import Greeting from "components/common/Greeting";
import StudentContainer from "./child/StudentContainer";
import { Common } from "redux/redux.types";
import { useTSElements } from "utils/hooks/useTSElements";
import { useTSComponent } from "utils/hooks/useTSComponent";

export default function Student(DOM: HTMLElement, data: Common) {
  const studentData = data.student;

  useTSElements(
    DOM,
    /*html*/ `
    <div class='m-6'>
      <div id='greet'></div>
      <div id='container'></div>
    </div>
  `
  );
  useTSComponent("greet", DOM, Greeting, "Enrolles for this year.");
  useTSComponent("container", DOM, StudentContainer, studentData);
}
