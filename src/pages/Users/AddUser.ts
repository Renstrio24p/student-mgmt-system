import { Sanitizer } from 'components/tools/sanitizer.ts';
import store from '../../redux/redux.state.ts';
import { postUserData } from '../../redux/redux.add.ts';

export default function AddUser(DOM: HTMLElement) {
  DOM.innerHTML = `
    <div class='w-[full] h-[90vh] bg-slate-400 flex items-center justify-center'>
      <div class='flex items-center gap-10'>
        <div>
          <h1 class='my-1'>Add User</h1>
          <form class='w-[320px] bg-slate-100 p-8 rounded-sm shadow-md flex flex-col gap-0' id="addUserForm">
            <div class='w-full relative h-[40px]'>
              <input class='w-full p-1' type='text' name='img' id='image' />
            </div>
            <div class='w-full relative h-[40px]'>
              <label class='absolute top-1.5 left-1 text-[12px] text-slate-600' for="username">Username</label>
              <input class='w-full p-1' type="text" id="username" name="username">
            </div>
            <div class='w-full relative h-[40px]'>
              <label class='absolute top-1.5 left-1 text-[12px] text-slate-600' for="password">Password</label>
              <input class='w-full p-1' type="password" id="password" name="password">
            </div>
            <div class='w-full relative h-[40px]'>
              <label class='absolute top-1.5 left-1 text-[12px] text-slate-600' for="email">Email</label>
              <input class='w-full p-1' type="email" id="email" name="email">
            </div>
            <div class='w-full relative'>
              <select id='role' name='role' class='w-full bg-white p-1 mb-2 text-[12px] text-slate-600'>
                <option value='admin'>admin</option>
                <option value='observer'>observer</option>
                <option value='designer'>designer</option>
                <option value='teacher'>teacher</option>
              </select>
            </div>
            <div class='w-full relative'>
              <label class='absolute top-1.5 left-1 text-[12px] text-slate-600' for="description">Description</label>
              <textarea rows='5' class='w-full resize-none mb-3 p-1' id='description' name='description'></textarea>
            </div>
            <button type="submit" class='w-1/2 bg-slate-600 text-[12px] py-1 text-white rounded-sm'>Add User</button>
          </form>
        </div>
      </div>
    </div>`;

  const form = DOM.querySelector('#addUserForm') as HTMLFormElement;
  const fileInput = DOM.querySelector('#image') as HTMLInputElement;
  const preview = DOM.querySelector('#previewImage') as HTMLImageElement;

  fileInput.addEventListener('change', () => {
    previewImage(fileInput.files, preview);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const username = Sanitizer(formData.get('username') as string);
    const password = Sanitizer(formData.get('password') as string);
    const email = Sanitizer(formData.get('email') as string);
    const description = Sanitizer(formData.get('description') as string);
    const role = Sanitizer(formData.get('role') as string);
    const img = Sanitizer(formData.get('img') as string);

    const dataUser = {
      name: username,
      password: password,
      email: email,
      role: role,
      desc: description,
      image: img
    }

    try {
      // Dispatch action to add user data
      store.dispatch(postUserData(dataUser));
    } catch (error) {
      console.error('Error adding user:', (error as Error).message);
    }
  });

  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', () => {
      const label = input.previousElementSibling as HTMLLabelElement;
      label.classList.add('text-[11px]', 'top-[-5px]');
    });

    input.addEventListener('blur', () => {
      const label = input.previousElementSibling as HTMLLabelElement;
      if ((input as HTMLInputElement).value === '') {
        label.classList.remove('text-[11px]', 'top-[-5px]');
      }
    });
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
    preview.src = '';
  }
}
