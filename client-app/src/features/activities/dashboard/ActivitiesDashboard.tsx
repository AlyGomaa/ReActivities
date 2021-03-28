import { Grid, GridColumn } from 'semantic-ui-react';
import ActivityList from './ActivityList'
import 'semantic-ui-css/semantic.min.css'
import 'react-calendar/dist/Calendar.css'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

export default observer( function  ActivitiesDashboard()
    {
        const {activityStore} = useStore();
        const {loadActivities, activityRegistry} = activityStore;
        useEffect(()=> {
            if(activityRegistry.size <= 1) loadActivities();
        }, [activityRegistry.size, loadActivities]);


        if (activityStore.loadingInitial) 
            return <LoadingComponent inverted={true} content='Loading App'/>
        
        return(
            <Grid>
                <GridColumn width='10'>
                    <ActivityList />
                </GridColumn>
                <GridColumn width='6'>
                    <ActivityFilters />
                </GridColumn>
            </Grid>
        )
    })