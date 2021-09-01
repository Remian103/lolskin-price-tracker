import { createContext } from "react";

const UserContext = createContext({
  userId: null,
  tokenId: null,
  name: null,
  isLogin: false,
});

export default UserContext;