import { User, UserSchema } from "./model/types/user";
import { getUserInfo, getUserDayInterval, getUserUsername } from "./model/selectors/getUser/getUserInfo";
import { userActions, userReducer } from "./model/slice/userSlice";

export {
  userActions,
  userReducer,
  getUserInfo,
  getUserUsername,
  getUserDayInterval,
};

export type { User, UserSchema };
