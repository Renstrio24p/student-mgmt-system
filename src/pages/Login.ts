import axios from "axios";
import { useTSEventAll } from "utils/hooks/useTSAllElements";
import { useTSElements } from "utils/hooks/useTSElements";
import { useTSElementEach } from "utils/hooks/useTSForEach";
import { useTSPurifier } from "utils/hooks/useTSPurifier";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function Login(DOM: HTMLElement) {
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/api/login", {
        email,
        password,
      });

      console.log(response);

      if (!response.data.success) {
        throw new Error("Login failed");
      }

      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);

      console.log("Login successful");
      window.location.href = "/dashboard/";
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const bgImage = useTSPurifier(
    "https://w0.peakpx.com/wallpaper/454/273/HD-wallpaper-green-leaf-plant-on-white-background.jpg"
  );

  useTSElements(
    DOM,
    `
    <div class='fixed w-full h-full top-0 left-0 bg-slate-200 flex items-center justify-center z-50 transition-all duration-300'>
        <div class='bg-white shadow-lg rounded-xl p-4 flex flex-col w-1/4 gap-3 relative overflow-hidden'>
            <img class='absolute top-0 left-0 w-full h-full opacity-20 z-1' src='${bgImage}' alt='bg' />
            <div class='text-center leading-[1.8em] my-3'>
                <h1 class='text-[1.6em] font-semibold'>Welcome</h1>
                <p class='text-[12px] text-slate-600'>Login to your account</p>
            </div>
            <form id="loginForm" class='flex flex-col gap-2 z-20'>
                <div class='relative'>
                    <label class=' px-1 absolute text-[12px] left-[2%] top-[50%] -translate-y-1/2 text-slate-600  duration-300 transform origin-top' for="email">Email</label>
                    <input class='w-full text-sm outline-none border border-slate-400 rounded-md py-2 pl-2 bg-white' type='text' name='email' id='email' />
                </div>
                <div class='relative mb-6'>
                    <label class=' px-1 absolute text-[12px] left-[2%] top-[50%] -translate-y-1/2 text-slate-600  duration-300 transform origin-top' for="password">Password</label>
                    <input class='w-full text-sm outline-none border border-slate-400 rounded-md py-2 pl-2 bg-white' type='password' name='password' id='password' />
                </div>
                <button type="submit" class='w-full p-2 rounded-md border border-slate-400 bg-white'>Login</button>
            </form>
        </div>
    </div>
  `
  );

  useTSEventAll("#email, #password", "focus", event => {
    const input = event.target as HTMLInputElement;
    const label = input.previousElementSibling as HTMLLabelElement;
    label.classList.add("top-[-5%]");
    label.classList.remove("top-[0%]");
  });

  useTSEventAll("#email, #password", "input", event => {
    const input = event.target as HTMLInputElement;
    const label = input.previousElementSibling as HTMLLabelElement;
    label.classList.add("top-[-5%]");
    label.classList.remove("top-[0%]");
  });

  useTSEventAll("#email, #password", "blur", event => {
    const input = event.target as HTMLInputElement;
    const label = input.previousElementSibling as HTMLLabelElement;
    if (input.value.trim() === "") {
      label.classList.add("top-[0%]");
      label.classList.remove("top-[-5%]");
    }
  });

  useTSEventAll("#loginForm", "submit", async event => {
    event.preventDefault();
    const email = useTSPurifier(
      (DOM.querySelector("#email") as HTMLInputElement).value
    ) as string;
    const password = useTSPurifier(
      (DOM.querySelector("#password") as HTMLInputElement).value
    ) as string;
    await handleLogin(email, password);
  });

  useTSElementEach(
    "#email, #password",
    ["focus", "blur"],
    (input, eventType) => {
      input.addEventListener(eventType, () => {
        input.previousElementSibling!.classList.toggle("transition-transform");
      });
    }
  );
}
