import {Row, Col, Button, Calendar, Tag} from 'antd';
import Link from 'next/link';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {useState, useEffect} from 'react';
import {callPost, callGet} from '@api/api';
import {calendarLocale} from '@constants/constants';
import {Layout} from 'antd';
import DayNightColumns from '@components/DayNightColumns';
import moment from 'moment';
moment.updateLocale('mn', {
  months: ['Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар', 'Зургаадугаар сар', 'Долоодугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар', 'Арван нэгдүгээр сар', 'Арван хоёрдугаар сар'],
});

const booking = (props)=>{
  console.log(props, 'propssssssssss');
  const [current, setCurrent]= useState(parseInt(moment().format('MM')));
  const [calendarData, setCalendarData]= useState([]);

  useEffect(async ()=>{
    const res = await callGet(`/booking/id/test?id=${props.orderId}&asWho=2`);
    console.log(res, 'gggggg');
  }, []);

  const getListData = (value) => {
    const listData = [];
    if (calendarData && calendarData.length > 0) {
      calendarData.forEach(function(element) {
        const currentMoment = moment(element.startDateTime, 'YYYY/MM/DD');
        const endMoment = moment(element.endDateTime, 'YYYY/MM/DD').add(1, 'days');
        while (currentMoment.isBefore(endMoment, 'day')) {
          if (value.format('YYYY-MM-DD') === currentMoment.format('YYYY-MM-DD')) {
            listData.push(element);
          }
          currentMoment.add(1, 'days');
        }
      });
    }
    return listData || [];
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events" style={{marginTop: '10px'}}>
        {listData && listData.map((item) => (
          <li key={item.bookingId}>
            {/* <Badge status={item.type} text={item.content} /> */}
            {calendarStatus === '1' && <div> <Tag color='#C6231A' className="eventText">{item.bookingNumber}</Tag>
              <Tag color='gray' style={{borderRadius: '20px', border: ' 1px solid black',
                fontSize: '10px',
                lineHeight: '16px',
                height: '20px',
                width: '100px'}}></Tag></div>}
            {calendarStatus === '2' && <Tag color='green' className="eventText">{item.bookingNumber}</Tag>}
            {calendarStatus === '3' && <Tag color='yellow' className="eventText">{item.bookingNumber}</Tag>}
          </li>
        ))}
        {listData === [] && <Tag color='#C6231A' className="eventText" style={{background: 'green', height: '20px'}}></Tag>}
      </ul>
    );
  };
  return (
    // <DefaultLayout>
    <div>
      <Row style={{display: 'flex', marginTop: '50px'}}>
        <Col offset={1} span={1}>
          <Link href={{pathname: '/park/profile/order/'}} passHref>
            <Button shape="circle" icon={<LeftOutlined />} size={'large'} />
          </Link>
        </Col>
        <Col span={10}>
          <span style={{fontSize: '20px', lineHeight: '24px', color: '#0013D4', marginTop: '20px'}}>Захиалгын Түүх  </span>
        </Col>
      </Row>
      {/* <Row> */}
      {/* <Col span={18} offset={2}> */}
      <DayNightColumns/>
      <Row>
        <Col className='orderCalendar' >
          <Calendar
            // className="customCalendar"
            // disabledDate={disabledDate}
            headerRender={({value, type, onChange, onTypeChange}) => {
              const localeData = value.localeData();
              const year = value.year();
              const month = [];
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
                    <Col span={7} style={{marginTop: '5px'}}>
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
                          newValue.month(parseInt(current));
                          onChange(newValue);
                        } else {
                          const newValue = value.clone();
                          newValue.month(parseInt(current));
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
            // value={moment().format('YYYY/MM/DD')}
            className={'rentDateCalendar'}
            dateCellRender={dateCellRender}
            // validRange={[dayjs(props.params.startDate), dayjs(props.params.endDate)]}
            locale={calendarLocale}
            // monthCellRender={monthCellRender}
          />
        </Col>
        {/* </Col> */}
        {/* </Row> */}
        {/* </DefaultLayout> */}
      </Row>
    </div>
  );
};
export default booking;
