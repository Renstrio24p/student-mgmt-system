import { DashboardRouter } from 'components/router/Dashboard.router';
import { Common } from 'redux/redux.types';
import { useTSElements } from 'utils/hooks/useTSElements';

export default function Main(DOM: HTMLElement, data: Common, card: Common['user']) {

  const loggedInUserEmail = localStorage.getItem('email');

  const loggedInUser = card.find(user => user.email === loggedInUserEmail);

  const dataspecific = { user: loggedInUser };

  // Main RealDOM UI
  useTSElements(DOM, (`
      <div id='child'></div>
    `))

  const child = DOM.querySelector('#child') as HTMLElement
  DashboardRouter(child, data, dataspecific.user!);

}
