import React, { useState } from 'react'
import { User } from '../types/User.type';
import axios from 'axios';
import { useAppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { axiosHttp } from '../api/axiosHttp';
import { setUser } from '../store/userSlice';

export const Login = ()=> {
  const [error, setError] = useState<boolean>(false);
  const [chatUser, setChatUser] = useState<User>({});
  const [rememberId, setRememberId] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeUser = (evt:any)=>{
    setChatUser({
      ...chatUser,
      [evt.target.id] : evt.target.value
    })
  }

  const checkRememberId = (evt:any) =>{
    setRememberId(evt.target.checked);
  }
  const login = async() => {
    setError(false);
    try{
    const res = await axiosHttp.post('/api/login', chatUser);
    dispatch(setUser(res.data));
    navigate('/main');
    }catch(err){
      setError(true);
    }
  }
  return (
      <div className="auth-wrapper">
            <div className="auth-inner">
      <form>
        <h3>Sign In</h3>
        <div className="mb-3">
        {error
        ?
        <div className='text-danger'>
          아이디와 비밀번호를 확인해주세요.
        </div>:''
        }
          <label>ID</label>
          <input
            type="text"
            id="uiId"
            className="form-control"
            placeholder="아이디"
            onChange={changeUser}
            value={chatUser.uiId}
          />
        </div>

        <div className="mb-3">
          <label>PASSWORD</label>
          <input
            type="password"
            id="uiPwd"
            className="form-control"
            placeholder="비밀번호"
            onChange={changeUser}
            value={chatUser.uiPwd}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
              onChange={checkRememberId} checked={rememberId}
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              &nbsp; Remember Me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="button" className="btn btn-primary" onClick={login}>
            Sign In
          </button>
        </div>
        <p className="forgot-password text-right">
        <a href="#" onClick={()=>{}}>Sign Up</a>
        </p>
      </form>
      </div>
      </div>
    )
}
