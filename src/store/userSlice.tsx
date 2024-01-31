import { createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { User } from "../types/User.type";

const initialState:User = {
    uiNum:0,
    uiId: '',
    uiPwd: '',
    uiName:'',
    uiEmail: '',
    uiPhone: '',
    uiBirth: '',
    uiGender: '',
    uiGrade:'',
    uiCredat: '',
    uiCretim: '',
    uiLmodat: '',
    uiLmotim: '',
    riNum:0,
    token:'',
    uiImgPath: '',
    login:false,
    authorities:[]
};
const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        setUser: (state:User,action:any)=>{
            state.uiNum = action.payload.uiNum;
            state.uiId = action.payload.uiId;
            state.uiName = action.payload.uiName;
            state.uiEmail = action.payload.uiEmail;
            state.uiPhone = action.payload.uiPhone;
            state.uiBirth = action.payload.uiBirth;
            state.uiGender = action.payload.uiGender;
            state.uiCredat = action.payload.uiCredat;
            state.uiCretim = action.payload.uiCretim;
            state.uiLmodat = action.payload.uiLmodat;
            state.uiLmotim = action.payload.uiLmotim;
            state.riNum = action.payload.riNum;
            state.uiImgPath = action.payload.uiImgPath;
            state.login = action.payload.login;
            state.token = action.payload.token;
            state.authorities = action.payload.token;
        },
        initUser:(state:User) => {
            state = initialState;
        }
    }
})

export const {setUser,initUser} = userSlice.actions;
export default userSlice.reducer;