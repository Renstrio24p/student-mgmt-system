
export default function Greeting(DOM: HTMLElement, Message: string) {

    const Now = new Date();

    DOM.innerHTML = (`
      <div class='flex items-center justify-between mb-3'>
        <div>
            <h3 class='font-semibold'>Welcome, Admin</h3>
            <p class='text-[10px]'>${Message}</p>
        </div>
        <div>
            <select class='text-[10px] p-1 rounded bg-white shadow-md'>
                <option value='today'>Today ${Now.toLocaleString('en-US', { hour12: true })}</option>
            </select>
        </div>
      </div>
  `);

}