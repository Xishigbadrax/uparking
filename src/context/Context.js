import { useState, createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";
import jwt_decode from "jwt-decode";
import Auth from "@utils/auth";
import { useRouter } from "next/router";
import { apiList, sList } from "@api/api";
import { profileMenu } from "@constants/profilemenu";
import { callGet } from "@api/api";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userdata, setUserdata] = useState({});
  const [menuOpenKeys, setMenuOpenKeys] = useState([]);

  const initialState = { auth: {}, menus: [], permissions: {} };
  const [state, dispatch] = useReducer(reducers, initialState);
  const router = useRouter();

  const checkPermission = (permission) => {
    // return state.permissions[permission] ? true : false;
    return false;
  };

  const getProfileData = async (user) => {
      const userdata = await callGet(`/user/${user.user_id}/test`)
      if (!userdata || userdata === undefined) {
        showMessage(messageType.FAILED.type, defaultMsg.dataError);
        return;
      }
      if (userdata.lastName !== undefined) {
        setUserdata(userdata);
      }
  }

  const setMenuAndPermissions = async () => {
    // if (
    //   router.pathname === "/" ||
    //   router.pathname === "/aboutus" ||
    //   router.pathname === "/driver" ||
    //   router.pathname === "/spaceowner" ||
    //   router.pathname === "/news"
    // ) {
    //   return;
    // }
    const accessToken = Auth.getToken();
    // let role = "admin";
    let permissionList = {};
    if (router.pathname.startsWith("/park")) {
      if (accessToken == null || accessToken == "undefined") {
        router.push("/login");
        return;
      } else {
        const user = jwt_decode(accessToken);
        getProfileData(user);

        if (user.authorities !== undefined) {
          user.authorities.map((auths) => {
            permissionList[auths] = auths;
          });
        }
      }
    }
    dispatch({
      type: "PERMISSIONS",
      payload: permissionList,
    });
    // // #endregion
    // //#region set menu
    // let menuData = [];
    // const data = profileMenu;
    // // const data = await sList({ code: apiList.adminMenu });
    // // if (data && data.data) {
    // // const tmpMenus = data.data.sort((a, b) => {
    // //   return a.order - b.order;
    // // });
    // const tmpMenus = data;
    // let menus = {};
    // tmpMenus.map((mnu) => {
    //   const parentId = mnu.parentId;
    //   if (parentId !== null) {
    //     if (menus[parentId]["children"] === undefined) {
    //       menus[parentId]["children"] = [];
    //       delete menus[parentId]["link"];
    //     }
    //     menus[parentId]["children"].push(mnu);
    //   } else {
    //     menus[mnu.id] = mnu;
    //   }
    // });
    // menuData = Object.values(menus).sort((a, b) => {
    //   return a.order - b.order;
    // });
    // // }
    // dispatch({
    //   type: "MENUS",
    //   payload: menuData,
    // });
    //#endregion
  };

  useEffect(() => {
    setMenuAndPermissions();
  }, []);

  return (
    <Context.Provider
      value={{
        menuOpenKeys,
        setMenuOpenKeys,
        isLoading,
        setIsLoading,
        state,
        dispatch,
        setMenuAndPermissions,
        checkPermission,
        userdata
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
