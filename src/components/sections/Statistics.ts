import { fetchWeatherApi } from 'openmeteo';
import { scriptElement } from 'utils/purify/purify';

export default async function Statistics(DOM: HTMLElement) {

    const Now = new Date();
    const currentHour = Now.getHours();
    const period = currentHour >= 12 ? 'PM' : 'AM';
    const icon = currentHour >= 6 && currentHour < 18 ? '🌞' : '🌜';

    // Fetching weather data for Manila
    const manilaLocation = {
        latitude: 14.5995,
        longitude: 120.9842
    };
    const manilaWeatherData = await fetchWeatherData(manilaLocation);

    // Display weather data
    displayWeatherData(manilaWeatherData, period, icon);

    async function fetchWeatherData(location: { latitude: number, longitude: number }) {
        const params = {
            "latitude": location.latitude,
            "longitude": location.longitude,
            "hourly": "temperature_2m"
        };
        const url = "https://api.open-meteo.com/v1/cma";
        const responses = await fetchWeatherApi(url, params);
        return responses[0];
    }

    function displayWeatherData(weatherResponse: any, _period: string, icon: string) {

        const currentTemperature = weatherResponse.hourly()?.variables(0)?.valuesArray()?.[0];

        DOM.innerHTML = (`
            <div class='grid gap-1 grid-cols-2 place-content-stretch mt-6 lg:w-[70%] sm:w-full'>
                <div id='city' class='h-auto overflow-hidden rounded-md relative'>
                    <div class='absolute right-3 top-3 text-[14px] z-20 text-white'>
                        <h3 class='text-[30px] flex'>${icon} Manila</h3>
                        <p>Temperature: ${currentTemperature.toFixed(2)}°C</p>
                        <p>Time: ${Now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                    </div>
                    <div class='absolute bg-gradient-to-r from-black to-slate-600 w-full h-full z-10 opacity-[0.7]'></div>
                    <img class='w-full relative' src='${currentHour >= 12 ? '/dark.jpg' : '/light.webp'}' alt=dark />
                </div>
                <div class='grid grid-cols-2 gap-4 place-content-stretch w-full ml-6'>
                    <div class='flex bg-gradient-to-tr from-red-100 to-white rounded-[0.45em] p-4 h-full items-center justify-center shadow-xl'>
                        <i class="ri-graduation-cap-fill text-[2em]"></i>
                        <div class='ml-3'>
                            <h2 class='text-[0.8rem]'>Total Students</h2>
                            <p class='text-[1em]'>123,000</p>
                        </div>
                    </div>
                    <div class='flex bg-gradient-to-tr from-yellow-300 to-white rounded-[0.45em] p-4 h-full items-center justify-center shadow-xl'>
                        <i class="ri-user-3-line text-[2em]"></i>
                        <div class='ml-3'>
                            <h2 class='text-[0.8rem]'>Total Users</h2>
                            <p class='text-[1em]'>5</p>
                        </div>
                    </div>
                    <div class='flex bg-gradient-to-tr from-orange-400 to-white rounded-[0.45em] p-4 h-full items-center justify-center shadow-xl'>
                        <i class="ri-edit-box-fill text-[2em]"></i>
                        <div class='ml-3'>
                            <h2 class='text-[0.8rem]'>Total Quizzes</h2>
                            <p class='text-[1em]'>1,560</p>
                        </div>
                    </div>
                    <div class='flex bg-purple-200 rounded-[0.45em] p-4 h-full items-center justify-center shadow-xl'>
                        <i class="ri-edit-box-fill text-[2em]"></i>
                        <div class='ml-3'>
                            <h2 class='text-[0.8rem]'>Total Questionaires</h2>
                            <p class='text-[1em]'>22,560</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    const cityPhase = DOM.querySelector('#city') as HTMLElement
    cityPhase.append(scriptElement)
}
