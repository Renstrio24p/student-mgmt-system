import Modal from "components/common/Modal";
import { Skeletons } from "./Skeleton";
import { Common } from "redux/redux.types";
import { toCapitalized } from "components/tools/toCapitalized";
import { useTSElements } from "utils/hooks/useTSElements";

export default function Cards(DOM: HTMLElement, cards: Common['student' | 'user']): void {
    function renderCards(cardData: (Common['student' | 'user'])): void {
        if (cardData.length === 0) {
            DOM.innerHTML = `<div class='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-content-stretch gap-4'><p>No Data..</p></div>`;
        } else {
            const cardsHTML = cardData.map(card => cardTemplate(card));
            DOM.innerHTML = `<div class='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-content-stretch gap-4'>${cardsHTML.join("")}</div>`;
        }
    }

    function cardTemplate(card: Common['student' | 'user'][number]): string {
        return (`
            <div key='${card._id}'>
                <div class="card p-3 shadow-lg grid place-content-stretch rounded-xl relative overflow-hidden h-full transition duration-400 ease-in hover:scale-110 hover:z-50" id='${card._id}'>
                    <img class='w-full h-[100%] z-0 absolute object-cover opacity-[0.3]' src='https://i.pinimg.com/736x/07/d8/67/07d867d81eab5a0a0c8489d59ed4696c.jpg' alt="bg-image"/>
                    <div class='w-[80px] h-[80px] overflow-hidden border border-black rounded-full z-10'>
                        <img class='w-full' src="${card.image}" alt="${card.name}">
                    </div>
                    <div class='text-right z-10'>
                        <h2 class='text-lg text-left'>${card.name}</h2>
                        <p class='text-[12px] text-left text-slate-500'>${card.desc}</p>
                        ${'course' in card ? (`
                            <div class='text-left my-2 text-[12px]'>
                                <p>Courses: </p>
                                <p class='mx-2 text-slate-800'>${(card).course.join('<br>')}</p>
                            </div>
                        `) : ''}
                        ${'role' in card ? (`
                            <p class='text-left text-[12px] my-2'>Role : <span class='text-slate-800'>${toCapitalized(String(card.role))}</span></p>
                        `) : ''}
                        <button class=' absolute bottom-1 right-1 p-1 mt-1 bg-slate-700 text-white rounded-sm text-sm hover:bg-slate-400 hover:text-black' data-id='${card._id}'>Details</button>
                    </div>
                </div>
                <div id='modal-${card._id}' data-id=${card._id}></div>
            </div>
        `);
    }

    function handleDetailsButtonClick(event: MouseEvent): void {
        const cardId = (event.target as HTMLElement).getAttribute('data-id');
        if (cardId) {
            const card = cards.flat().find(c => {
                return (c._id!).toString() === cardId;
            });
            if (card) {
                const modalContainer = document.getElementById(`modal-${card._id}`);
                if (modalContainer) {
                    Modal(modalContainer, card);
                }
            } else {
                console.error(`Card with id ${cardId} not found.`);
            }
        }
    }

    useTSElements(DOM, (`
        <div class='grid grid-cols-1 gap-4'>
            ${Skeletons(cards.flat().length)}
        </div>
    `));

    // Render cards
    renderCards(cards.flat() as Common['student' | 'user']);

    // Add event listener for details button on each card
    DOM.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', handleDetailsButtonClick);
    });
}
