
import {callGet, callPost} from '@api/api';
import {Row, Col, Tabs, Modal, Button, Dropdown, Menu, DatePicker, Calendar, Tag, List} from 'antd';
import {useEffect, useState, useContext} from 'react';
import {calendarLocale} from '@constants/constants';
import Helper from '@utils/helper';
import {DownOutlined, OrderedListOutlined, LeftOutlined, RightOutlined, ArrowRightOutlined, EyeTwoTone, DeleteTwoTone} from '@ant-design/icons';
import moment from 'moment';
import DayNightColumn from '@components/DayNightColumns';
import Context from '@context/Context';
import Link from 'next/link';
const {TabPane} = Tabs;
moment.updateLocale('mn', {
  weekdaysMin: ['НЯМ', 'ДАВ', 'МЯГ', 'ЛХА', 'ПҮР', 'БАА', 'БЯМ'],
});
moment.updateLocale('mn', {
  months: ['1 сар', '2 сар', '3 сар', '4 сар', '5 сар', '6 сар', '7 сар', '8 сар', '9 сар', '10 сар', '11 сар', '12 сар'],
});

const Lessor = () =>{
  const [orderData, setOrderData] = useState([]);
  const ctx = useContext(Context);
  const [calendarStatus, setCalendarStatus]=useState();
  const [vehicles, setVehicles]= useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [calendarData, setCalendarData]= useState([]);
  const [historyData, setHistoryValue] =useState([]);
  const [dataViewType, setDataViewType] = useState('calendar');

  useEffect(async ()=>{
    const vehicle = await callGet('/user/vehicle/list');
    setVehicles(vehicle);
  }, []);
  const onChangeOrderDate =(e)=>{

  };
  const getSavedData =async ()=>{
    const result = await callGet('/booking?asWho=2&isConfirmed=false');
    setCalendarData(result);
  };
  useEffect(async ()=>{
    const res = await callGet('booking?asWho=2&isConfirmed=true');
    console.log(res, 'confirm yesss');
  }, [isConfirmed]);
  const getHistroy = async ()=>{
    ctx.setIsLoading(true);
    const formData = {
      asWho: 2,
      dateList: null,
      // parkingSpaceId: null,
    };
    const res = await callPost('/booking/history', formData);
    if (!res || res === undefined) {
      showMessage(messageType.FAILED.type, result.error);
      return true;
    } else {
      console.log(res.history, 'historywdawdw');
      setCalendarData(res.history);
    }
    ctx.setIsLoading(false);
  };
  const onClickInnerTab = (key) => {
    if (key ==1) {
      setCalendarStatus(key);
      setHistoryValue(false);
      setIsConfirmed(false);
      setCalendarData([]);
      getSavedData();
    } else if (key == 2) {
      setCalendarStatus(key);
      setHistoryValue(false);
      setIsConfirmed(true);
    } else if (key == 3) {
      setCalendarStatus(key);
      setHistoryValue(true);
      getHistroy();
    }
  };
  const handleChangeView = (value) => {
    console.log(value, 'glg wee');
    if (value.key==='calendar') {
      setDataViewType('calendar');
      setHistoryValue(false);
    } else {
      setDataViewType('list');
    }
  };
  const onChangeDropDown= ()=>{

  };
  const handleVehicle=()=>{

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
        {listData === [] && <Tag color='#C6231A' className="eventText" style={{background: 'pink', height: '20px'}}></Tag>}
      </ul>
    );
  };
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  // calendar der haragdah data awah
  const getListData = (value) => {
    const listData = [];
    if (calendarData.length > 0) {
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
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const menu =(
    <Menu className="calendarViewer" onClick={(value)=>handleChangeView(value)} style={{width: '100%'}}>
      <Menu.Item key='calendar' value={'calendar'}>Календарь</Menu.Item>
      <Menu.Item key='list' value={'list'}>Жагсаалт</Menu.Item>
    </Menu>
  );
  const calendarStaticData=[{
    vehicleNumber: '2001 БНА',
    residenceName: 'áwdhagwdawgd',
    bookingStatus: 'PENDING',
    bookingStatusDescription: 'Хүлээгдэж буй',
    parkingSpaceId: 222,
    vehicleModel: 'Toyota',
    VehicleMark: 'Pruis',
    totalAtDay: 0,
    totalAtNight: 0,
    totalAllDay: 4,
    startDateTime: '2021-09-23 09:00',
    endDateTime: '2021-09-25 18:30',
    totalPrice: 30000,
  }];

  const vehicleMenu = (
    <Menu onClick={(value)=>handleVehicle(value)} style={{width: '100%'}}>
      {vehicles.map((item)=>(
        <Menu.Item key={item.value}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Tabs defaultActiveKey='1' className='profileSubTab' onChange={onClickInnerTab}>
      <TabPane key='1' tab={
        <div className={`${calendarStatus === 1 }`? 'activeKey':'notActiveKey'}>
          <Dropdown overlay={menu} onChange={onChangeDropDown } className='dropdown'>
            <Button >Хадгалсан <DownOutlined /></Button>
          </Dropdown>
        </div>}>
        <Row>
          <Col span={4} offset={14}>
            <DatePicker
              // className='selectMonthDate'
              bordered={false}
              locale={calendarLocale}
              placeholder='Сараа сонгоно уу?'
              picker='month'

              // onChange={onChangeOrderDate}
            />
          </Col>
          <Col>
            <Dropdown overlay={vehicleMenu} className='dropdown' >
              <Button style={{color: '#35446D'}}>Бүх автомашин<OrderedListOutlined /></Button>
            </Dropdown>
          </Col>
        </Row>
        {dataViewType === 'calendar' ?
          <div className='orderCalendar'>
            <DayNightColumn />
            <Calendar className="customCalendar"
              locale={calendarLocale}
              headerRender={({value, type, onChange, onTypeChange}) => {
                const current = value.clone();
                const localeData = value.localeData();
                const year = value.year();
                const month = [];
                console.log(localeData, 'awdawd');
                for (let i = 0; i < 12; i++) {
                  month.push(localeData.months(current));
                }
                return (
                  <div style={{padding: '16px'}}>
                    <Row >
                      <Col span={1}>
                        <LeftOutlined
                          onClick={()=>{}}
                          style={{cursor: 'pointer', color: '#0013D4'}}
                        />
                      </Col>
                      <Col span={4} style={{marginTop: '5px'}}>
                        {month[moment()]},{year}
                      </Col>
                      <Col
                        span={1}
                        // onClick={onClickRight}
                        style={{cursor: 'pointer', color: '#0013D4'}}
                      >
                        <RightOutlined />
                      </Col>
                    </Row>
                  </div>
                )
                ;
              }}
              dateCellRender={dateCellRender}
              monthCellRender={monthCellRender} />
          </div>:
          <div>
            <List
              className="calendarList"
              style={{marginTop: 30}}
              itemLayout="horizontal"
              dataSource={calendarStaticData}
              renderItem={(calendarStaticData) => (
                <List.Item >
                  {calendarStaticData.bookingStatus ==='PENDING' && <div className="calendarListStatus">
                    {calendarStaticData.bookingStatusDescription}{'  ХҮСЭЛТ   '}
                    {/* {calendarStaticData.expireDateDriver} */}
                  </div>}
                  <Row style={{width: '100%'}}>
                    <Col span={3}>
                      <div className="listtitle"><strong>{calendarStaticData.vehicleNumber}</strong>
                      </div>
                      <div style={{color: '#35446D', fontSize: '10px', lineHeight: '16px', fontWeight: '400', fontStyle: 'Normal'}}>{calendarStaticData.vehicleModel},{calendarStaticData.VehicleMark}</div>
                      {/* <div className="listdescription">{`${item.province}, ${item.district}, ${item.section}, ${item.residenceName}, ${item.residenceBlockNumber}`}</div> */}
                    </Col>
                    <Col span={4} className="listdaynight">
                      <Row>
                        {calendarStaticData.totalAtDay > 0 && calendarStaticData.totalAtNight === 0 && calendarStaticData.totalAllDay ===0 ?
                          <div className='orderDayType' style={{display: ' flex', alignItems: 'center', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                            <div style={{marginTop: '2px', marginLeft: '20%'}}>
                              <img src='/icons/brightness_5_24px.png' height='12px' width='18px'/>
                            </div>
                            <p style={{marginLeft: '2px', marginTop: '3px', color: '#35446D', fontStyle: '12px'}}>Өдөр</p>
                          </div> : null}
                        {calendarStaticData.totalAtNight > 0 && calendarStaticData.totalAtDay === 0 && calendarStaticData.totalAllDay === 0 ?
                          <div className='orderDayType' style={{display: ' flex', alignItems: 'center', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                            <div style={{marginTop: '2px', marginLeft: '20%'}}>
                              <img src='/icons/brightness_3_24px.png' height='12px' width='18px'/>
                            </div>
                            <p style={{marginLeft: '5px', marginTop: '3px', color: '#35446D', fontStyle: '12px'}}>Шөнө</p>
                          </div> : null}
                        {calendarStaticData.totalAllDay > 0 && calendarStaticData.totalAtNight === 0 && calendarStaticData.totalAtDay ===0 ?
                          <div className='orderDayType' style={{display: ' flex', alignItems: 'center', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                            <div style={{marginTop: '2px', marginLeft: '10%'}}>
                              <img src='/icons/brightness_4_24px.png' height='12px' width='16px'/>
                            </div>
                            <p style={{marginLeft: '2px', marginTop: '3px', color: '#35446D', fontStyle: '12px'}}>Бүтэн өдөр</p>
                          </div> : null}
                        {calendarStaticData.totalAtDay > 0 && calendarStaticData.totalAtNight > 0 && calendarStaticData.totalAllDay ===0 ?
                          <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                            <div style={{marginTop: '2px', marginLeft: '20%'}}>
                              <img src='/icons/brightness_5_24px.png' height='12px' width='16px'/>
                            </div>
                            <div style={{marginTop: '2px', marginLeft: '20%'}}>
                              <img src='/icons/brightness_3_24px.png' height='12px' width='16px'/>
                            </div>
                          </div> : null}
                        {calendarStaticData.totalAtDay > 0 && calendarStaticData.totalAtNight === 0 && calendarStaticData.totalAllDay > 0 ?
                          <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                            <div style={{marginTop: '2px', marginLeft: '20%'}}>
                              <img src='/icons/brightness_5_24px.png' height='12px' width='16px'/>
                            </div>
                            <div style={{marginTop: '2px', marginLeft: '20%'}}>
                              <img src='/icons/brightness_4_24px.png' height='12px' width='16px'/>
                            </div>
                          </div> : null}
                        {calendarStaticData.totalAtDay === 0 && calendarStaticData.totalAtNight> 0 && calendarStaticData.totalAllDay > 0 ?
                          <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                            <div style={{marginTop: '2px', marginLeft: '20%'}}>
                              <img src='/icons/brightness_3_24px.png' height='12px' width='16px'/>
                            </div>
                            <div style={{marginTop: '2px', marginLeft: '20%'}}>
                              <img src='/icons/brightness_4_24px.png' height='12px' width='16px'/>
                            </div>
                          </div> : null}
                        {calendarStaticData.totalAtDay > 0 && calendarStaticData.totalAtNight > 0 && calendarStaticData.totalAllDay > 0 ?
                          <div className='orderDayType' style={{display: ' flex', height: '30px', width: '120px', alignItems: 'center'}}>
                            <div style={{marginTop: '2px', marginLeft: '10%'}}>
                              <img src='/icons/brightness_3_24px.png' height='12px' width='16px'/>
                            </div>
                            <div style={{marginTop: '2px', marginLeft: '20%'}}>
                              <img src='/icons/brightness_4_24px.png' height='12px' width='16px'/>
                            </div>
                            <div style={{marginTop: '2px', marginLeft: '20%'}}>
                              <img src='/icons/brightness_5_24px.png' height='12px' width='16px'/>
                            </div>
                          </div> : null}
                      </Row>
                    </Col>
                    <Col span={8} offset={1} className="liststartenddate">
                      <div style={{display: 'inline-flex'}}>
                        <div >
                          <div> <strong>{Helper.date(calendarStaticData.startDateTime)}</strong></div>
                          <div> {Helper.time(calendarStaticData.startDateTime)}</div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', marginLeft: '20px'}} ><ArrowRightOutlined /></div>
                        <div style={{marginLeft: '20px'}}>
                          <div> <strong>{Helper.date(calendarStaticData.startDateTime)}</strong></div>
                          <div> {Helper.time(calendarStaticData.endDateTime)}</div>
                        </div>

                      </div>
                    </Col>
                    <Col span={4} className="listpay">
                      <div style={{textAlign: 'right', color: '#35446D', fontSize: '12px'}}> Нийт захиалгын төлбөр</div>
                      <div style={{textAlign: 'right'}} className="totalprice"> <strong>
                        {calendarStaticData.totalPrice ? Helper.formatValueReverse(calendarStaticData.totalPrice) : 0}₮</strong></div>
                    </Col>
                    <Col span={3} className="listactions">
                      {/* <Link href={{pathname: `/park/profile/order/${calendarStaticData.bookingId}`, query: {page: '1'}}} passHref> */}
                      <EyeTwoTone twoToneColor="#0013D4" style={{fontSize: 20}} />
                      {/* </Link> */}

                    </Col>
                    <Col>
                      {calendarStatus != 2 && <button> <DeleteTwoTone style={{marginLeft: '10px', marginTop: '18px'}} twoToneColor="#C6231A" /></button>}
                    </Col>
                  </Row>
                </List.Item>)}
            />
          </div>}
      </TabPane>
      <TabPane key='2' tab={
        <div className={`${calendarStatus === 2 }`?'activeKey':'notActiveKey'}>
          <Dropdown overlay={menu} onChange={onChangeDropDown } className='dropdown'>
            <Button >Баталгаажсан <DownOutlined /></Button>
          </Dropdown>
        </div>
      }>
        <Row>
          <Col> </Col>
        </Row>
      </TabPane>
      <TabPane key='3' tab={
        <div className={`${calendarStatus === 2 }`?'activeKey':'notActiveKey'}>
          <Dropdown overlay={menu} onChange={onChangeDropDown } className='dropdown'>
            <Button >Түүх <DownOutlined /></Button>
          </Dropdown>
        </div>
      }></TabPane>
    </Tabs>

  );
};
export default Lessor;
