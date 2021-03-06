
import {callGet, callPost} from '@api/api';
import {Row, Col, Tabs, Modal, Button, Dropdown, Menu, DatePicker, Calendar, Tag, List, Pagination} from 'antd';
import {useEffect, useState, useContext} from 'react';
import {calendarLocale} from '@constants/constants';
import Helper from '@utils/helper';
import {DownOutlined, CheckOutlined, OrderedListOutlined, CalendarOutlined, LeftOutlined, RightOutlined, ArrowRightOutlined, EyeTwoTone, DeleteTwoTone} from '@ant-design/icons';
import moment from 'moment';
import DayNightColumn from '@components/DayNightColumns';
import Context from '@context/Context';
import RentDate from '@components/registerSpace/rentDate';
import { showMessage } from '@utils/message';
import { messageType, defaultMsg } from '@constants/constants';
import Link from 'next/link';
import Select from 'rc-select';
import { result } from 'lodash';
const {TabPane} = Tabs;
moment.updateLocale('mn', {
  weekdaysMin: ['НЯМ', 'ДАВ', 'МЯГ', 'ЛХА', 'ПҮР', 'БАА', 'БЯМ'],
});
moment.updateLocale('mn', {
  months: ['Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар', 'Зургаадугаар сар', 'Долоодугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар', 'Арван нэгдүгээр сар', 'Арван хоёрдугаар сар'],
});

