import { createContext } from "react";

const UserContext = createContext({
    userInfo: {
        userId: null,
        tokenId: null,
        name: null,
        imageUrl: null,
        isLogin: false,
    },
    setUserInfo: (userInfo)=>{ }
});

export default UserContext;