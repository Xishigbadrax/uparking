import Link from 'next/link';
import { Menu, Layout, Avatar } from 'antd';
import { useRouter } from 'next/router';
import * as AntdIcons from '@ant-design/icons';
import Context from '@context/Context';
import { useContext } from 'react';
import {
  AppstoreOutlined,
  UserOutlined,
  CalendarOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LoginOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  const router = useRouter();
  const { state, menuOpenKeys, setMenuOpenKeys } = useContext(Context);
  const { menus } = state;

  const getIcon = icon => {
    const AntIcon = AntdIcons[icon];
    return AntIcon ? <AntIcon /> : "";
  }

  const conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  };

  const getMenuItemPath = item => {
    const itemPath = conversionPath(item.link);
    const { name } = item;
    return (
      <Link href={itemPath}>
        {name}
      </Link>
    );
  };

  const getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
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
      return <Menu.Item className={item.link === router.asPath ? "ant-menu-item-selected" : ""} key={item.id} icon={getIcon(item.icon)}>{getMenuItemPath(item)}</Menu.Item>;
    }
  };

  const getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData.map(item => {
      return getSubMenuOrItem(item);
    }).filter(item => item);
  };

  const handleClick = () => {
    console.log('11')
  }

  return (
    <Sider theme="light" className={"sideBar"} >
      <Avatar size={72} icon={<UserOutlined />} />
      <div className="userName"><span>А.Бат-Эрдэнэ</span></div>
      {/* <div className="logo">
        <img src="/small_logo.png" alt="logg" className="header-logo" />
      </div> */}
      {/* <Menu
        style={{ borderRight: 'none', margin: '1.8rem 0' }}
        theme="dark"
        mode="inline"
        inlineIndent={10}
        openKeys={menuOpenKeys}
        onOpenChange={(keys) => setMenuOpenKeys(keys)}
      >
        {getNavMenuItems(menus)}
      </Menu> */}
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        inlineCollapsed={true}
        className={"profileMenu"}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          Миний мэдээлэл
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          Хянах самбар
        </Menu.Item>
        <Menu.Item key="3" icon={<CalendarOutlined />}>
          Миний захиалга
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
          Тохиргоо
        </Menu.Item>
        <Menu.Item key="5" icon={<QuestionCircleOutlined />}>
          Тусламж
        </Menu.Item>
        <Menu.Item key="6" icon={<LoginOutlined />}>
        </Menu.Item>
      </Menu>
    </Sider>
  );


};

export default Sidebar;
