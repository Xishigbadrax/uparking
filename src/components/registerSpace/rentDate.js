import { Calendar, Badge, Select } from "antd";
import { Row, Col, Button, Divider, Typography, Radio } from "antd";
import { useState, useEffect } from "react";
import { callGet, apiList } from "@api/api";
import { calendarLocale } from "@constants/constants.js";
import moment from "moment";
moment.updateLocale("mn", {
  weekdaysMin: ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"],
});

const timeSplit = [
  { id: 1, name: "Боломжтой" },
  { id: 2, name: "Боломжгүй" },
];
const days = [
  {
    id: 1,
    label: "НЯМ",
  },
  {
    id: 2,
    label: "ДАВАА",
  },
  {
    id: 3,
    label: "МЯГМАР",
  },
  {
    id: 4,
    label: "ЛХАГВА",
  },
  {
    id: 5,
    label: "ПҮРЭВ",
  },
  {
    id: 6,
    label: "БААСАН",
  },
  {
    id: 7,
    label: "БЯМБА",
  },
];
function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event。。...." },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.content}>
          <span
            style={{
              backgroundColor: "red",
              borderRadius: "10px",
            }}
          >
            {item.type}
          </span>
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month" style={{ height: "50px" }}>
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}
const rentDate = () => {
  const [filterType, setFilterType] = useState("");
  const [dayValue, setDayValue] = useState({});
  useEffect(async () => {
    // const timeSplit = await callGet("/parkingspace/timesplit");
    // console.log(timeSplit);
  }, []);
  return (
    <div className={`h-5/6`}>
      <Row offset={4}>
        <p
          style={{
            color: "blue",
            fontSize: "20px",
            marginTop: "50px",
            marginLeft: "100px",
          }}
        >
          <b> Түрээслэх үнийн мэдээлэл</b>
        </p>
      </Row>
      <Row>
        <p style={{ fontSize: "12px", marginLeft: "100px" }}>
          Тухайн зогсоолийн байрлал, дугаарлалт харагдаж буй зогсоолыг олоход
          тохиромжтой олоход тохиромжтой зураг хийнэ.
        </p>
      </Row>
      <Row>
        <Col span={10}>
          <Row
            style={{
              marginTop: "80px",
              marginLeft: "100px",
            }}
          >
            <Button
              //   onClick={() => setFilterType("AV")}
              //   className={`text-center  col-span-1 buttonFilter1 ${
              //     filterType === "AV" ? "activeButton" : ""
              //   }`}
              style={{
                backgroundColor: "#33FFFC",
                color: "#76E8AA",
                border: "1px solid #00F9B8",
              }}
            >
              AV
            </Button>
            <Button
              //   onClick={() => setFilterType("UN")}
              //   className={`text-center  col-span-1 buttonFilter1 ${
              //     filterType === "UN" ? "activeButton" : ""
              //   }`}
              style={{
                marginLeft: "10px",
                backgroundColor: "gray",
              }}
            >
              UN
            </Button>

            <p style={{ marginLeft: "10px", fontSize: "16px" }}>
              Тохиргоо хийх
            </p>
            <Divider />
          </Row>
          <Row style={{ marginLeft: "100px" }}>
            <Col span={6} offset={1}></Col>
            <Col span={6} offset={1}>
              Өдөр|08:00-18:30
            </Col>
            <Col span={6} offset={1}>
              Шөнө|08:00-18:30
            </Col>
          </Row>
          {days.map((item) => (
            <Row
              style={{ marginLeft: "100px", marginTop: "10px" }}
              key={item.id}
            >
              <Col span={6} offset={1} style={{ fontSize: "15px" }}>
                {item.label}
              </Col>
              <Col span={6} offset={1}>
                <select span={6} className={`w-32 DAY `}>
                  {timeSplit.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </Col>
              <Col span={6} offset={1}>
                <select span={6} className={`w-32 DAY`}>
                  {timeSplit.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </Col>
            </Row>
          ))}
        </Col>
        <Col offset={2}>
          <div style={{ width: "720px", height: "388px", display: "flex" }}>
            <div style={{ marginTop: "90px" }}>
              <p>Өглөө </p>
              <p>Орой</p>
              <p>Өглөө </p>
              <p>Орой</p>
              <p>Өглөө </p>
              <p>Орой</p>
              <p>Өглөө </p>
              <p>Орой</p>
              <p>Өглөө </p>
              <p>Орой</p>
              <p>Өглөө </p>
              <p>Орой</p>
              <p>Өглөө </p>
              <p>Орой</p>
            </div>
            <Calendar
              className={`ant-picker-cell ant-picker-cell-in-view`}
              dateCellRender={dateCellRender}
              locale={calendarLocale}
              monthCellRender={monthCellRender}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default rentDate;
