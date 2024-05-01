import { useTSElements } from "utils/hooks/useTSElements";
import { useTSPurifier } from "utils/hooks/useTSPurifier";

export default function Greeting(DOM: HTMLElement, Message: string) {
  const now = new Date();

  const msg = useTSPurifier(Message);

  const dateNow = useTSPurifier(now.toLocaleString("en-US", { hour12: true }));

  useTSElements(
    DOM,
    /*html*/ `
      <div class='flex items-center justify-between mb-3'>
        <div>
            <h3 class='font-semibold text-[14px]'>Welcome, Admin</h3>
            <p class='text-[12px] text-slate-600'>${msg}</p>
        </div>
        <div>
            <select class='text-[12px] p-1 rounded bg-white shadow-md'>

                <option value='today'>Today ${dateNow}</option>
            </select>
        </div>
      </div>
  `
  );
}
