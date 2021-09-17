import {Row, Col, Button, Calendar, Tag, Modal, Divider, Form, Checkbox} from 'antd';
import Link from 'next/link';
import {LeftOutlined, RightOutlined, DownOutlined, UpOutlined, InfoCircleOutlined} from '@ant-design/icons';
import {useState, useEffect} from 'react';
import {callGet, callPost} from '@api/api';
// import Image from 'next/image';
import {calendarLocale} from '@constants/constants';
import DayNightColumns from '@components/DayNightColumns';
import renderHTML from 'react-render-html';
import Helper from '@utils/helper';
import moment from 'moment';
import CustomCalendar from '@components/orderEditCalendar/index';
moment.updateLocale('mn', {
  months: ['Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар', 'Зургаадугаар сар', 'Долоодугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар', 'Арван нэгдүгээр сар', 'Арван хоёрдугаар сар'],
});
moment.updateLocale('mn', {
  weekdaysMin: ['НЯМ', 'ДАВ', 'МЯГ', 'ЛХА', 'ПҮР', 'БАА', 'БЯМ'],
});

const booking = (props)=>{
  console.log(props, 'props');
  const [current, setCurrent]= useState(parseInt(moment().format('M')));
  // eslint-disable-next-line no-unused-vars
  const [calendarData, setCalendarData]= useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isVisibleTsutslahPage1, setIsVisibleTsutslah1]=useState(false);
  const [isModalVisibleCancelOrderConfirm, setIsModalVisibleCancelOrderConfirm] = useState(false);
  const [fromSelectedDate, setFromSelectedDate]= useState();
  const [orderData, setOrderData]= useState({});
  const [bookingId, setBookingId]= useState();
  const [cancelData, setCancelData]= useState();
  const [checkValue, setChechValue] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible]=useState(false);
  const [seemoreUpDownArrow, setSeemoreUpDownArrow] = useState(false);
  const [seeCanceledBooking, setSeeCanceledBooking] =useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedDate, setSelectedDate] = useState([]);

  useEffect( async ()=>{
    const res = await callGet(`/booking/id/test?id=${props.orderId}&asWho=2`);
    setBookingId(props.orderId);
    console.log(res, 'gggggg');
    setOrderData(res);
  }, []);
  const handleOkCancelOrder = async ()=>{
  };
  const handleOkCancelOrderConfirm = ()=>{

  };
  const handleCancelCancelOrder = ()=>{
    setIsVisibleTsutslah1(false);
  };
  const onClickSeeCanceledBooking=()=>{
    setSeeCanceledBooking(true);
  };
  const handleClickCancelOrderContinue = async ()=>{
    if (!fromSelectedDate.length) {
      showMessage(messageType.WARNING.type, defaultMsg.chooseDate);
    } else {
      // setisLoading(true);
      const formData = {
        bookingId: bookingId,
        date: fromSelectedDate,
      };
      const res = await callPost('/booking/cancelrequest', formData);
      console.log(res);
      setCancelData(res);
      setIsVisibleTsutslah1(false);
      setIsModalVisibleCancelOrderConfirm(true);
      // const res = await callPost('/booking/cancelrequest', formData);
    // const cancelBookingDto = {
    //   bookingId: bookingId,
    //   date: fromSelectedDate,
    // };
    // const res = await callPost(`/booking/cancelrequest`,)
    };
  };
  const handleCancelCancelOrderConfirm = ()=>{
    setIsModalVisibleCancelOrderConfirm(false);
  };
  const handleSubmitPolicy =(e)=>{

  };
  const onFinishPolicy = async (value)=>{
    // setIsLoading(true);
    const res = await callPost(`/booking/cancelpolicy?isAccept=${value.agreement}`);
    setIsModalVisibleCancelOrderConfirm(false);
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
        if (value.format('YYYY-MM-DD') === currentMoment.format('YYYY-MM-DD')) {
          listData.push(orderData);
        }
        currentMoment.add(1, 'days');
      }
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
            <div>
              <Tag className="eventText" style={{borderRadius: '20px', border: ' 0.4px solid green',
                fontSize: '10px',
                background: 'rgba(0, 249, 184, 0.08)',
                lineHeight: '16px',
                height: '15px',
                width: '100px',
                paddingLeft: '20px'}}>{item.vehicleNumber}</Tag>
              <Tag style={{borderRadius: '20px', border: ' 0.4px solid #DEE2E9',
                fontSize: '10px',
                background: '#fff',
                lineHeight: '16px',
                height: '15px',
                width: '100px'}}>
              </Tag>
            </div>
            {/* {calendarStatus === '2' && <Tag color='green' className="eventText">{item.bookingNumber}</Tag>}
            {calendarStatus === '3' && <Tag color='yellow' className="eventText">{item.bookingNumber}</Tag>} */}
          </li>
        ))}
        {listData.length === 0 &&
        <div>
          <Tag style={{borderRadius: '20px', border: ' 0.4px solid #DEE2E9',
            fontSize: '10px',
            background: '#fff',
            lineHeight: '16px',
            height: '15px',
            width: '100px',
          }}></Tag>
          <Tag style={{borderRadius: '20px', border: ' 0.4px solid #DEE2E9',
            fontSize: '10px',
            lineHeight: '16px',
            background: '#fff',
            height: '15px',
            width: '100px',
          }}></Tag>
        </div>}
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

      <Row className='orderCalendarAsWho2'>
        <Col span={2}offset={2}>
          <DayNightColumns/>
        </Col>
        <Col span={12} >
          <Calendar
            style={{height: '500px'}}
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
                        if (current === 12) {
                          setCurrent(1);
                          const newValue = value.clone();
                          newValue.month(parseInt(current));
                          onChange(newValue);
                        } else {
                          const newValue = value.clone();
                          newValue.month(parseInt(current+1));
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
        <Col span={6}>
          <Row style={{marginTop: '40px'}} >
            <Col span={10} offset={1}>
              <p style={{color: '#0013D4', fontSize: '20px', fontWeight: '700'}}>{orderData && orderData.vehicleNumber}</p>
              <p style={{fontWeight: '400', fontSize: '10px'}}>Toyota, Хар, Crown 200</p>
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
              <Col offset={2}><p style={{color: '#A2A4AA'}}>Бүтэн өдөр (09:00- 09:00)</p></Col>
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
          {orderData && (orderData.totalAllDay > 0 && orderData.totalAtDay > 0 && orderData.totalAtNight === 0) ||
           (orderData && orderData.totalAllDay > 0 && orderData.totalAtDay === 0 && orderData.totalAtNight > 0) ||
           (orderData && orderData.totalAllDay === 0 && orderData.totalAtDay > 0 && orderData.totalAtNight > 0) ||
           (orderData && orderData.totalAllDay > 0 && orderData.totalAtDay > 0 && orderData.totalAtNight > 0) &&
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
              <Col>
                <div style={{display: 'flex'}}>
                  <img src='/icons/brightness_5_24px.png'/>
                </div>
              </Col>
              <Col>
                <div style={{display: 'flex'}}>
                  <img src='/icons/brightness_3_24px.png'/>
                </div></Col>
              <Col>
                <div style={{display: 'flex'}}>
                  <img src='/icons/brightness_4_24px.png'/>
                </div></Col>
            </Row>
          </div>}

          <Row style={{marginTop: '10px'}}>
            <Col offset={2} span={20} style={{display: 'flex', height: '50px', background: ' rgba(222, 226, 233, 0.2)', paddingTop: '15px', borderRadius: '20px', paddingLeft: '50px'}}>
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
            <Col span={20} offset={1}>
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
                              preview={false}
                              width={24}
                              height={24}
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
          {
            orderData && orderData.bookingStatus === 'CANCELLED' &&
            <Row style={{marginTop: '20px'}}>
              <Col offset={2}>
                <p style={{color: '#C6231A', fontSize: '14px', fontWeight: '700', paddingTop: '5px'}}>
                Захиалга цуцлагдсан байна.
                </p>
              </Col>
              <Col offset={2}>
                <Button style={{width: '100%', height: '32px', borderRadius: '10px', background: 'rgba(3, 54, 255, 0.08)', width: '98px'}}
                  onClick={onClickSeeCanceledBooking}>харах</Button>
              </Col>
            </Row>
          }
          { orderData && orderData.bookingStatus ==='CONFIRMED'&&
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
                preview={false}
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
          <Col span={12} style={{color: '#0013D4', height: '24px', fontSize: '16px', fontWeight: 'bold', textAlign: 'right'}}>{Helper.formatValueReverse(10000)}₮</Col>
        </Row>
        <Row style={{marginTop: '10px'}}>
          <Col span={12} style={{color: '#141A29', height: '24px', fontSize: '16px'}}>Захиалга цуцалсны шимтгэл</Col>
          <Col span={12} style={{color: '#C6231A', height: '24px', fontSize: '16px', fontWeight: 'bold', textAlign: 'right'}}>{10000}₮</Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12} style={{color: '#141A29', height: '24px', fontSize: '16px'}}>Буцаалт</Col>
          <Col span={12} style={{color: '#0013D4', height: '24px', fontSize: '16px', fontWeight: 'bold', textAlign: 'right'}}>{90909}₮</Col>
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
                // {...tailFormItemLayout}
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
            }}>Цуцлах</Button>
          </Col>
        </Row>
      </Modal>
      <Modal visible={seeCanceledBooking} footer={null}
        headStyle={{backgroundColor: 'red'}}
        className='cancelBooking'
        title={<div >Захиалга цуцлалтын мэдээлэл</div>}>

      </Modal>
    </div>
  );
};
export default booking;
