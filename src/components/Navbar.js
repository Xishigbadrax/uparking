import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const navigation = [
    {
      id: 0,
      name: "Бидний тухай",
      href: "/aboutus",
      current: router.asPath == "/aboutus",
    },
    {
      id: 1,
      name: "Жолооч",
      href: "/driver",
      current: router.asPath == "/driver",
    },
    {
      id: 2,
      name: "Зогсоол эзэмшигч",
      href: "/spaceowner",
      current: router.asPath == "/spaceowner",
    },
    {
      id: 3,
      name: "Мэдээ",
      href: "/news",
      current: router.asPath == "/news",
    },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure as="nav" className="bg-navbarColor w-full inset-x-0 top-0">
      {({ open }) => (
        <>
          <div className="mx-auto px-5 sm:px-0">
            <div
              style={{ height: "72px" }}
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
                        style={{ cursor: "pointer" }}
                        src="/logo.png"
                        alt="logo"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <div style={{ height: "72px" }} className="hidden md:block">
                <div className="flex flex-row">
                  {navigation.map((item) => (
                    <div className="grid px-3" key={item.id}>
                      <Link href={item.href}>
                        <a
                          style={{ paddingTop: "27px", paddingBottom: "27px" }}
                          className={`justify-self-center navbarItem ${item.current}`}
                        >
                          {item.name}
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link href="/login">
                  <button className="navbarBtn">Нэвтрэх</button>
                </Link>
                <button 
                  onClick={() => {
                    console.log(router.push('/register'))
                  }}
                  className={`border rounded-lg py-2.5 px-3 ml-5 navbarBtn`}
                >
                  Бүртгүүлэх
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
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
}
