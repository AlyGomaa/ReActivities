import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity'
import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'

interface Props{
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (Id:string)=>void;
    cancelSelectedActivity: ()=>void;
    editMode:boolean;
    formOpen: (id:string)=>void;
    formClose: ()=>void;
    createOrEditActivity: (activity:Activity)=>void;
    deleteActivity: (id:string)=>void;
}

export default function  ActivitiesDashboard(
    {activities, selectedActivity, 
        selectActivity, cancelSelectedActivity,
        editMode, formOpen, formClose, 
        createOrEditActivity, deleteActivity
    }: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity} 
                    editMode={editMode}
                    deleteActivity={deleteActivity}
                />
            </Grid.Column>
            <GridColumn width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails 
                    activity={selectedActivity} 
                    cancelSelectedActivity={cancelSelectedActivity}
                    formOpen={formOpen}
                />}
                {editMode && 
                <ActivityForm 
                    formClose={formClose}
                    activity={selectedActivity}
                    createOrEditActivity={createOrEditActivity}
                />}
            </GridColumn>
        </Grid>
    )
}