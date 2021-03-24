import { useEffect } from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar'
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard'
import LoadingComponent from './LoadingComponent'
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

  useEffect(()=> {
    activityStore.loadActivities();
  }, [activityStore]);


  if (activityStore.loadingInitial) 
    return <LoadingComponent inverted={true} content='Loading App'/>

  return (
    <>
      <NavBar />
      <Container id='ActivitiesCon'>
        <ActivitiesDashboard />
      </Container>
    </>
  );
}

export default observer (App);
