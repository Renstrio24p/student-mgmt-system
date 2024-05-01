import { Sanitizer } from "components/tools/sanitizer.ts";
import store from "../../redux/redux.state.ts";
import { postStudentData } from "../../redux/redux.add";
import { useTSElements } from "utils/hooks/useTSElements.ts";
import { useTSEventAll } from "utils/hooks/useTSAllElements.ts";
import { useTSEvent } from "utils/hooks/useTSEvent.ts";
import { useTSRequest } from "utils/hooks/useTSFetch.ts";

export default function AddStudent(DOM: HTMLElement) {
  useTSElements(
    DOM,
    /*html*/ `
        <div class='w-[full] h-[90vh] bg-slate-400 flex items-center justify-center'>
            <div class=' w-full flex items-center gap-10'>
                <div class='w-full m-11'>
                    <h1 class='my-1'>Enroll Student</h1>
                    <img src='' id='image' alt='image'/>
                    <form class='w-full bg-slate-100 p-8 rounded-sm shadow-md flex flex-col gap-0 text-[12px] text-slate-700' id="addUserForm">
                        <div class='w-full relative h-[40px]'>
                            <label class='absolute top-1.5 left-1 text-[12px] text-slate-600  p-0' for="img">Image Link</label>
                            <input class='w-full p-1 outline-none' type='text' name='img' id='image' />
                        </div>
                        <div class='w-full relative h-[40px]'>
                            <label class='absolute top-1.5 left-1 text-[12px] text-slate-600  p-0' for="name">Full Name</label>
                            <input class='w-full p-1 outline-none' type="text" id="name" name="fullname">
                        </div>
                        <div class='w-full relative h-[40px]'>
                            <label class='absolute top-1.5 left-1 text-[12px] text-slate-600  p-0' for="location">Address</label>
                            <input class='w-full p-1 outline-none' type="text" id="location" name="slocation">
                        </div>
                        <div class='w-full relative h-[40px]'>
                            <label class='absolute top-1.5 left-1 text-[12px] text-slate-600  p-0' for="location">Tel: </label>
                            <input class='w-full p-1 outline-none' type="text" id="tel" name="tel">
                        </div>
                        <div class='w-full relative h-[40px]'>
                            <label class='absolute top-1.5 left-1 text-[12px] text-slate-600  p-0' for="email">Email</label>
                            <input class='w-full p-1 outline-none' type="email" id="email" name="email">
                        </div>
                        <div class='w-full relative'>
                            <label class='absolute top-1.5 left-1 text-[12px] text-slate-600  p-0' for="course">Course</label>
                            <input class='w-full p-1 mb-2 outline-none' type="text" id="course" name="course">
                        </div>
                        <div class='w-full relative'>
                            <label class='absolute top-1.5 left-1 text-[12px] text-slate-600  p-0' for="description">Description</label>
                            <textarea rows='5' class='w-full resize-none mb-3 p-1 outline-none transition-all' id='description' name='description'></textarea>
                        </div>
                        <button type="submit" class='w-1/2 bg-slate-600 text-[12px] py-1 text-white rounded-sm outline-none'>Add User</button>
                    </form>
                </div>
            </div>
        </div>`
  );

  const fileInput = DOM.querySelector("#image") as HTMLInputElement;
  const preview = DOM.querySelector("#previewImage") as HTMLImageElement;

  fileInput.addEventListener("change", () => {
    previewImage(fileInput.files, preview);
  });

  useTSEvent("addUserForm", "submit", async e => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = Sanitizer(formData.get("fullname") as string);
    const email = Sanitizer(formData.get("email") as string);
    const location = Sanitizer(formData.get("slocation") as string);
    const tel = Sanitizer(formData.get("tel") as string);
    const description = Sanitizer(formData.get("description") as string);
    const courseString = Sanitizer(formData.get("course") as string);
    const img = Sanitizer(formData.get("img") as string);

    console.log(name);
    console.log(location);

    // Convert the course string to an array of strings
    const course = courseString.split(",").map(courseName => courseName.trim());

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("en-US", {
      hour12: true,
    });

    const dataStudent = {
      name: name,
      email: email,
      tel: tel,
      desc: description,
      image: img,
      course: course,
      address: location,
      date: formattedDate,
    };

    useTSRequest(async () => {
      try {
        // Dispatch action to add user data
        store.dispatch(postStudentData(dataStudent));
      } catch (error) {
        console.error("Error adding user:", (error as Error).message);
      }
    });
  });

  useTSEventAll("input, textarea", "focus", event => {
    const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement;
    inputElement.previousElementSibling?.classList.add(
      "text-[9px]",
      "top-[-7px]"
    );
  });

  useTSEventAll("input, textarea", "blur", event => {
    const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (inputElement.value === "") {
      inputElement.previousElementSibling?.classList.remove(
        "text-[9px]",
        "top-[-7px]"
      );
    }
  });
}

function previewImage(files: FileList | null, preview: HTMLImageElement) {
  if (files && files[0]) {
    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}
