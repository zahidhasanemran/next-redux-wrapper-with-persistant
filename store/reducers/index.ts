import { combineReducers } from "@reduxjs/toolkit";
import {rootReducer} from "../slices/rootSlice";
import {userReducer} from "../slices/userSlice";

export default combineReducers({
    root: rootReducer,
    users: userReducer
})