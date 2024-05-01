import { toCapitalized } from "components/tools/toCapitalized";
import { StudentType } from "components/types/Student";
import { UserType } from "components/types/Users";
import { Common } from "redux/redux.types";
import { updateStudentData, updateUserData } from "redux/redux.update";
import { useTSElements } from "utils/hooks/useTSElements";
import { useTSPurifier } from "utils/hooks/useTSPurifier";
import store from "../../redux/redux.state";
import { useTSEvent } from "utils/hooks/useTSEvent";

export default function EditModal(
  DOM: HTMLElement,
  card: Common["student" | "user"][number]
) {
  useTSElements(
    DOM,
    /*html*/ `
    <form id="editForm" class="modals fixed top-0 left-0 w-full h-[100vh] bg-gradient-to-r from-slate-900 bg-opacity-5 grid place-content-center z-[100]">
      <div class="modal-div w-[350px] bg-slate-200 rounded-md relative p-3 grid place-content-stretch gap-1 animate-[fadeInUp_1s]">
        <img class='w-full h-full z-0 absolute object-cover opacity-[0.3]' src='https://i.pinimg.com/736x/07/d8/67/07d867d81eab5a0a0c8489d59ed4696c.jpg' alt="bg-image"/>
        <span id='closed' class="close cursor-pointer absolute top-1 right-1 bg-red-300 w-5 h-5 rounded-md flex items-center justify-center hover:scale-150 transition duration-500 ease-in"><i class="ri-close-line"></i></span>
        <img class='w-[80px] rounded-full z-10 absolute right-4 top-3' src="${useTSPurifier(
          card.image
        )}" alt="${useTSPurifier(card.name)}">
        <div class='z-10 flex flex-col gap-2 mx-2 text-[12px] text-slate-600'>
          <h2 class='mt-7 text-[2em]'>${useTSPurifier(card.name)}</h2>
          <p class='mb-3'>Registered Date: ${card.date}</p>
          <label for="imageInput">Image url:</label>
          <input class='p-1' type='text' id='imageInput' name="image" value='${useTSPurifier(
            card.image
          )}'/>
          <label for="descTextarea">Description:</label>
          <textarea rows='5' class=' text-slate-700 resize-none p-1' id='descTextarea' name="description">${useTSPurifier(
            card.desc
          )}</textarea>
          ${
            "role" in card
              ? /*html*/ `
              <label for="roleInput">Role :</label>
              <select id='roleInput' name='role' class='w-full bg-white p-1 text-slate-600 mb-6'>
                <option value='${card.role}'>${toCapitalized(
                  card.role!
                )}</option>
                <option value='admin'>Admin</option>
                <option value='observer'>Observer</option>
                <option value='designer'>Designer</option>
                <option value='teacher'>Teacher</option>
              </select>
          `
              : ""
          }
          <div>
            <p>Details</p>
            <div class=' text-slate-700'>
              ${
                "course" in card
                  ? /*html*/ `
                  <label for="courseTextarea">Courses:</label>
                  <textarea class='resize-none h-full p-1 rounded-sm w-full' id='courseTextarea' name="courses">${useTSPurifier(
                    card.course.join(", \n")
                  )}</textarea>
              `
                  : ""
              }
              <label for="telInput">Tel:</label>
              <input class='w-full p-1 rounded-sm' type='text' id='telInput' name="telephone" value='${useTSPurifier(
                String(card.tel)
              )}' />
              <label for="addressTextarea">Address:</label>
              <textarea row='3' class='resize-none w-full p-1 rounded-sm' id='addressTextarea' name="address">${useTSPurifier(
                card.address
              )}</textarea>
              <label for="emailInput">Email:</label>
              <input class='w-full p-1 rounded-sm' type='email' id='emailInput' name="email" value='${useTSPurifier(
                String(card.email)
              )}' />
              ${
                "password" in card
                  ? /*html*/ `
                <label for="passwordInput">Password:</label>
                <input class='w-full p-1 rounded-sm' type='password' id='passwordInput' name="password" value='${useTSPurifier(
                  String(card.password)
                )}' />
              `
                  : ""
              }
            </div>
          </div>
          <div class='mb-8'></div>
        </div>
        <div class='absolute right-1 bottom-[5px] grid place-content-stretch grid-cols-2 text-[12px] z-50'>
          <button type="submit" class='p-1 bg-teal-400 rounded-sm mr-1 save-button' id='save' selfdata-id=${
            card._id
          }>Save</button>
          <button class='p-1 bg-red-950 text-white rounded-sm' id='cancel'>Cancel</button>
        </div>
      </div>
    </form>
  `
  );

  useTSEvent("editForm", "submit", async e => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedData = Object.fromEntries(formData.entries());
    try {
      if ("course" in card) {
        await store.dispatch(
          updateStudentData({
            _id: String(card._id),
            updateData: updatedData as unknown as StudentType[number],
          })
        );
      } else if ("role" in card) {
        await store.dispatch(
          updateUserData({
            _id: String(card._id),
            updateData: updatedData as unknown as UserType[number],
          })
        );
      }
      Close();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  });

  function Close() {
    const modal = DOM.querySelector("#editForm") as HTMLElement;
    modal.style.animation = "fadeOutUp 1s";
    setTimeout(() => {
      modal.remove();
    }, 1000);
  }
}
