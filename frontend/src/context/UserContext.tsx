import { createContext } from "react";
import { UserInfo } from "../interfaces/User.interface";


const UserContext = createContext<{ userInfo: UserInfo, setUserInfo: (userInfo: UserInfo) => void }>({
    userInfo: {
        userId: null,
        tokenId: null,
        name: null,
        imageUrl: null,
        isLogin: false,
    },
    setUserInfo: (userInfo: UserInfo) => { }
});

export default UserContext;