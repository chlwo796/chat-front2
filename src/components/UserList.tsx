import { Avatar, Conversation, ConversationList, Search, Sidebar } from "@chatscope/chat-ui-kit-react"
import { useEffect, useState } from "react";
import { User } from "../types/User.type";
import { useChatDispatch, useChatSelector,  } from "../store";
import { setSelectedUser } from "../store/selectedUserSlice";
import { axiosAuth } from "../api/axiosHttp";
import { setUserList } from "../store/userListSlice";

export const UserList = ()=>{
  const dispatch = useChatDispatch();
  const user = useChatSelector((state:any)=>state.user);
  const userListObj = useChatSelector((state:any)=>state.userList);

    const selectUser = async (chatUser:any)=>{
      const res = await axiosAuth.put('/message-log', {
        cmiSenderUiNum:chatUser.uiNum, 
        cmireceiveUiNum:user.uiNUm
      });
      if(res.data){
        const tmpUserList:any = JSON.parse(JSON.stringify(userListObj.list));
        console.log(res.data);
        tmpUserList.map((user:any)=>{
          if(user.uiNum === chatUser.uiNum){
            user.unreadCnt = 0;
          }
        })
        dispatch(setUserList(tmpUserList));
      }
      dispatch(setSelectedUser(chatUser));
    }

    return (
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />
          <ConversationList>
            {
                userListObj.list?userListObj.list.map((chatUser:any, idx:number)=>(
            <Conversation
              key={idx}
              name={chatUser.uiName}
              lastSenderName={chatUser.uiName}
              info="Yes i can do it for you"
              style={{ justifyContent: "start" }}
              onClick={()=>{
                selectUser(chatUser);
              }}
              unreadCnt={chatUser.unreadCnt}

            >
              <Avatar
                src={require("./images/ram.png")}
                name="Lilly"
                status={chatUser.login ? 'available' : 'dnd'}
              />
            </Conversation>
                )):''
            }
            <Conversation
              name="Joe"
              lastSenderName="Joe"
              info="Yes i can do it for you"
            >
              <Avatar
                src={require("./images/ram.png")}
                name="Joe"
                status="dnd"
              />
            </Conversation>

            <Conversation
              name="Emily"
              lastSenderName="Emily"
              info="Yes i can do it for you"
              unreadCnt={3}
            >
              <Avatar
                src={require("./images/ram.png")}
                name="Emily"
                status="available"
              />
            </Conversation>

            <Conversation
              name="Kai"
              lastSenderName="Kai"
              info="Yes i can do it for you"
              unreadDot
            >
              <Avatar
                src={require("./images/ram.png")}
                name="Kai"
                status="unavailable"
              />
            </Conversation>
          </ConversationList>
        </Sidebar>
    )
}