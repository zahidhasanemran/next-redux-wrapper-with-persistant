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
        fillProfile(state, action:PayloadAction<any>) {
             state.profile = action.payload
        },
        fillUsers(state, action:PayloadAction<any>) {  
            state.userList = action.payload  
        },
    },
    extraReducers: (builder)=> {
        builder
          .addCase(HYDRATE, (state, action:any) => {
            // console.log(action);
            return { // TODO check next js example for reconcile 
              ...state,
              ...action.payload.root,//TODO 
            }
          })
         .addCase(fetchCoctails.pending, (state) => {
           state.loading = true;
         })
         .addCase(fetchCoctails.fulfilled, (state, { payload }) => {
           state.loading = false; 
           state.userList.push(payload);//TODO 
         })
         .addCase(fetchCoctails.rejected, (state) => {
           state.loading = false; 
           state.error = 'Something is wrong!';
         })
    },
})

export const {fillProfile,fillUsers} = rootSlice.actions;

export const selectUser = (state) => state.demo;

export default rootSlice.reducer;