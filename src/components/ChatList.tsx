import { Avatar, ChatContainer, ConversationHeader, InfoButton, Message, MessageInput, MessageList, MessageSeparator, TypingIndicator, VideoCallButton, VoiceCallButton } from "@chatscope/chat-ui-kit-react"
import { useEffect, useRef, useState } from "react"
import { useChatDispatch, useChatSelector } from "../store";
import { axiosAuth } from "../api/axiosHttp";
import { Msg } from "../types/Msg.type";
import { publishMsg } from "../service/ClientService";
import { setChatList } from "../store/chatListSlice";

export const ChatList = () =>{
    const loginUser = useChatSelector((state:any)=>state.user);
    const [inputMsg, setInputMsg] = useState<string>("");
    const selectedUser = useChatSelector((state:any)=>state.selectedUser)
    const [msgs, setMsgs] = useState<Msg[]>([]);
    const page = useRef<number>(1);
    const dispatch = useChatDispatch();
    const chatList = useChatSelector((state:any)=>state.chatList);
    const getMsgs = async(init:boolean)=>{
      if(!selectedUser.uiNum){
        return;
      }
      try{
      const res = await axiosAuth.get(`/message-log/${loginUser.uiNum}/${selectedUser.uiNum}/${page.current++}`);
      const tmpMsgs = res.data.list;
      console.log(tmpMsgs);
      tmpMsgs.sort((m1:any, m2:any)=>{
        return m1.cmiSentTime.localeCompare(m2.cmiSentTime);
      });
      if(init){
        const chatInfo:any = {
          uiNum : selectedUser.uiNum,
          list : tmpMsgs
        }
        dispatch(setChatList(chatInfo));
      }else{
        setMsgs([...tmpMsgs, msgs]);
      }
    }catch(e){

    }
    }
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const printMessageSeparator = (date1?:any, date2?:any)=>{
      const d2 = new Date(date2);
      const d2Str = `${d2.getFullYear()}-${getFormat(d2.getMonth()+1)}-${getFormat(d2.getDate())}`;
      if(!date1){
        return <MessageSeparator content={`${d2Str} ${days[d2.getDay()]}요일`}/>
      }

      const d1 = new Date(date1);
      const d1Str = `${d1.getFullYear()}-${getFormat(d1.getMonth()+1)}-${getFormat(d1.getDate())}`;
      if(d1Str!==d2Str){
        return <MessageSeparator content={`${d2Str} ${days[d2.getDay()]}요일`}/>
      }
    }

    const getFormat = (n:number)=>{
      return n<10?'0'+n:n;
    }

    const sendMsg = ()=>{
      console.log(inputMsg);
      const destination = `/publish/react-chat/${selectedUser.uiNum}`;
      publishMsg(destination,{
        cmiMessage: inputMsg,
        cmiSenderUiNum: loginUser.uiNum,
        cmiReceiveUiNum: selectedUser.uiNum
      });
      setInputMsg('');
    }
    useEffect(()=>{
      page.current = 1;
      getMsgs(true);
      // selectChatList();
    }, [selectedUser]);

    return (
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={require("./images/ram.png")} name="Zoe" />
            <ConversationHeader.Content
              userName={selectedUser.uiName}
              info={selectedUser.loginDate}
            />
            <ConversationHeader.Actions>
              {/* <VoiceCallButton /> */}
              {/* <VideoCallButton /> */}
              {/* <InfoButton /> */}
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList>
            {
              selectedUser.uiNum !== 0 && chatList.list.map((msg:Msg,idx:number)=>(
                <>
                {/* {idx === 0 ? <MessageSeparator content={msg.cmiSentTime?.substring(0,10)} />:''} */}
                {idx !== 0 && printMessageSeparator(idx === 0 ? null : chatList.list[idx-1].cmiSentTime,msg.cmiSentTime)}
                <Message
                key={idx}
              model={{
                message: msg.cmiMessage,
                sentTime: msg.cmiSentTime,
                sender: msg.cmiSender,
                direction: loginUser.uiNum === msg.cmiSenderUiNum ? 'outgoing' : 'incoming',
                position: "normal"
              }}
              avatarSpacer = {loginUser.uiNum === msg.cmiSenderUiNum}
            >
              {loginUser.uiNum === msg.cmiSenderUiNum?'':<Avatar src={require("./images/ram.png")} name="Zoe" />}
            </Message> 
            </>  
              ))
            }
            {/* <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "single"
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "first"
              }}
              avatarSpacer
            /> */}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={inputMsg}
            onChange={(val) => setInputMsg(val)}
            onSend={sendMsg}
            sendDisabled={false}
          />
        </ChatContainer>
    )
}