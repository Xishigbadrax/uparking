import {
  Calendar,
} from 'antd';
import {calendarLocale} from '@constants/constants.js';
import moment from 'moment';
import React, {useState} from 'react';
moment.updateLocale('mn', {
  weekdaysMin: ['НЯ', 'ДА', 'МЯ', 'ЛХ', 'ПҮ', 'БА', 'БЯ'],
});

const calendar = (props) => {
  const [curr, setCurr] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [calendarData, setCalendarData] = useState([]);
  const onselectClass = 'onselectDate';
  const onselect = (e) => {
    const date = moment(e).format('YYYY/MM/DD');
    if (isInArray(calendarData, date)) {
      arrayRemove(calendarData, date);
    } else {
      calendarData.push({date: date});
    }
    setCurr(props.tabskey);
    if (curr === 1) {
      props.setDayOfNumber(calendarData.length);
    } else if (curr === 2) {
      props.setNightOfNumber(calendarData.length);
    } else if (curr === 3) {
      props.setFullDayNumber(calendarData.length);
    }
  };

  const getListData = (value) => {
    const listData = [];
    if (calendarData.length > 0) {
      calendarData.forEach(function(element) {
        const currentMoment = moment(element.date, 'YYYY/MM/DD');
        if (value.format('YYYY-MM-DD') === currentMoment.format('YYYY-MM-DD')) {
          listData.push(element);
        }
      });
    }
    return listData || [];
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <div className="events">
        {listData.map((item, key) => (
          <div key={key}
            className={`pickCalendarTime ant-picker-cell-inner ${onselectClass}`}
          >
            <div className="ant-picker-calendar-date-value">1</div>
          </div>
        ))}
      </div>
    );
  };
  const arrayRemove = (array, value) => {
    const removeIndex = array.findIndex((item) => item.date === value);
    array.splice(removeIndex, 1);
    return array;
  };
  const isInArray = (array, value) => {
    return array.find((item) => {
      if (item.date === value) {
        return true;
      } else return false;
    });
  };
  return (
    <div className=" site-calendar-customize-header-wrapper">
      <Calendar
        dateCellRender={dateCellRender}
        className="timePickCalendar"
        onSelect={onselect}
        locale={calendarLocale}
        fullscreen={false}
        // headerRender={({value, type, onChange, onTypeChange}) => {
        //   const current = value.clone();
        //   const localeData = value.localeData();
        //   const year = value.year();
        //   const month = [];
        //   for (let i = 0; i < 12; i++) {
        //     month.push(localeData.months(current));
        //   }
        //   return (
        //     <div style={{padding: 16}}>
        //       <Row gutter={8}>
        //         <Col span={2}>
        //           <LeftOutlined
        //             onClick={onChangeLeft}
        //             style={{cursor: 'pointer'}}
        //           />
        //         </Col>
        //         <Col span={12}>
        //           {month[current]},{year}
        //         </Col>
        //         <Col
        //           span={2}
        //           onClick={onClickRight}
        //           style={{cursor: 'pointer'}}
        //         >
        //           <RightOutlined />
        //         </Col>
        //       </Row>
        //     </div>
        //   );
        // }}
        // ref={calendarRef}
        // onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default calendar;
