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
import { setChatList } from './store/chatListSlice';
import { axiosAuth } from './api/axiosHttp';



function App() {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  const loginUser = useChatSelector((state:any)=>state.user);
  const dispatch = useChatDispatch();
  const configs = [{
    url: `/topic/enter-chat`,
    callback: (data:any) => {
      const connectedUsers = JSON.parse(data.body);
      const users = JSON.parse(localStorage.getItem('userList') || '{}');
      
      users.map((user:any)=>{
        for(const key in connectedUsers){
          const connectedUser = connectedUsers[key];
        if(user.uiNum === connectedUser.uiNum){
          user.login = connectedUser.login;
        }
       }
      })
      dispatch(setUserList(users));
    }},{
    url: `/topic/chat/${loginUser.uiNum}`,
    callback: async (data:any) => {
      const msg:Msg = JSON.parse(data.body);
      const tmpList: any = JSON.parse(localStorage.getItem('userList') || '[]');
      const selectedUser: any = JSON.parse(localStorage.getItem('selectedUser') || '{}');
      const uiNum = parseInt(localStorage.getItem('uiNum') || '0');
      if(msg.cmiSenderUiNum !== selectedUser.uiNum && msg.cmiSenderUiNum !== uiNum){
        for(const user of tmpList){
          if(user.uiNum === msg.cmiSenderUiNum){
            // 메세지의 받는사람이 로그인유저일경우만
            user.unreadCnt = (isNaN(user.unreadCnt)?1 : ++user.unreadCnt);
          }       
        }
      }
      dispatch(setUserList(tmpList));
      if(msg.cmiSenderUiNum === selectedUser.uiNum || msg.cmiReceiveUiNum === selectedUser.uiNum){
        const chatList: any = JSON.parse(localStorage.getItem('chatList') || '{}')
        chatList.list.push(msg);
        dispatch(setChatList(chatList));
        const res = await axiosAuth.put('/message-log',{
          cmiSenderUiNum: msg.cmiSenderUiNum,
          cmiReceiveUiNum: uiNum
        });
        console.log(res.data);
      }
    }
  }]
  useEffect(()=>{
    disconnectClient();
    if(!loginUser.uiNum){
      persistor.purge();
      navigate('/');
      return;
    }
    setTimeout(async ()=>{
    await initClient(configs)
    .catch(e => {
      console.log(e);
    });
  }, 200);
  },[loginUser]);

  // useEffect(()=>{
  //   console.log(tmpObj.list);
  // },[tmpObj.list])
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
