import { useChatDispatch, useChatSelector } from "../store"
import { initUser } from "../store/enterUserSlice";

export const CustomToast = ()=>{
    const enterUser:any = useChatSelector((state:any)=>state.enterUser);
    const loginUser:any = useChatSelector((state:any)=>state.user);
    const dispatch = useChatDispatch();
    const user:any = {uiNum:0, uiName: ''};
    const hiveDiv = ()=>{
        dispatch(initUser(user));
    }
    const printMsg = ()=>{
        return `${enterUser.uiName}님${enterUser.uiNum === loginUser.uiNum ? ' 반갑습니다' : '이 로그인 하였습니다.'}`
    }
    return (
        <div>
            {
            enterUser.uiNum !== 0 ?
            <div className="custom-toast">
            <p>{printMsg()}</p>
            <button onClick={hiveDiv}>확인</button>
            </div>: ''
            }
        </div>
    )
}