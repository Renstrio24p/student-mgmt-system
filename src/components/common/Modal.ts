import { Common } from "redux/redux.types";
import { HTMLModalElement } from "types/Food";
import store from '../../redux/redux.state.ts';
import { deleteUserData, deleteStudentData } from '../../redux/redux.delete.ts';
import EditModal from "./EditModal.ts";
import { useTSElements } from "utils/hooks/useTSElements.ts";

export default function Modal(DOM: HTMLElement, card: Common['student' | 'user'][number]) {

  useTSElements(DOM, (`
    <div class="modals fixed top-0 left-0 w-full h-[100vh] bg-gradient-to-r from-slate-900 bg-opacity-5 grid place-content-center z-[100]">
      <div class="modal-div w-[350px] bg-slate-200 rounded-md relative p-3 grid place-content-stretch gap-1 animate-[fadeInUp_1s]">
        <img class='w-full h-full z-0 absolute object-cover opacity-[0.3]' src='https://i.pinimg.com/736x/07/d8/67/07d867d81eab5a0a0c8489d59ed4696c.jpg' alt="bg-image"/>
        <span class="close cursor-pointer absolute top-1 right-1 bg-red-300 w-5 h-5 rounded-md flex items-center justify-center hover:scale-150 transition duration-500 ease-in"><i class="ri-close-line"></i></span>
        <img class='w-[50px] rounded-full z-10' src="${card.image}" alt="${card.name}">
        <div class='z-10'>
          <h2>${card.name}</h2>
          <p class='text-[12px] my-2 text-slate-700'>${card.desc}</p>
          ${'course' in card ? (`
            <div class='grid grid-cols-2'>
              <div class='text-[12px]'>
                <p>Courses: </p>
                <div class='mx-2'>
                  <p class='text-slate-700'>${card.course.join('<br>')}</p>
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
          `) : ''}
          <div class='mb-8'></div>
        </div>
        <div class='absolute right-1 bottom-[5px] grid place-content-stretch grid-cols-3 z-20'>
          <button class='p-1 bg-teal-400 rounded-sm text-[12px] mr-1 edit-button hover:bg-teal-950 hover:text-white' id='edit' selfdata-id=${card._id}>Edit</button>
          <button class='p-1 bg-red-600 rounded-sm text-[12px] mr-1 hover:bg-red-950 hover:text-white delete-button' id='delete' selfdata-id=${card._id}>Delete</button>
          <button class='p-1 bg-orange-800 text-white rounded-sm text-[12px] hover:bg-orange-950'>Cancel</button>
        </div>
      </div>
    </div>
    <div id='edit-modal'></div>
  `))

  // Close modal when close button is clicked
  const closeButton = DOM.querySelector('.close');
  const closeModal = DOM.querySelector('.modals') as HTMLModalElement;
  const editBtn = DOM.querySelector('#edit') as HTMLButtonElement;
  const modalDiv = DOM.querySelector('.modal-div') as HTMLModalElement;

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      Close();
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      Close();
    });
  }

  // Add event listener to delete button
  const deleteButton = DOM.querySelector('.delete-button');
  if (deleteButton) {
    deleteButton.addEventListener('click', () => {
      if ('course' in card) {
        store.dispatch(deleteStudentData({ _id: String(card._id) }));
      } else {
        store.dispatch(deleteUserData({ _id: String(card._id) }));
      }
      Close();
    });
  }

  // Add event listener to update button

  if (editBtn) {
    const editModal = DOM.querySelector('#edit-modal') as HTMLElement
    editBtn.addEventListener('click', () => {
      EditModal(editModal, card)
    })
  }

  function Close() {
    modalDiv.style.animation = 'fadeOutDown 1s';
    setTimeout(() => {
      closeModal.remove();
    }, 1000);
  }
}
