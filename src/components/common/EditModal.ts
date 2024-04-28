import { Sanitizer } from "components/tools/sanitizer";
import { updateStudentData, updateUserData } from "redux/redux.update"; // Import the update functions
import { Common } from "redux/redux.types";
import store from '../../redux/redux.state'
import { HTMLModalElement } from "types/Food";
import { UserType } from "components/types/Users";
import { StudentType } from "components/types/Student";

export default function EditModal(DOM: HTMLElement, card: Common['student' | 'user'][number]) {

  const id = card._id

  DOM.innerHTML = (`
    <div class="modals fixed top-0 left-0 w-full h-[100vh] bg-gradient-to-r from-slate-900 bg-opacity-5 grid place-content-center z-[100]">
      <div class="modal-div w-[350px] bg-slate-200 rounded-md relative p-3 grid place-content-stretch gap-1 animate-[fadeInUp_1s]">
        <img class='w-full h-full z-0 absolute object-cover opacity-[0.3]' src='https://i.pinimg.com/736x/07/d8/67/07d867d81eab5a0a0c8489d59ed4696c.jpg' alt="bg-image"/>
        <span class="close cursor-pointer absolute top-1 right-1 bg-red-300 w-5 h-5 rounded-md flex items-center justify-center hover:scale-150 transition duration-500 ease-in"><i class="ri-close-line"></i></span>
        <img class='w-[50px] rounded-full z-10' src="${Sanitizer(card.image)}" alt="${Sanitizer(card.name)}">
        <div class='z-10 flex flex-col'>
          <h2>${Sanitizer(card.name)}</h2>
          <p class='text-slate-600 text-[12px] my-2'>Date: ${card.date}</p>
          <input class='text-[12px]' type='text' id='imageInput' value='${card.image}'/>
          <textarea rows='5' class='text-[12px] my-2 text-slate-700 resize-none p-1' id='descTextarea'>${Sanitizer(card.desc)}</textarea>
          ${'role' in card ? (`
              <p>Role : </p>
              <input type='text' value='${card.role}' class='text-[12px] rounded-sm' id='roleInput' />
          `) : ''}
          ${'course' in card ? (`
              <div class='text-[12px]'>
                <p>Courses: </p>
                <div class='mx-2 h-full w-full'>
                  <textarea class='resize-none h-full text-[12px] p-1 rounded-sm w-1/2' id='courseTextarea'>${Sanitizer(card.course.join(', \n'))}</textarea>
                </div>
              </div>
          `) : ''}
          <div class='text-[12px] mt-6'>
            <p>Details</p>
            <div class='mx-2 text-slate-700'>
              <div class='w-full'>
                <p> Tel:</p>
                <input class='w-full p-1 rounded-sm' type='text' id='telInput' value='${Sanitizer(String(card.tel))}' />
              </div>
            </div>
          </div>
          <div class='text-[12px]'>
            <p class='mb-2'> Address:</p>
            <textarea row='3' class='resize-none w-full p-1 rounded-sm' id='addressTextarea'>${Sanitizer(card.address)}</textarea>
          </div>
            <div class='mt-6 text-[12px]'>
              <p>Email: </p>
              <input class='text-[12px] w-full p-1 rounded-sm' type='email' id='emailInput' value='${Sanitizer(String(card.email))}' />
            </div>
          ${'password' in card ? (`
            <div>
              <p>Password: </p>
              <input class='text-[12px]' type='password' id='passwordInput' value='${Sanitizer(String(card.password))}' />
            </div>
          `) : ''}
          <div class='mb-8'></div>
        </div>
        <div class='absolute right-1 bottom-[5px] grid place-content-stretch grid-cols-3'>
          <button class='p-1 bg-teal-400 rounded-sm text-[12px] mr-1 save-button' id='save' selfdata-id=${card._id}>Save</button>
          <button class='p-1 bg-red-950 text-white rounded-sm text-[12px]' id='cancel'>Cancel</button>
        </div>
      </div>
  `);


  const closeButton = DOM.querySelector('.close');
  const cancelButton = DOM.querySelector('#cancel') as HTMLButtonElement;
  const closeModal = DOM.querySelector('.modals') as HTMLModalElement;
  const modalDiv = DOM.querySelector('.modal-div') as HTMLModalElement;
  const saveButton = DOM.querySelector('.save-button') as HTMLButtonElement;

  // input date

  const updatedImage = DOM.querySelector('#imageInput') as HTMLInputElement;
  const updatedDesc = DOM.querySelector('#descTextarea') as HTMLTextAreaElement;
  const updatedCourse = DOM.querySelector('#courseTextarea') as HTMLTextAreaElement;
  const updatedEmail = DOM.querySelector('#emailInput') as HTMLInputElement;
  const updatedPassword = DOM.querySelector('#passwordInput') as HTMLInputElement;
  const updatedRole = DOM.querySelector('#roleInput') as HTMLInputElement;
  const updatedAddress = DOM.querySelector('#addressTextarea') as HTMLTextAreaElement;
  const updatedTel = DOM.querySelector('#telInput') as HTMLInputElement;

  const Now = new Date()

  let updateImg = Sanitizer(updatedImage.value);
  let updateDesc = Sanitizer(updatedDesc.value);
  let updateAddress = Sanitizer(updatedAddress.value);
  let updateEmail = Sanitizer(updatedEmail?.value || '');
  let updatePassword = Sanitizer(updatedPassword?.value || '');
  let updateTel = Sanitizer(updatedTel.value);
  let updateCourse = Sanitizer(updatedCourse?.value || '');
  let updateRole = Sanitizer(updatedRole?.value || '');
  let updatedDate = Sanitizer(Now.toLocaleString('en-us', { hour12: true }));

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      Close();
    });
  }

  cancelButton.addEventListener('click', () => {
    Close();
  });

  updatedImage.addEventListener('input', () => {
    updateImg = updatedImage.value;
  });

  updatedDesc.addEventListener('input', () => {
    updateDesc = updatedDesc.value;
  });

  if ('course' in card) {
    updatedCourse.addEventListener('input', () => {
      [updateCourse] = updatedCourse.value.split('\n').map(course => course.trim());
    });
  }

  if ('role' in card) {
    updatedRole.addEventListener('input', () => {
      updateRole = updatedRole.value;
    });
  }

  updatedAddress.addEventListener('input', () => {
    updateAddress = updatedAddress.value;
  });

  updatedEmail.addEventListener('input', () => {
    updateEmail = updatedEmail.value;
  });

  if ('password' in card) {
    updatedPassword.addEventListener('input', () => {
      updatePassword = updatedPassword.value;
    });
  }

  updatedTel.addEventListener('input', () => {
    updateTel = updatedTel.value;
  });
  //Date

  console.log(extractUpdatedData())

  // Function to extract updated data from modal fields
  function extractUpdatedData() {
    if ('course' in card) {
      return {
        _id: id,
        name: card.name,
        image: updateImg,
        address: updateAddress,
        email: updateEmail,
        tel: updateTel,
        course: updateCourse,
        date: updatedDate,
        desc: updateDesc,
      };
    }

    if ('role' in card) {
      return {
        _id: id,
        name: card.name,
        image: updateImg,
        email: updateEmail,
        address: updateAddress,
        tel: updateTel,
        password: updatePassword,
        role: updateRole,
        desc: updateDesc,
        date: updatedDate,
      };
    }
  }

  // Add event listener to save button
  saveButton.addEventListener('click', async () => {
    const updatedData = extractUpdatedData();

    try {
      if ('course' in card) {
        await store.dispatch(updateStudentData({ _id: String(card._id), updateData: (updatedData) as unknown as StudentType[number] }));
      }

      if ('role' in card) {
        await store.dispatch(updateUserData({ _id: String(card._id), updateData: (updatedData) as unknown as UserType[number] }));
      }
      // Handle success or close modal after successful update
      Close();
    } catch (error) {
      console.error('Error updating data:', error);
      // Handle error if needed
    }
  });

  function Close() {
    modalDiv.style.animation = 'fadeOutUp 1s';
    setTimeout(() => {
      closeModal.remove();
    }, 1000);
  }
}
