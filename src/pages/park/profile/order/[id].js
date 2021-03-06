import {CheckOutlined, DownOutlined, LeftOutlined, UpOutlined} from '@ant-design/icons';
import {callGet, callPost} from '@api/api';
import DefaultLayout from '@components/layouts/DefaultLayout';
import QRCode from "react-qr-code";
import {showMessage} from '@utils/message';
import {useEffect, useState, useContext} from 'react';
import CustomCalendar from '@components/orderEditCalendar';
import SettingPane from '@components/settingPane/setting';
import {defaultMsg, messageType} from '@constants/constants';
import Context from '@context/Context';
import Helper from '@utils/helper';
import {Button, Carousel, Checkbox, Col, Divider, Form, Image, Input, Layout, Modal, Rate, Row, Tabs, Alert, Card} from 'antd';
import moment from 'moment';
import WalletInput from '../../../../components/WalletInput';
import WalletCard from '../../../../components/WalletCard';

import Link from 'next/link';
import {useRouter} from 'next/router';
import renderHTML from 'react-render-html';
import Booking from '@components/OrderPanes/booking';

moment.updateLocale('mn', {
  weekdaysMin: ['НЯ', 'ДА', 'МЯ', 'ЛХ', 'ПҮ', 'БА', 'БЯ'],
});

const {TabPane} = Tabs;

const {Header} = Layout;

const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
const style = {
  border: '1px solid #DEE2E9',
  borderRadius: '8px',
  padding: '5px 10px',
};

