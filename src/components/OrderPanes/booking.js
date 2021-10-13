import {Row, Col, Button, Calendar, Tag, Modal, Divider, Form, Checkbox} from 'antd';
import Link from 'next/link';
import {LeftOutlined, RightOutlined, DownOutlined, UpOutlined, InfoCircleOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {useState, useEffect, useContext} from 'react';
import {callGet, callPost} from '@api/api';
// import Image from 'next/image';
import {calendarLocale} from '@constants/constants';
import {showMessage} from '@utils/message';
import {messageType, defaultMsg} from '@constants/constants';
import DayNightColumns from '@components/DayNightColumns';
import renderHTML from 'react-render-html';
import Helper from '@utils/helper';
import {useRouter} from 'next/router';
import Context from '@context/Context';
import moment from 'moment';
import CustomCalendar from '@components/orderEditCalendar/index';
moment.updateLocale('mn', {
  months: ['Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар', 'Зургаадугаар сар', 'Долоодугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар', 'Арван нэгдүгээр сар', 'Арван хоёрдугаар сар'],
});
moment.updateLocale('mn', {
  weekdaysMin: ['НЯМ', 'ДАВ', 'МЯГ', 'ЛХА', 'ПҮР', 'БАА', 'БЯМ'],
});

const booking = (props)=>{
  const [current, setCurrent]= useState(parseInt(moment().format('M')));
  // eslint-disable-next-line no-unused-vars
  const ctx = useContext(Context);
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [isVisibleTsutslahPage1, setIsVisibleTsutslah1]=useState(false);
  const [isModalVisibleCancelOrderConfirm, setIsModalVisibleCancelOrderConfirm] = useState(false);
  const [fromSelectedDate, setFromSelectedDate]= useState();
  const [orderData, setOrderData]= useState({});
  const [modalData, setModalData] = useState([]);
  const [bookingId, setBookingId]= useState();
  const [cancelData, setCancelData]= useState();
  const [checkValue, setChechValue] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible]=useState(false);
  const [seemoreUpDownArrow, setSeemoreUpDownArrow] = useState(false);
  const [seeCanceledBooking, setSeeCanceledBooking] =useState(false);
  const [currMonth, setCurrMonth] = useState();
  const [requestedData, setRequestedData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedDate, setSelectedDate] = useState([]);
  const urlString = window.location.href;
  const params = new URL(urlString);
  const history = params.searchParams.get('history');
  useEffect( async ()=>{
    if (history) {
      const res = await callGet(`/booking/id/history?id=${props.orderId}&asWho=2`);
      setBookingId(props.orderId);
      console.log(res, 'gg');
      setOrderData(res);
    } else {
      setBookingId(props.orderId);
      const res = await callGet(`/booking/id/test?id=${props.orderId}&asWho=2`);
      setOrderData(res);
      console.log(res);
      if (res) {
        setRequestedData(res.requestedBookingDetail);
      }
    }
  }, []);
  const handleOkCancelOrder = async ()=>{
  };
  const setRequestedState = (date, value) =>{
    console.log(date, value);
  };
  const handleOkCancelOrderConfirm = ()=> {
  };
  const handleCancelCancelOrder = ()=>{
    setIsVisibleTsutslah1(false);
  };
  const onClickSeeCanceledBooking=async (id)=>{
    const res = await callGet(`/booking/detail?id=${bookingId}&walletId=${id}&asWho=2`);
    console.log(res);
    setModalData(res);
    setSeeCanceledBooking(true);
  };
  const handleClickCancelOrderContinue = async ()=>{
    if (!fromSelectedDate.length) {
      showMessage(messageType.WARNING.type, defaultMsg.chooseDate);
    } else {
      const formData = {
        bookingId: bookingId,
        date: moment(fromSelectedDate).format('YYYY-MM-DD'),
      };
      const res = await callPost('/booking/cancelrequest', formData);
      setCancelData(res);
      setIsVisibleTsutslah1(false);
      setIsModalVisibleCancelOrderConfirm(true);
    };
  };
  const onClickCancelRequested =async ()=>{
    const formData = {
      bookingId: bookingId,
    };
    const res = await callPost('/booking/cancelanybooking', formData);
    if (res && res.status === 'success') {
      router.push('/park/profile/order');
      console.log(res, 'gg yu');
    };
  };
  const handleCancelCancelOrderConfirm = ()=>{
    setIsModalVisibleCancelOrderConfirm(false);
  };
  const handleSubmitPolicy =(e)=>{

  };
  const onFinishPolicy = async (value)=>{
    ctx.setIsLoading(true);
    const res = await callPost(`/booking/cancelpolicy?isAccept=${value.agreement}`);
    console.log(res);
    if (res && res.status) {
      const data =
      {
        bookingId: orderData.bookingId,
        date: moment(fromSelectedDate).format('YYYY-MM-DD'),
        returnAmount: cancelData ? cancelData.returnAmount :null,
      };
      const res2 = await callPost('/booking/cancel', data);
      console.log(res2);
      setIsModalVisibleCancelOrderConfirm(false);
      ctx.setIsLoading(false);
    } else {

    }

    setIsConfirmVisible(true);
  };
  const getSelectedDate = (data) =>{
    console.log(data, 'datadatadata');
    setFromSelectedDate(data);
  };
  const getListData = (value) => {
    const listData = [];
    // console.log(orderData, 'gg');
    if (orderData != null) {
      const currentMoment = moment(orderData.startDateTime, 'YYYY/MM/DD');
      const endMoment = moment(orderData.endDateTime, 'YYYY/MM/DD').add(1, 'day');
      while (currentMoment.isBefore(endMoment, 'day')) {
        if (moment(value).format('YYYY-MM-DD') === moment(currentMoment).format('YYYY-MM-DD')) {
          listData.push(orderData.bookingDetail);
        }
        currentMoment.add(1, 'days');
      }
    }
    return listData || [];
  };
  const dateCellRender = (value) => {
    const month = moment(value).format('YYYY-MM');
    if (month === currMonth) {
    // const listData = getListData(value);
      console.log(value,'gggggggggggggg');
       console.log();
    // return (
    //   <ul className="events" style={{marginTop: '10px'}}>
    //     {listData && listData.map((item) => (
    //       <li key={item.spaceStatusId}>
    //         {/* <Badge status={item.type} text={item.content} /> */}
    //         <div>
    //           <Tag className="eventText" style={{borderRadius: '20px', border: ' 0.4px solid green',
    //             fontSize: '10px',
    //             background: 'rgba(0, 249, 184, 0.08)',
    //             lineHeight: '16px',
    //             color:'blue',
    //             height: '15px',
    //             width: '90%',
    //             paddingLeft: '20%'}}>{item.vehicleNumber}</Tag>
    //           <Tag style={{borderRadius: '20px', border: ' 0.4px solid #DEE2E9',
    //             fontSize: '10px',
    //             background: '#fff',
    //             lineHeight: '16px',
    //             height: '15px',
    //             width: '90%'}}>
    //           </Tag>
    //         </div>
    //       </li>
    //     ))}
    //     {listData.length === 0 &&
    //     <div>
    //       <Tag style={{borderRadius: '20px', border: ' 0.4px solid #DEE2E9',
    //         fontSize: '10px',
    //         background: '#fff',
    //         lineHeight: '16px',
    //         height: '15px',
    //         width: '90%',
    //       }}></Tag>
    //       <Tag style={{borderRadius: '20px', border: ' 0.4px solid #DEE2E9',
    //         fontSize: '10px',
    //         lineHeight: '16px',
    //         background: '#fff',
    //         height: '15px',
    //         width: '90%',
    //       }}></Tag>
    //     </div>}
    //   </ul>
    // );
    }
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
      <Row className='orderCalendarAsWho2'>
        <Col span={2}offset={2}>
          <DayNightColumns/>
        </Col>
        <Col span={12}>
          <Calendar
            style={{height: '500px'}}
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
            dateCellRender={dateCellRender}
            // validRange={[dayjs(props.params.startDate), dayjs(props.params.endDate)]}
            locale={calendarLocale}
            // monthCellRender={monthCellRender}
          />
        </Col>
        <Divider type="vertical" style={{
          height: '542px ',
          width: '1px',
          marginTop: '20px',
        }}/>
        <Col span={7} offset={0}>
          <Row style={{marginTop: '40px'}} >
            <Col span={10} offset={1}>
              <p style={{color: '#0013D4', fontSize: '20px', fontWeight: '700'}}>{orderData && orderData.vehicleNumber}</p>
              <p style={{fontWeight: '400', fontSize: '10px'}}>{orderData && orderData.vehicleMaker, orderData && orderData.vehicleColor, orderData && orderData.vehicleModel}</p>
            </Col>
          </Row>
          {orderData && orderData.totalAtDay > 0 && orderData.totalAtNight === 0 && orderData.totalAllDay === 0 &&
          <div>
            <Row style={{marginTop: '20px'}}>
              <Col offset={2}><p style={{color: '#A2A4AA'}}>Өдөр (09:00- 19:00)</p></Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
              <Col offset={1} span={10}>
                <div style={{borderRadius: '8px', border: '1px solid #DEE2E9'}}>
                  <p style={{paddingLeft: '10px', paddingTop: '10px', color: '#0013D4', fontWeight: '400', fontSize: '12px'}}>Эхлэх хугацаа</p>
                  <p style={{paddingLeft: '10px', paddingBottom: '10px', color: '#141A29', fontWeight: '400', fontSize: '16px'}}>{orderData && orderData.startDateTime}</p>
                </div>
              </Col>
              <Col offset={1} span={10}>
                <div style={{borderRadius: '8px', border: '1px solid #DEE2E9'}}>
                  <p style={{paddingLeft: '10px', paddingTop: '10px', color: '#0013D4', fontWeight: '400', fontSize: '12px'}}>Дуусах хугацаа</p>
                  <p style={{paddingLeft: '10px', paddingBottom: '10px', color: '#141A29', fontWeight: '400', fontSize: '16px'}}>{orderData && orderData.endDateTime}</p>
                </div>
              </Col>
            </Row>
            <Row style={{marginTop: '20px'}}>
              <Col offset={2}>
                <p style={{color: '#35446D', fontSize: '14px', lineHeight: '24px', fontWeight: '700'}}>Нийт захиалга</p>
              </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
              <Col offset={1}>
                <img src='/icons/brightness_5_24px.png' height={18} width={18} style={{paddingTop: '2px'}}/>
              </Col>
              <Col offset={1}>
                <p style={{color: '#35446D', fontSize: '14px', lineHeight: '24px', fontWeight: '700'}}> Өдөр {orderData && orderData.totalAtDay}</p>
              </Col>
            </Row>
          </div>}
          {orderData && orderData.totalAtNight > 0 && orderData.totalAtDay === 0 && orderData.totalAllDay === 0 &&
          <div>
            <Row style={{marginTop: '20px'}}>
              <Col offset={2}><p style={{color: '#A2A4AA'}}>Шөнө (19:00- 08:00)</p></Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
              <Col offset={1} span={10}>
                <div style={{borderRadius: '8px', border: '1px solid #DEE2E9'}}>
                  <p style={{paddingLeft: '10px', paddingTop: '10px', color: '#0013D4', fontWeight: '400', fontSize: '12px'}}>Эхлэх хугацаа</p>
                  <p style={{paddingLeft: '10px', paddingBottom: '10px', color: '#141A29', fontWeight: '400', fontSize: '16px'}}>{orderData && orderData.startDateTime}</p>
                </div>
              </Col>
              <Col offset={1} span={10}>
                <div style={{borderRadius: '8px', border: '1px solid #DEE2E9'}}>
                  <p style={{paddingLeft: '10px', paddingTop: '10px', color: '#0013D4', fontWeight: '400', fontSize: '12px'}}>Дуусах хугацаа</p>
                  <p style={{paddingLeft: '10px', paddingBottom: '10px', color: '#141A29', fontWeight: '400', fontSize: '16px'}}>{orderData && orderData.endDateTime}</p>
                </div>
              </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
              <Col offset={2}>
                <p style={{color: '#35446D', fontSize: '14px', lineHeight: '24px', fontWeight: '700'}}>Нийт захиалга</p>
              </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
              <Col offset={1}>
                <img src='/icons/brightness_3_24px.png' height={18} width={18} style={{paddingTop: '2px'}}/>
              </Col>
              <Col offset={1}>
                <p style={{color: '#35446D', fontSize: '14px', lineHeight: '24px', fontWeight: '700'}}> Шөнө {orderData && orderData.totalAtNight}</p>
              </Col>
            </Row>
          </div>}
          {orderData && orderData.totalAllDay > 0 && orderData.totalAtDay === 0 && orderData.totalAtNight === 0 &&
          <div>
            <Row style={{marginTop: '20px'}}>
              <Col offset={2}><p style={{color: '#A2A4AA'}}>Бүтэн өдөр (09:00- 08:30)</p></Col>
            </Row>
            <Row>
              <Col offset={1} span={10}>
                <div style={{borderRadius: '8px', border: '1px solid #DEE2E9'}}>
                  <p style={{paddingLeft: '10px', paddingTop: '10px', color: '#0013D4', fontWeight: '400', fontSize: '12px'}}>Эхлэх хугацаа</p>
                  <p style={{paddingLeft: '10px', paddingBottom: '10px', color: '#141A29', fontWeight: '400', fontSize: '16px'}}>{ orderData.startDateTime}</p>
                </div>
              </Col>
              <Col offset={1} span={10}>
                <div style={{borderRadius: '8px', border: '1px solid #DEE2E9'}}>
                  <p style={{paddingLeft: '10px', paddingTop: '10px', color: '#0013D4', fontWeight: '400', fontSize: '12px'}}>Дуусах хугацаа</p>
                  <p style={{paddingLeft: '10px', paddingBottom: '10px', color: '#141A29', fontWeight: '400', fontSize: '16px'}}>{orderData && orderData.endDateTime}</p>
                </div>
              </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
              <Col offset={2}>
                <p style={{color: '#35446D', fontSize: '14px', lineHeight: '24px', fontWeight: '700'}}>Нийт захиалга</p>
              </Col>
              <Row style={{marginTop: '10px'}}>
                <Col offset={1}>
                  <img src='/icons/brightness_4_24px.png' height={18} width={18} style={{paddingTop: '2px'}}/>
                </Col>
                <Col offset={1}>
                  <p style={{color: '#35446D', fontSize: '14px', lineHeight: '24px', fontWeight: '700'}}> Бүтэн өдөр {orderData && orderData.totalAllDay}</p>
                </Col>
              </Row>
            </Row>
          </div>}
          {(orderData && (orderData.totalAllDay > 0 && orderData.totalAtDay > 0 && orderData.totalAtNight === 0) ||
           (orderData&& orderData.totalAllDay > 0 && orderData.totalAtDay === 0 && orderData.totalAtNight > 0) ||
           (orderData&& orderData.totalAllDay === 0 && orderData.totalAtDay > 0 && orderData.totalAtNight > 0) ||
           (orderData&& orderData.totalAllDay > 0 && orderData.totalAtDay > 0 && orderData.totalAtNight > 0)) ?
          <div>
            <Row style={{marginTop: '20px'}}>
              <Col offset={2}><p style={{color: '#A2A4AA'}}>Сул цагийн захиалга </p></Col>
            </Row>
            <Row>
              <Col offset={1} span={10}>
                <div style={{borderRadius: '8px', border: '1px solid #DEE2E9'}}>
                  <p style={{paddingLeft: '10px', paddingTop: '10px', color: '#0013D4', fontWeight: '400', fontSize: '12px'}}>Эхлэх хугацаа</p>
                  <p style={{paddingLeft: '10px', paddingBottom: '10px', color: '#141A29', fontWeight: '400', fontSize: '16px'}}>{orderData && orderData.startDateTime}</p>
                </div>
              </Col>
              <Col offset={1} span={10}>
                <div style={{borderRadius: '8px', border: '1px solid #DEE2E9'}}>
                  <p style={{paddingLeft: '10px', paddingTop: '10px', color: '#0013D4', fontWeight: '400', fontSize: '12px'}}>Дуусах хугацаа</p>
                  <p style={{paddingLeft: '10px', paddingBottom: '10px', color: '#141A29', fontWeight: '400', fontSize: '16px'}}>{orderData && orderData.endDateTime}</p>
                </div>
              </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
              <Col offset={2}>
                <p style={{color: '#35446D', fontSize: '14px', lineHeight: '24px', fontWeight: '700'}}>Нийт захиалга</p>
              </Col>
            </Row>
            <Row>
              <Col span={6} offset={2}>
                <div style={{display: 'flex'}}>
                  <img src='/icons/brightness_5_24px.png'/>
                  <div  style={{marginLeft:'10px'}}>{orderData && orderData.totalAtDay} Өдөр</div>
                </div>
              </Col>
              <Col span={6}>
                <div style={{display: 'flex'}}>
                  <img src='/icons/brightness_3_24px.png'/>
                  <div style={{marginLeft:'10px'}}>{orderData && orderData.totalAtNight}  Шөнө</div>
                </div>
              </Col>
              <Col>
                <div style={{display: 'flex'}}>
                  <img src='/icons/brightness_4_24px.png'/>
                  <div  style={{marginLeft:'10px'}}>{orderData && orderData.totalAllDay}  Бүтэн өдөр</div>
                </div>
                
                </Col>
            </Row>
          </div>:null}
          {/* } */}
          {orderData && orderData.bookingStatus !== 'SPACE_OWNER_DECISION' &&
            <div>
              <Row style={{padding: '20px 10px'}}>
                <Col offset={2} span={20} style={{background: 'rgba(222, 226, 233, 0.2)', borderRadius: '24px', padding: '13px 23px', display: 'inline-flex', textAlign: 'center', justifyContent: 'center'}}>
                  <div style={{color: '#0013D4', fontWeight: 'bold', fontSize: '14px'}}>Захиалгын дэлгэрэнгүй харах</div>
                  <div style={{marginLeft: '40px'}}>
                    {!seemoreUpDownArrow ?
                      <DownOutlined onClick={() => setSeemoreUpDownArrow(true)} /> :
                      <UpOutlined onClick={() => setSeemoreUpDownArrow(false)} />
                    }
                  </div>
                </Col>
              </Row>

              <Row>
                <Col offset={2} span={20}>
                  {seemoreUpDownArrow ?
                    <div>
                      {orderData.bookingDetail && orderData.bookingDetail ?
                        orderData.bookingDetail.map((book, key) => (
                          <div key={key}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                              <div>
                                <div style={{color: '#0013D4', fontSize: '12px'}}>
                                                                    Эхлэх
                                </div>
                                <div>
                                  {Helper.removeSec(book.startDate)}
                                </div>
                              </div>
                              <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                                <img
                                  width={24}
                                  src={'/images/icon/arrow_right_alt_24px.png'}
                                />
                              </div>
                              <div>
                                <div style={{color: '#0013D4', textAlign: 'right', fontSize: '12px'}}>
                                                                    Дуусах
                                </div>
                                <div>
                                  {Helper.removeSec(book.endDate)}
                                </div>
                              </div>
                            </div>
                            <Divider/>
                          </div>
                        )) :
                        null}
                    </div> :
                    null
                  }
                </Col>
              </Row>
            </div>}
          {orderData && orderData.bookingStatus === 'SPACE_OWNER_DECISION' &&
          <div>
            <Row style={{marginTop: '10px'}}>
              <Col offset={3} span={18} style={{display: 'flex', height: '50px', background: ' rgba(222, 226, 233, 0.2)', paddingTop: '15px', borderRadius: '20px', paddingLeft: '50px'}}>
                <div style={{color: '#0013D4', fontWeight: 'bold', fontSize: '14px'}}>Хүсэлттэй өдрүүдийг харах</div>
                <div style={{marginLeft: '40px'}}>
                  {!seemoreUpDownArrow ?
                    <DownOutlined onClick={() => setSeemoreUpDownArrow(true)} /> :
                    <UpOutlined onClick={() => setSeemoreUpDownArrow(false)} />
                  }
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={18} offset={3}>
                {seemoreUpDownArrow ?
                  <div>
                    {requestedData ?
                      requestedData.map((book) => (
                        <div key={book.date} style={{border: '1px solid gray', borderRadius: '8px', marginTop: '8px'}}>
                          <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
                            <div style={{width: '50%'}}>
                              <div style={{color: '#0013D4', fontSize: '12px'}}>
                                {Helper.formatDatetimeValue(book.date)}
                              </div>
                              <div>
                                {book && book.timeSplitDescription === 'DAY' && <div style={{fontSize: '11px', color: '#141A29', fontWeight: '500', font: 'roboto', lineHeight: '16px', fontStyle: 'normal'}}>Өдөр /09:00-18:30/ </div>}
                              </div>
                            </div>
                            <div>
                              <CloseOutlined className={ book &&! book.ownerDecision ? 'requestDelete':'requestDeleteNone'} onClick={()=>setRequestedState(book.date, false) }/>
                            </div>
                            <div style={{paddingRight: '20px'}}>
                              <CheckOutlined className={book && book.ownerDecision ?'requestConfirm':'requestConfirmNone'} onClick={()=>setRequestedState(book.date, true)}/>
                            </div>

                          </div>
                          {/* <Divider/> */}
                        </div>
                      )) :
                      null}
                  </div> :
                  null
                }
              </Col>
            </Row>
          </div>}
          <Row style={{marginTop: '20px'}}>
            <Col offset={1}>
              <p style={{color: '#141A29', fontWeight: '700', fontSize: '14px', lineHeight: '24px'}}>Нийт захиалгын төлбөр</p>
            </Col>
          </Row>
          <Row >
            <Col offset={1}>
              <p style={{color: '#141A29', fontWeight: '700', fontSize: '16px', lineHeight: '24px'}}>{orderData && orderData.totalPrice}₮</p>
            </Col>
          </Row>
          {orderData && orderData.bookingStatus === 'SPACE_OWNER_DECISION' &&
          <div>
            <Row style={{width: '100%'}}>
              <Col offset={2} span={20} style={{display: 'flex', height: '50px', marginTop: '20px', background: ' rgba(255, 2, 102, 0.08)', paddingTop: '15px', borderRadius: '8px', justifyContent: 'center'}}>
                <div style={{color: '#C6231A', fontWeight: 'bold', fontSize: '16px', alignItems: 'center', cursor: 'pointer'}} onClick={onClickCancelRequested}>Хүсэлт цуцлах</div>
              </Col>
            </Row>
            <Row >
              <Col span={20} offset={2} style={{marginTop: '20px'}}>
                <Button disabled type='primary' style={{fontSize: '16px', height: '50px', fontWeight: 'bold', alignItems: 'center', width: '100%'}}>Хүсэлт баталгаажуулах</Button>
              </Col>
            </Row>
          </div>}
          {orderData && orderData.vehicleNumber ? (
            <Row style={{marginTop: '20px'}}>
              <Col style={{borderRadius: '8px', border: 'solid 1px #0013D4', display: 'flex', alignItems: 'center'}} offset={1}>
                <div style={{padding: '20px'}}>
                  <img
                    width={24}
                    src={'/images/icon/directions_car.png'}></img>
                </div>
                <div style={{paddingRight: '20px'}}>
                  <div style={{color: '#000000'}}>{orderData && orderData.vehicleMaker, orderData.vehicleModel},</div>
                  <div style={
                    {
                      color: '#0013D4',
                      fontFamily: 'Roboto-Bold',
                      textTransform: 'uppercase',
                    }
                  }><b>{ orderData && orderData.vehicleNumber}</b></div>
                </div>
              </Col>
            </Row>
          ) : null}
          {
            orderData && orderData.bookingStatus === 'CANCELLED' &&
            orderData.wallets.length > 0 &&
            orderData.wallets.map((item)=>(
              <Row style={{marginTop: '20px'}} key={item.walletId}>
                <Col offset={2}>
                  <p style={{color: '#C6231A', fontSize: '14px', fontWeight: '700', paddingTop: '5px'}}>
                Захиалга цуцлалт {item.walletId}
                  </p>
                </Col>
                <Col offset={2}>
                  <Button style={{width: '100%', height: '32px', borderRadius: '10px', background: 'rgba(3, 54, 255, 0.08)', width: '98px'}}
                    onClick={()=>onClickSeeCanceledBooking(item.walletId)}>харах</Button>
                </Col>
              </Row>
            ))
          }
          {orderData && orderData.bookingStatus ==='CONFIRMED'&&
            <Row style={{marginTop: '20px'}}>
              <Col offset={1} span={22} style={{height: '50px'}}>
                <Button style={{width: '100%', height: '50px', background: 'rgba(255, 2, 102, 0.08)', borderRadius: '8px', color: '#C6231A',
                  fontWeight: '500', fontSize: '16px'}} onClick={()=>setIsVisibleTsutslah1(true)}>Захиалга цуцлах</Button>
              </Col>
            </Row>
          }
        </Col>
      </Row>

      <Modal title={<div style={{color: '#C6231A', fontWeight: '700', fontSize: '20px', marginLeft: '20px'}}>
        Захиалга цуцлах</div>
      } visible={isVisibleTsutslahPage1}
      onOk={handleOkCancelOrder}
      onCancel={handleCancelCancelOrder}
      footer={[
        <Button key="back" type="primary" size="large" onClick={handleClickCancelOrderContinue} block style={{borderRadius: '10px'}}>
                    Үргэлжлүүлэх
        </Button>,
      ]}>
        <Row style={{color: '#35446D', fontWeight: '700', fontSize: '14px', lineHeight: '24px'}}>
            Цуцлах захиалгын эхлэх өдрийг сонгоно уу
        </Row>
        <CustomCalendar style={{marginTop: '10px'}} selectedDate={selectedDate} selectType="multi" getSelectedDate={getSelectedDate} fromDate={orderData && orderData.bookingDetail} />
        <div style={{fontWeight: 'bold', fontSize: '14px', color: '#141A29', marginTop: '30px'}}>
              Таны цуцлах захиалга:
        </div>
        <div>
          {fromSelectedDate && fromSelectedDate.length > 0 ?
            moment(fromSelectedDate).format('YYYY-MM-DD HH:mm:ss') + ' хойшхи захиалга цуцлагдана!' :
            null}
        </div>
        <Row style={{fontSize: '14px', color: '#35446D', marginTop: '10px'}}>
          <Col span={8}>
            <div style={{display: 'flex'}}>
              <img
                width={24}
                height={24}
                src={'/images/icon/brightness_5_24px.png'}/><p style={{marginLeft: '10px'}}> Өдөр
                {orderData && orderData.totalAtDay ?'  ' + orderData.totalAtDay : 0}
              </p>
            </div></Col>
          <Col span={8}> Шөнө: &nbsp;
            {orderData && orderData.totalAtNight ? orderData.totalAtNight : 0}</Col>
          <Col span={8}> Бүтэн өдөр: &nbsp;
            { orderData && orderData.totalAtDay ? orderData.totalAllDay : 0}</Col>
        </Row>
        <Divider />
        <Row style={{fontWeight: 'bold', fontSize: '14px', color: '#141A29', marginTop: '30px'}}>
          <Col span={12}>Нийт цуцлах захиалгын төлбөр:</Col>
          <Col span={12} style={{textAlign: 'right'}}>{orderData && orderData.totalPrice ? Helper.formatValueReverse(orderData.totalPrice) : 0}₮</Col>
        </Row>
      </Modal>
      <Modal title={<div style={{color: '#C6231A', fontWeight: 'bold', fontSize: '20px'}}>Захиалга цуцлах</div>} visible={isModalVisibleCancelOrderConfirm} onOk={handleOkCancelOrderConfirm} onCancel={handleCancelCancelOrderConfirm} footer={null}>
        <Row>
          <Col span={12} style={{color: '#141A29', height: '24px', fontSize: '16px'}}>Нийт цуцлах захиалгын төлбөр</Col>
          <Col span={12} style={{color: '#0013D4', height: '24px', fontSize: '16px', fontWeight: 'bold', textAlign: 'right'}}>{cancelData && cancelData.totalPrice}₮</Col>
        </Row>
        {/* <Row style={{marginTop: '10px'}}>
          <Col span={12} style={{color: '#141A29', height: '24px', fontSize: '16px'}}>Захиалга цуцалсны шимтгэл</Col>
          <Col span={12} style={{color: '#C6231A', height: '24px', fontSize: '16px', fontWeight: 'bold', textAlign: 'right'}}>₮</Col>
        </Row> */}
        <Divider />
        <Row>
          <Col span={12} style={{color: '#141A29', height: '24px', fontSize: '16px'}}>Буцаалт</Col>
          <Col span={12} style={{color: '#0013D4', height: '24px', fontSize: '16px', fontWeight: 'bold', textAlign: 'right'}}>{cancelData && cancelData.returnAmount}₮</Col>
        </Row>
        <Row>
          <Col style={{color: '#35446D', fontWeight: '700', fontSize: '14px', marginTop: '20px'}}>Цуцлалтын бодлого</Col>
        </Row>
        <Row>
          {
            cancelData ?
              <div>{renderHTML(cancelData.cancelPolicy)}</div>:
              <div>null</div>}

        </Row>

        <Form
          name="basic"
          onFinish={onFinishPolicy}
          onSubmit={handleSubmitPolicy}
        >
          <Row className="ant-row demo-row" style={{marginTop: '20px'}}>
            <Col span={18} offset={3}>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('Зөвшөөрнө үү')),
                  },
                ]}
              >
                <Checkbox style={{color: '#141A29', fontWeight: '400', fontSize: '16px'}} value={true} onClick={(e)=>{
                  if (checkValue === false) {
                    setChechValue(true);
                    console.log(checkValue);
                  } else {
                    setChechValue(false);
                    console.log(checkValue);
                  }
                }}>
                    Цуцлалтын бодлого зөвшөөрөх
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item >
                <Button
                  // loading={loading}
                  htmlType="submit"
                  style={{width: '100%'}}
                  type={checkValue ? 'primary' :'none'}
                  size="large"
                  className="loginBtn"
                >
                              Цуцлах хүсэлт илгээх
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal visible={isConfirmVisible} width={300} footer={null} className='warningModal'>
        <Row>
          <Col span={2} offset={10} className='warningIcon'>
            <InfoCircleOutlined size='large'/>
            {/* <CheckOutlined /> */}
          </Col>
        </Row>
        <Row>
          <Col span={18} offset={6}>
            <p style={{color: '#F8DB6F', fontSize: '24px'}}>Анхааруулга</p>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col>
            <p style={{textAlign: 'center'}}>
          Нэхэмжлэлийн дүнг төлж барагдуулснаар таны цуцлалт амжилттай болно.
            </p>
          </Col>
        </Row>
        <Row style={{marginTop: '10px'}}>
          <Col span={10} >
            <Button style={{width: '100%', borderRadius: '8px', color: '#0013D4', fontWeight: '700',
            }} type='none' onClick={()=>{
              setIsConfirmVisible(false);
              router.push('/park/profile/order');
            }}>Буцах</Button>
          </Col>
          <Col span={10} offset={3}>
            <Button style={{width: '100%', borderRadius: '8px'}} type='primary' onClick={()=>{
              setIsConfirmVisible(false);
              router.push('/park/profile/order');
            }}>Нэхэмжлэл төлөх</Button>
          </Col>
        </Row>
      </Modal>
      <Modal visible={seeCanceledBooking} footer={null}
        headStyle={{backgroundColor: 'red'}}
        className='tureesModal'
        onCancel={()=>setSeeCanceledBooking(false)}
        title={<div><b>Захиалга цуцлалтын мэдээлэл</b></div>}>
        <div>
          <Row className=" flex justify-between">
            <Col><p><b>Нийт цуцлах захиалгын төлбөр:</b></p></Col>
            <Col><p><b>{modalData && modalData.total }</b></p></Col>
          </Row>
          <Divider />
          <p className=" text-[14px] font-bold">Таны цуцлах захиалга:</p>
          <p className=" text-[12px] text-[#35446D]">{modalData && modalData.startDate} хойшхи захиалга цуцлагдсан. </p>
          <Row style={{marginTop: '10px'}}>
            {modalData != null ? <Col style={{display: 'flex', justifyItems: 'space-between'}} span={6}>
              <img src="../../../icons/brightness_5_24px.png" height={18} width={18} />
              <p style={{color: '#35446D', fontSize: '14px', marginLeft: '10px'}} >Өдөр  {modalData.day}</p>
            </Col> : null}

            {modalData != null ? <Col style={{display: 'flex', marginLeft: '40px'}} span={6}>
              <img src="../../../icons/brightness_3_24px.png" height={18} width={18}/>
              <p style={{color: '#35446D', fontSize: '14px', marginLeft: '10px'}}>Шөнө  {modalData.night}</p>
            </Col> : null}
            {modalData != null ? <Col style={{display: 'flex', marginLeft: '40px'}} span={6}>
              <img src="../../../icons/brightness_4_24px.png"height={18} width={18} />
              <p style={{color: '#35446D', fontSize: '14px', marginLeft: '10px'}}>Бүтэн өдөр  {modalData.fullDay}</p>
            </Col> : null}
          </Row>
          <Divider />
          <p className=" text-[14px] text-[#141A29] font-bold">Захиалга цуцлалтын шимтгэл</p>

          <div className="flex justify-between">
            <div>Нийт буцаалтын төлбөр </div>
            <div className=" text-[14px] font-bold text-[#141A29]">{modalData && modalData.cancelTotal}₮</div>
          </div>
          <Divider />
          <p className="text-[#141A29] font-bold">Буцаалтын төлбөр</p>
          <p className=" text-[12px] text-[#35446D]">Буцаалтын төлбөр нь цуцлалтын бодлогын дагуу олгогдоно. </p>
          <div className="flex justify-between">
            <div className="flex  justify-between">
              <div className=" mt-1 mr-[10px]"><img src="../../../icons/confirm.png" /></div>
              <div>Захиалга цуцлалт </div>
            </div>
            <div className=" text-[#647189]">{modalData && modalData.walletCreatedDate}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex  justify-between">
              <div className=" mt-1 mr-[10px]"><img src="../../../icons/time.png" /></div>
              <div>Буцаалт </div>
            </div>
            {modalData != null && modalData.walletIsActive ? <div className=" text-[#647189]" >{modalData.walletUpdatedDate}</div> : <div className=" text-[#647189]">Хүлээгдэж байна</div>}
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default booking;