const Lessor = () =>{
  const [current, setCurrent]=useState(parseInt(moment().format('M')));
  // const [orderData, setOrderData] = useState([]);
  const ctx = useContext(Context);
  const {userdata} = useContext(Context);

  const [calendarStatus, setCalendarStatus]=useState();
  const [vehicles, setVehicles]= useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [calendarData, setCalendarData]= useState([]);
  const [dateVisible, setDateVisible] =useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [userRealData,setUserRealData]=useState();
  const [spaceList,setSpaceList] = useState([]);
  const [dataViewType, setDataViewType] = useState('calendar');
  const [currMonth, setCurrMonth] = useState(moment().format('YYYY-MM'));
  const [selectedSPace,setSelectedSpace] = useState(null);
  const [selectedDate,setSelectDate] = useState(moment().format('YYYY-MM-DD'));
  //Хэрэглэгчийн бүртгүүлсэн зогсоолуудын мэдээллийг дуудах
  useEffect(async ()=>{
    if (typeof userdata.firstName != 'undefined') {
      setUserRealData(userdata);
      // setUserId(userdata.id);
      const parkSpaceList = await callGet(`/parkingspace/list/user?id=${userdata.id}`);
      setSpaceList(parkSpaceList)
    }
  }, [userdata]);
  //Түрээслүүлэгч талын хүсэлт tab-ын API дуудаж CalendarData-д утгыг оноох
  const getSavedData =async ()=>{
    ctx.setIsLoading(true);
    const result = await callGet('/booking?asWho=2&isConfirmed=false');
    if (!result || result === undefined) {
      showMessage(messageType.FAILED.type, defaultMsg.dataError);
    } else {
      setCalendarData(result);
    }
    ctx.setIsLoading(false);
  };
  //Баталгаажсан захиалгын API дуудаж CalendarData-д оноох
  const getConfirmedData = async ()=>{
    ctx.setIsLoading(true)
    const res = await callGet('booking?asWho=2&isConfirmed=true');
    if (!res || res === undefined) {
      showMessage(messageType.FAILED.type, defaultMsg.dataError);
    } else {
      setCalendarData(res);
    }
    ctx.setIsLoading(false);
  };
  //түүхийн мэдээллийн API дуудаж мэдээллийг CalendarData-д олгох
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
  // хүсэлт болон баталгаажсан , Түүх гэсэн Tab солих 
  const onClickInnerTab = (key) => {
    ctx.setIsLoading(true);
    setCalendarData([]);
    setCurrent(parseInt(moment().format('M')));
    if (key == 1) {
      setSelectedSpace(null);
      setCalendarStatus(key);
      setIsConfirmed(false);
      getSavedData();
    } else if (key == 2) {
      setCalendarStatus(key);
      setSelectedSpace(null);
      getConfirmedData();
      setIsConfirmed(true);
    } else if (key == 3) {
      setCalendarStatus(key);
      setSelectedSpace(null);
      setIsConfirmed(false);
      getHistory();
    }
    ctx.setIsLoading(false);
  };
  const onClickCheckBookingRequest = ()=>{
  };
  //Calendar eswel List baidlaad harj boloh ba tvvniig solig function
  const handleChangeView = (value) => {
    if (value.key==='calendar') {
      setDataViewType('calendar');
    } else {
      setDataViewType('list');
    }
  };
  //pagination
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 8,
    total: 10,
};
  const onChangeDropDown= ()=>{
  };
  // const onChangeOrderDate = (e)=> {
  //   const array = [];
  //   const a = calendarData.find((item)=>moment(item.startDateTime).format('MM') === moment(e).format('MM'));
  //   // array.push(a);
  //   setCurrent(Number(moment(e).format('MM')));
  //   // setSelectDate(moment(e).format('YYYY-MM'));
  //   // CalendarData
  // };
  //Түрээслүүлэгч өөрийн бүртгүүлсэн зогсоол бүр дээр ямар хүсэлт болон ямар захиалга баталгаажсан байна вэ мөн ямар түүхүүд байна вэ гэдгийг харж болно.
  const handleSpace = async (value)=>{
    setSelectedSpace(value.key);
    // ctx.setIsLoading(true);
    if(Number(calendarStatus)===1){
      if(value.key === null){
        const result = await callGet(`/booking?asWho=2&isConfirmed=false`);
          if (!result || result === undefined) {
            showMessage(messageType.FAILED.type, defaultMsg.dataError);
          } else {
            setCalendarData(result);
          ctx.setIsLoading(false);
          }
          }else{
            const result = await callGet(`/booking?asWho=2&isConfirmed=false&parkingSpaceId=${value.key}`);
            if (!result || result === undefined) {
              showMessage(messageType.FAILED.type, defaultMsg.dataError);
            } else {
              setCalendarData(result);
            ctx.setIsLoading(false);
          }
      }
    }else if(Number(calendarStatus)=== 2){
      ctx.setIsLoading(true);
      // setIsConfirmed(true);
      if(value.key === 'null'){
          const res = await callGet(`booking?asWho=2&isConfirmed=true`);
          if (!res || res === undefined) {
            showMessage(messageType.FAILED.type, result.error);
          } else {
            setCalendarData(res);
            ctx.setIsLoading(false);
          }
    }else{
      const res = await callGet(`booking?asWho=2&isConfirmed=true&parkingSpaceId=${value.key}`);
      if (!res || res === undefined) {
        showMessage(messageType.FAILED.type,defaultMsg.dataError);
      } else {
        setCalendarData(res);
        ctx.setIsLoading(false);
    }
  }
  }else if(Number(calendarStatus)===3){
    ctx.setIsLoading(true);
    if(selectedSPace === 'null'){
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
        ctx.setIsLoading(false);
      }
    }else {
      const formData = {
        asWho: 2,
        dateList: null,
        vehicleId: null,
        parkingSpaceId: Number(value.key),
      };
      const res = await callPost('/booking/history', formData);
      if (!res || res === undefined) {
        showMessage(messageType.FAILED.type, result.error);
        return true;
      } else {
        setCalendarData(res.history);
        ctx.setIsLoading(false);
      }
    }
  }
  };
  //Календарын буцаах утга
  const dateCellRender = (value) => {
    const listData = getListData(value);
    const month = moment(value).format('YYYY-MM');
    if (currMonth=== month) {
      return (
        <ul className="events" style={{marginTop: '10px'}}>
          {listData && listData.map((item) => (
            <li key={item.bookingId}>
              {/* <Badge status={item.type} text={item.content} /> */}
              {calendarStatus === '1' && <div> <Tag className="eventText">{item.bookingNumber}</Tag>
                <Tag style={{borderRadius: '20px', border: ' 1px solid black',
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
    }
  };
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  // calendar-ын нүд болгоэ дээр haragdah data awah
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
  //Каленпар уу Лист үү гэдгийг харуулах Menu
  const menu =(
    <Menu className="calendarViewer" onClick={(value)=>handleChangeView(value)} style={{width: '100%'}}>
      <Menu.Item key='calendar' value={'calendar'} style={{display: 'inline-flex'}}>
        <div style={{display: 'flex'}}>
          <CalendarOutlined />
          <p style={{marginLeft: '5px'}}>Календарь</p>
        </div>
      </Menu.Item>
      <Menu.Item key='list' value={'list'}>
        <div style={{display: 'flex'}}>
          <OrderedListOutlined />
          <p style={{marginLeft: '5px'}}>Жагсаалт</p>
        </div>
      </Menu.Item>
    </Menu>
  );
    //түрээслүүлэгчийн зогсоолуудын Menu
  const spaceMenu = (
    <Menu onClick={(value)=>handleSpace(value)} style={{width: '100%'}}>
      <Menu.Item key={null}>Бүх зогсоол </Menu.Item>
      { spaceList && spaceList.map((item)=>(
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
            {/* <Col span={4} offset={14}>
              <DatePicker
              // className='selectMonthDate'
                bordered={false}
                locale={calendarLocale}
                placeholder='Сараа сонгоно уу?'
                picker='month'

              onChange={onChangeOrderDate}
              />
            </Col> */}
            <Col offset={18}>
              <Dropdown overlay={spaceMenu} className='dropdown' >
                <Button style={{color: '#35446D'}}>{selectedSPace !== 'null' ? selectedSPace : 'Бүх зогсоол'}<OrderedListOutlined /></Button>
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
                  setCurrMonth(moment(value).format('YYYY-MM'));
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
                pagination={paginationProps}
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
                          <CheckOutlined twoToneColor="#0013D4" style={{fontSize: 20}} onClick={onClickCheckBookingRequest} />
                        </Link>

                      </Col>
                      <Col>
                        {calendarStatus === 3 && <button> <DeleteTwoTone style={{marginLeft: '10px', marginTop: '18px'}} twoToneColor="#C6231A" /></button>}
                      </Col>
                    </Row>
                  </List.Item>)}
              />
            </div>}
        </TabPane>
        {/*Баталгаажсан захиалгыг харуулах байдал*/}
        <TabPane key='2' tab={
          <div className={`${calendarStatus === 2 }`?'activeKey':'notActiveKey'}>
            <Dropdown overlay={menu} onChange={onChangeDropDown } className='dropdown'>
              <Button >Баталгаажсан <DownOutlined /></Button>
            </Dropdown>
          </div>
        }>
          <Row>
            {/* <Col span={4} offset={14}>
              <DatePicker
                bordered={false}
                locale={calendarLocale}
                placeholder='Сараа сонгоно уу?'
                picker='month'
              onChange={onChangeOrderDate}
              />
            </Col> */}
            <Col offset={18}>
              <Dropdown overlay={spaceMenu} className='dropdown' >
                <Button style={{color: '#35446D'}}>{selectedSPace !== 'null' ? selectedSPace : 'Бүх зогсоол'}<OrderedListOutlined /></Button>
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
                pagination={paginationProps}
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
        {/*Түүхийг  харуулах байдал*/}
        <TabPane key='3' tab={
          <div className={`${calendarStatus === 2 }`?'activeKey':'notActiveKey'}>
            <Dropdown overlay={menu} onChange={onChangeDropDown } className='dropdown'>
              <Button >Түүх <DownOutlined /></Button>
            </Dropdown>
          </div>
        }>
          <Row>
            {/* <Col span={4} offset={14}>
              <DatePicker
              // className='selectMonthDate'
                bordered={false}
                locale={calendarLocale}
                placeholder='Сараа сонгоно уу?'
                picker='month'
              onChange={onChangeOrderDate}
              />
            </Col> */}
            <Col offset={18}>
              <Dropdown overlay={spaceMenu} className='dropdown' >
                <Button style={{color: '#35446D'}}>{selectedSPace !== 'null' ? selectedSPace : 'Бүх зогсоол'}<OrderedListOutlined /></Button>
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
                pagination={paginationProps}
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
                        <Link href={{pathname: `/park/profile/order/${item.bookingId}`, query: {page: '1', asWho: 2, history: true}}} passHref>
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