const OrderId = () => {
  const [type2, settype2] = useState('MONGOLCHAT');
  const [modalData, setModalData] = useState(null);
  const [tureeslegch, setTureeslegch] = useState(false);
  const [amount, setamount] = useState(0);
  const [formData,setFormData] = useState({
    amount: null,
    phoneNumber: null,
  });
  const [userData, setuserData] = useState(null);
  const [message, setmessage] = useState('');
  const [status, setstatus] = useState('');
  const [title, settitle] = useState('');
  const [messageShow, setmessageShow] = useState(false);

  const router = useRouter();
  const {userdata } = useContext(Context)
  const ctx = useContext(Context);
  const [phoneNumber,setphoneNumber]=useState();
  const [orderData, setOrderData] = useState({});
  const [images, setImages] = useState([]);
  const [parkingUpDownArrow, setParkingUpDownArrow] = useState(false);
  const [seemoreUpDownArrow, setSeemoreUpDownArrow] = useState(false);
  const [isModalVisibleCancelOrder, setIsModalVisibleCancelOrder] = useState(false);
  const [isModalVisibleCancelOrderConfirm, setIsModalVisibleCancelOrderConfirm] = useState(false);
  const [isModalVisibleSeePlan, setIsModalVisibleSeePlan]= useState(false);
  const [isConfirmVisible, setIsConfirmVisible]=useState(false);
  const [isUnelgeeVisible, setIsUnelgeeVisible] =useState(false);
  const [unelgeeData, setUnelgeeData] = useState([]);
  const [cancelData, setCancelData] = useState();
  const [parkingReview, setParkingReview] = useState();
  const [entranceLockReview, setEntranceLockReview] = useState();
  const [findReview, setFindReview]= useState();
  const [positionReview, setPositionReview] = useState();
  const [reviewData, setReviewData] = useState();
  const [checkValue, setChechValue]=useState(false);
  const [commentReview, setCommentReview] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [selectedDate, setSelectedDate] = useState([]);
  const [isUnelgee, setIsUnelgee]= useState(false);
  const [fromSelectedDate, setFromSelectedDate] = useState();
  const [MongolChatResultData,setMongolChatResultData]= useState();
  // eslint-disable-next-line no-unused-vars
  const [time, settime] = useState(null);
  const urlString = window.location.href;
  const params = new URL(urlString);
  const asWho = params.searchParams.get('asWho');
  const history = params.searchParams.get('history');
  const orderId = router.query.id;

  useEffect(() => {
    getData();
    // const startDate = Date.parse(orderData.startDateTime);
  }, []);

  const onChangeInput = (value) => {
    setamount(value);
  };
  const onChangeInputPhone = (value) => {
    setphoneNumber(value);
  };
  const onTureeslegch = async (id) => {
    ctx.setIsLoading(true);
    const resCancel= await callGet(`/booking/detail?id=${orderId}&walletId=${id}&asWho=${asWho}`);
    setTureeslegch(true);
    ctx.setIsLoading(false);
    setModalData(resCancel);
  };
  const onClickPaymentPending = async() => {
    if (orderData && orderData.totalPrice > 0) {
      const formData2 = {
        amount: orderData && orderData.totalPrice,
        bookingId: null,
        topUp: true,
      };
      const  formData3 ={
        amount:orderData&& orderData.totalPrice,
        phoneNumber: type2==='LENDMN'? phoneNumber : userdata.phoneNumber,
      }
      if(type2 == 'MONGOLCHAT') {
          await callPost('/mongolchat/wallet', formData3).then((res) => {
            if (res && res.code == 1000) {
              setMongolChatResultData(res);
              setmessage('Амжилттай. Нэхэмжлэх үүсгэлээ.');
              setstatus('success');
              setmessageShow(true);
              // try {
              //   const win = window.open(res.dynamic_link, '_blank');
              //   win.focus();
              // } catch (e) {
              //   settitle('Анхааруулга');
              //   setmessage('Нэхэмжлэх үүсгэхэд алдаа гарлаа');
              //   setstatus('warning');
              //   setmessageShow(true);
              // }
            } else {
              settitle('Анхааруулга');
              setmessage('Нэхэмжлэх үүсгэхэд алдаа гарлаа');
              setstatus('warning');
              setmessageShow(true);
            }
          }) }else if(type2 == 'LENDMN') {
            await callPost('/lend/qr/wallettopup', formData3).then((res) => {
              if (res.qr_string) {
                settitle('Амжилтай');
                setmessage('Амжилттай. Нэхэмжлэх үүсгэлээ.');
                setstatus('success');
                setmessageShow(true);
              } else {
                settitle('Анхааруулга');
                setmessage('Нэхэмжлэх үүсгэхэд алдаа гарлаа');
                setstatus('warning');
                setmessageShow(true);
              }
            }) }else if(type2 == 'SOCIALPAY' ){
              await callPost('/invoice', formData2).then((res) => {
                if (res && res.invoice) {
                  settitle('Амжилтай');
                  setmessage('Амжилттай. Нэхэмжлэх үүсгэлээ.');
                  setstatus('success');
                  setmessageShow(true);
                  try {
                    const win = window.open(
                      'https://ecommerce.golomtbank.com/socialpay/mn/' +
                      res.invoice,
                      '_blank',
                    );
                    win.focus();
                  } catch (e) {
                    settitle('Анхааруулга');
                    setmessage('Нэхэмжлэх үүсгэхэд алдаа гарлаа');
                    setstatus('warning');
                    setmessageShow(true);
                  }
                } else {
                  settitle('Анхааруулга');
                  setmessage('Нэхэмжлэх үүсгэхэд алдаа гарлаа');
                  setstatus('warning');
                  setmessageShow(true);
                }
              }) }  
      }
    else {
      settitle('Анхааруулга');
      setmessage('Үнийн дүн хоосон байна');
      setstatus('warning');
      setmessageShow(true);
    }
  };

  // const fetchData = async () => {
  //   await callGet(`/payment/bankinfo?bankName=${type}`).then((res) => {
  //   });
  // };
  // useEffect(() => {
  //   fetchData();
  // }, [type]);

  useEffect(()=>{
    const endDate = Date.parse(orderData.endDateTime);
    const nowDate = Date.parse(moment().format('YYYY-MM-DD HH:mm:ss'));
    if ( nowDate >= endDate ) {
      setIsUnelgee(true);
    } else {
      setIsUnelgee(false);
    }
  }, [orderData]);
  useEffect(async ()=>{
    const res = await callGet('reference/review');
    setUnelgeeData(res);
  }, [isUnelgeeVisible]);

  const onFinishPolicy = async (value)=> {
    const res = await callPost(`/booking/cancelpolicy?isAccept=${value.agreement}`);
    if (res && res.status) {
      const data =
      {
        bookingId: orderData.bookingId,
        date: moment(fromSelectedDate).format('YYYY-MM-DD'),
        returnAmount: cancelData ? cancelData.returnAmount :null,
      };
      const res2 = await callPost('/booking/cancel', data);
      if (res2.status === 'success') {
        setIsModalVisibleCancelOrderConfirm(false);
        setIsConfirmVisible(true);
      }
    } else {
    }
  };
  const onChangeComment = (e)=>{
    setCommentReview(e.target.value);
  };
  // eslint-disable-next-line no-unused-vars
  const onClickPayPayment =async (e)=>{
    ctx.setIsLoading(true);
    const paymentt = await callGet(`/payment?bookingId=${orderData.bookingId}`);
    const invokePaymentDto = {
      amountToPay: orderData.totalPrice,
      bookingId: orderData.bookingId,
      bookingNumber: orderData.bookingNumber,
    };
    const res= await callPost('/payment/bywallet', invokePaymentDto);
    if (res && res.status ==='success') {
      ctx.setIsLoading(false);
      router.push('/park/profile/order');
    }
  };
  const handleSubmitPolicy =(e)=>{

  };
  const getData = async () => {
    ctx.setIsLoading(true);
    if (history === 'true') {
      const res = await callGet(`/booking/id/history?id=${orderId}&asWho=${asWho}`);
      if (!res || res === undefined) {
        showMessage(messageType.FAILED.type, defaultMsg.dataError);
      } else {
        setOrderData(res);
        setImages([]);
        if (!Helper.isNullOrEmpty(res.imageFromGate)) {
          setImages((images) => [...images, {id: 4, path: res.imageFromGate}]);
        }
        if (!Helper.isNullOrEmpty(res.imageParkingOverall)) {
          setImages((images) => [...images, {id: 5, path: res.imageParkingOverall}]);
        }
        if (!Helper.isNullOrEmpty(res.imageResidenceGate)) {
          setImages((images) => [...images, {id: 6, path: res.imageResidenceGate}]);
        }
        if (!Helper.isNullOrEmpty(res.imageSpaceNumber)) {
          setImages((images) => [...images, {id: 7, path: res.imageSpaceNumber}]);
        }
        if (!Helper.isNullOrEmpty(res.imageSpaceNumber)) {
          setImages((images) => [...images, {id: 8, path: res.imageSpaceNumber}]);
        }
      }
      if (res && res.parkingSpaceId) {
        const review = await callGet(`/parkingspace/review?parkingSpaceId=${res.parkingSpaceId}`);
        if(review){
        setReviewData(review.content);
        }
      }
      ctx.setIsLoading(false);
    } else if (history) {
      const res = await callGet(`/booking/id/test?id=${orderId}&asWho=${asWho}`);
      if (!res || res === undefined) {
        showMessage(messageType.FAILED.type, defaultMsg.dataError);
      } else {
        setOrderData(res);
        setImages([]);
        if (!Helper.isNullOrEmpty(res.imageFromGate)) {
          setImages((images) => [...images, {id: 4, path: res.imageFromGate}]);
        }
        if (!Helper.isNullOrEmpty(res.imageParkingOverall)) {
          setImages((images) => [...images, {id: 5, path: res.imageParkingOverall}]);
        }
        if (!Helper.isNullOrEmpty(res.imageResidenceGate)) {
          setImages((images) => [...images, {id: 6, path: res.imageResidenceGate}]);
        }
        if (!Helper.isNullOrEmpty(res.imageSpaceNumber)) {
          setImages((images) => [...images, {id: 7, path: res.imageSpaceNumber}]);
        }
        if (!Helper.isNullOrEmpty(res.imageSpaceNumber)) {
          setImages((images) => [...images, {id: 8, path: res.imageSpaceNumber}]);
        }
      }
      if ( res && res.parkingSpaceId) {
        const review = await callGet(`/parkingspace/review?parkingSpaceId=${res.parkingSpaceId}`);
        setReviewData(review.content);
      }
      ctx.setIsLoading(false);
    }
  };

 
  const handleClickCancelOrder = () => {
    setIsModalVisibleCancelOrder(true);
  };
  const handleClickCancelOrderContinue =async () => {
    if (!fromSelectedDate) {
      showMessage(messageType.WARNING.type, defaultMsg.chooseDate);
    } else {
      ctx.setIsLoading(true);
      const formData = {
        bookingId: orderData.bookingId,
        date: moment(fromSelectedDate).format('YYYY-MM-DD'),
      };
      const res = await callPost('/booking/cancelrequest', formData);
      setCancelData(res);

      //
      // }
      ctx.setIsLoading(false);
      setIsModalVisibleCancelOrder(false);
      setIsModalVisibleCancelOrderConfirm(true);
    }
  };

  const handleOkCancelOrder = () => {
    setIsModalVisibleCancelOrder(false);
  };
  const handleOk = () => {
    setmessageShow(false);
  };

  const handleCancel = () => {
    setmessageShow(false);
    setTureeslegch(false);
  };

  const handleCancelCancelOrder = () => {
    setIsModalVisibleCancelOrder(false);
  };

  const handleOkCancelOrderConfirm = () => {
    setIsModalVisibleCancelOrder(false);
  };

  const handleCancelCancelOrderConfirm = () => {
    setIsModalVisibleCancelOrderConfirm(false);
  };
  const onSaveReview = async (e)=>{
    const postParkingSpaceReview = {
      parkingSpaceId: orderData.parkingSpaceId,
      reviewList: [
        {questionId: 689,
          rating: parkingReview?Number(parkingReview):0},
        {questionId: 690,
          rating:entranceLockReview? Number(entranceLockReview):0},
        {questionId: 691,
          rating:findReview? Number(findReview):0},
        {questionId: 692,
          rating:positionReview ? Number(positionReview):0},
      ],
      reviewText: commentReview?commentReview:'hooson',
    };
    const res = await callPost('/parkingspace/review', postParkingSpaceReview);
    if (res && res.status ==='success') {
      setIsUnelgeeVisible(false);
    }
  };
  const getSelectedDate = (data) =>{
    setFromSelectedDate(data);
  };

  return (
    <div>
      {asWho == 1 &&
      <DefaultLayout>
        <Layout>
          <Header style={{padding: '0px'}}>
            <Link href={{pathname: '/park/profile/order/'}} passHref>
              <Button type="primary" shape="circle" icon={<LeftOutlined />} size={'large'} />
            </Link>
            {orderData && orderData.bookingStatus === 'PENDING_PAYMENT' ?
            <span style={{fontSize: '20px', lineHeight: '24px', color: '#0013D4', marginLeft: '20px'}}>Хадгалсан захиалга</span>:
            <span style={{fontSize: '20px', lineHeight: '24px', color: '#0013D4', marginLeft: '20px'}}>Миний захиалга</span>
            }
          </Header>
          <Row className={'carousell'}>
            <Col span={12} offset={1}>
              {images && images.length > 0 ?
                <Carousel>
                  {images.map((image) => (
                    <div key={image.id}>
                      <Image
                        preview={false}
                        width={700}
                        height={468}
                        src={IMG_URL + image.path}
                      /></div>
                  ))}
                </Carousel> :
                null}
              <Row style={{marginTop: '24px'}}>
                <Col span={8} offset={0} className='OrderRate'>
                  <div className="text-[20px] flex items-center" style={{fontSize: '20px', color: '#141A29', fontWeight: '700'}}>
                    {!Helper.isNullOrEmpty(orderData.residenceName) ? orderData.residenceName : null} <Image className=" w-[15px] h-[15px] ml-[5.5px]" src="../../../images/darias_icon/checkCircle.png" /></div>
                  <div><Rate value={2}/></div>
                </Col>
                <Col span={4}offset={1}>
                  <div style={{display: 'flex', marginTop: '8px'}}>
                    <div style={{}}><img src='/directions_car_24px.png' height='16px' width='16px'/></div>
                    <p style={{marginLeft: '20px'}}>110 m</p>
                  </div>
                  <div>
                    <p>Location ID : 2134</p>
                  </div>
                </Col>
                <Col span={10} offset={1} style={{marginTop: '8px'}}>{`${orderData.province}, ${orderData.district}, ${orderData.section}, ${orderData.residenceName}, ${orderData.residenceBlockNumber}`}</Col>
              </Row>
            </Col>
            <Col span={8} offset={1}>
              <Tabs defaultActiveKey="1">
                <TabPane tab={<div style={{width:'140px',paddingLeft:'20px'}}>Танилцуулга</div>} key="1">
                  {orderData.bookingStatus === 'CONFIRMED' || orderData.bookingStatus === 'HISTORY ' ?
                    <div>
                      <Row style={{lineHeight: '24px'}}>
                        <Col span={12} style={{fontSize: '16px'}}>Байрны дугаар</Col>
                        <Col span={12} style={{color: '#0013D4', textAlign: 'right', fontWeight: 'bold'}}>{!Helper.isNullOrEmpty(orderData.residenceName) ? orderData.residenceName : null}</Col>
                      </Row>
                      <Row style={{lineHeight: '24px'}}>
                        <Col span={12} style={{fontSize: '16px'}}>Давхарын дугаар</Col>
                        <Col span={12} style={{color: '#0013D4', textAlign: 'right', fontWeight: 'bold'}}>{!Helper.isNullOrEmpty(orderData.floorNumberLabel) ? orderData.floorNumberLabel : null}</Col>
                      </Row>
                      <Row style={{lineHeight: '24px'}}>
                        <Col span={12} style={{fontSize: '16px'}}>Зогсоолын дугаар</Col>
                        <Col span={12} style={{color: '#0013D4', textAlign: 'right', fontWeight: 'bold'}}>{!Helper.isNullOrEmpty(orderData.parkingSpaceGarageNumber) ? orderData.parkingSpaceGarageNumber : null}</Col>
                      </Row>
                      <Row style={{lineHeight: '24px'}}>
                        <Col span={12} style={{fontSize: '16px'}}>Uparking дугаар</Col>
                        <Col span={12} style={{color: '#0013D4', textAlign: 'right', fontWeight: 'bold'}}>{!Helper.isNullOrEmpty(orderData.uparkingNumber) ? orderData.uparkingNumber : null}</Col>
                      </Row>
                    </div> : null
                  }
                  <Row style={{padding: '20px 10px'}}>
                    <Col span={24} style={{background: 'rgba(222, 226, 233, 0.2)', borderRadius: '24px', padding: '13px 13px', display: 'inline-flex', textAlign: 'center', justifyContent: 'center'}}>
                      {orderData && orderData.floorNumber ?
                        <div style={{marginRight: '13px'}}>
                          <Image
                            preview={false}
                            width={24}
                            src={IMG_URL + orderData.floorNumber}
                          />
                        </div> :
                        null}
                      {orderData && orderData.entranceLock ?
                        <div style={{marginRight: '13px'}}>
                          <Image
                            preview={false}
                            width={24}
                            src={IMG_URL + orderData.entranceLock}
                          />
                        </div> :
                        null}
                      {orderData && orderData.isNumbering ?

                        <div style={{marginRight: '13px'}}>
                          <Image
                            preview={false}
                            width={24}
                            src={IMG_URL + orderData.isNumbering}
                          />
                        </div> :
                        null}
                      {orderData && orderData.capacity ?

                        <div style={{marginRight: '13px'}}>
                          <Image
                            preview={false}
                            width={24}
                            src={IMG_URL + orderData.capacity}
                          />
                        </div> :
                        null}
                      {orderData && orderData.type ?

                        <div style={{marginRight: '13px'}}>
                          <Image
                            preview={false}
                            width={24}
                            src={IMG_URL + orderData.type}
                          />
                        </div> :
                        null}
                      {orderData && orderData.returnRoutes ?

                        <div style={{marginRight: '13px'}}>
                          <Image
                            preview={false}
                            width={24}
                            src={IMG_URL + orderData.returnRoutes}
                          />
                        </div> :
                        null}
                      <div>
                        {!parkingUpDownArrow ?
                          <DownOutlined onClick={() => setParkingUpDownArrow(true)} /> :
                          <UpOutlined onClick={() => setParkingUpDownArrow(false)} />
                        }
                      </div>

                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      {parkingUpDownArrow ?
                        <div>
                          {orderData && orderData.floorNumber ?
                            <div style={{marginRight: '13px', display: 'flex'}}>
                              <Image
                                preview={false}
                                width={24}
                                src={IMG_URL + orderData.floorNumber}
                              />
                              <div style={{marginLeft: '25px'}}><span>{orderData.floorNumberLabel}</span></div>
                            </div> :
                            null}
                          {orderData && orderData.entranceLock ?
                            <div style={{marginRight: '13px', display: 'flex'}}>
                              <Image
                                preview={false}
                                width={24}
                                src={IMG_URL + orderData.entranceLock}
                              />
                              <div style={{marginLeft: '25px'}}><span>{orderData.entranceLockLabel}</span></div>
                            </div> :
                            null}
                          {orderData && orderData.isNumbering ?

                            <div style={{marginRight: '13px', display: 'flex'}}>
                              <Image
                                preview={false}
                                width={24}
                                src={IMG_URL + orderData.isNumbering}
                              />
                              <div style={{marginLeft: '25px'}}><span>{orderData.isNumberingLabel}</span></div>
                            </div> :
                            null}
                          {orderData && orderData.capacity ?

                            <div style={{marginRight: '13px', display: 'flex'}}>
                              <Image
                                preview={false}
                                width={24}
                                src={IMG_URL + orderData.capacity}
                              />
                              <div style={{marginLeft: '25px'}}><span>{orderData.capacityLabel}</span></div>
                            </div> :
                            null}
                          {orderData && orderData.type ?

                            <div style={{marginRight: '13px', display: 'flex'}}>
                              <Image
                                preview={false}
                                width={24}
                                src={IMG_URL + orderData.type}
                              />
                              <div style={{marginLeft: '25px'}}><span>{orderData.typeLabel}</span></div>
                            </div> :
                            null}
                          {orderData && orderData.returnRoutes ?

                            <div style={{marginRight: '13px', display: 'flex'}}>
                              <Image
                                preview={false}
                                width={24}
                                src={IMG_URL + orderData.returnRoutes}
                              />
                              <div style={{marginLeft: '25px'}}><span>{orderData.returnRoutesLabel}</span></div>
                            </div> :
                            null}
                        </div> :
                        null
                      }
                    </Col>
                  </Row>
                  {orderData.parkingPlan &&
                <Row style={{margin: '30px 0px'}}>
                  <Col span={24}>
                    <Button className=" bg-[#0336FF14] bg-opacity-[8%] rounded-[8px] text-[#0013D4] h-[48px]" type="default" style={{width: '100%'}} onClick={()=>setIsModalVisibleSeePlan(true)}>
                        Зогсоолыг харах
                    </Button>
                  </Col>
                </Row>}
                  <div className=" text-[#A2A4AA] font-bold text-[14px] mb-[10px]">Өдөр (09:00-19:00)</div>
                  <Row gutter={16}>
                    <Col className="gutter-row" span={12} >
                      <div style={style}>
                        <div style={{color: '#0013D4'}}>Эхлэх хугацаа</div>
                        {orderData && orderData.startDateTime ?
                          <div>{Helper.removeSec(orderData.startDateTime)}</div> :
                          null}
                      </div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                      <div style={style}>
                        <div style={{color: '#0013D4'}}>Дуусах хугацаа</div>
                        {orderData && orderData.endDateTime ?
                          <div>{Helper.removeSec(orderData.endDateTime)}</div> :
                          null}
                      </div>
                    </Col>
                  </Row>
                  <Row style={{marginTop: '30px'}}>
                    <Col span={24} style={{fontWeight: 'bold', fontSize: '14px', lineHeight: '24px'}}>
                      <div style={{color: '#0013D4'}}>Нийт захиалга</div>
                      {orderData.totalAtDay ? (
                        <div style={{marginLeft: '10%', marginTop: '10px', display: 'flex', width: '80%'}}>
                          <Image
                            preview={false}
                            width={24}
                            src={'/icons/brightness_5_24px.png'}></Image>
                          <div style={{color: '#35446d', marginLeft: '10px'}}>
                                                    Өдөр {orderData.totalAtDay}
                          </div>
                          <div style={{marginLeft: '30px'}}>
                            <Image

                              preview={false}
                              width={24}
                              src={'/icons/brightness_3_24px.png'}></Image></div>
                          <div style={{color: '#35446d', marginLeft: '10px'}}>
                                                    Шөнө {orderData.totalAtNight}
                          </div>
                          <div style={{marginLeft: '30px'}}>
                            <Image
                              preview={false}
                              width={24}
                              src={'/icons/brightness_4_24px.png'}></Image></div>
                          <div style={{color: '#35446d', marginLeft: '10px'}}>
                                                    Бүтэн өдөр {orderData.totalAllDay}
                          </div>
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row style={{padding: '20px 10px'}}>
                    <Col span={24} style={{background: 'rgba(222, 226, 233, 0.2)', borderRadius: '24px', padding: '13px 23px', display: 'inline-flex', textAlign: 'center', justifyContent: 'center'}}>
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
                    <Col span={24}>
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
                                    <Image
                                      preview={false}
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
                  <Row style={{marginTop: '30px'}}>
                    <Col span={24} style={{fontWeight: 'bold', fontSize: '14px', lineHeight: '24px'}}>
                      <div style={{color: '#0013D4'}}>Тээврийн хэрэгсэл</div>
                      {orderData.vehicleNumber ? (
                        <Row style={{marginTop: '20px'}}>
                          <Col style={{borderRadius: '8px', border: 'solid 1px #0013D4', display: 'flex', alignItems: 'center'}} offset={1}>
                            <div style={{padding: '20px'}}>
                              <Image
                                preview={false}
                                width={24}
                                src={'/images/icon/directions_car.png'}></Image>
                            </div>
                            <div style={{paddingRight: '20px'}}>
                              <div style={{color: '#000000'}}>{orderData.vehicleMaker}, {orderData.vehicleModel}</div>
                              <div style={
                                {
                                  color: '#0013D4',
                                  fontFamily: 'Roboto-Bold',
                                  textTransform: 'uppercase',
                                }
                              }>{orderData.vehicleNumber}</div>
                            </div>
                          </Col>
                        </Row>
                      ) : null}
                    </Col>
                  </Row>
                  {(() => {
                    if (orderData.bookingStatus === 'CONFIRMED' && !isUnelgee) {
                      return (
                        <Row style={{margin: '30px 0px'}}>
                          <Col span={24}>
                            <Button className="bg-[#FF026614] bg-opacity-[8%] text-[#C6231A] rounded-[8px]  h-[48px]" size={'large'} style={{width: '100%'}} onClick={handleClickCancelOrder}>
                                                    Захиалга цуцлах
                            </Button>
                          </Col>
                        </Row>
                      );
                    } else if (orderData.bookingStatus === 'PENDING_PAYMENT') {
                      return (
                        <div>
                          <Divider />
                          <Row style={{marginTop: '30px'}}>
                            <Col span={12} style={{fontWeight: 'bold', fontSize: '14px', lineHeight: '24px'}}>
                              <div >Нийт захиалгын төлбөр:</div>
                            </Col>
                            <Col span={12} style={{fontWeight: 'bold', fontSize: '14px', lineHeight: '24px', textAlign: 'right', fontSize: '20px'}}>
                              {orderData.totalPrice ? Helper.formatValueReverse(orderData.totalPrice) : 0}
                                                        ₮
                            </Col>
                          </Row>
                          <Row style={{margin: '30px 0px'}}>
                            <Col span={24} >
                              <Tabs defaultActiveKey="1" style={{width: '100%'}}>
                                <TabPane tab={
                                  <div style={{width: '200px', paddingLeft: '80px'}}>Хэтэвч</div>
                                } key="1">
                                  <div className=" ml-[24px]"> <WalletCard /></div>
                                  <Row style={{marginTop: '35px'}}>
                                    <Col span={24}>
                                      <Button className="w-[372px] rounded-[8px]" type="primary" size={'large'} onClick={onClickPayPayment}>
                                        Төлөх
                                      </Button>
                                    </Col>
                                  </Row>
                                </TabPane>
                                <TabPane tab={<div style={{width: '200px', paddingLeft: '80px'}}>Нэхэмжлэх</div>} key="2">
                                  <div>
                                    <Tabs centered defaultActiveKey="1">
                                      <TabPane
                                        tab={
                                          <span
                                            onClick={() => {
                                              settype2('MONGOLCHAT');
                                            }}
                                          >
                                            <Image
                                              height={30}
                                              width={30}
                                              preview={false}
                                              src="../../../images/icon/mongolChat.png"
                                            />
                                          </span>
                                        }
                                        key="1"
                                      >
                                        <div>
                                          <WalletInput onChangeInput={onChangeInput} value={orderData.totalPrice}>
                                               Нэхэмжлэх дүн
                                          </WalletInput>
                                        </div>
                                      </TabPane>
                                      <TabPane
                                        tab={
                                          <span
                                            onClick={() => {
                                              settype2('LENDMN');
                                            }}
                                          >
                                            <Image
                                              height={30}
                                              width={30}
                                              preview={false}
                                              src="../../../images/icon/lendMn.png"
                                            />
                                          </span>
                                        }
                                        key="2"
                                      >
                                        <WalletInput onChangeInput={onChangeInputPhone} style={{fontSize: '18px'}}>
                                            Нэхэмжлэх илгээх утасны дугаар
                                        </WalletInput>
                                        <WalletInput onChangeInput={onChangeInput} value={orderData.totalPrice}>
                                            Нэхэмжлэх дүн
                                        </WalletInput>
                                      </TabPane>
                                      <TabPane
                                        tab={
                                          <span
                                            onClick={() => {
                                              settype2('SOCIALPAY');
                                            }}
                                          >
                                            <Image
                                              height={30}
                                              width={30}
                                              preview={false}
                                              src="../../../images/icon/socialPay.png"
                                            />
                                          </span>
                                        }
                                        key="3"
                                      >
                                        <WalletInput onChangeInput={onChangeInput} value={orderData && orderData.totalPrice} disabled={true}>
                                            Нэхэмжлэх дүн
                                        </WalletInput>
                                      </TabPane>
                                    </Tabs>
                                    <Button style={{height: '50px', marginTop: '10px'}} className="rounded-[8px]" onClick={onClickPaymentPending} type="primary" block>
                                          Нэхэмжлэл илгээх
                                    </Button>
                                  </div>
                                </TabPane>
                              </Tabs>
                            </Col>
                          </Row></div>
                      );
                    } else
                    if (orderData.bookingStatus === 'CANCELLED' && !isUnelgee ) {
                      return (
                        <div>
                          { orderData && orderData.wallets.length>0 &&
                          orderData.wallets.map((item)=>(
                            <Row key={item.walletId}>
                              <div className=" flex justify-between  w-full mt-[29px]">
                                <div className=" text-[#C6231A]">Захиалга цуцлагдсан байна. </div>
                                <Button className=" rounded-[8px] bg-[#0336FF] bg-opacity-[8%] text-[#0013D4] border-[#0013D4] w-[96px]" onClick={()=> onTureeslegch(item.walletId)}>Харах</Button>
                              </div>
                            </Row>
                          ))}
                        </div>);
                    } else if (orderData && orderData.bookingStatus==='CONFIRMED' && isUnelgee && !orderData.isReview) {
                      return (
                        <Col span={24} style={{marginTop: '20px'}}>
                          <Button type="primary" size={'large'} onClick={()=>{
                            setIsUnelgeeVisible(true);
                          }} style={{borderRadius: '10px', width: '100%'}}>
                          Зогсоолыг үнэлэх
                          </Button>
                        </Col>
                      )
                      ;
                    } else if (orderData && orderData.bookingStatus ==='SPACE_OWNER_DECISION') {
                      return (
                        <div style={{marginTop: '20px', color: 'red', fontSize: '16px'}}>
                          <Row>{orderData && orderData.bookingStatusDescription} </Row>
                        </div>
                      );
                    }
                  })()}
                </TabPane>
                <TabPane tab={<div style={{width:'140px',paddingLeft:'30px'}}>Үнэлгээ</div>} key="2">
                  <div>
                    {reviewData &&
                        reviewData.map((item)=>(
                          <Card key={item.id} style={{background: 'rgba(222, 226, 233, 0.2)', marginTop: '20px', borderRadius: '16px', padding: '0'}}>
                            <Row style={{padding: '0'}}>
                              <Col span={2} >
                                <div style={{borderRadius: '12px', height: '24px', width: '24px'}}>
                                  <img src={item.profileImage} height={24} width={24} style={{borderRadius: '12px'}} />
                                </div>
                              </Col>
                              <Col span={10}>
                                <div style={{fontSize: '14px', lineHeight: '24px'}}><b>{item.name}</b></div>
                                <div style={{color: '#35446D', fontSize: '12px'}}>{item.date}</div>
                              </Col>
                              <Col offset={6} className='reviewRate' style={{marginTop: '-10px'}}>
                                <Rate value={item.rating}/>
                              </Col>
                            </Row>
                            <Row>
                              <Col offset={2}>
                                <div style={{color: '#35446D', fontSize: '14px', textAlign: 'justify', marginBottom: '10px'}}>{item.text}</div>
                              </Col>
                            </Row>
                          </Card>
                        ))
                    }
                  </div>
                </TabPane>
                <TabPane tab={<div style={{width:'130px' ,paddingLeft:'20px'}}>Тусламж</div>} key="3">
                  <div className="mb-[30px]"><SettingPane /></div>
                </TabPane>
              </Tabs>
            </Col>
            {/* </Sider>
          </Col> */}
            {/* </Layout> */}
          </Row>
        </Layout>
        <Modal title={<div style={{color: '#C6231A', fontWeight: '700', fontSize: '20px', marginLeft: '20px'}}>Захиалга цуцлах</div>} visible={isModalVisibleCancelOrder} onOk={handleOkCancelOrder} onCancel={handleCancelCancelOrder} footer={[
          <Button key="back" type="primary" size="large" onClick={handleClickCancelOrderContinue} block style={{borderRadius: '10px'}}>
                    Үргэлжлүүлэх
          </Button>,
        ]}>
          <Row style={{color: '#35446D', fontWeight: '700', fontSize: '14px', lineHeight: '24px'}}>
            Цуцлах захиалгын эхлэх өдрийг сонгоно уу
          </Row>
          <CustomCalendar style={{marginTop: '10px'}} selectedDate={selectedDate} selectType="multi" getSelectedDate={getSelectedDate} fromDate={orderData.breakdown}/>

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
                <Image
                  preview={false}
                  width={24}
                  src={'/images/icon/brightness_5_24px.png'}></Image><p style={{marginLeft: '10px'}}> Өдөр
                  {orderData.totalAtDay ?'  ' + orderData.totalAtDay : 0}
                </p>
              </div></Col>
            <Col span={8}> Шөнө: &nbsp;
              {orderData.totalAtNight ? orderData.totalAtNight : 0}</Col>
            <Col span={8}> Бүтэн өдөр: &nbsp;
              {orderData.totalAtDay ? orderData.totalAllDay : 0}</Col>
          </Row>
          <Divider />
          <Row style={{fontWeight: 'bold', fontSize: '14px', color: '#141A29', marginTop: '30px'}}>
            <Col span={12}>Нийт цуцлах захиалгын төлбөр:</Col>
            <Col span={12} style={{textAlign: 'right'}}>{orderData.totalPrice ? Helper.formatValueReverse(orderData.totalPrice) : 0}₮</Col>
          </Row>
        </Modal>

        <Modal title={<div style={{color: '#C6231A', fontWeight: 'bold', fontSize: '20px'}}>Захиалга цуцлах</div>} visible={isModalVisibleCancelOrderConfirm} onOk={handleOkCancelOrderConfirm} onCancel={handleCancelCancelOrderConfirm} footer={null}>
          <Row>
            <Col span={12} style={{color: '#141A29', height: '24px', fontSize: '16px'}}>Нийт цуцлах захиалгын төлбөр</Col>
            <Col span={12} style={{color: '#0013D4', height: '24px', fontSize: '16px', fontWeight: 'bold', textAlign: 'right'}}>{Helper.formatValueReverse(orderData.totalPrice)}₮</Col>
          </Row>
          {/* <Row style={{marginTop: '10px'}}>
            <Col span={12} style={{color: '#141A29', height: '24px', fontSize: '16px'}}>Захиалга цуцалсны шимтгэл</Col>
            <Col span={12} style={{color: '#C6231A', height: '24px', fontSize: '16px', fontWeight: 'bold', textAlign: 'right'}}>{(orderData.totalPrice - orderData.returnAmount)}₮</Col>
          </Row> */}
          <Divider />
          <Row>
            <Col span={12} style={{color: '#141A29', height: '24px', fontSize: '16px'}}>Буцаалт</Col>
            <Col span={12} style={{color: '#0013D4', height: '24px', fontSize: '16px', fontWeight: 'bold', textAlign: 'right'}}>{cancelData && Helper.formatValueReverse(cancelData.returnAmount)}₮</Col>
          </Row>
          <Row>
            <Col style={{color: '#35446D', fontWeight: '700', fontSize: '14px', marginTop: '20px'}}>Цуцлалтын бодлого</Col>
          </Row>
          <Row>
            <div>{
              cancelData ?
                <div>{renderHTML(cancelData.cancelPolicy)}</div>:
                <div style={{textAlign: 'justify'}}>
                Uparking системээр дамжин хийгдсэн авто зогсоолын захиалга цуцлалтын үндсэн нөхцөл дараах бодлогын дагуу хэрэгжинэ. Энэхүү цуцлалтын бодлого нь Түрээслэгч буюу тээврийн хэрэгсэл эзэмшигч, Түрээслүүлэгч буюу авто зогсоол эзэмшигч болон Админ буюу Uparking гэх гурван талын оролцоотойгоор хэрэгжинэ.

Захиалга цуцлагч тал : ТҮРЭЭСЛҮҮЛЭГЧ

Захиалга эхлэхээс 12 цагийн өмнө захиалгыг цуцлах боломжтой. Захиалга баталгаажсан тохиолдолд цуцлах боломжгүй.

Захиалга цуцлагч тал : ТҮРЭЭСЛЭГЧ

- Түрээслүүлэгч талаас шалтгаалан зогсоол ашиглах боломжгүй болсон бүх тохиолдол төлбөр 100% буцаан олгогдоно.
- Захиалга цуцлахад урьдчилсан захиалга хэзээ өгсөнөөс болон хэдэн хоногийн цуцлалт хийхтэй холбоотой төлбөрийн буцаалт авах нь ялгаатай байна.
1. Урьдчилсан захиалга  7-с доош хоногийн өмнө өгсөн бол
                </div>}
            </div>
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
                    } else {
                      setChechValue(false);
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
        <Modal visible={isConfirmVisible} width={300} footer={null}>
          <Row>
            <Col span={2} offset={10}>
              <CheckOutlined size='large'/>
            </Col>
          </Row>
          <Row>
            <Col span={18} offset={6}>
              <p style={{color: '#76E8AA', fontSize: '24px'}}>Амжилтай</p>
            </Col>
          </Row>
          <Row>
            <Col>
          Таны 19480194 дугаартай захиалгыг цуцлах хүсэлт амжилттай илгээгдлээ.
            </Col>
          </Row>
          <Row>
            <Col span={16} offset={4}>
              <Button style={{width: '100%'}} type='primary' onClick={()=>{
                setIsConfirmVisible(false);
                router.push('/park/profile/order');
              }}>Ok</Button>
            </Col>
          </Row>
        </Modal>
        <Modal visible={isModalVisibleSeePlan} width={1000} footer={null}
          style={{borderRadius: '100px'}}
          onCancel={()=>setIsModalVisibleSeePlan(false)}>
          <div>
            <Row>
              <Col span={20} offset={1}>
                <div style={{color: '#35446D', fontSize: '20px'}}><b>Таны сонгосон захиалга</b></div>
              </Col>
            </Row>
            <Row>
              <Col ><div style={{color: '#0013D4', fontSize: '14px'}}>{orderData.residenceName}{orderData.residenceBlockNumber} байр - {orderData.floorNumberLabel}-{orderData.parkingSpaceGarageNumber}</div></Col>
            </Row>
            <Row>
              <Image src='/about_back.png'></Image>
            </Row>
          </div>
        </Modal>
        <Modal visible={isUnelgeeVisible} width={600} footer={null} style={{borderRadius: '40px'}} onCancel={()=>setIsUnelgeeVisible(false)}>
          <Row>{orderData ? <div style={{color: '#0013D4', fontSize: '20px', lineHeight: '24px', fontWeight: '700'}}>{orderData.residenceName},{orderData.floorNumberLabel}</div>:null}</Row>
          <div style={{fontSize: '10px', fontWeight: '400', lineHeight: '20px'}}>Зогсоолын үндсэн 4 үзүүлэлтээр 1-5 од өгч үнэлнэ. |1 - маш муу, 2 - муу, 3 - Дунд зэрэг, 4 - Сайн, 5 - Маш сайн|</div>
          { unelgeeData?.length > 0 ? unelgeeData.map((item)=>(
            <Row key={item.value} style={{marginTop: '20px'}}>
              <Col span={24} className='commentRate' >
                <Row style={{color: '#35446D', fontWeight: '400', fontSize: '14px'}}>{item.label}</Row>
                <Row><Rate onChange={( e)=>{
                  if (item.value === 689) {
                    setParkingReview(e);
                  } else if (item.value === 690) {
                    setEntranceLockReview(e);
                  } else if (item.value === 691) {
                    setFindReview(e);
                  } else if ( item.value=== 692) {
                    setPositionReview( e);
                  }
                }}/></Row>
              </Col>
            </Row>
          )):<Row></Row> }
          <Row style={{marginTop: '10px'}} className='commentDivider'>
            <Input placeholder='Сэтгэгдэл бичих' onChange={onChangeComment} bordered={false}/>
            <Divider/>
          </Row>
          <Row>
            <Col span={6} offset={18}>
              <Button type='primary' style={{width: '100%', borderRadius: '10px'}} onClick={onSaveReview}>Үнэлгээ илгээх</Button>
            </Col>
          </Row>
        </Modal>
        <Modal
          visible={messageShow}
          title="Мэдээлэл"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[]}
        >
          <Alert message={title} description={message} type={status} showIcon style={{padding:'20px'}}/>
          
          {type2 ==='MONGOLCHAT' && <div>
          <Row style={{marginTop:'20px'}}>
            <Col offset={5}>
              <QRCode value={MongolChatResultData && MongolChatResultData.qr}/>
            </Col>
          </Row>
          <Row> <Col offset={7}>QR-кодоо уншуулна уу?</Col></Row>
          </div>
        }
        <Row style={{marginTop:'20px'}}>
          <Col offset={8}>
            <Button style={{width:'100px'}} type='primary' onClick={()=>  setmessageShow(false)}>OK</Button>
         </Col>
        </Row>
        </Modal>
        <Modal
          visible={tureeslegch}
          title="Захиалга цуцлалтын мэдээлэл"
          onOk={handleOk}
          className="tureesModal"
          onCancel={handleCancel}
          footer={[]}
        >
          <div>
            <div className=" flex justify-between">
              <div>Нийт цуцлах захиалгын төлбөр:</div>
              <div>{modalData && modalData.total }</div>
            </div>
            <Divider />
            <p className=" text-[14px] font-bold">Таны цуцлах захиалга:</p>
            <p className=" text-[12px] text-[#35446D]">{modalData && modalData.startDate} хойшхи захиалга цуцлагдсан. </p>
            <div className="flex justify-between mr-[75px] mt-2">
              {modalData != null && modalData.day > 0 ? <div className="flex w-[84px] justify-between">
                <Image className="mt-[3px]" src="../../../icons/brightness_5_24px.png" />
                <p className=" text-[14px] text-[#35446D]">Өдөр  {modalData.day}</p>
              </div> : null}

              {modalData != null && modalData.night > 0 ? <div className="flex w-[84px] justify-between">
                <Image src="../../../icons/brightness_3_24px.png" />
                <p className=" text-[14px] text-[#35446D]">Шөнө  {modalData.night}</p>
              </div> : null}
              {modalData != null && modalData.fullDay > 0 ? <div className="flex w-[84px] justify-between">
                <Image src="../../../icons/brightness_5_24px.png" />
                <p className=" text-[14px] text-[#35446D]">Бүтэн өдөр  {modalData.fullDay}</p>
              </div> : null}
            </div>
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
                <div className=" mt-1 mr-[10px]"><Image preview={false} src="../../../icons/confirm.png" /></div>
                <div>Захиалга цуцлалт </div>
              </div>
              <div className=" text-[#647189]">{modalData && modalData.walletCreatedDate}</div>
            </div>
            <div className="flex justify-between">
              <div className="flex  justify-between">
                <div className=" mt-1 mr-[10px]"><Image preview={false} src="../../../icons/time.png" /></div>
                <div>Буцаалт </div>
              </div>
              {modalData != null && modalData.walletIsActive ? <div className=" text-[#647189]" >{modalData.walletUpdatedDate}</div> : <div className=" text-[#647189]">Хүлээгдэж байна</div>}
            </div>
          </div>
        </Modal>
      </DefaultLayout > }
      {asWho == 2 && <Booking orderId={orderId} orderData={orderData} />}
    </div>
  );
};
export default OrderId;
