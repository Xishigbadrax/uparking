import { Calendar, Select, Col, Row, Badge } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { calendarLocale } from "@constants/constants.js";
import moment, { months } from "moment";
import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";

const CustomCalendar = (props) => {
  const [selectedDate, setselectedDate] = useState([]);
  const [value, setValue] = useState(null);
  const [current, setCurrent] = useState(0);

  function onPanelChange(value, mode) {
    // setselectedDate([]);
  }
  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
  }
  function dateFullCellRender(value) {
    const day = moment(value).format("D");
    const today = moment();
    let onclickclass = "";
    let style;
    if (
      selectedDate.find((dDate) => isSameDay(dDate.toDate(), value.toDate()))
    ) {
      onclickclass = "onclickeddate";
    }
    if (isSameDay(today.toDate(), value.toDate())) {
      style = {
        background: "rgb(34 230 185)",
        color: "white",
        marginLeft: "5px",
      };
    }
    return (
      <div
        className={`customFullCellRender ant-picker-cell-inner ${onclickclass}`}
        style={style}
      >
        <div className="ant-picker-calendar-date-value">{day}</div>
      </div>
    );
  }
  function onSelect(value) {
    let array = [];
    if (
      selectedDate.find((dDate) => isSameDay(dDate.toDate(), value.toDate()))
    ) {
      array = selectedDate.filter(
        (i) => !isSameDay(i.toDate(), value.toDate())
      );
      setselectedDate(array);
    } else {
      setselectedDate([...selectedDate, value]);
    }
    setCurrent(props.tabskey);
    console.log(current);
    if (current === 1) {
      props.setDayOfNumber(selectedDate.length);
    } else if (current === 2) {
      props.setNightOfNumber(selectedDate.length);
    } else if (current === 3) {
      props.setFullDayNumber(selectedDate.length);
    }
  }
  return (
    <div className="site-calendar-customize-header-wrapper">
      <Calendar
        fullscreen={false}
        // headerRender={({ value, type, onChange }) => {
        //   const start = 0;
        //   const end = 12;
        //   const monthOptions = [];

        //   const current = value.clone();
        //   const localeData = value.localeData();
        //   const months = [];
        //   console.log(value.localeData(), 'localeData.monthsShort(current)')
        //   for (let i = 0; i < 12; i++) {
        //     current.month(i);
        //     months.push(localeData.monthsShort(current));
        //   }

        //   for (let index = start; index < end; index++) {
        //     monthOptions.push(
        //       <Select.Option className="month-item" key={`${index}`}>
        //         {months[index]}
        //       </Select.Option>,
        //     );
        //   }
        //   const month = value.month();

        //   const year = value.year();
        //   const options = [];
        //   for (let i = year - 10; i < year + 10; i += 1) {
        //     options.push(
        //       <Select.Option key={i} value={i} className="year-item">
        //         {i}
        //       </Select.Option>,
        //     );
        //   }
        //   return (
        //     <div style={{ padding: 8 }}>
        //       <Row gutter={8}>
        //         <Col>
        //           <Select
        //             size="small"
        //             dropdownMatchSelectWidth={false}
        //             className="my-year-select"
        //             onChange={newYear => {
        //               const now = value.clone().year(newYear);
        //               onChange(now);
        //             }}
        //             value={String(year)}
        //           >
        //             {options}
        //           </Select>
        //         </Col>
        //         <Col>
        //           <Select
        //             size="small"
        //             dropdownMatchSelectWidth={false}
        //             value={String(month)}
        //             onChange={selectedMonth => {
        //               const newValue = value.clone();
        //               newValue.month(parseInt(selectedMonth, 10));
        //               onChange(newValue);
        //             }}
        //           >
        //             {monthOptions}
        //           </Select>
        //         </Col>
        //       </Row>
        //     </div>
        //   );
        // }}
        locale={calendarLocale}
        value={value}
        onPanelChange={onPanelChange}
        dateFullCellRender={dateFullCellRender}
        className="customCalendarMini"
        onSelect={onSelect}
      />
    </div>
  );
};
export default CustomCalendar;
