import { Calendar, Select, Col, Row, Badge } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { calendarLocale } from "@constants/constants.js";
import moment from "moment";
import { useState, useEffect } from "react";
import { differenceInCalendarDays } from 'date-fns';

const today = moment();
export const AcademicYearStart = moment(today)
  .year(2021)
  .month(7)
  .date(14);
export const AcademicYearEnd = moment(today)
  .year(2021)
  .month(7)
  .date(18);

  console.log(AcademicYearEnd, 'AcademicYearEndAcademicYearEnd')
const CustomCalendar = (props) => {
  const [selectedDate, setselectedDate] = useState([]);
  const [selectType, setSelectType] = useState("multi");
  const [value, setValue] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (props.selectType || props.selectType === "single" || props.selectType === "multi") {
      setSelectType(props.selectType);
    }
  }, [props.selectType]);

  useEffect(() => {
    setselectedDate(props.selectedDate);
  }, [props.selectedDate]);

  useEffect(() => {
    props.getSelectedDate(selectedDate);
  }, [selectedDate]);

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
    return <div className={`customFullCellRender ant-picker-cell-inner ${onclickclass}`} style={style}><div className="ant-picker-calendar-date-value">{day}</div></div>;
  }
  function onSelect(value) {
    let array = [];
    if (selectType === "multi") {
      if (selectedDate.find(dDate => isSameDay(dDate.toDate(), value.toDate()))) {
        array = selectedDate.filter(i => !isSameDay(i.toDate(), value.toDate()));
        setselectedDate(array);
      } else {
        setselectedDate([...selectedDate, value]);
      }
    } else {
      setselectedDate([value]);
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
  function disabledDate(current) {
    console.log(current, 'current')
    return [moment(current) , moment(current).add(3, 'days')]
    // Can not select days before today and today
    // return current && current < moment().endOf('day');
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
        // disabledDate={current => {
        //   // Dones not log when `validRange` prop is present
        //   // Remove `validRange` and this will log
        //   console.log(current);
        // }}
        // validRange={[AcademicYearStart, AcademicYearEnd]} 
      />
    </div>
  );
};
export default CustomCalendar;
