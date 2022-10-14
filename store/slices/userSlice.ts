import {
  createAsyncThunk, createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

interface initialDType {
    loading: boolean,
    error: string,
    customer: any,
    user: any,
}

const initialState: initialDType = {
  customer: [],
  user:{},
  loading: false,
  error: '',
    
}

export const fetchUsers = createAsyncThunk(
    "users/customer",
    async () => {
      return fetch(
        "https://jsonplaceholder.typicode.com/todos"
      ).then((res) => res.json());
    }
  );

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      /*
      Redux Toolkit allows us to write "mutating" logic in reducers. It
      doesn't actually mutate the state because it uses the Immer library,
      which detects changes to a "draft state" and produces a brand new
      immutable state based on those changes
      */
        fillUser(state, action:PayloadAction<any>) {  
            state.customer = action.payload  
        },
    },
    // extraReducers: (builder)=> {
    //     //? The HYDRATE function is what manages the state between client and server
    //     builder
    //       .addCase(HYDRATE, (state, action:any) => {
    //         //* handle client side override
    //         // if (!action.payload.profile.name)  return state
    //         // TODO use Differ 
            
    //         if(action.payload.users.customer.length > 0){
    //           state.customer = action.payload.users.customer
    //         } else if(action.payload.users.user.name){
    //           state.user = action.payload.users.user
    //         }
    //         else{
    //           return {  
    //             ...state,
    //             ...action.payload.users,
    //           }
    //         }
    //       })
    //      .addCase(fetchUsers.pending, (state) => {
    //        state.loading = true;
    //      })
    //      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
    //        state.loading = false; 
    //        //TODO 
    //        state.customer.push(...payload);
    //      })
    //      .addCase(fetchUsers.rejected, (state) => {
    //        state.loading = false; 
    //        state.error = 'Something is wrong!';
    //      })
    // },
})

export const {fillUser} = userSlice.actions;

export const selectUser = (state: any) => state.users;

export const userReducer = userSlice.reducer;