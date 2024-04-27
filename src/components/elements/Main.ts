import { scriptElement } from 'utils/purify/purify';
import store, { fetchStudentData, fetchUserData } from '../../redux/redux.state'
import { DashboardRouter } from 'components/router/Dashboard.router';

export default function Main(DOM: HTMLElement) {

  // get data from redux state 

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

    const user = state.user.userData
    const student = state.student.studentData

    const data = { user, student }

    // Main RealDOM UI
    DOM.innerHTML = `
    <div id='child'></div>
  `;

    // Initializing Child Router states
    const child = DOM.querySelector('#child') as HTMLElement
    child.appendChild(scriptElement)


    // Pass Redux data state to DashboardRouter
    DashboardRouter(child, data);
  };

  // like useEffect terminate after loads the date for free cache
  const unsubscribe = store.subscribe(handleStoreChange);

  // Initial fetch and render
  fetchData();
  handleStoreChange();

  // Cleanup function
  return () => {
    unsubscribe();
    // Clean up any additional resources if necessary
  };
}
