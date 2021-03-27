import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, ItemContent, ItemDescription, ItemExtra, ItemGroup, ItemHeader, ItemMeta, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function ActivityList() {

    const {activityStore} = useStore();
    const {editMode, submitting, deleteActivity, activitiesByDate} = activityStore;

    const [target, setTarget] = useState('');
    function handleActivityDelee(e: SyntheticEvent<HTMLButtonElement>, id:string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }


    return(
        <Segment>
            <ItemGroup divided>
                {activitiesByDate.map(activity =>(
                    <Item key={activity.id}>
                        <ItemContent>
                            <ItemHeader as='a'>{activity.title}</ItemHeader>
                            <ItemMeta>{activity.date}</ItemMeta>
                            <ItemDescription>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </ItemDescription>
                            <ItemExtra>
                                <Button disabled={editMode} as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue'/>
                                <Button 
                                    name={activity.id}
                                    loading={submitting && target === activity.id} 
                                    disabled={editMode} 
                                    onClick={(e)=>handleActivityDelee(e, activity.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red'
                                />
                                <Label basic content={activity.category}/>
                            </ItemExtra>
                        </ItemContent>
                    </Item>
                ))}
            </ItemGroup>
        </Segment>
    )
})