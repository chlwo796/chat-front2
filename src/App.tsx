import React, { useEffect } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Main } from './components/Main';
import { Login } from './components/Login';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { SignUp } from './components/SignUp';
import { Editor } from './components/Editor';
import { useChatDispatch, useChatSelector } from './store';
import { setUserList } from './store/userListSlice';
import { disconnectClient, initClient } from './service/ClientService';
import { CustomToast } from './components/CostumToast';
import { setEnterUser } from './store/enterUserSlice';
import { Menu } from './components/Menu';
import { persistor } from '.';
import { Test } from './components/Test';
import { globalRouter } from './api/globalRouter';
import { Msg } from './types/Msg.type';



function App() {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  const loginUser = useChatSelector((state:any)=>state.user);
  const tmpObj = useChatSelector((state:any)=>state.userList);
  const selectedUser = useChatSelector((state:any)=> state.selectedUser);
  const dispatch = useChatDispatch();
  const configs = [{
    url: `/topic/enter-chat`,
    callback: (data:any) => {
      const tmpUsers = JSON.parse(data.body);
      const loginUsers = tmpObj.list.filter((user:any)=>{
        if(!user.login){
          for(const tmpUser of tmpUsers){
            if(tmpUser.login && tmpUser.uiNum === user.uiNum){
              return user;
            }
          }
        }
      });
      for(const loginUser of loginUsers){
        dispatch(setEnterUser(loginUser));
      }
      dispatch(setUserList(tmpUsers));
    }},{
    url: `/topic/chat/${loginUser.uiNum}`,
    callback: (data:any) => {
      const msg:Msg = JSON.parse(data.body);
      const tmpList: any = JSON.parse(localStorage.getItem('userList') || '[]');
      const selectedUser: any = JSON.parse(localStorage.getItem('selectedUser') || '{}');
      const uiNum = parseInt(localStorage.getItem('uiNum') || '0');
      if(msg.cmiSenderUiNum !== selectedUser.uiNum){
        for(const user of tmpObj.list){
          if(uiNum !== msg.cmiSenderUiNum && msg.cmiSenderUiNum !== selectedUser.uiNum){
            user.unreadCnt = (isNaN(user.unreadCnt)?1 : ++user.unreadCnt);
            console.log(user);
          }       
        }
      }
      dispatch(setUserList(tmpList));
      console.log(msg);
    }
  }]
  useEffect(()=>{
    disconnectClient();
    if(!loginUser.uiNum){
      persistor.purge();
      return;
    }
    initClient(configs)
    .catch(e=>{
      // console.log(e);
    })
  },[loginUser]);
  return (
    <>
      <CustomToast/>
      <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={loginUser.uiNum === 0 ? '/sign-in' : '/main'}>
                Chatting
              </Link>
              <Menu/>
            </div>
          </nav>

          <div className="auth-wrapper">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/main" element={<Main/>} />
                <Route path="/editor" element={<Editor/>}/>
                <Route path="/test" element={<Test/>}/>
              </Routes>
            </div>
          </div>
      </>
  );
}

export default App;
