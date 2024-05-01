import Dashboard from "pages/Dashboard";
import { TSRouter } from "./class/Router.class";
import { Common } from "redux/redux.types";
import Login from "pages/Login";
import { useTSVerify } from "utils/hooks/useTSVerify";
import { useTSAuth } from "utils/hooks/useTSAuth";

export const Router = (DOM: HTMLElement, data: Common) => {
  const routes = new TSRouter([
    {
      path: "/dashboard",
      element: () => useTSAuth(Dashboard(DOM, data), "/login"),
    },
    {
      path: "/login",
      element: () => useTSVerify(Login(DOM), "/dashboard/", "/login"),
    },
    {
      path: "/",
      routeto: "/dashboard/",
      element: () => Dashboard(DOM, data),
    },
    {
      path: "/dashboard",
      routeto: "/dashboard/",
      element: () => Dashboard(DOM, data),
    },
    {
      path: "*",
      routeto: "/dashboard/",
      element: () => Dashboard(DOM, data),
    },
  ]);
  routes.navigate("");
};
