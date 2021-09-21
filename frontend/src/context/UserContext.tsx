import { createContext } from "react";

export interface UserInfo {
    userId: string | null;
    tokenId: string | null;
    name: string | null;
    imageUrl: string | null;
    isLogin: boolean;
}

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