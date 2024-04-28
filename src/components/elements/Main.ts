import store, { fetchStudentData, fetchUserData } from '../../redux/redux.state'
import { DashboardRouter } from 'components/router/Dashboard.router';
import { useTSElements } from 'utils/hooks/useTSElements';

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
    useTSElements(DOM, (`
      <div id='child'></div>
    `))

    const child = DOM.querySelector('#child') as HTMLElement
    DashboardRouter(child, data);
  };

  const unsubscribe = store.subscribe(handleStoreChange);

  fetchData();
  handleStoreChange();

  // Cleanup function
  return () => {
    unsubscribe();
  };
}
