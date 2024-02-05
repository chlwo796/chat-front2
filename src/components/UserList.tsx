import { Avatar, Conversation, ConversationList, Search, Sidebar } from "@chatscope/chat-ui-kit-react"
import { useEffect, useState } from "react";
import { User } from "../types/User.type";
import { useChatDispatch, useChatSelector,  } from "../store";
import { setSelectedUser } from "../store/selectedUserSlice";

export const UserList = ()=>{
  const dispatch = useChatDispatch();
  const tmpUsers = useChatSelector((state:any)=>state.userList);
    const [users, setUsers] = useState<any[]>([]);
    useEffect(()=>{
      setUsers(tmpUsers.list);
    }, [tmpUsers]);

    return (
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />
          <ConversationList>
            {
                users?users.map((chatUser:any, idx)=>(
            <Conversation
              key={idx}
              name={chatUser.uiName}
              lastSenderName={chatUser.uiName}
              info="Yes i can do it for you"
              style={{ justifyContent: "start" }}
              onClick={()=>{
                dispatch(setSelectedUser(chatUser))
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