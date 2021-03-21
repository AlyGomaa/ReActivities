import React from 'react';
import { Button, Item, ItemContent, ItemDescription, ItemExtra, ItemGroup, ItemHeader, ItemMeta, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    activities: Activity[];
    selectActivity: (Id:string)=>void;
    editMode:boolean;
    deleteActivity: (id:string)=>void;
}

export default function ActivityList({activities, selectActivity, editMode, deleteActivity}: Props) {
        
    return(
        <Segment>
            <ItemGroup divided>
                {activities.map(activity =>(
                    <Item key={activity.id}>
                        <ItemContent>
                            <ItemHeader as='a'>{activity.title}</ItemHeader>
                            <ItemMeta>{activity.date}</ItemMeta>
                            <ItemDescription>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </ItemDescription>
                            <ItemExtra>
                                <Button disabled={editMode} onClick={()=>selectActivity(activity.id)} floated='right' content='View' color='blue'/>
                                <Button disabled={editMode} onClick={()=>deleteActivity(activity.id)} floated='right' content='Delete' color='red'/>
                                <Label basic content={activity.category}/>
                            </ItemExtra>
                        </ItemContent>
                    </Item>
                ))}
            </ItemGroup>
        </Segment>
    )
}