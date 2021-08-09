import { Calendar, Select, Radio, Col, Row, Typography, Button } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { calendarLocale } from "@constants/constants.js";
import moment, { months } from "moment";
import { useState } from "react";
moment.updateLocale("mn", {
  weekdaysMin: ["НЯ", "ДА", "МЯ", "ЛХ", "ПҮ", "БА", "БЯ"],
});

function onPanelChange(value, mode) {
  console.log(value, mode);
}
const onClose = () => {};

const calendar = (props) => {
  const [curr, setCurr] = useState(0);
  const [day, setDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState([]);
  const onChangeLeft = () => {
    if (curr > 0) {
      setCurr(curr - 1);
    } else setCurr(0);
  };
  const onselect = (e) => {
    console.log("nuguu date --->", e._d);
    if (e._d !== selectedDate) {
      setSelectedDate([...selectedDate, e._d]);
      setDay(day + 1);
      console.log(day);
    } else {
    }
  };
  const onClickRight = () => {
    console.log(day);
    console.log(selectedDate);
  };
  return (
    <div className=" site-calendar-customize-header-wrapper">
      <Calendar
        className="timePickCalendar"
        onSelect={onselect}
        locale={calendarLocale}
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];
          const current = value.clone();

          const localeData = value.localeData();
          const year = value.year();
          const month = [];
          for (let i = 0; i < 12; i++) {
            current.month(i);
            month.push(localeData.months(current));
          }
          // for (let index = start; index < end; index++) {
          //   monthOptions.push(
          //     <Select.Option className="month-item" key={`${index}`}>
          //       {months[index]}
          //     </Select.Option>
          //   );
          // }
          setCurr(value.clone().month());
          return (
            <div style={{ padding: 16 }}>
              <Row gutter={8}>
                <Col span={2}>
                  <LeftOutlined
                    onClick={onChangeLeft}
                    style={{ cursor: "pointer" }}
                  />
                </Col>
                <Col span={12}>
                  {month[curr]},{year}
                </Col>
                <Col
                  span={2}
                  onClick={onClickRight}
                  style={{ cursor: "pointer" }}
                >
                  <RightOutlined />
                </Col>
              </Row>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};
export default calendar;
