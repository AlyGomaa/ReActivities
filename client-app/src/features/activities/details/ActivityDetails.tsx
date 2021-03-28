import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { GridColumn, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

export default observer(function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity:activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id:string}>();

    useEffect(()=>{
        if (id) {
            loadActivity(id);
        }
    }, [id, loadActivity]);

    if(loadingInitial || !activity) return <LoadingComponent content="Acivity Details!!" inverted/>;

    return(
        <Grid>
            <GridColumn width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat />
            </GridColumn>
            <GridColumn width={4}>
                <ActivityDetailedSidebar/>
            </GridColumn>
        </Grid>
    )
})