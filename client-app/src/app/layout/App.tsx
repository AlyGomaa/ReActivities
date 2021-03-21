import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard'
import {v4 as uuid} from 'uuid'

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(()=> {
    axios.get<Activity[]>('http://localhost:5000/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  function handleSelectActivity(Id:string) {
      setSelectedActivity(activities.find(a => a.id === Id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
    handleFormClose();
  }

  function handleFormOpen(id?:string) {
    id ? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity:Activity) {
    activity.id 
    ? setActivities([...activities.filter(a => a.id !== activity.id), activity]) 
    : setActivities([...activities, {...activity, id:uuid()}]);

    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id:string) {
    setActivities([...activities.filter(a=> a.id !== id)]);

    setEditMode(false);
    setSelectedActivity(undefined);
  }
  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container id='ActivitiesCon'>
        <ActivitiesDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectedActivity={handleCancelSelectedActivity}
          editMode={editMode}
          formOpen={handleFormOpen}
          formClose={handleFormClose}
          createOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
