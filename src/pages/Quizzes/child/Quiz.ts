import { useTSElements } from "utils/hooks/useTSElements";
import { QuizType } from "../types/QuizTypes";
import CardQuiz from "./CardQuiz";

export default function Quiz(DOM: HTMLElement) {

    const quizCategory: QuizType = [
        {
            id: 1,
            title: 'Assessment',
            icon: '<i class="ri-list-check-2 text-cyan-600"></i>',
            desc1: `Test knowledge in fun ways.
                    Each quiz question will have one correct
                    answer
                    `,
            desc2: `Example: How much do you actually
                    know about the world cup?
                    `
        },
        {
            id: 2,
            title: 'Personality',
            icon: '<i class="ri-brain-line text-orange-800"></i>',
            desc1: `
                    Make your own version of the classic
                    personality quiz. Each quiz taker see a
                    personality type that applies to them
                    and can be shared.
            `,
            desc2: `Example: What kind of marketing superhero
                    are you?        
            `
        },
        {
            id: 3,
            title: 'Logical',
            icon: '<i class="ri-microscope-line text-green-600"></i>',
            desc1: `
                    Make your own version of Logical
                    quiz. Each quiz taker see a
                    personality type that applies to them
                    and can be shared with unique scores.
            `,
            desc2: `Example: If 5 apple is given, anna takes 4,
                    some 2 apples fall in the ground, how many
                    apple's left?        
            `
        },
    ]

    useTSElements(DOM, (`
        <div>
            <div id='quiz' class='w-full'></div>
        </div>
    `));

    const quizCard = DOM.querySelector('#quiz') as HTMLElement
    CardQuiz(quizCard, quizCategory)

}