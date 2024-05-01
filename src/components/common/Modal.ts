import { Common } from "redux/redux.types";
import store from "../../redux/redux.state.ts";
import { deleteUserData, deleteStudentData } from "../../redux/redux.delete.ts";
import EditModal from "./EditModal.ts";
import { useTSElements } from "utils/hooks/useTSElements.ts";
import { useTSEventAll } from "utils/hooks/useTSAllElements.ts";
import { useTSEvent } from "utils/hooks/useTSEvent.ts";
import { useTSComponent } from "utils/hooks/useTSComponent.ts";

export default function Modal(
  DOM: HTMLElement,
  card: Common["student" | "user"][number]
) {
  useTSElements(
    DOM,
    /*html*/ `
    <div id='modal-content' class="modals fixed top-0 left-0 w-full h-[100vh] bg-gradient-to-r from-slate-900 bg-opacity-5 grid place-content-center z-[100]">
      <div id='modal-content' class="modal-div w-[350px] bg-slate-200 rounded-md relative p-3 grid place-content-stretch gap-1 animate-[fadeInUp_1s]">
        <img class='w-full h-full z-0 absolute object-cover opacity-[0.3]' src='https://i.pinimg.com/736x/07/d8/67/07d867d81eab5a0a0c8489d59ed4696c.jpg' alt="bg-image"/>
        <span class="close cursor-pointer absolute top-1 right-1 bg-red-300 w-5 h-5 rounded-md flex items-center justify-center hover:scale-150 transition duration-500 ease-in"><i class="ri-close-line"></i></span>
        <img class='w-[50px] rounded-full z-10' src="${card.image}" alt="${
      card.name
    }">
        <div class='z-10'>
          <h2>${card.name}</h2>
          <p class='text-[12px] my-2 text-slate-700'>${card.desc}</p>
          ${
            "course" in card
              ? `
            <div class='grid grid-cols-2'>
              <div class='text-[12px]'>
                <p>Courses: </p>
                <div class='mx-2'>
                  <p class='text-slate-700'>${card.course.join(", \n")}</p>
                </div>
              </div>
              <div class='text-[12px]'>
                <p>Details</p>
                <div class='mx-2 text-slate-700'>
                  <p class='mb-2'> Address: ${card.address}</p>
                  <p> Tel: ${card.tel}</p>
                  <p>Registered: ${card.date}</p>
                </div>
              </div>
            </div>
          `
              : ""
          }
          <div class='mb-8'></div>
        </div>
        <div class='absolute right-1 bottom-[5px] grid place-content-stretch grid-cols-3 z-50'>
          <button class='p-1 bg-teal-400 rounded-sm text-[12px] mr-1 edit-button' id='edit' selfdata-id=${
            card._id
          }>Edit</button>
          <button class='p-1 bg-red-600 rounded-sm text-[12px] mr-1 delete-button' id='delete' selfdata-id=${
            card._id
          }>Delete</button>
          <button class='p-1 bg-red-950 text-white rounded-sm text-[12px]'>Cancel</button>
        </div>
      </div>
    </div>
    <div id='edit-modal'></div>
  `
  );

  const closeModal = DOM.querySelector(".modals") as HTMLElement;
  const modalDiv = DOM.querySelector(".modal-div") as HTMLElement;

  function Close() {
    modalDiv.style.animation = "fadeOutDown 1s";
    setTimeout(() => {
      closeModal.remove();
    }, 1000);
  }

  useTSEventAll(".close, .modals", "click", Close);

  useTSEvent("delete", "click", () => {
    const action = "course" in card ? deleteStudentData : deleteUserData;
    store.dispatch(action({ _id: String(card._id) }));
    Close();
  });

  useTSEvent("edit", "click", () => {
    useTSComponent("edit-modal", DOM, EditModal, card);
  });
}
