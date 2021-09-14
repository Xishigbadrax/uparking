/* eslint-disable react/prop-types */
import {Calendar, Row, Col} from 'antd';
import {calendarLocale} from '@constants/constants.js';
import moment from 'moment';
import {useState, useEffect} from 'react';
import {differenceInCalendarDays} from 'date-fns';
import {RightOutlined, LeftOutlined} from '@ant-design/icons';

moment.updateLocale('mn', {
  months: ['Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар', 'Зургаадугаар сар', 'Долоодугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар', 'Арван нэгдүгээр сар', 'Арван хоёрдугаар сар'],
});
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
  const [selectedDate, setselectedDate] = useState([]);
  const [selectType, setSelectType] = useState('multi');
  // eslint-disable-next-line no-unused-vars
  // const [value, setValue] = useState(null);
  const [current, setCurrent]=useState(parseInt(moment().format('M')));

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


  const onPanelChange = (value, mode) => {
    // setselectedDate([]);
  };
  const isSameDay = (a, b) => {
    return differenceInCalendarDays(a, b) === 0;
  };
  const dateFullCellRender = (value) => {
    const day = moment(value).format('D');
    const today = moment();
    let onclickclass = '';
    let style;
    if (
      selectedDate.find((dDate) => isSameDay(dDate.toDate(), value.toDate()))
    ) {
      onclickclass = 'onclickeddate';
    }
    if (isSameDay(today.toDate(), value.toDate())) {
      style = {
        background: 'rgb(34 230 185)',
        color: 'white',
        marginLeft: '5px',
      };
    }
    return <div className={`customFullCellRender ant-picker-cell-inner ${onclickclass}`} style={style}>
      <div className="ant-picker-calendar-date-value">{day}</div>
    </div>;
  };
  const onSelect = (value) => {
    let array = [];
    if (selectType === 'multi') {
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
              <Row>
                <Col span={1}>
                  <LeftOutlined
                    onClick={(e)=>{
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
                <Col span={10} offset={1} style={{marginTop: '2px'}}>
                  {month[current-1] },{year}
                </Col>
                <Col
                  span={1}
                  offset={1}
                  onClick={()=>{
                    setCurrent(current+1);
                    console.log(current, 'ene harachde ');
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
          )
          ;
        }}
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
