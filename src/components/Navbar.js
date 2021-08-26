import {Disclosure} from '@headlessui/react';
import {MenuIcon, XIcon} from '@heroicons/react/outline';
import {useState, useEffect, useContext} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Auth from '@utils/auth';
import Context from '@context/Context';
import * as AntdIcons from '@ant-design/icons';
import {Avatar, Menu, Dropdown} from 'antd';
import {DownOutlined} from '@ant-design/icons';

const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

const Navbar = () => {
  const {userdata} = useContext(Context);
  const router = useRouter();
  const [userRealData, setUserRealData] = useState('');


  useEffect(async () => {
    if (typeof userdata.firstName != 'undefined') {
      setUserRealData(userdata);
    }
  }, [userdata]);

  const getIcon = (icon) => {
    const AntIcon = AntdIcons[icon];
    return AntIcon ? <AntIcon style={{fontSize: '21px'}} /> : '';
  };

  const getProfile = () => {
    if (userRealData === '') return null;
    return <div style={{height: '21px'}}>
      <Avatar src={IMG_URL + userRealData.imageProfile} style={{marginRight: '10px'}}
      />
      {userRealData.lastName.charAt(0) + '. ' + userRealData.firstName}
    </div>;
  };

  const navigation = [
    {
      id: 0,
      name: 'Бидний тухай',
      href: '/aboutus',
      current: router.asPath == '/aboutus',
    },
    {
      id: 1,
      name: 'Жолооч',
      href: '/driver',
      current: router.asPath == '/driver',
    },
    {
      id: 2,
      name: 'Зогсоол эзэмшигч',
      href: '/spaceowner',
      current: router.asPath == '/spaceowner',
    },
    {
      id: 3,
      name: 'Мэдээ',
      href: '/news',
      current: router.asPath == '/news',
    },
  ];

  const navigationadmin = [
    {
      id: 0,
      name: 'Хэтэвч',
      href: '/park/wallet',
      current: router.asPath == '/wallet',
      icon: 'WalletOutlined',
    },
    {
      id: 1,
      name: 'Мэдэгдэл',
      href: '/park/notification',
      current: router.asPath == '/notification',
      icon: 'NotificationOutlined',
    },
    {
      id: 2,
      name: 'park',
      href: '/park/',
      current: router.asPath == '/profile',
      icon: '',
    },
  ];
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };
  const menu = (
    <Menu className="profileDropdownPopup">
      <Menu.Item key="0">
        <a href="/park/profile">Хувийн мэдээлэл</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <a href="/logout">Гарах</a></Menu.Item>
    </Menu>
  );

  return (
    <Disclosure as="nav" className="bg-navbarColor w-full inset-x-0 top-0">
      {({open}) => (
        <>
          <div className="mx-auto px-5 sm:px-0">
            <div
              style={{height: '72px'}}
              className="relative flex items-center justify-start sm:justify-evenly"
            >
              <div className="flex item-center justify-start">
                <div className="flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/">
                      <img
                        className="lg:block h-7 box-border"
                        style={{cursor: 'pointer'}}
                        src="/logo.png"
                        alt="logo"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <div style={{height: '72px'}} className="hidden md:block">
                <div className="flex flex-row">
                  {navigation.map((item) => (
                    <div className="grid px-3" key={item.id}>
                      <Link href={item.href}>
                        <a
                          style={{paddingTop: '29px', paddingBottom: '30px'}}
                          className={`justify-self-center navbarItem ${item.current}`}
                        >
                          {item.name}
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {(Auth.getToken() == null || Auth.getToken() == undefined) ?
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Link href="/login">
                    <button className="navbarBtn">Нэвтрэх</button>
                  </Link>
                  <button
                    onClick={() => {
                      console.log(router.push('/register'));
                    }}
                    className={'border rounded-lg py-2.5 px-3 ml-5 navbarBtn'}
                  >
                    Бүртгүүлэх
                  </button>
                </div> :
                <div style={{height: '72px'}} className="hidden md:block">
                  <div className="flex flex-row">
                    {navigationadmin.map((item) => (
                      <div className="grid px-3" key={item.id}>
                        <Link href={item.href}>
                          <a
                            style={{paddingTop: '22px', paddingBottom: '22px'}}
                            className={`justify-self-center navbarItem ${item.current}`}
                          >
                            {(item.id !== 2) ?
                              getIcon(item.icon) :
                              getProfile()
                            }

                          </a>
                        </Link>


                      </div>
                    ))}
                    <div className="profileDropdown">
                      <Dropdown placement="bottomRight" overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                          <DownOutlined />
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                </div>}

            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ?
                      'bg-gray-900 text-white' :
                      'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
