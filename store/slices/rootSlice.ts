import {
  createAsyncThunk, createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

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
    "root/users",
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
   
})

export const {fillProfile,fillUsers} = rootSlice.actions;

export const selectUser = (state: any) => state.root;

export const rootReducer = rootSlice.reducer;