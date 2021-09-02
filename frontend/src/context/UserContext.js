import { createContext } from "react";

const UserContext = createContext({
  userId: null,
  tokenId: null,
  name: null,
  imageUrl: null,
  isLogin: false,
});

export default UserContext;