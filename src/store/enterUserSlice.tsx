import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
const initialState = {
    uiNum : 0,
    uiName : ''
}
const enterUserSlice = createSlice({
    name:'enterUser',
    initialState:initialState,
    reducers:{
        setEnterUser: (state:any,action:any)=>{
            state.uiNum = action.payload.uiNum;
            state.uiName = action.payload.uiName;
        },
        initUser:(state:any)=>{
            state.uiNum = 0;
            state.uiName = '';
        }
    },
    extraReducers : (builder) => {
        // 로그아웃 reducer
        builder.addCase(PURGE, ()=> initialState);
    }
})

export const {setEnterUser} = enterUserSlice.actions;
export default enterUserSlice.reducer;