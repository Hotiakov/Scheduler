import { getUserInfo } from "entities/User";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AuthTabs } from "widgets/AuthTabs";

const AuthPage = () => {
    const user = useSelector(getUserInfo);
    if(user){
        return <Navigate to="/day" replace />;
    }

    return (
        <AuthTabs/>
    );
};
export default AuthPage;
