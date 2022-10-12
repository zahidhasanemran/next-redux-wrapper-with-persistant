import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { Action } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import rootSliceReducer from './slices/rootSlice';

const makeStore = ()=> configureStore({
    reducer: {
        root: rootSliceReducer
    },
    devTools: true
})
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action
>

export const wrapper = createWrapper<AppStore>(makeStore, {debug:true})