import React, { useContext } from "react";
import GoogleLogin from "react-google-login";
import UserContext from "../context/UserContext";


function GoogleLoginBtn() {
    // user information
    const [userInfo, setUserInfo] = useContext(UserContext);

    // google login
    const googleLoginSuccess = (googleUser) => {
        console.log(googleUser.profileObj);
        setUserInfo({
            ...userInfo,
            userId: googleUser.profileObj.googleId,
            tokenId: googleUser.tokenId,
            name: googleUser.profileObj.name,
            imageUrl: googleUser.profileObj.imageUrl,
            isLogin: true,
        });
    };
    const googleLoginFailure = (response) => {
        console.log(response);
        alert("로그인 중간에 에러가 발생했습니다..");
    };

    return (
        <GoogleLogin
            clientId="183733547550-9ib07k4clf315q8m2vi9ipcujscf7qja.apps.googleusercontent.com"
            buttonText="login"
            onSuccess={googleLoginSuccess}
            isSignedIn={true}
            onFailure={googleLoginFailure}
            cookiePolicy={'single_host_origin'}
        />
    );
}

export default GoogleLoginBtn;