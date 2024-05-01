import { useTSElements } from "utils/hooks/useTSElements";

export default function EditUser(DOM: HTMLDivElement) {
  useTSElements(
    DOM,
    /*html*/ `
    <div>
      <h1>EditUser</h1>
      <p>hello World</p>
    </div>
  `
  );
}
