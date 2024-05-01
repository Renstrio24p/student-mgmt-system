import { useTSElements } from "utils/hooks/useTSElements";

export default function CourseModal(DOM: HTMLElement) {
  useTSElements(
    DOM,
    /*html*/ `
        <div>
            <h1>CourseModal</h1>
        </div>
    `
  );
}
