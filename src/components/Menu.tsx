import { Link } from "react-router-dom"
import { User } from "../types/User.type"
import { useChatSelector } from "../store"
import { persistor } from "..";

export const Menu = () => {
    const loginUser: User = useChatSelector((state:any)=>state.user);
    return (
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                    {
                        loginUser.uiNum === 0 ?
                        <><li className="nav-item">
                            <Link className="nav-link" to={'/sign-in'}>
                            SignIn
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/sign-up'}>
                            SignUp
                            </Link>
                        </li></> : ''
                    }{
                        loginUser.uiNum !== 0 ?
                        <><li className="nav-item">
                            <Link className="nav-link" to={'/'} onClick={()=>persistor.purge()}>
                                Logout
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/main'}>
                            채팅
                            </Link>
                        </li></>:''
                    }
                </ul>
              </div>
    )
}