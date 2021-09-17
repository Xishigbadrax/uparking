
import {callGet, callPost} from '@api/api';
import {Row, Col, Tabs, Modal, Button, Dropdown, Menu, DatePicker, Calendar, Tag, List, Pagination} from 'antd';
import {useEffect, useState, useContext} from 'react';
import {calendarLocale} from '@constants/constants';
import Helper from '@utils/helper';
import {DownOutlined, OrderedListOutlined, LeftOutlined, RightOutlined, ArrowRightOutlined, EyeTwoTone, DeleteTwoTone} from '@ant-design/icons';
import moment from 'moment';
import DayNightColumn from '@components/DayNightColumns';
import Context from '@context/Context';
import RentDate from '@components/registerSpace/rentDate';
import Link from 'next/link';
const {TabPane} = Tabs;
moment.updateLocale('mn', {
  weekdaysMin: ['НЯМ', 'ДАВ', 'МЯГ', 'ЛХА', 'ПҮР', 'БАА', 'БЯМ'],
});
moment.updateLocale('mn', {
  months: ['Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар', 'Зургаадугаар сар', 'Долоодугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар', 'Арван нэгдүгээр сар', 'Арван хоёрдугаар сар'],
});

const Lessor = () =>{
  const [current, setCurrent]=useState(parseInt(moment().format('M')));
  const [orderData, setOrderData] = useState([]);
  const ctx = useContext(Context);
  const [calendarStatus, setCalendarStatus]=useState();
  const [vehicles, setVehicles]= useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [calendarData, setCalendarData]= useState([]);
  const [dateVisible, setDateVisible] =useState(false);
  const [historyData, setHistoryData] =useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [dataViewType, setDataViewType] = useState('calendar');
  useEffect(async ()=>{
    const vehicle = await callGet('/user/vehicle/list');
    setVehicles(vehicle);
  }, []);
  const getSavedData =async ()=>{
    const result = await callGet('/booking?asWho=2&isConfirmed=false');
    console.log(result, 'saveeeeeeeeeed Dataaaaaaaaaaaaaaa');
    setCalendarData(result);
  };
  const getConfirmedData = async ()=>{
    const res = await callGet('booking?asWho=2&isConfirmed=true');
    console.log(res, 'confirm yesss');
    setCalendarData(res);
  };

  const getHistory = async ()=>{
    ctx.setIsLoading(true);
    const formData = {
      asWho: 2,
      dateList: null,
      vehicleId: null,
      parkingSpaceId: null,
    };
    const res = await callPost('/booking/history', formData);
    if (!res || res === undefined) {
      showMessage(messageType.FAILED.type, result.error);
      return true;
    } else {
      setCalendarData(res.history);
    }
    ctx.setIsLoading(false);
  };
  // хүсэлт болон баталгаажсан Түүх гэсэн Tab солих
  const onClickInnerTab = (key) => {
    setCalendarData([]);
    setCurrent(parseInt(moment().format('M')));
    if (key == 1) {
      setCalendarStatus(key);
      setIsConfirmed(false);
      getSavedData();
    } else if (key == 2) {
      setCalendarStatus(key);
      getConfirmedData();
      setIsConfirmed(true);
    } else if (key == 3) {
      setCalendarStatus(key);
      setIsConfirmed(false);

      getHistory();
    }
  };
  const handleChangeView = (value) => {
    if (value.key==='calendar') {
      setDataViewType('calendar');
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
            {calendarStatus === '2' && <Tag color='green' className="eventText">{item.vehicleNumber}</Tag>}
            {calendarStatus === '3' && <Tag color='green' className="eventText">{item.vehicleNumber}</Tag>}
          </li>
        ))}
        {listData === [] && <Tag color='#C6231A' className="eventText" style={{background: 'pink', height: '20px'}}></Tag>}
      </ul>
    );
  };
  const onChangePage = (page)=>{
    console.log(page);
    setCurrentPage(page);
  };
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  // calendar der haragdah data awah
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
    <div>
      <Tabs defaultActiveKey='1' className='profileSubTab' onChange={onClickInnerTab}>
        <TabPane key='1' tab={
          <div className={`${calendarStatus === 1 }`? 'activeKey':'notActiveKey'}>
            <Dropdown overlay={menu} onChange={onChangeDropDown } className='dropdown'>
              <Button >Хүсэлт<DownOutlined /></Button>
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
                        <Col span={5} style={{marginTop: '5px'}}>
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
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender} />
            </div>:
            <div>
              <List
                className="calendarList"
                style={{marginTop: 30}}
                itemLayout="horizontal"
                dataSource={calendarData}
                renderItem={(item) => (
                  <List.Item >
                    {item.bookingStatus ==='PENDING' && <div className="calendarListStatus">
                      {item.bookingStatusDescription}
                      {/* {calendarStaticData.expireDateDriver} */}
                    </div>}
                    <Row style={{width: '100%'}}>
                      <Col span={3}>
                        <div className="listtitle"><strong>{item.vehicleNumber}</strong>
                        </div>
                        <div style={{color: '#35446D', fontSize: '10px', lineHeight: '16px', fontWeight: '400', fontStyle: 'Normal'}}>{item.vehicle}</div>
                        {/* <div className="listdescription">{`${item.province}, ${item.district}, ${item.section}, ${item.residenceName}, ${item.residenceBlockNumber}`}</div> */}
                      </Col>
                      <Col span={4} className="listdaynight">
                        <Row>
                          {item.totalAtDay > 0 && item.totalAtNight === 0 && item.totalAllDay ===0 ?
                            <div className='orderDayType' style={{display: ' flex', alignItems: 'center', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_5_24px.png' height='12px' width='18px'/>
                              </div>
                              <p style={{marginLeft: '2px', marginTop: '3px', color: '#35446D', fontStyle: '12px'}}>Өдөр</p>
                            </div> : null}
                          {item.totalAtNight > 0 && item.totalAtDay === 0 && item.totalAllDay === 0 ?
                            <div className='orderDayType' style={{display: ' flex', alignItems: 'center', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_3_24px.png' height='12px' width='18px'/>
                              </div>
                              <p style={{marginLeft: '5px', marginTop: '3px', color: '#35446D', fontStyle: '12px'}}>Шөнө</p>
                            </div> : null}
                          {item.totalAllDay > 0 && item.totalAtNight === 0 && item.totalAtDay ===0 ?
                            <div className='orderDayType' style={{display: ' flex', alignItems: 'center', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '10%'}}>
                                <img src='/icons/brightness_4_24px.png' height='12px' width='16px'/>
                              </div>
                              <p style={{marginLeft: '2px', marginTop: '3px', color: '#35446D', fontStyle: '12px'}}>Бүтэн өдөр</p>
                            </div> : null}
                          {item.totalAtDay > 0 && item.totalAtNight > 0 && item.totalAllDay ===0 ?
                            <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_5_24px.png' height='12px' width='16px'/>
                              </div>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_3_24px.png' height='12px' width='16px'/>
                              </div>
                            </div> : null}
                          {item.totalAtDay > 0 && item.totalAtNight === 0 && item.totalAllDay > 0 ?
                            <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_5_24px.png' height='12px' width='16px'/>
                              </div>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_4_24px.png' height='12px' width='16px'/>
                              </div>
                            </div> : null}
                          {item.totalAtDay === 0 && item.totalAtNight> 0 && item.totalAllDay > 0 ?
                            <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_3_24px.png' height='12px' width='16px'/>
                              </div>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_4_24px.png' height='12px' width='16px'/>
                              </div>
                            </div> : null}
                          {item.totalAtDay > 0 && item.totalAtNight > 0 && item.totalAllDay > 0 ?
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
                            <div> <strong>{Helper.date(item.startDateTime)}</strong></div>
                            <div> {Helper.time(item.startDateTime)}</div>
                          </div>
                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', marginLeft: '20px'}} ><ArrowRightOutlined /></div>
                          <div style={{marginLeft: '20px'}}>
                            <div> <strong>{Helper.date(item.startDateTime)}</strong></div>
                            <div> {Helper.time(item.endDateTime)}</div>
                          </div>

                        </div>
                      </Col>
                      <Col span={4} className="listpay">
                        <div style={{textAlign: 'right', color: '#35446D', fontSize: '12px'}}> Нийт захиалгын төлбөр</div>
                        <div style={{textAlign: 'right'}} className="totalprice"> <strong>
                          {item.totalPrice ? Helper.formatValueReverse(item.totalPrice) : 0}₮</strong></div>
                      </Col>
                      <Col span={3} className="listactions">
                        <Link href={{pathname: `/park/profile/order/${item.bookingId}`, query: {page: '1', asWho: 2}}} passHref>
                          <EyeTwoTone twoToneColor="#0013D4" style={{fontSize: 20}} />
                        </Link>

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
                onPanelChange={(e)=>console.log(e, 'sdaaaaaaaaaaaaaaaa')}
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
                        <Col span={5} style={{marginTop: '5px'}}>
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
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender} />
              <Row>
                <Col offset={18} span={6}>
                  <Row style={{fontWeight: '700', fontSize: '12px', lineHeight: '24px'}}>Түрээслэх өдрүүдийн үндсэн календарь</Row>
                  <Row>
                    <Col span={6} offset={14}>
                      <Button onClick={(e)=>{
                        setDateVisible(true);
                      }}
                      style={{color: '#0013D4', alignItems: 'right', border: '1px solid #0013D4', borderRadius: '20px', height: '32px', marginTop: '10px', marginBottom: '10px'}}> Шинэчлэх </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>:
            <div>
              <List
                className="calendarList"
                style={{marginTop: 30}}
                itemLayout="horizontal"
                dataSource={calendarData}
                renderItem={(item) => (
                  <List.Item >
                    {item.bookingStatus ==='CONFIRMED' && <div className="calendarListStatus">
                      {item.bookingStatusDescription}
                      {/* {calendarStaticData.expireDateDriver} */}
                    </div>}
                    <Row style={{width: '100%'}}>
                      <Col span={3}>
                        <div className="listtitle"><strong>{item.vehicleNumber}</strong>
                        </div>
                        <div style={{color: '#35446D', fontSize: '10px', lineHeight: '16px', fontWeight: '400', fontStyle: 'Normal'}}>{item.vehicle}</div>
                        {/* <div className="listdescription">{`${item.province}, ${item.district}, ${item.section}, ${item.residenceName}, ${item.residenceBlockNumber}`}</div> */}
                      </Col>
                      <Col span={4} className="listdaynight">
                        <Row>
                          {item.totalAtDay > 0 && item.totalAtNight === 0 && item.totalAllDay ===0 ?
                            <div className='orderDayType' style={{display: ' flex', alignItems: 'center', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_5_24px.png' height='12px' width='18px'/>
                              </div>
                              <p style={{marginLeft: '2px', marginTop: '3px', color: '#35446D', fontStyle: '12px'}}>Өдөр</p>
                            </div> : null}
                          {item.totalAtNight > 0 && item.totalAtDay === 0 && item.totalAllDay === 0 ?
                            <div className='orderDayType' style={{display: ' flex', alignItems: 'center', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_3_24px.png' height='12px' width='18px'/>
                              </div>
                              <p style={{marginLeft: '5px', marginTop: '3px', color: '#35446D', fontStyle: '12px'}}>Шөнө</p>
                            </div> : null}
                          {item.totalAllDay > 0 && item.totalAtNight === 0 && item.totalAtDay ===0 ?
                            <div className='orderDayType' style={{display: ' flex', alignItems: 'center', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '10%'}}>
                                <img src='/icons/brightness_4_24px.png' height='12px' width='16px'/>
                              </div>
                              <p style={{marginLeft: '2px', marginTop: '3px', color: '#35446D', fontStyle: '12px'}}>Бүтэн өдөр</p>
                            </div> : null}
                          {item.totalAtDay > 0 && item.totalAtNight > 0 && item.totalAllDay ===0 ?
                            <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_5_24px.png' height='12px' width='16px'/>
                              </div>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_3_24px.png' height='12px' width='16px'/>
                              </div>
                            </div> : null}
                          {item.totalAtDay > 0 && item.totalAtNight === 0 && item.totalAllDay > 0 ?
                            <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_5_24px.png' height='12px' width='16px'/>
                              </div>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_4_24px.png' height='12px' width='16px'/>
                              </div>
                            </div> : null}
                          {item.totalAtDay === 0 && item.totalAtNight> 0 && item.totalAllDay > 0 ?
                            <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_3_24px.png' height='12px' width='16px'/>
                              </div>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_4_24px.png' height='12px' width='16px'/>
                              </div>
                            </div> : null}
                          {item.totalAtDay > 0 && item.totalAtNight > 0 && item.totalAllDay > 0 ?
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
                            <div> <strong>{Helper.date(item.startDateTime)}</strong></div>
                            <div> {Helper.time(item.startDateTime)}</div>
                          </div>
                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', marginLeft: '20px'}} ><ArrowRightOutlined /></div>
                          <div style={{marginLeft: '20px'}}>
                            <div> <strong>{Helper.date(item.startDateTime)}</strong></div>
                            <div> {Helper.time(item.endDateTime)}</div>
                          </div>

                        </div>
                      </Col>
                      <Col span={4} className="listpay">
                        <div style={{textAlign: 'right', color: '#35446D', fontSize: '12px'}}> Нийт захиалгын төлбөр</div>
                        <div style={{textAlign: 'right'}} className="totalprice"> <strong>
                          {item.totalPrice ? Helper.formatValueReverse(item.totalPrice) : 0}₮</strong></div>
                      </Col>
                      <Col span={3} className="listactions">
                        <Link href={{pathname: `/park/profile/order/${item.bookingId}`, query: {page: '1', asWho: 2}}} passHref>
                          <EyeTwoTone twoToneColor="#0013D4" style={{fontSize: 20}} />
                        </Link>

                      </Col>
                      <Col>
                        {calendarStatus != 2 && <button> <DeleteTwoTone style={{marginLeft: '10px', marginTop: '18px'}} twoToneColor="#C6231A" /></button>}
                      </Col>
                    </Row>
                  </List.Item>)}
              />
            </div>}
        </TabPane>
        <TabPane key='3' tab={
          <div className={`${calendarStatus === 2 }`?'activeKey':'notActiveKey'}>
            <Dropdown overlay={menu} onChange={onChangeDropDown } className='dropdown'>
              <Button >Түүх <DownOutlined /></Button>
            </Dropdown>
          </div>
        }>
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
                        <Col span={5} style={{marginTop: '5px'}}>
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
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender} />
              <Row>
                <Col offset={18} span={6}>
                  <Row style={{fontWeight: '700', fontSize: '12px', lineHeight: '24px'}}>Түрээслэх өдрүүдийн үндсэн календарь</Row>
                  <Row>
                    <Col span={6} offset={14}>
                      <Button onClick={(e)=>{
                        setDateVisible(true);
                      }}
                      style={{color: '#0013D4', alignItems: 'right', border: '1px solid #0013D4', borderRadius: '20px', height: '32px', marginTop: '10px', marginBottom: '10px'}}> Шинэчлэх </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>:
            <div>
              <List
                className="calendarList"
                style={{marginTop: 30}}
                itemLayout="horizontal"
                dataSource={calendarData}
                renderItem={(item) => (
                  <List.Item >
                    {item.bookingStatus ==='PENDING' && <div className="calendarListStatus">
                      {item.bookingStatusDescription}
                      {/* {calendarStaticData.expireDateDriver} */}
                    </div>}
                    <Row style={{width: '100%'}}>
                      <Col span={3}>
                        <div className="listtitle"><strong>{item.vehicleNumber}</strong>
                        </div>
                        <div style={{color: '#35446D', fontSize: '10px', lineHeight: '16px', fontWeight: '400', fontStyle: 'Normal'}}>{item.vehicle}</div>
                        {/* <div className="listdescription">{`${item.province}, ${item.district}, ${item.section}, ${item.residenceName}, ${item.residenceBlockNumber}`}</div> */}
                      </Col>
                      <Col span={4} className="listdaynight">
                        <Row>
                          {item.totalAtDay > 0 && item.totalAtNight === 0 && item.totalAllDay ===0 ?
                            <div className='orderDayType' style={{display: ' flex', alignItems: 'center', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_5_24px.png' height='12px' width='18px'/>
                              </div>
                              <p style={{marginLeft: '2px', marginTop: '3px', color: '#35446D', fontStyle: '12px'}}>Өдөр</p>
                            </div> : null}
                          {item.totalAtNight > 0 && item.totalAtDay === 0 && item.totalAllDay === 0 ?
                            <div className='orderDayType' style={{display: ' flex', alignItems: 'center', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_3_24px.png' height='12px' width='18px'/>
                              </div>
                              <p style={{marginLeft: '5px', marginTop: '3px', color: '#35446D', fontStyle: '12px'}}>Шөнө</p>
                            </div> : null}
                          {item.totalAllDay > 0 && item.totalAtNight === 0 && item.totalAtDay ===0 ?
                            <div className='orderDayType' style={{display: ' flex', alignItems: 'center', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '10%'}}>
                                <img src='/icons/brightness_4_24px.png' height='12px' width='16px'/>
                              </div>
                              <p style={{marginLeft: '2px', marginTop: '3px', color: '#35446D', fontStyle: '12px'}}>Бүтэн өдөр</p>
                            </div> : null}
                          {item.totalAtDay > 0 && item.totalAtNight > 0 && item.totalAllDay ===0 ?
                            <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_5_24px.png' height='12px' width='16px'/>
                              </div>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_3_24px.png' height='12px' width='16px'/>
                              </div>
                            </div> : null}
                          {item.totalAtDay > 0 && item.totalAtNight === 0 && item.totalAllDay > 0 ?
                            <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_5_24px.png' height='12px' width='16px'/>
                              </div>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_4_24px.png' height='12px' width='16px'/>
                              </div>
                            </div> : null}
                          {item.totalAtDay === 0 && item.totalAtNight> 0 && item.totalAllDay > 0 ?
                            <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_3_24px.png' height='12px' width='16px'/>
                              </div>
                              <div style={{marginTop: '2px', marginLeft: '20%'}}>
                                <img src='/icons/brightness_4_24px.png' height='12px' width='16px'/>
                              </div>
                            </div> : null}
                          {item.totalAtDay > 0 && item.totalAtNight > 0 && item.totalAllDay > 0 ?
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
                            <div> <strong>{Helper.date(item.startDateTime)}</strong></div>
                            <div> {Helper.time(item.startDateTime)}</div>
                          </div>
                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', marginLeft: '20px'}} ><ArrowRightOutlined /></div>
                          <div style={{marginLeft: '20px'}}>
                            <div> <strong>{Helper.date(item.startDateTime)}</strong></div>
                            <div> {Helper.time(item.endDateTime)}</div>
                          </div>

                        </div>
                      </Col>
                      <Col span={4} className="listpay">
                        <div style={{textAlign: 'right', color: '#35446D', fontSize: '12px'}}> Нийт захиалгын төлбөр</div>
                        <div style={{textAlign: 'right'}} className="totalprice"> <strong>
                          {item.totalPrice ? Helper.formatValueReverse(item.totalPrice) : 0}₮</strong></div>
                      </Col>
                      <Col span={3} className="listactions">
                        <Link href={{pathname: `/park/profile/order/${item.bookingId}`, query: {page: '1', asWho: 2}}} passHref>
                          <EyeTwoTone twoToneColor="#0013D4" style={{fontSize: 20}} />
                        </Link>

                      </Col>
                      <Col>
                        {calendarStatus != 2 && <button> <DeleteTwoTone style={{marginLeft: '10px', marginTop: '18px'}} twoToneColor="#C6231A" /></button>}
                      </Col>
                    </Row>

                  </List.Item>)}
              />
              <Row style={{height: '50px'}}>
                <Pagination current={currentPage} onChange={onChangePage} total={50} className='OrdePagination'/>
              </Row>
            </div>}
        </TabPane>
      </Tabs>
      <Modal visible={dateVisible} width={1500} footer={null} onCancel={()=>setDateVisible(false)}>
        <Row>Түрээслэх өдөр</Row>
        <Row>Зогсоолын түрээслэх боломжтой, боломжгүй, магадгүй өдрүүдийг 7 хоногын өдрүүдээр тэмдэглэнэ үү.</Row>
        <RentDate/>

      </Modal>;
    </div>

  );
};
export default Lessor;
