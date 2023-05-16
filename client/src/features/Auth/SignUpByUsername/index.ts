import { SignUpForm } from "./ui/SignUpForm/SignUpForm";
import { SignUpSchema } from "./model/types/signUpSchema";
import { signUpAction, signUpReducer } from "./model/slice/signUpSlice";
export {
  SignUpForm,
  signUpAction,
  signUpReducer,
};

export type {SignUpSchema};