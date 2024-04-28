import axios from 'axios';
import { useTSElements } from 'utils/hooks/useTSElements';
import { useTSPurifier } from 'utils/hooks/useTSPurifier';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000', // Replace with your server URL
    timeout: 5000, // Timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function Login(DOM: HTMLElement) {
    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await axiosInstance.post('/api/login', {
                email,
                password,
            });

            console.log(response);

            if (!response.data.success) {
                throw new Error('Login failed');
            }

            // Assuming the server sends back a token upon successful login
            const token = response.data.token;

            // Store the token in local storage or session storage for future use
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);

            console.log('Login successful');

        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    useTSElements(DOM, (`
    <div class='fixed w-[100vw] h-[100vh] bg-teal-800 top-0 left-0 z-[100]'>
        <h1>Login</h1>
        <form id="loginForm">
            <label>Email:</label>
            <input type="email" id="email" name='email' />
            <label>Password:</label>
            <input type="password" id="password" name='password' />
            <button type="submit">Login</button>
        </form>
    </div>
    `));

    const loginForm = DOM.querySelector('#loginForm') as HTMLFormElement;
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const emailInput = document.querySelector('#email') as HTMLInputElement;
        const passwordInput = document.querySelector('#password') as HTMLInputElement;
        const email = useTSPurifier(emailInput.value);
        const password = useTSPurifier(passwordInput.value);
        await handleLogin(String(email), String(password));
    });
}
