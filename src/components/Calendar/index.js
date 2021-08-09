import {React, useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Calendar, Badge } from 'antd';
import {calendarLocale} from "@constants/constants.js"
import moment from 'moment';
moment.updateLocale('mn', {
    weekdaysMin : ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"]
  });

const getListData = (value) => {
  let listData;
  // switch (value.date()) {
  //   case 8:
  //     listData = [
  //       { id:1, type: 'warning', content: 'Uparking дугаар' },
  //       { id:2, type: 'success', content: 'This is usual event.' },
  //     ];
  //     break;
  //   case 10:
  //     listData = [
  //       { id:3, type: 'warning', content: 'Uparking дугаар' },
  //       { id:4, type: 'success', content: 'This is usual event.' },
  //       { id:5, type: 'error', content: 'This is error event.' },
  //     ];
  //     break;
  //   case 15:
  //     listData = [
  //       { id:6, type: 'warning', content: 'Uparking дугаар' },
  //       { id:7, type: 'warning', content: 'Uparking дугаар' },
  //     ];
  //     break;
  //   default:
  // }
  return listData || [];
}

const dateCellRender = (value) => {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.id}>
          {/* <Badge status={item.type} text={item.content} /> */}
          <span className="eventText">{item.content}</span>
        </li>
      ))}
    </ul>
  );
}

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
}

const monthCellRender = (value) => {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}
const CustomCalendar = ({data}) => {

  // const [calendarData, setCalendarData] = useState([]);
  // if (data.length> 0){
  //   console.log(data, 'calendarData')
  //   setCalendarData(data)
  //   // setCalendarData(data);
  // }
    return (
        <Calendar locale={calendarLocale} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    )
}

export default CustomCalendar;