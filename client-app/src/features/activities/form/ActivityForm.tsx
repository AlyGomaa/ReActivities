import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Form, FormInput, FormTextArea, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';

export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {loadingInitial, createActivity, updateActivity, submitting, loadActivity} = activityStore;
    const {id} = useParams<{id:string}>();
    const history = useHistory();
    const [activity, setActivity] = useState({
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    });

    useEffect(()=>{
        if (id) {
            loadActivity(id).then(activity=> setActivity(activity!));
        }
        
    }, [id, loadActivity]);

    function handleSubmit() {
        if (activity.id) {
            updateActivity(activity).then(()=>{
                history.push(`/manage/${activity.id}`);
            });
        }
        else{
            let newActivity = {
                ...activity,
                id:uuid()
            }
            createActivity(activity).then(()=>{
                history.push(`/manage/${newActivity.id}`);
            });
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]:value}) 
    }

    if (loadingInitial) return <LoadingComponent inverted content='Activity Form!'/>

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <FormInput      placeholder='Title'         value={activity.title} name='title' onChange={handleInputChange}/>
                <FormTextArea   placeholder='Description'   value={activity.description} name='description' onChange={handleInputChange}/>
                <FormInput      placeholder='Category'      value={activity.category} name='category' onChange={handleInputChange}/>
                <FormInput type='date'     placeholder='Date'          value={activity.date} name='date' onChange={handleInputChange}/>
                <FormInput      placeholder='City'          value={activity.city} name='city' onChange={handleInputChange}/>
                <FormInput      placeholder='Venue'         value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button  as={Link} to={`/activities/${activity.id}`} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})