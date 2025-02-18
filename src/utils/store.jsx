import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import feedSlice from "./feedSlice";
import connectionsReducer from "./connectionsSlice";
import requestsReducer from "./requestsSlice";
const store = configureStore({
    reducer:{
        user:userSliceReducer,
        feed:feedSlice,
        connections:connectionsReducer,
        requests:requestsReducer
    },
})

export default store;