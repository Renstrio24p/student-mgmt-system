import { updateStudentData, updateUserData } from "redux/redux.update";
import { Common } from "redux/redux.types";
import store from '../../redux/redux.state'
import * as bcrypt from 'bcrypt-ts'
import { HTMLModalElement } from "types/Food";
import { UserType } from "components/types/Users";
import { StudentType } from "components/types/Student";
import { useTSElements } from "utils/hooks/useTSElements";
import { useTSPurifier } from "utils/hooks/useTSPurifier";
import { toCapitalized } from "components/tools/toCapitalized";

export default function EditModal(DOM: HTMLElement, card: Common['student' | 'user'][number]) {

  const id = card._id

  useTSElements(DOM, (`
    <div class="modals fixed top-0 left-0 w-full h-[100vh] bg-gradient-to-r from-slate-900 bg-opacity-5 grid place-content-center z-[100]">
      <div class="modal-div w-[350px] bg-slate-200 rounded-md relative p-3 grid place-content-stretch gap-1 animate-[fadeInUp_1s]">
        <img class='w-full h-full z-0 absolute object-cover opacity-[0.3]' src='https://i.pinimg.com/736x/07/d8/67/07d867d81eab5a0a0c8489d59ed4696c.jpg' alt="bg-image"/>
        <span class="close cursor-pointer absolute top-1 right-1 bg-red-300 w-5 h-5 rounded-md flex items-center justify-center hover:scale-150 transition duration-500 ease-in"><i class="ri-close-line"></i></span>
        <img class='w-[80px] rounded-full z-10 absolute right-4 top-3' src="${useTSPurifier(card.image)}" alt="${useTSPurifier(card.name)}">
        <div class='z-10 flex flex-col gap-2 mx-2 text-[12px] text-slate-600'>
          <h2 class='mt-7 text-[2em]'>${useTSPurifier(card.name)}</h2>
          <p class='mb-1'>Registered Date: ${card.date}</p>
          <p>Image url:</p>
          <input class='p-1' type='text' id='imageInput' value='${card.image}'/>
          <p>Description:</p>
          <textarea rows='5' class=' text-slate-700 resize-none p-1' id='descTextarea'>${useTSPurifier(card.desc)}</textarea>
          ${'role' in card ? (`
              <p>Role : </p>
              <select id='roleInput' name='role' class='w-full bg-white p-1 text-slate-600'>
                <option value='${card.role}'>${toCapitalized(card.role)}</option>
                <option value='admin'>Admin</option>
                <option value='observer'>Observer</option>
                <option value='designer'>Designer</option>
                <option value='teacher'>Teacher</option>
              </select>
          `) : ''}
          <div class='${'role' in card ? 'mb-6' : ''}'>
            <p>Details</p>
            <div class=' text-slate-700'>
              ${'course' in card ? (`
                  <div>
                    <p>Courses: </p>
                    <div class='h-full w-full'>
                      <textarea class='resize-none h-full p-1 rounded-sm w-full' id='courseTextarea'>${useTSPurifier(card.course.join(', \n'))}</textarea>
                    </div>
                  </div>
              `) : ''}
              <div class='w-full'>
                <p> Tel:</p>
                <input class='w-full p-1 rounded-sm' type='text' id='telInput' value='${useTSPurifier(String(card.tel))}' />
              </div>
              <div>
            <p class='mb-2'> Address:</p>
            <textarea row='3' class='resize-none w-full p-1 rounded-sm' id='addressTextarea'>${useTSPurifier(card.address)}</textarea>
          </div>
          <div>
            <p>Email: </p>
            <input class='w-full p-1 rounded-sm' type='email' id='emailInput' value='${useTSPurifier(String(card.email))}' />
          </div>
          ${'password' in card ? (`
            <div>
              <p>Password: </p>
              <input class='w-full p-1 rounded-sm' type='password' id='passwordInput' value='${useTSPurifier(String(card.password))}' />
            </div>
          `) : ''}
            </div>
            
          </div>
          
          <div class='${'role' in card ? 'mb-0' : 'mb-6'}'></div>
        </div>
        <div class='absolute right-1 bottom-[5px] grid place-content-stretch grid-cols-2 text-[12px] z-50 items-center'>
          <button class='p-1 bg-teal-400 hover:bg-teal-950 hover:text-white rounded-sm mr-1 save-button' id='save' selfdata-id=${card._id}>Save</button>
          <button class='p-1 bg-orange-800 hover:bg-orange-950 text-white rounded-sm' id='cancel'>Cancel</button>
        </div>
      </div>
  `))

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
  const updatedRole = DOM.querySelector('#roleInput') as HTMLSelectElement;
  const updatedAddress = DOM.querySelector('#addressTextarea') as HTMLTextAreaElement;
  const updatedTel = DOM.querySelector('#telInput') as HTMLInputElement;

  const Now = new Date()

  let updateImg = useTSPurifier(updatedImage.value);
  let updateDesc = useTSPurifier(updatedDesc.value);
  let updateAddress = useTSPurifier(updatedAddress.value);
  let updateEmail = useTSPurifier(updatedEmail?.value || '');
  let updatePassword = useTSPurifier(updatedPassword?.value || '');
  let updateTel = useTSPurifier(updatedTel.value);
  let updateCourse = useTSPurifier(updatedCourse?.value || '');
  let updateRole = useTSPurifier(updatedRole?.value || '');
  let updatedDate = useTSPurifier(Now.toLocaleString('en-us', { hour12: true }));

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
    updatedPassword.addEventListener('input', async () => {
      updatePassword = updatedPassword.value;
      try {
        const hashedPassword = await bcrypt.hash(updatePassword, 10);
        updatePassword = hashedPassword;
      } catch (error) {
        console.error('Error hashing password:', error);
      }
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
        return
      }

      if ('role' in card) {
        await store.dispatch(updateUserData({ _id: String(card._id), updateData: (updatedData) as unknown as UserType[number] }));
        return
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
