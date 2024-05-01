import { Router } from "./utils/routes/Router";
import Sidebar from "components/elements/Sidebar";
import { useTSElements } from "utils/hooks/useTSElements";
import store, { fetchStudentData, fetchUserData } from "./redux/redux.state";
import { useTSComponent } from "utils/hooks/useTSComponent";
import { useTSCSP } from "utils/hooks/useTSCSP";

export default function Start(DOM: HTMLElement) {
  useTSCSP("'self'", "'self'", "'none'", [
    "'self'",
    "http://localhost:4000",
    "https://api.open-meteo.com",
    "https://remixicon.com/",
  ]);

  // Access the Redux store state directly
  const fetchData = async () => {
    try {
      await store.dispatch(fetchStudentData());
      await store.dispatch(fetchUserData());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // configuring store from redux toolkit

  const handleStoreChange = () => {
    const state = store.getState();
    const userData = state.user.userData;
    const studentData = state.student.studentData;
    const alldata = { user: userData, student: studentData };

    useTSElements(
      DOM,
      /*html*/ `
            <div class='flex items-center relative'>
                <aside id='sidebar' class='w-[220px] bg-cyan-800 fixed top-0 h-[100vh]'></aside>
                <div class='w-full ml-[220px]' id='router'></div>
            </div>
        `
    );

    useTSComponent("sidebar", DOM, Sidebar);
    useTSComponent("router", DOM, Router, alldata);
  };

  const unsubscribe = store.subscribe(handleStoreChange);

  fetchData();
  handleStoreChange();

  return () => {
    unsubscribe();
  };
}
