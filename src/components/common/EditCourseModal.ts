import { useTSElements } from "utils/hooks/useTSElements";

export default function EditCourseModal(DOM: HTMLElement) {
  useTSElements(
    DOM,
    /*html*/ `
        <div>
            <h1>EditCourseModal</h1>
        </div>
  `
  );
}
