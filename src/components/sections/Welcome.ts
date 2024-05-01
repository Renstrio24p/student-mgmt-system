import Greeting from "components/common/Greeting";
import { useTSElements } from "utils/hooks/useTSElements";

export default function Welcome(DOM: HTMLElement) {
  useTSElements(
    DOM,
    /*html*/ `
        <div id='greet'></div>
        <div class='flex items-center bg-white sm:w-full lg:w-[75%] mt-6 rounded-lg shadow-xl h-[150px] relative overflow-hidden p-2'>
            <div>
                <h1 class=''>Congratulations Admin! 🎉</h1>
                <p class='text-slate-500'>You have 1000 students already signed up!.</p>
            </div>
            <dotlottie-player class='w-[120px] absolute bottom-[-40px] right-0' src="https://lottie.host/418db224-0768-4730-9acc-75c559a537bf/vpuzWU2f0a.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
        </div>
  `
  );

  // Greeting Component
  const greeting = DOM.querySelector("#greet") as HTMLElement;
  Greeting(
    greeting,
    "All Systems are running smoothly, you have 1 unread message."
  );
}
