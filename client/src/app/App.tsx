import { getUserInfo } from "entities/User";
import { getUserIsLoading } from "entities/User/model/selectors/getUser/getUserInfo";
import { checkAuth } from "features/Auth/RefreshToken/model";
import { useEffect, Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { classNames } from "shared/lib/classnames/classnames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { MenuBar } from "widgets/MenuBar/ui/MenuBar";
import AppRouter from "./provider/router/ui/AppRouter";


const App = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(getUserInfo);
  const location = useLocation();

  useEffect(() => {
    if(localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_KEY)){
      dispatch(checkAuth());
    }
  }, []);

  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="">
        {
          location.pathname !== '/' 
            ? <MenuBar/> 
            : null
        }
        <div className="content-page">
          <AppRouter user={user} />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
