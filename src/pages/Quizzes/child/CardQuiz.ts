import { useTSElements } from "utils/hooks/useTSElements";
import { QuizType } from "../types/QuizTypes";

export default function CardQuiz(DOM: HTMLElement, Quiz: QuizType) {

  const card = Quiz.map((quiz) => {
    return `
            <div class='card shadow-2xl p-4 text-center rounded-md bg-gradient-to-t from-slate-400 to-slate-200 flex flex-col justify-center items-center relative'>
                <span class='text-[6em] bg-white w-[120px] h-[120px] rounded-full flex items-center justify-center mb-6'>${quiz.icon}</span>
                <h1 class='text-center text-[1.5em] mb-2'>${quiz.title}</h1>
                <p class='text-[12px] text-slate-800 mb-3'>${quiz.desc1}</p>
                <p class='text-[12px] text-slate-800 mb-6'>${quiz.desc2}</p>
                <button class='absolute bottom-2 bg-orange-800 text-white text-[12px] px-3 py-1 rounded-sm cursor-pointer'>View</button>
            </div>
        `
  }).join("")

  useTSElements(DOM, (`
      <div class='grid grid-cols-3 place-content-stretch w-full gap-4 mt-3'>
        ${card}
      </div>
  `));

}