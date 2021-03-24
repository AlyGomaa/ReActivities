import activityStore from "./activityStore";
import {createContext, useContext} from 'react'

interface Store{
    activityStore: activityStore
}

export const store:Store = {
    activityStore : new activityStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}