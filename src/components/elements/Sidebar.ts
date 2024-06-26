import { toCapitalized } from "components/tools/toCapitalized";
import { useTSElements } from "utils/hooks/useTSElements";
import { useTSPurifier } from "utils/hooks/useTSPurifier";

export const placeholderImg = useTSPurifier(
  "https://mighty.tools/mockmind-api/content/abstract/46.jpg"
);

export default function Sidebar(DOM: HTMLElement) {
  useTSElements(
    DOM,
    /*html*/ `
    <div class='p-3 text-white'>
      <h1 class='flex items-center'>
        <i class="ri-box-2-fill"></i>
        <span class='text-[12px] ml-1'>Student Management System</span> 
      </h1>
      <div class='w-full my-5 flex items-center justify-center gap-4'>
         <div class='rounded overflow-hidden w-[50px] h-[40px]'>
            <img class='w-full h-full rounded-full' src='${placeholderImg}' alt='profile' />
         </div>
         <div>
            <h2 class='text-md'>Hi!, Admin</h2>
            <p class='text-[12px]'>${toCapitalized("Super Admin")}</p>
         </div>
      </div>
      <div>
        <h3 class='text-sm'><i class="ri-dashboard-2-fill"></i> Main Menu</h3>
        <hr class='mt-1'>
        <div class='mt-2'>
            <ul>
                <li class='px-1 rounded-sm hover:bg-teal-950'>
                    <a href='/' class='flex items-center gap-3'>
                        <i class="ri-apps-2-line"></i>
                        <span class='text-[12px]'>Dashboard</span>
                    </a>
                </li>
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
                <li class='px-1 rounded-sm hover:bg-teal-950'>
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
            <ul class='flex flex-col gap-1'>
                <li class='px-1 rounded-sm hover:bg-teal-950'>
                    <a href='/dashboard/course/add/' class='flex items-center gap-3'>
                        <i class="ri-file-add-line"></i>
                        <span class='text-[12px]'>Add Course</span>
                    </a>
                </li>
                <li class='px-1 rounded-sm hover:bg-teal-950'>
                    <a href='/dashboard/student/add' class='flex items-center gap-3'>
                        <i class="ri-graduation-cap-fill"></i>
                        <span class='text-[12px]'>Enroll Student</span>
                    </a>
                </li>
                <li class='px-1 rounded-sm hover:bg-teal-950'>
                    <a href='/dashboard/users/add/' class='flex items-center gap-3'>
                        <i class="ri-id-card-fill"></i>
                        <span class='text-[12px]'>Add User</span>
                    </a>
                </li>
                <li class='px-1 rounded-sm hover:bg-teal-950'>
                    <a href='/dashboard/settings/' class='flex items-center gap-3'>
                        <i class="ri-settings-line"></i>
                        <span class='text-[12px]'>Settings</span>
                    </a>
                </li>
                <li class='px-1 rounded-sm hover:bg-teal-950'>
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
  `
  );

  // Get all li elements
  const liElements = DOM.querySelectorAll("li");

  // Retrieve the selected li index from localStorage
  const selectedLiIndex = localStorage.getItem("selectedLiIndex");

  // Add click event listener to each li element
  liElements.forEach((li, index) => {
    li.addEventListener("click", () => {
      // Remove the bg-teal-950 class from all li elements
      liElements.forEach(element => {
        element.classList.remove("bg-teal-950");
      });

      // Add the bg-teal-950 class to the clicked li element
      li.classList.add("bg-teal-950");

      // Store the index of the clicked li in localStorage
      localStorage.setItem("selectedLiIndex", index.toString());
    });

    // Add bg-teal-950 class to the previously selected li
    if (selectedLiIndex && index.toString() === selectedLiIndex) {
      li.classList.add("bg-teal-950");
    }
  });
}
