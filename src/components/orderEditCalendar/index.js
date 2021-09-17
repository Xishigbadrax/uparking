/* eslint-disable react/prop-types */
import {Calendar, Col, Row} from 'antd';
import {calendarLocale} from '@constants/constants.js';
import {RightOutlined, LeftOutlined} from '@ant-design/icons';
import moment from 'moment';
import {useState, useEffect} from 'react';
// import {differenceInCalendarDays} from 'date-fns';
// import Item from '@components/Card';
// import Item from '@components/Card';

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
  console.log(props, 'sdaaa');
  const [fromDate, setFromDate] = useState([]);
  const [selectedDate, setselectedDate] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectType, setSelectType] = useState('multi');
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(null);
  const [current, setCurrent]= useState(moment().format('MM'));

  const test = (date, date2, day2)=>{
    const startDate = Date.parse(date);
    const endDate = Date.parse(date2);
    const nowDate = Date.parse(day2);
    if (nowDate >= startDate && nowDate <= endDate ) {
      return 1;
    } else {
      return 0
      ;
    }
  };
  useEffect(() => {
    if (props.selectType || props.selectType === 'single' || props.selectType === 'multi') {
      setSelectType(props.selectType);
    }
  }, [props.selectType]);

  useEffect(() => {
    setselectedDate(props.selectedDate);
  }, [props.selectedDate]);

  useEffect(() => {
    props.getSelectedDate(selectedDate);
  }, [selectedDate]);
  useEffect(()=>{
    console.log('ugluu');
    setFromDate(props.fromDate);
  }, [props.fromDate]);

  const onPanelChange = (value, mode) => {
    // setselectedDate([]);
  // };
  };
  // const isSameDay = (a, b) => {
  //   return differenceInCalendarDays(a, b) === 0;
  // };
  const dateFullCellRender = (value) => {
    const day = moment(value).format('D');
    const day2 = moment(value).format('YYYY-MM-DD HH:mm:ss').toString();
    let onclickclass = '';

    if (fromDate) {
      fromDate.map((item)=>{
        const x = test(item.startDate, item.endDate, day2);
        // console.log(x, 'ijilhe bnaa ged bna SDA');
        if (x === 1) {
          onclickclass = 'onclickeddate';
        }
      });
    }
    return <div className={`customFullCellRender ant-picker-cell-inner ${onclickclass}`}><div className="ant-picker-calendar-date-value">{day}</div></div>;
  };
  const onSelect = (value) => {
    const day = moment(value).format('D');
    const day2 = moment(value).format('YYYY-MM-DD HH:mm:ss').toString();
    if (fromDate.find((item) =>(test(item.startDate, item.endDate, day2) === 1 ) && item.time === 'DAY')) {
    //   onclickclass = 'onDoubleClickDate';
      props.getSelectedDate(moment(day2).format('YYYY-MM-DD')+' '+'09:00:00');
      console.log('nicee');
    } else if (fromDate.find((item) =>(test(item.startDate, item.endDate, day2) === 1 ) && item.time === 'NIGHT')) {
      //   onclickclass = 'onDoubleClickDate';
      props.getSelectedDate(moment(day2).format('YYYY-MM-DD')+' '+'18:30:00');
      console.log('nicee');
    }
    return <div className={`customFullCellRender1 ant-picker-cell-inner ${'onDoubleClickDate'}`}><div className="ant-picker-calendar-date-value">{day}</div></div>;
  };
  return (
    <div className="site-calendar-customize-header-wrapper">
      <Calendar fullscreen={false} onPanelChange={onPanelChange}
        locale={calendarLocale}
        headerRender={({value, type, onChange, onTypeChange}) => {
          const localeData = value.localeData();
          const year = value.year();
          const month = [];
          console.log(localeData, 'awdawd');
          for (let i = 0; i < 12; i++) {
            month.push(localeData._months[i]);
          }
          return (
            <div style={{padding: '16px'}}>
              <Row >
                <Col span={1}>
                  <LeftOutlined
                    onClick={()=>{
                      setCurrent(current-1);
                      console.log(current, 'ene harachde ');
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
                <Col span={12} offset={1} style={{marginTop: '5px'}}>
                  {month[current-1] },{year}
                </Col>
                <Col
                  span={1}
                  onClick={()=>{
                    setCurrent(current+1);
                    console.log(current, 'ene harachde ');
                    if (current === 12) {
                      setCurrent(1);
                      const newValue = value.clone();
                      newValue.month(parseInt(current +1));
                      onChange(newValue);
                    } else {
                      const newValue = value.clone();
                      newValue.month(parseInt(current +1));
                      onChange(newValue);
                    }
                  }}

                  style={{cursor: 'pointer', color: '#0013D4'}}
                >
                  <RightOutlined />
                </Col>
              </Row>
            </div>
          )
          ;
        }}
        dateFullCellRender={dateFullCellRender}
        className="customCalendarMini"
        onSelect={onSelect}/>
    </div>
  );
};
export default CustomCalendar;