import ProfileLayout from '@components/layouts/ProfileLayout';
import {Tabs, List, Row, Col, DatePicker, Button} from 'antd';
import {Calendar, Tag, Pagination, Dropdown, Menu} from 'antd';
import {callPost} from '@api/api';
import {useEffect, useState, useContext} from 'react';
import {callGet} from '@api/api';
import Context from '@context/Context';
import {messageType, defaultMsg} from '@constants/constants';
import {showMessage} from '@utils/message';
import moment from 'moment';
import {calendarLocale} from '@constants/constants.js';
import DayNightColumn from '@components/DayNightColumns';
import Lessor from '@components/OrderPanes/lessor';
import {DownOutlined, ArrowRightOutlined, EyeTwoTone, CalendarOutlined, DeleteTwoTone, OrderedListOutlined, RightOutlined, LeftOutlined} from '@ant-design/icons';
import Helper from '@utils/helper';
import Link from 'next/link';
const {TabPane} = Tabs;
moment.updateLocale('mn', {
  weekdaysMin: ['НЯМ', 'ДАВ', 'МЯГ', 'ЛХА', 'ПҮР', 'БАА', 'БЯМ'],
});
moment.updateLocale('mn', {
  months: ['Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар', 'Зургаадугаар сар', 'Долоодугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар', 'Арван нэгдүгээр сар', 'Арван хоёрдугаар сар'],
});
const Order = () => {
  const ctx = useContext(Context);
  const [innerKey, setInnerKey]=useState();
  const [asWho, setAsWho] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [calendarStatus, setCalendarStatus] = useState();
  const [calendarData, setCalendarData] = useState([]);
  const [dataViewType, setDataViewType] = useState('calendar');
  const [currentPage, setCurrentPage]= useState(1);
  const [current, setCurrent]= useState(parseInt(moment().format('M')));
  const [vehicles, setVehicles] = useState([]);
  const [currMonth, setCurrMonth] = useState();
  const [historyValue, setHistoryValue] =useState(false);
  // const [selectVehicle, setSelecteVehicle]= useState();
  const [selectDate, setSelectDate] = useState();


  // hadgalsan zahialga bolon tvvhiin zahialgin medeelliig ustgah

  const onDeleteBooking = async (id)=>{
    if (innerKey == 1 ) {
      const formData = {
        bookingId: id,
      };
      const res = await callPost('/booking/cancelanybooking', formData);
      console.log(res);
    }
  };
  // Tab solih function
  const onClickTab = async (key) => {
    setAsWho(key);
    setIsConfirmed(false);
    await getConfirmData();
  };
  // dotorh tab solih function
  const onClickInnerTab = (key) => {
    setInnerKey(key);
    setCurrent(parseInt(moment().format('MM')));
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
  // sar songoh function
  const onChangeOrderDate = (e)=>{
    console.log(moment(e).format('YYYY-MM-DD'));
    setSelectDate(moment(e).format('YYYY-MM-DD'));
  };
  // pagination solih
  const onChangePage = (page)=>{
    console.log(page);
    setCurrentPage(page);
  };

  // mashinii list awah
  useEffect(async () => {
    const vehicle = await callGet('/user/vehicle/list');
    setVehicles(vehicle);
    getConfirmData();
  }, []);
  // batlagdsan zahialgin medee awah function
  useEffect(() => {
    getConfirmData();
  }, [isConfirmed]);
  // hadgalagdsan data awah
  const getSavedData=(async ()=>{
    const result = await callGet(`/booking?asWho=${asWho}&isConfirmed=false`);
    setCalendarData(result);
  });
  // batalgaajsan turliin data awah
  const getConfirmData = async () => {
    ctx.setIsLoading(true);
    if (isConfirmed) {
      const res = await callGet(`/booking?asWho=${asWho}&isConfirmed=${isConfirmed}`);
      if (!res || res === undefined) {
        showMessage(messageType.FAILED.type, defaultMsg.dataError);
      } else {
        setCalendarData(res);
        setIsConfirmed(false);
      }
    }
    ctx.setIsLoading(false);
  };
  // history paned haragdah list duudah
  const getHistroy = async () => {
    ctx.setIsLoading(true);

    const formData = {
      asWho: 1,
      dateList: null,
      vehicleId: null,
    };
    const res = await callPost('/booking/history', formData);
    if (!res || res === undefined) {
      showMessage(messageType.FAILED.type, result.error);
      return true;
    } else {
      console.log(res.history, 'history');
      setCalendarData(res.history);
    }
    ctx.setIsLoading(false);
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
  const onChangeDropDown = (e)=>{

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
  // mashinii id bolon on saraar shuult hiih
  const handleVehicle = async (e)=>{
    // console.log(selectDate, 'dateeee');
    ctx.setIsLoading(true);
    if (calendarStatus ==1) {
      const res = await callGet(`/booking?asWho=${asWho}&isConfirmed=false&vehicleId=${e.key}`);
      setCalendarData(res);
      setHistoryValue(false);
    } else if (calendarStatus == 2) {
      setHistoryValue(false);
      const res = await callGet(`/booking?asWho=${asWho}&isConfirmed=true&vehicleId=${e.key}`);
      setCalendarData(res);
    } else if (calendarStatus == 3 ) {
      const formData = {
        asWho: 1,
        dateList: selectDate ? [selectDate]: null,
        vehicleId: e.key,
      };
      console.log(formData);
      const res = await callPost('/booking/history', formData);
      if (!res || res === undefined) {
        showMessage(messageType.FAILED.type, defaultMsg.dataError);
      } else {
        console.log(res.history);
        setCalendarData(res.history);
      }
    }
    ctx.setIsLoading(false);
  };
  const CheckUnelgee=(item)=>{
    console.log(item, 'ggggggggggggggggeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  };
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
  const vehicleMenu = (
    <Menu onClick={(value)=>handleVehicle(value)} style={{width: '100%'}} placeholder='Бүх автомашин'>
      {vehicles.map((item)=>(
        <Menu.Item key={item.value}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
  const dateCellRender = (value) => {
    const month = moment(value).format('YYYY-MM');
    if (currMonth === month) {
      const listData = getListData(value);
      return (
        <ul className="events" style={{marginTop: '10px'}}>
          {listData && listData.map((item) => (
            <li key={item.bookingId}>
              {calendarStatus === '1' && <div> <Tag className="eventText" style={{overflowX: 't'}}> Хүлээгдэж буй</Tag>
                <Tag className="eventText" style={{borderRadius: '20px', border: ' 1px solid black',
                  fontSize: '10px',
                  lineHeight: '16px',
                  color: 'red',
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
  };
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  const getUnelgee = ()=>{
    return <div>SNi</div>;
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

  const innerTabs = [
    {title: 'Хадгалсан', key: '1'},
    {title: 'Баталгаажсан', key: '2'},
    {title: 'Түүх', key: '3'},
  ];
  return (
    <ProfileLayout>
      <Tabs defaultActiveKey="1" onChange={onClickTab} type="card" className={'profileTab'}>
        <TabPane tab="Түрээслэгч" key="1">
          <Tabs defaultActiveKey="1" onChange={onClickInnerTab} className="profileSubTab">
            {innerTabs.map((tab) => (
              <TabPane tab={
                <div className={`${calendarStatus === tab.key}`?'activeKey':'notActiveKey'}>
                  <Dropdown overlay={menu} onChange={onChangeDropDown } className='dropdown'>
                    <Button >{tab.title} <DownOutlined /></Button>
                  </Dropdown>
                </div>}
              key={tab.key} >
                <Row>
                  <Col span={4} offset={14}>
                    <DatePicker
                      className='selectMonthDate'
                      bordered={false}
                      locale={calendarLocale}
                      placeholder='Сараа сонгоно уу?'
                      picker='month'
                      onChange={onChangeOrderDate}
                    />
                  </Col>
                  <Col>
                    <Dropdown overlay={vehicleMenu} className='dropdown'>
                      <Button style={{color: '#35446D'}} ><OrderedListOutlined /></Button>
                    </Dropdown>
                  </Col>
                </Row>
                {dataViewType ==='calendar'?
                  <div className='orderCalendar'>
                    <DayNightColumn />
                    <Calendar
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
                      dataSource={calendarData}
                      renderItem={(item) => (
                        <List.Item >
                          {console.log(item.bookingStatus, 'awdawdw')}
                          {item.bookingStatus ==='PENDING_PAYMENT' && <div className="calendarListStatus">
                            {item.bookingStatusDescription}{''}
                            {item.expireDateDriver}
                          </div> }
                          {item.bookingStatus === 'CONFIRMED'&& historyValue === true && CheckUnelgee(item)&& <div className="calendarListStatus">
                            {getUnelgee()}
                          </div>}
                          {item.bookingStatus ==='CONFIRMED' && ! historyValue && <div className="calendarListStatus">
                            {item.bookingStatusDescription}{'   '}
                          </div> }
                          <Row style={{width: '100%'}}>
                            <Col span={7}>
                              <div className="listtitle"><strong>{item.residenceName}</strong></div>
                              <div className="listdescription">{`${item.province}, ${item.district}, ${item.section}, ${item.residenceName}, ${item.residenceBlockNumber}`}</div>
                            </Col>
                            <Col span={4} className="listdaynight">
                              <Row>
                                {item.totalAtDay > 0 && item.totalAtNight === 0 && item.totalAllDay === 0 ?
                                  <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                                    <div style={{marginTop: '5px', marginLeft: '20%'}}>
                                      <img src='/icons/brightness_5_24px.png' height='12px' width='18px'/>
                                    </div>
                                    <p style={{marginLeft: '5px', marginTop: '3px'}}>Өдөр</p>
                                  </div> : null}
                                {item.totalAtNight > 0 && item.totalAtNight === 0 && item.totalAllDay === 0 ?
                                  <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                                    <div style={{marginTop: '5px', marginLeft: '20%'}}>
                                      <img src='/icons/brightness_3_24px.png' height='12px' width='18px'/>
                                    </div>
                                    <p style={{marginLeft: '5px', marginTop: '3px'}}>Шөнө</p>
                                  </div> : null}
                                {item.totalAllDay > 0 && item.totalAtNight === 0 && item.totalAllDay ===0 ?
                                  <div className='orderDayType' style={{display: ' flex', height: '30px', background: '', width: '120px', alignItems: 'center'}}>
                                    <div style={{marginTop: '5px', marginLeft: '20%'}}>
                                      <img src='/icons/brightness_4_24px.png' height='12px' width='16px'/>
                                    </div>
                                    <p style={{marginLeft: '5px', marginTop: '3px'}}>Бүтэн өдөр</p>
                                  </div> : null}
                              </Row>
                            </Col>
                            <Col span={6} className="liststartenddate">
                              <div style={{display: 'inline-flex'}}>
                                <div >
                                  <div> <strong>{Helper.date(item.startDateTime)}</strong></div>
                                  <div> {Helper.time(item.startDateTime)}</div>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px'}} ><ArrowRightOutlined /></div>
                                <div >
                                  <div> <strong>{Helper.date(item.endDateTime)}</strong></div>
                                  <div> {Helper.time(item.endDateTime)}</div>
                                </div>

                              </div>
                            </Col>
                            <Col span={3} className="listpay">
                              <div style={{textAlign: 'right'}}> Нийт төлбөр</div>
                              <div style={{textAlign: 'right'}} className="totalprice"> <strong>
                                {item.totalPrice ? Helper.formatValueReverse(item.totalPrice) : 0}₮</strong></div>
                            </Col>
                            <Col span={3} className="listactions">
                              <Link href={{pathname: `/park/profile/order/${item.bookingId}`, query: {page: '1', asWho: 1, history: historyValue}}} passHref>
                                <EyeTwoTone twoToneColor="#0013D4" style={{fontSize: 20}} />
                              </Link>

                            </Col>
                            <Col>
                              {calendarStatus != 2 && <button> <DeleteTwoTone style={{marginLeft: '10px', marginTop: '18px'}} onClick={()=>onDeleteBooking(item.bookingId)} twoToneColor="#C6231A" /></button>}
                            </Col>
                          </Row>
                        </List.Item>

                      )}
                    />
                    <Row style={{height: '50px'}}>
                      <Pagination current={currentPage} onChange={onChangePage} total={50} className='OrdePagination'/>
                    </Row>
                  </div>}
              </TabPane>
            ))}

          </Tabs>
        </TabPane>
        <TabPane tab="Түрээслүүлэгч" key="2">
          {/* <DayNightColumn />
          <Calendar className="customCalendar" locale={calendarLocale} dateCellRender={dateCellRender} monthCellRender={monthCellRender} /> */}
          <Lessor />
        </TabPane>
      </Tabs>
    </ProfileLayout>
  );
};

export default Order;
