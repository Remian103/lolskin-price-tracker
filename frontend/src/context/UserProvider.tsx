import * as React from "react";
import { useState } from "react";
import { UserInfo } from "../interfaces/User.interface";
import UserContext from "../context/UserContext";


function UserProvider({ children }: { children: React.ReactNode }) {

    const [userInfo, setUserInfo] = useState<UserInfo>({
        userId: null,
        tokenId: null,
        name: null,
        imageUrl: null,
        isLogin: false,
    });

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;