import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard'
import {v4 as uuid} from 'uuid'
import Agent from '../api/agent';
import LoadingComponent from './LoadingComponent'
import agent from '../api/agent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(()=> {
    Agent.Activities.list().then(response => {
      let activities : Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
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
    setSubmitting(true);

    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(a => a.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }else{
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id:string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(a=> a.id !== id)]);
      setEditMode(false);
      setSelectedActivity(undefined);
      setSubmitting(false);
    })
  
  }

  if (loading) 
    return <LoadingComponent inverted={true} content='Loading App'/>

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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
