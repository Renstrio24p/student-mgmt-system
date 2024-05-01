import Modal from "components/common/Modal";
import { Skeletons } from "./Skeleton";
import { Common } from "redux/redux.types";
import { toCapitalized } from "components/tools/toCapitalized";
import { useTSElements } from "utils/hooks/useTSElements";
import { useTSPurifier } from "utils/hooks/useTSPurifier";
import { useTSEventAll } from "utils/hooks/useTSAllElements";
import { useTSComponent } from "utils/hooks/useTSComponent";

export default function Cards(
  DOM: HTMLElement,
  cards: Common["student" | "user"]
): void {
  function renderCards(cardData: Common["student" | "user"]): void {
    if (cardData.length === 0) {
      useTSElements(
        DOM,
        `
                <div class='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-content-stretch gap-4'>
                    <p>No Data..</p>
                </div>
            `
      );
    } else {
      const filterCardNoAdmin = cardData.filter(card => {
        return !("role" in card && card.role === "superadmin");
      });
      const cardsHTML = filterCardNoAdmin.map(card => cardTemplate(card));

      useTSElements(
        DOM,
        /*html*/ `
                <div class='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-content-stretch gap-4'>
                    ${cardsHTML.join("")}
                </div>
            `
      );
    }
  }

  function cardTemplate(card: Common["student" | "user"][number]): HTMLElement {
    return useTSPurifier(/*html*/ `
            <div key='${card._id}'>
                <div class="card p-3 shadow-lg grid place-content-stretch rounded-xl relative overflow-hidden h-full transition duration-400 ease-in hover:scale-110 hover:z-50" id='${
                  card._id
                }'>
                    <img class='w-full h-[100%] z-0 absolute object-cover opacity-[0.3]' src='https://i.pinimg.com/736x/07/d8/67/07d867d81eab5a0a0c8489d59ed4696c.jpg' alt="bg-image"/>
                    <div class='w-[80px] h-[80px] overflow-hidden border border-black rounded-full z-10'>
                        <img class='w-full' src="${card.image}" alt="${
      card.name
    }">
                    </div>
                    <div class='text-right z-10'>
                        <h2 class='text-lg text-left'>${card.name}</h2>
                        <p class='text-[12px] text-left text-slate-500'>${
                          card.desc
                        }</p>
                        ${
                          "course" in card
                            ? `
                            <div class='text-left my-2 text-[12px]'>
                                <p>Courses: </p>
                                <p class='mx-2 text-slate-800'>${card.course.join(
                                  "<br>"
                                )}</p>
                            </div>
                        `
                            : ""
                        }
                        ${
                          "role" in card
                            ? `
                            <p class='text-left text-[12px] my-2'>Role : <span class='text-slate-800'>${toCapitalized(
                              String(card.role)
                            )}</span></p>
                        `
                            : ""
                        }
                        <button id='btn' class=' absolute bottom-1 right-1 p-1 mt-1 bg-slate-700 text-white rounded-sm text-sm hover:bg-slate-400 hover:text-black' data-id='${
                          card._id
                        }'>Details</button>
                    </div>
                </div>
                <div id='modal-${card._id}' data-id=${card._id}></div>
            </div>
        `) as HTMLElement;
  }

  function handleDetailsButtonClick(event: MouseEvent): void {
    const cardId = useTSPurifier(
      String((event.target as HTMLElement).getAttribute("data-id"))
    );
    const card = cards.flat().find(c => {
      return c._id!.toString() === cardId;
    });
    useTSComponent(`modal-${card!._id}`, DOM, Modal, card);
  }

  // Actual DOM

  useTSElements(
    DOM,
    /*html*/ `
        <div class='grid grid-cols-1 gap-4'>
            ${Skeletons(cards.flat().length)}
        </div>
    `
  );

  renderCards(cards.flat() as Common["student" | "user"]);
  useTSEventAll("button", "click", handleDetailsButtonClick);
}
