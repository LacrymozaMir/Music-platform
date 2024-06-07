import { Store, configureStore } from "@reduxjs/toolkit"
import { RootState, reducer } from "./reducers"
import { createWrapper } from "next-redux-wrapper";



export const setupStore = () => {
    return configureStore({
        reducer: reducer,
    })
}

export const wrapper = createWrapper<Store<RootState>>(setupStore, {debug: true});

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
