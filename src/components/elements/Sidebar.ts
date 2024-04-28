import { toCapitalized } from "components/tools/toCapitalized";
import { Common } from "redux/redux.types";
import { useTSElements } from "utils/hooks/useTSElements";

<<<<<<< HEAD
export default function Sidebar(DOM: HTMLElement, data: Common['user']) {
    const loggedInUserEmail = localStorage.getItem('email');

    const loggedInUser = data.find(user => user.email === loggedInUserEmail);

    const dataspecific = { user: loggedInUser }
    console.log("Logged-in user email:", dataspecific.user?.email);
=======
export default function Sidebar(DOM: HTMLElement) {
>>>>>>> parent of 804acaf (add files)

    useTSElements(DOM, (`
    <div class='p-3 text-white'>
      <h1 class='flex items-center'>
        <i class="ri-box-2-fill"></i>
        <span class='text-[12px] ml-1'>Student Management System</span> 
      </h1>

      <div class='w-full my-5 flex items-center justify-center gap-4'>
         <div class='rounded overflow-hidden w-[50px] h-[40px]'>
            <img class='w-full h-full rounded-full' src='${dataspecific.user?.image}' alt='profile' />
         </div>
         <div>
            <h2 class='text-md'>Hi!, ${dataspecific.user?.name}</h2>
            <p class='text-[12px]'>${toCapitalized(String(dataspecific.user?.role))}</p>
         </div>
      </div>

      <div>
        <h3 class='text-sm'><i class="ri-dashboard-2-fill"></i> Main Menu</h3>
        <hr class='mt-1'>
        <div class='mt-2'>
            <ul>
                <li>
                    <a href='/' class='flex items-center gap-3'>
                        <i class="ri-apps-2-line"></i>
                        <span class='text-[12px]'>Dashboard</span>
                    </a>
                </li>
<<<<<<< HEAD
                ${dataspecific.user?.role === 'superadmin' ? (`
                    <li class='px-1 rounded-sm hover:bg-teal-950'>
                        <a href='/dashboard/users/' class='flex items-center gap-3'>
                            <i class="ri-id-card-line"></i>
                            <span class='text-[12px]'>Users</span>
                        </a>
                    </li>
                    <li class='px-1 rounded-sm hover:bg-teal-950'>
                        <a href='/dashboard/courses/' class='flex items-center gap-3'>
                            <i class="ri-building-2-line"></i>
                            <span class='text-[12px]'>Courses</span>
                        </a>
                    </li>
                `) : ''}
                <li class='px-1 rounded-sm hover:bg-teal-950'>
=======
                <li>
                    <a href='/dashboard/users/' class='flex items-center gap-3'>
                        <i class="ri-id-card-line"></i>
                        <span class='text-[12px]'>Users</span>
                    </a>
                </li>
                <li>
                    <a href='/dashboard/courses/' class='flex items-center gap-3'>
                        <i class="ri-building-2-line"></i>
                        <span class='text-[12px]'>Courses</span>
                    </a>
                </li>
                <li>
>>>>>>> parent of 804acaf (add files)
                    <a href='/dashboard/students/' class='flex items-center gap-3'>
                        <i class="ri-graduation-cap-line"></i>
                        <span class='text-[12px]'>Students</span>
                    </a>
                </li>
            </ul>
        </div>
        <h3 class='text-sm mt-1'><i class="ri-folder-settings-fill"></i> Tools</h3>
        <hr class='mt-1'>
        <div class='mt-2'>
<<<<<<< HEAD
            <ul class='flex flex-col gap-1'>
                ${dataspecific.user?.role === 'superadmin' ? (`
                    <li class='px-1 rounded-sm hover:bg-teal-950'>
=======
            <ul>
                <li>
>>>>>>> parent of 804acaf (add files)
                    <a href='/dashboard/course/add/' class='flex items-center gap-3'>
                        <i class="ri-file-add-line"></i>
                        <span class='text-[12px]'>Add Course</span>
                    </a>
                </li>
                <li>
                    <a href='/dashboard/student/add' class='flex items-center gap-3'>
                        <i class="ri-graduation-cap-fill"></i>
                        <span class='text-[12px]'>Enroll Student</span>
                    </a>
                </li>
                <li>
                    <a href='/dashboard/users/add/' class='flex items-center gap-3'>
                        <i class="ri-id-card-fill"></i>
                        <span class='text-[12px]'>Add User</span>
                    </a>
                </li>
<<<<<<< HEAD
                `) : ''}
                <li class='px-1 rounded-sm hover:bg-teal-950'>
=======
                <li>
>>>>>>> parent of 804acaf (add files)
                    <a href='/dashboard/settings/' class='flex items-center gap-3'>
                        <i class="ri-settings-line"></i>
                        <span class='text-[12px]'>Settings</span>
                    </a>
                </li>
                <li>
                    <button href='/' class='flex items-center gap-3'>
                        <i class="ri-moon-line"></i>
                        <span class='text-[12px]'>Darkmode</span>
                    </button>
                </li>
            </ul>
        </div>
        <hr class='mt-1'>
        <div class='text-[10px] mt-5 text-left'>
            <p><i class="ri-coreos-fill"></i> Student Management System &trade; ver.1</p>
            <p><i class="ri-copyright-line"></i> CoderTubes Inc.</p>
        </div>
      </div>
    </div>
  `))

}