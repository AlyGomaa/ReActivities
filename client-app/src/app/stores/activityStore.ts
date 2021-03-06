import { Activity } from './../models/activity';
import {makeAutoObservable, runInAction} from 'mobx'
import agent from '../api/agent';

export default class activityStore {
    //activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    submitting = false;

    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a, b)=>
        Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity)=>{
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key : string] : Activity[]})
        )
    }

    loadActivities = async ()=>{
        try {
            const activities = await agent.Activities.list();
            runInAction(()=>{
                activities.forEach(activity => {
                    this.setActivity(activity);
                });
                this.setLoadingInitial(false);
            })
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    private setActivity = (activity:Activity)=>{
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    loadActivity = async (id:string)=>{
        let activity = this.getActivity(id);

        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else
        {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id); 
                this.setActivity(activity);
                runInAction(()=>{
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getActivity = (id:string)=>{
        return this.activityRegistry.get(id);
    } 

    setLoadingInitial = (state:boolean)=>{
        this.loadingInitial = state;
    }
   /*
    selectActivity = (id:string)=>{
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = ()=>{
        this.selectedActivity = undefined;
    }

    openForm = (id?:string)=>{
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = ()=>{
        this.editMode = false;
    }
    */
    createActivity = async (activity:Activity)=>{
        this.loading = true;
        this.setSubmitting(true);

        try {
            await agent.Activities.create(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        this.setSubmitting(true);
        try {
            await agent.Activities.update(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
        }

    }

    deleteActivity = async (id:string)=>{
        this.loading = true;
        this.setSubmitting(true);

        try {
            await agent.Activities.delete(id);
            runInAction(()=>{
                this.activityRegistry.delete(id);
                this.selectedActivity = undefined;
                this.editMode = false;
                this.submitting = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
        }
    }

    setSubmitting = (state:boolean)=>{
        this.submitting = state;
    }

    setEditMode = (state:boolean)=>{
        this.editMode = state;
    }

}