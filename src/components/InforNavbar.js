import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
const navbar = [
  { id: 0, name: "Шинэ мэдээ", href: "newInfo" },
  { id: 1, name: "Компанийн мэдээ", href: "companyInfo" },
  { id: 2, name: "Зөвлөгөө", href: "Zuwluguu" },
  { id: 3, name: "Авто машин", href: "AutoCar" },
  { id: 4, name: "Авто зогсоол", href: "AutoZogsool" },
  { id: 5, name: "Урамшуулал", href: "Uramshuulal" },
  { id: 6, name: "Бусад мэдээ", href: "otherIndo" },
];
export default function InforNavbar() {
  const [filterType, setFilterType] = useState("day");

  const handleDateFilter = (time) => {
    setFilterType(time);
  };
  return (
    <div>
      <div className="flex">
        <div
          className={`lg:grid grid-cols-7 md:grid-cols-7 sm:grid-cols-2 lg:ml-32`}
          style={{ width: "1110px" }}
        >
          {" "}
          {console.log(navbar)}
          {navbar.map((item) => (
            <div
              key={item.id}
              onClick={() => setFilterType(item.href)}
              className={`text-center py-3 grid-cols-1 dateFilter1 ${
                filterType == item.href ? styles.active : ""
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="py-3 ml-32">
          <span style={{ color: "aqua" }}>10/19/2020 , </span>
          <span style={{ color: "blue" }}>
            <b> Даваа гараг</b>
          </span>
        </div>
      </div>
      <div />
    </div>
  );
}
