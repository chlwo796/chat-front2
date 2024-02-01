import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User.type";
import { PURGE } from "redux-persist";

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
    loginDate: '',
    sessionId : '',
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
            state.loginDate = action.payload.loginDate;
            state.sessionId = action.payload.sessionId;
            state.authorities = action.payload.authorities;
        },
        initUser:(state:User) => {
            state = initialState;
            state.uiNum = initialState.uiNum;
            state.uiId = initialState.uiId;
            state.uiName = initialState.uiName;
            state.uiEmail = initialState.uiEmail;
            state.uiPhone = initialState.uiPhone;
            state.uiBirth = initialState.uiBirth;
            state.uiGender = initialState.uiGender;
            state.uiCredat = initialState.uiCredat;
            state.uiCretim = initialState.uiCretim;
            state.uiLmodat = initialState.uiLmodat;
            state.uiLmotim = initialState.uiLmotim;
            state.riNum = initialState.riNum;
            state.uiImgPath = initialState.uiImgPath;
            state.login = initialState.login;
            state.token = initialState.token;
            state.loginDate = initialState.loginDate;
            state.sessionId = initialState.sessionId;
            state.authorities = initialState.authorities;
        }
    },
    extraReducers : (builder) => {
        // 로그아웃 reducer
        builder.addCase(PURGE, ()=> initialState);
    }
});

export const {setUser,initUser} = userSlice.actions;
export default userSlice.reducer;