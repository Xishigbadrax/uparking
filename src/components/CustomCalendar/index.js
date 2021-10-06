/* eslint-disable react/prop-types */
import {Calendar, Row, Col} from 'antd';
import {calendarLocale} from '@constants/constants.js';
import moment from 'moment';
import {useState, useEffect} from 'react';
import {differenceInCalendarDays} from 'date-fns';
// import Helper from '@utils/helper';
import {RightOutlined, LeftOutlined} from '@ant-design/icons';

moment.updateLocale('mn', {
  weekdaysMin: ['НЯМ', 'ДАВ', 'МЯГ', 'ЛХА', 'ПҮР', 'БАА', 'БЯМ'],
});
moment.updateLocale('mn', {
  months: ['Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар', 'Зургаадугаар сар', 'Долоодугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар', 'Арван нэгдүгээр сар', 'Арван хоёрдугаар сар'],
});
// const bookedDate1 = [
//   {startDate: '2021-09-12'},
// ];
const today = moment();
export const AcademicYearStart = moment(today)
  .year(2021)
  .month(7)
  .date(14);
export const AcademicYearEnd = moment(today)
  .year(2021)
  .month(7)
  .date(18);

const CustomCalendar = (props) => {
  const [selectedDate, setselectedDate] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [bookedDate, setBookedDate] = useState([]);
  const [bookedDateOfDay, setBookedDateOfDay]=useState([]);
  const [bookedDateOfNight, setBookedDateOfNight]=useState([]);
  const [bookedDateOfFullDay, setBookedDateOfFullDay]=useState([]);

  const [selectType, setSelectType] = useState('multi');
  const [dayOfWeek, setDayOfWeek] = useState([]);
  // const [dayStatus, setDayStatus] = useState(false);
  const [currMonth, setCurrMonth] = useState();
  const [type, setType] = useState();

  // eslint-disable-next-line no-unused-vars
  // const [value, setValue] = useState(null);
  const [current, setCurrent]=useState(parseInt(moment().format('M')));

  useEffect(() => {
    setType('');
    if (props.selectType || props.selectType === 'single' || props.selectType === 'multi') {
      setSelectType(props.selectType);
    }
    // setBookedDate(props.bookedDate);
    setDayOfWeek(props.dayOfWeek);
    setType(props.dayType);
    if (props.dayType ==='Өдөр') {
      const array=[];
      props.bookedDate.map((item)=>{
        if (item.timeSplitDescription ==='Өдөр') {
          array.push(item);
        }
      });
      setBookedDateOfDay(array);
    } else if (props.dayType === 'Шөнө') {
      const array=[];
      props.bookedDate.map((item)=>{
        if (item.timeSplitDescription ==='Шөнө') {
          array.push(item);
        }
      });
      setBookedDateOfNight(array);
    } else if (props.dayType ==='Бүтэн Өдөр') {
      const array=[];
      props.bookedDate.map((item)=>{
        if (item.timeSplitDescription ==='Бүтэн өдөр') {
          array.push(item);
        }
      });
      setBookedDateOfFullDay(array);
    }
  }, [props]);
  useEffect(() => {
    props.getSelectedDate(selectedDate);
  }, [selectedDate]);


  const onPanelChange = (value, mode) => {
    setselectedDate([]);
  };
  const isSameDay = (a, b) => {
    return differenceInCalendarDays(a, b) === 0;
  };
  const dateFullCellRender = (value) => {
    const ofDay = value.day();
    const month = moment(value).format('YYYY-MM');
    const day = moment(value).format('D');
    const current = moment(value);
    let onclickclass = '';
    let style;

    if (month === currMonth) {
      if (
        selectedDate.find((dDate) => isSameDay(dDate.toDate(), value.toDate()))
      ) {
        onclickclass = 'onclickeddate';
      }
      const a = dayOfWeek.find((item)=>
        item.day == ofDay && item.spaceStatusDescription === 'UN',
      );
      console.log(type, 'xaxa');
      if (type === 'Өдөр') {
        const day2 = bookedDateOfDay.find((item)=>item.startDate === moment(current).format('YYYY-MM-DD'));
        if (moment(current).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD') && a || day2 ) {
          style = {
            background: 'black',
            color: 'white',
            marginLeft: '5px',
          };
        } else if (moment(current).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')&& a === undefined) {
          style={
            background: ' #76E8AA',
            color: 'white',
            marginLeft: '5px'};
        }
        return <div className={`customFullCellRender ant-picker-cell-inner ${onclickclass}`} style={style}>
          <div className="ant-picker-calendar-date-value">{day}</div>
        </div>;
      } else if (type==='Шөнө') {
        const day2 = bookedDateOfNight.find((item)=>item.startDate === moment(current).format('YYYY-MM-DD'));
        // const b = bookedDate.find((item)=>item.startDate === moment(current).format('YYYY-MM-DD'));
        if (moment(current).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD') && a || day2 ) {
          style = {
            background: 'black',
            color: 'white',
            marginLeft: '5px',
          };
        } else if (moment(current).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')&& a === undefined) {
          style={
            background: ' #76E8AA',
            color: 'white',
            marginLeft: '5px'};
        }
        return <div className={`customFullCellRender ant-picker-cell-inner ${onclickclass}`} style={style}>
          <div className="ant-picker-calendar-date-value">{day}</div>
        </div>;
      } else if (type === 'Бүтэн Өдөр') {
        const day2 = bookedDateOfFullDay.find((item)=>item.startDate === moment(current).format('YYYY-MM-DD'));
        // const b = bookedDate.find((item)=>item.startDate === moment(current).format('YYYY-MM-DD'));
        if (moment(current).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD') && a || day2 ) {
          style = {
            background: 'black',
            color: 'white',
            marginLeft: '5px',
          };
        } else if (moment(current).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')&& a === undefined) {
          style={
            background: ' #76E8AA',
            color: 'white',
            marginLeft: '5px'};
        }
        return <div className={`customFullCellRender ant-picker-cell-inner ${onclickclass}`} style={style}>
          <div className="ant-picker-calendar-date-value">{day}</div>
        </div>;
      }
    } ;
  };
  const disabledDate =(current)=> {
    const ofDay = current.day();
    const a = dayOfWeek.find((item)=>
      item.day == ofDay && item.spaceStatusDescription === 'UN',
    );
    const b = bookedDate.find((item)=>item.startDate === moment(current).format('YYYY-MM-DD'));
    // Can not select days before today and today
    return ( current < moment().endOf('day')) || a || b;
  };
  const onSelect = (value) => {
    let array = [];
    if (selectType === 'multi') {
      array=[];
      if (selectedDate.find((dDate) => isSameDay(dDate.toDate(), value.toDate()))) {
        array = selectedDate.filter((i) => !isSameDay(i.toDate(), value.toDate()));
        setselectedDate(array);
      } else {
        setselectedDate([...selectedDate, value]);
      }
    } else {
      setselectedDate([value]);
    }
  };
  return (
    <div className="site-calendar-customize-header-wrapper">
      <Calendar
        fullscreen={false}
        locale={calendarLocale}
        validRange={[moment(), moment().add(30, 'years')]}
        disabledDate={disabledDate}
        headerRender={({value, type, onChange, onTypeChange}) => {
          const localeData = value.localeData();
          const year = value.year();
          setCurrMonth(moment(value).format('YYYY-MM'));
          const month = [];
          for (let i = 0; i < 12; i++) {
            month.push(localeData._months[i]);
          }
          return (
            <div style={{padding: '16px'}}>
              <Row>
                <Col span={1}>
                  <LeftOutlined
                    onClick={(e)=>{
                      setCurrent(current-1);
                      if (current === 1 ) {
                        setCurrent(12);
                        const newValue = value.clone();
                        newValue.month(parseInt(current-1-1));
                        onChange(newValue);
                      } else {
                        const newValue = value.clone();
                        newValue.month(parseInt(current-1-1 ));
                        onChange(newValue);
                      }
                    }}
                    style={{cursor: 'pointer', color: '#0013D4'}}
                  />
                </Col>
                <Col span={10} offset={1} style={{marginTop: '2px'}}>
                  {month[current-1] },{year}
                </Col>
                <Col
                  span={1}
                  offset={1}
                  onClick = {()=>{
                    setCurrent(current+1);
                    if (current === 12) {
                      setCurrent(1);
                      const newValue = value.clone();
                      newValue.month(parseInt(current));
                      onChange(newValue);
                    } else {
                      const newValue = value.clone();
                      newValue.month(parseInt(current ));
                      onChange(newValue);
                    }
                  }}

                  style={{cursor: 'pointer', color: '#0013D4'}}
                >
                  <RightOutlined />
                </Col>
              </Row>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
        dateFullCellRender={dateFullCellRender}
        className="customCalendarMini"
        onSelect={onSelect}
      // disabledDate={current => {
      />
    </div>
  );
};
export default CustomCalendar;
