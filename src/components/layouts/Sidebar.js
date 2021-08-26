import Link from 'next/link';
import {Menu, Layout, Avatar} from 'antd';
import {useRouter} from 'next/router';
import * as AntdIcons from '@ant-design/icons';
import Context from '@context/Context';
import {useContext, useState, useEffect} from 'react';
const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
// import {
//   // UserOutlined,
// } from '@ant-design/icons';

const {Sider} = Layout;
const {SubMenu} = Menu;

const Sidebar = () => {
  const router = useRouter();
  const {state, menuOpenKeys, setMenuOpenKeys, userdata} = useContext(Context);
  // const [pathName, setPathName] = useState('/');
  const {menus} = state;
  const [userRealData, setUserRealData] = useState('');


  useEffect(async () => {
    if (typeof userdata.firstName != 'undefined') {
      setUserRealData(userdata);
    }
  }, [userdata]);


  const getIcon = (icon) => {
    const AntIcon = AntdIcons[icon];
    return AntIcon ? <AntIcon /> : '';
  };

  const conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  };

  const getMenuItemPath = (item) => {
    const itemPath = conversionPath(item.link);
    const {name} = item;
    return (
      <Link href={itemPath}>
        {name}
      </Link>
    );
  };

  const getSubMenuOrItem = (item) => {
    if (item.children && item.children.some((child) => child.name)) {
      const childrenItems = getNavMenuItems(item.children);
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            key={item.id}
            title={item.name}
            icon={getIcon(item.icon)}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item className={item.link === router.asPath ? 'ant-menu-item-selected' : ''} key={item.link} icon={getIcon(item.icon)}>{getMenuItemPath(item)}</Menu.Item>;
    }
  };

  const getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return menusData.map((item) => {
      return getSubMenuOrItem(item);
    }).filter((item) => item);
  };

  const getProfile = () => {
    if (userRealData === '') return null;
    return <div >
      <Avatar size={72} src={IMG_URL + userRealData.imageProfile} />
      <div className="userName"><span>{userRealData.lastName.charAt(0) + '. ' + userRealData.firstName}</span></div>
    </div>;
  };
  return (
    <Sider theme="light" className={'sideBar'} >
      { getProfile()}

      {/* <div className="logo">
        <img src="/small_logo.png" alt="logg" className="header-logo" />
      </div> */}
      <Menu
        style={{borderRight: 'none', margin: '1.8rem 0'}}
        mode="inline"
        className={'profileMenu'}
        inlineIndent={10}
        openKeys={menuOpenKeys}
        onOpenChange={(keys) => setMenuOpenKeys(keys)}
        selectedKeys={router.pathname.substring(1)}
      >
        {getNavMenuItems(menus)}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
