import { Container} from 'semantic-ui-react';
import NavBar from './NavBar'
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard'
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/home'
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path='/' component={HomePage}/>
      <Route
        path={'/(.+)'}
        render={()=>(
          <>
            <NavBar />
            <Container id='ActivitiesCon'>
              <Route exact path='/activities' component={ActivitiesDashboard}/>
              <Route path='/activities/:id' component={ActivityDetails}/>
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
            </Container>
          </>
        )}
      />
      
    </>
  );
}

export default observer (App);
