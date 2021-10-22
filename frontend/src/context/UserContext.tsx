import * as React from 'react';
import { createContext } from 'react';
import { UserInfo } from '../interfaces/User.interface';

const UserContext = createContext<{
    userInfo: UserInfo,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
}>({
    userInfo: {
        userId: null,
        tokenId: null,
        name: null,
        imageUrl: null,
        isLogin: false,
    },
    setUserInfo: () => { },
});

export default UserContext;
