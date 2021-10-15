import {useState, createContext, useReducer, useEffect} from 'react';
import reducers from './Reducers';
import Auth from '@utils/auth';
import { useRouter } from 'next/router';
// eslint-disable-next-line camelcase
// import jwt_decode from 'jwt-decode';
import {profileMenu} from '@constants/profilemenu';
import {walletMenu} from '@constants/walletmenu';
import { messageType } from '@constants/constants';
import {callGet} from '@api/api';
import {showMessage} from '../utils/message';

import jwtDecode from 'jwt-decode';

const Context = createContext();

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userdata, setUserdata] = useState({});
  const [menuOpenKeys, setMenuOpenKeys] = useState([]);

  const initialState = {auth: {}, menus: [], permissions: {}};
  const [state, dispatch] = useReducer(reducers, initialState);
  const router = useRouter();

  const checkPermission = (permission) => {
    return state.permissions[permission] ? true : false;
  };
  
  const getProfileData = async (user) => {
    const userdata = await callGet(`/user/${user.user_id}/test`);
    console.log(userdata,'ggggggggggg');
    if (!userdata || userdata === undefined) {
      showMessage(messageType.FAILED.type, defaultMsg.dataError);
      return;
    }
    if (userdata.lastName !== null && userdata.firstName !==null && userdata.registerNumber !==null) {
      setUserdata(userdata);
    } else {
      console.log('endeeeeee');
      router.push('/park/createUser')
    }
  };

  const setMenuAndPermissions = async () => {
    // if (
    //   router.pathname === "/" ||
    //   router.pathname === "/aboutus" ||
    //   router.pathname === "/driver" ||
    //   router.pathname === "/spaceowner" ||
    router.pathname === '/news';
    // ) {
    //   return;
    // }
    const accessToken = Auth.getToken();
    // let role = "admin";
    const permissionList = {};
    if (accessToken === null || accessToken === 'undefined') {
      router.push('/login');
      return;
    } else {
      const user = jwtDecode(accessToken);
      getProfileData(user);

      // getProfileData(user);
      if (user.authorities !== undefined) {
        user.authorities.map((auths) => {
          permissionList[auths] = auths;
        });
      }
    }
    dispatch({
      type: 'PERMISSIONS',
      payload: permissionList,
    });

    // // #endregion
    // //#region set menu
    let menuData = [];

    const data = profileMenu;
    // const data = await sList({ code: apiList.adminMenu });
    // if (data && data.data) {
    // const tmpMenus = data.data.sort((a, b) => {
    //   return a.order - b.order;
    // });
    const tmpMenus = data;
    const menus = {};
    tmpMenus.map((mnu) => {
      const parentId = mnu.parentId;
      if (parentId !== null) {
        if (menus[parentId]['children'] === undefined) {
          menus[parentId]['children'] = [];
          delete menus[parentId]['link'];
        }
        menus[parentId]['children'].push(mnu);
      } else {
        menus[mnu.id] = mnu;
      }
    });

    menuData = Object.values(menus).sort((a, b) => {
      return a.order - b.order;
    });
    // }

    dispatch({
      type: 'MENUS',
      payload: menuData,
    });

    // #endregion
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
        walletMenu,
        state,
        dispatch,
        setMenuAndPermissions,
        checkPermission,
        userdata,
        getProfileData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
