import { AppThunk, RootState } from './../index';
import {
	createSlice,
	PayloadAction,
	createAsyncThunk,
} from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

interface initialDType {
    loading: boolean,
    error: string,
    userList: any,
    profile: {
        name: string,
        age: number | null,
    }
}

const initialState: initialDType = {
  userList: [],
  profile: {
      name: '',
      age: null
  },
    loading: false,
    error: '',
    
}

export const fetchCoctails = createAsyncThunk(
    "demo/users",
    async () => {
      return fetch(
        "https://jsonplaceholder.typicode.com/todos"
      ).then((res) => res.json());
    }
  );

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
      /*
      Redux Toolkit allows us to write "mutating" logic in reducers. It
      doesn't actually mutate the state because it uses the Immer library,
      which detects changes to a "draft state" and produces a brand new
      immutable state based on those changes
      */

        fillProfile(state, action:PayloadAction<any>) {
             state.profile = action.payload
        },
        fillUsers(state, action:PayloadAction<any>) {  
            state.userList = action.payload  
        },
    },
    extraReducers: (builder)=> {
        //? The HYDRATE function is what manages the state between client and server
        builder
          .addCase(HYDRATE, (state, action:any) => {
            // TODO use Differ 
            if(action.payload.root.profile?.name){
              state.profile = action.payload.root.profile
            }else if(action.payload.root.userList.length > 0){
              state.userList = action.payload.root.userList
            }
            else{
              return {  
                ...state,
                ...action.payload.root,
              }
            }
          })
         .addCase(fetchCoctails.pending, (state) => {
           state.loading = true;
         })
         .addCase(fetchCoctails.fulfilled, (state, { payload }) => {
           state.loading = false; 
           //TODO 
           state.userList.push(...payload);
         })
         .addCase(fetchCoctails.rejected, (state) => {
           state.loading = false; 
           state.error = 'Something is wrong!';
         })
    },
})

export const {fillProfile,fillUsers} = rootSlice.actions;

export const selectUser = (state: any) => state.demo;

export default rootSlice.reducer;