import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../src/store";
import checkToken from "../src/utils/CheckToken";

const MainLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    checkToken().then((isValid) => {
      if (isValid) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
      setIsLoading(false);
    });
  }, [dispatch]);

  return isLoading ? (
    <div>Загрузка...</div>
  ) : (
    <main>
      <Outlet />
    </main>
  );
};

export default MainLayout;
