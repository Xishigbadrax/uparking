import React from "react";
import { useState, useEffect, useContext } from "react";
import WalletLayout from "@components/layouts/WalletLayout";
import WalletCard from "../../../components/WalletCard";
import { calendarLocale } from "@constants/constants.js";
import Helper from "@utils/helper";
import WalletChart from "@components/WalletChart";
import moment from "moment";
import { callGet, callPost } from "@api/api";
import { Calendar, Tag } from "antd";
import Context from "@context/Context";

import Image from "antd";

const Wallet = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [userData, setuserData] = useState(null);
  const ctx = useContext(Context);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    ctx.setIsLoading(true);
    await callGet(`/wallet/user`, null).then((res) => {
      setuserData(res);
      if (res && res.pendingList && res.pendingList.length > 0) {
        setCalendarData(res.pendingList);
      }
      ctx.setIsLoading(false);
    });
  };

  const getListData = (value) => {
    let listData = [];
    if (calendarData.length > 0) {
      calendarData.forEach(function (element) {
        var currentMoment = moment(element.date, "YYYY/MM/DD");
        if (value.format("YYYY-MM-DD") === currentMoment.format("YYYY-MM-DD")) {
          listData.push(element);
        }
      });
    }
    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.date}>
            {/* <Badge status={item.type} text={item.content} /> */}
            <Tag color="green" className="eventText">
              {item.amount}
            </Tag>
          </li>
        ))}
      </ul>
    );
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const styles = {
    display: "flex",
    justifyContent: "space-between",
  };
  const text = {
    width: "327px",
    height: "24px",
  };
  return (
    <WalletLayout>
      <div style={styles}>
        <div>
          <WalletCard />
        </div>

        <div>
          <WalletChart />
        </div>
      </div>
      <div>
        <div style={text}>
          <b>
            Хүлээгдэж буй орлого:{" "}
            <text style={{ color: "blue" }}>
              {userData != null
                ? userData.totalIncome
                  ? Helper.formatValueReverse(userData.totalIncome + "")
                  : 0
                : null}
              ₮
            </text>
          </b>
        </div>
        <div>
          <Calendar
            className="customCalendar"
            locale={calendarLocale}
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
          ></Calendar>
        </div>
      </div>
    </WalletLayout>
  );
};

export default Wallet;
