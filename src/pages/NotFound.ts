import { useTSElements } from "utils/hooks/useTSElements";

export default function NotFound(DOM: HTMLElement) {

  useTSElements(DOM, (`
    <div class='w-full h-full flex items-center justify-center'>
      <h1>NotFound</h1>
    </div>
  `));

}