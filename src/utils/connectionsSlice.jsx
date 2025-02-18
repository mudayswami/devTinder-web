import {createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name:"connections",
    initialState:null,
    reducers:{
        addConnections :(state, action)=>{
            return action.payload;
        },
        removeConnection:(state,action)=>{
            return null;
        }
    }
});


export const {addConnections, removeConnection} = connectionsSlice.actions;
export default connectionsSlice.reducer;