import React, { useState } from "react";
import UserContext from "../context/UserContext";


function UserProvider({ children }) {
  
    const initialState = {
        userId: null,
        tokenId: null,
        name: null,
        imageUrl: null,
        isLogin: false,
    };

    const [userInfo, setUserInfo] = useState(initialState);

    return (
        <UserContext.Provider value={{userInfo: userInfo, setUserInfo: setUserInfo}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;