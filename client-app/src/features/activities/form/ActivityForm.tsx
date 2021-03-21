import React, { ChangeEvent, useState } from 'react';
import { Button, Form, FormInput, FormTextArea, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    formClose:()=>void;
    activity:Activity | undefined;
    createOrEditActivity: (activity:Activity)=>void;
}
export default function ActivityForm({formClose, activity: selectedActivity, createOrEditActivity}:Props) {
    
    const initialState= selectedActivity ?? {
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEditActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]:value}) 
    }
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <FormInput      placeholder='Title'         value={activity.title} name='title' onChange={handleInputChange}/>
                <FormTextArea   placeholder='Description'   value={activity.description} name='description' onChange={handleInputChange}/>
                <FormInput      placeholder='Category'      value={activity.category} name='category' onChange={handleInputChange}/>
                <FormInput      placeholder='Date'          value={activity.date} name='date' onChange={handleInputChange}/>
                <FormInput      placeholder='City'          value={activity.city} name='city' onChange={handleInputChange}/>
                <FormInput      placeholder='Venue'         value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={()=>formClose()} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}