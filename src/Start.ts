import { Router } from "./utils/routes/Router";
import { HTMLSidebarElement } from "types/Food";
import Sidebar from "components/elements/Sidebar";
import { useTSElements } from "utils/hooks/useTSElements";
import store, { fetchStudentData, fetchUserData } from './redux/redux.state';
import { isAuthenticated } from "utils/routes/auth/isAuthorized";

export default function Start(DOM: HTMLElement) {
    // Access the Redux store state directly
    const fetchData = async () => {
        try {
            await store.dispatch(fetchStudentData());
            await store.dispatch(fetchUserData());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // configuring store from redux toolkit

    const handleStoreChange = () => {
        const state = store.getState();

        const userData = state.user.userData;
        const studentData = state.student.studentData;

        const alldata = { user: userData, student: studentData }

        useTSElements(DOM, (`
                <div class='flex items-center relative ${isAuthenticated(alldata.user[0]) ? 'fixed' : 'none'}'>
                    <aside id='sidebar' class='w-[220px] bg-cyan-800 fixed top-0 h-[100vh]'></aside>
                    <div class='w-full ml-[220px]' id='router'></div>
                </div>
            `));

        const sidebar = DOM.querySelector('#sidebar') as HTMLSidebarElement;
        const routerContainer = DOM.querySelector('#router') as HTMLElement;

        // Pass all user-related data to Sidebar component
        Sidebar(sidebar, alldata.user);
        Router(routerContainer, alldata);
    }

    const unsubscribe = store.subscribe(handleStoreChange);

    fetchData();
    handleStoreChange();

    return () => {
        unsubscribe();
    };
}
