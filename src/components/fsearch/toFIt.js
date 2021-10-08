import {Row, Col, Card, Button} from 'antd';
import {Rate} from 'antd';
import {Drawer, Divider} from 'antd';
import {useEffect, useState, useContext} from 'react';
import {messageType} from '@constants/constants';
import {Radio, Modal, Alert} from 'antd';
import {showMessage} from '../../utils/message';
import Context from '@context/Context';
import {useRouter} from 'next/router';

import SettingPane from '@components/settingPane/setting';
// import {Collapse} from 'antd';
const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
// const {Panel} = Collapse;
import {CloseOutlined, ArrowLeftOutlined, CheckCircleOutlined, DownOutlined, UpOutlined} from '@ant-design/icons';
// import {Pagination} from 'antd';
import {Tabs} from 'antd';
import {callGet, callPost} from '@api/api';
import CalendarView from '@components/CalendarView';
import Calendar from '@components/CustomCalendar';
import moment from 'moment';

const {TabPane} = Tabs;

// const review = [
//   {
//     id: 1,
//     proImage: '/ganbat.png',
//     user: 'ganbat.B',
//     date: '2020-10-06',
//     description: 'Энэ үнэхээр гоё зогсоол байна.Орц гарц нь их эвтэйхэн юм аа.Дараа заавал дахин захиалга өгнөө гшшш',
//     rate: 4,
//   },
//   {
//     id: 2,
//     proImage: '/ganbat.png',
//     user: 'Ariuk.D',
//     date: '2021-03-07',
//     description: 'Энэ үнэхээр гоё зогсоол байна.Орц гарц нь их эвтэйхэн юм аа.Дараа заавал дахин захиалга өгнөө гшшш',
//     rate: 3,
//   },
// ];
const callback = (key) =>{
};
const tofit = ({data, lat, lng}) => {
  // const [PickTimevisible, setPickTimeVisible] = useState(false);
  const [detailVisible, setDetailsVisible] = useState(false);
  const router =useRouter();
  // eslint-disable-next-line no-unused-vars
  const [selectItem, setSelected] = useState([]);
  const [ResidenceItem, setResidenceDrawerItem] = useState({});
  const [dayOfNumber, setDayofNumber] = useState(0);
  const [nightOfNumber, setNightOfNumber] = useState(0);
  const [fullDayNumber, setFullDayNumber] = useState(0);
  const [dayValues, setDayValues]= useState([]);
  const [nightValues, setNightValues]= useState([]);
  const [fullDayValues, setFullDayValues]= useState([]);

  const [completeFullDayNumber, setCompleteFullDayNumber] = useState(0);
  const [completeDayOfNumber, setCompleteDayOfNumber] =useState(0);
  const [completeNightOfNumber, setCompleteNightOfNumber] =useState(0);
  // eslint-disable-next-line no-unused-vars
  const [spaceStatus, setSpaceStatus]= useState();
  const [conFirmAddBookingVisible, setConfirmAddBookingVisible]= useState(false);
  // const [saleDatas, setSaleData] = useState();
  const [vehicles, setVehiclesData] = useState([]);
  const [chooseTimeVisible, setChooseTimeVisible] = useState(false);
  const [chooseTimeView, setChooseTimeView] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedDayTab, setSelectedDayTab] = useState('day');
  const [parkingUpDownArrow, setParkingUpDownArrow] = useState(false);
  const [spaceData, setSpaceData] = useState();
  const [weekSale, setweekSale] = useState();
  const [monthSale, setMonthSale] = useState();
  const [priceForRenter1, setpriceForRenter1] = useState(0);
  const [priceForRenter2, setpriceForRenter2] = useState(0);
  const [priceForRenter3, setpriceForRenter3] = useState(0);
  const [priceForRenterWinter1, setpriceForRenterWinter1] = useState(0);
  const [priceForRenterWinter2, setpriceForRenterWinter2] = useState(0);
  const [priceForRenterWinter3, setpriceForRenterWinter3] = useState(0);
  const [selectVehicle, setSelectedVehicle] =useState();
  const [dayOfWeek, setDayOfWeek] = useState([]);
  const [dateValues, setDateValues]=useState();
  // eslint-disable-next-line no-unused-vars
  const [message, setmessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [status, setstatus] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [title, settitle] = useState('');
  const [messageShow, setmessageShow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedDate2, setSelectedDate2] = useState([]);
  // const [fromSelectedDate2, setFromSelectedDate2] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedDate1, setSelectedDate1] = useState([]);
  // const [fromSelectedDate1, setFromSelectedDate1] = useState([]);
  const [id, setId] = useState(null);
  const [totalValue, setTotalValue]= useState();
  // eslint-disable-next-line no-unused-vars
  const [selectedDate3, setSelectedDate3] = useState([]);
  const {userdata} = useContext(Context);
  const [userRealData, setUserRealData] = useState('');
  const [userPhoneNumber, setUserPhoneNumber]=useState();
  const [parkingSpaceId, setParkingSpaceID] = useState(0);
  const [bookedDateList, setBookedDateList] = useState([]);
  const [bookingId, setBookingId] = useState();
  const [nightOfWeek, setNightOfWeek]=useState([]);
  const [fullDayOfWeek, setFullDayOfWeek] = useState([]);
  const [review, setReview] = useState([]);
  // const [fromSelectedDate3, setFromSelectedDate3] = useState([]);
  useEffect(async () => {
    if (typeof userdata.firstName != 'undefined') {
      setUserRealData(userdata);
      setUserPhoneNumber(userdata.phoneNumber);
    }
  }, [userdata]);
  const DetailsDrawerOpen = async (id) => {
    setDetailsVisible(true);
    setId(id);
    // eslint-disable-next-line no-unused-vars
    const review = await callGet(`/parkingspace/review?parkingSpaceId=${id}`);
    console.log(review, 'ggg');
    if(review ){
    setReview(review.content);
    }
    const priceData = await callGet(`/parkingspace/price?parkingSpaceId=${id}`);
    // eslint-disable-next-line no-unused-vars
    const a = data.find((item) => item.park.parkingSpaceId === id);
    setResidenceDrawerItem(a.residence);
    setSelected(priceData);
    {
      priceData.priceList.map((item) => {
        if (item.dateString === 'Зуны хуваарь') {
          setpriceForRenter1(item.priceForRenter1);
          setpriceForRenter2(item.priceForRenter2);
          setpriceForRenter3(item.priceForRenter3);
        } else if (item.dateString ==='Өвлийн хуваарь') {
          setpriceForRenterWinter1(item.priceForRenter1);
          setpriceForRenterWinter2(item.priceForRenter2);
          setpriceForRenterWinter3(item.priceForRenter3);
        }
      });
    }
    const space = await callGet(
      `/search/parkingspace/test?parkingSpaceId=${id}`,
    );
    console.log(space, 'gg');
    setSpaceData(space);
    if (space ) {
      const dayArray=[];
      const nightArray=[];
      const fullDayArray=[];
      console.log(space.dayOfWeek);
      space.dayOfWeek.find((item)=>{
        if (item.timeSplitDescription =='Өдөр') {
          dayArray.push(item);
        } else if (item.timeSplitDescription == 'Шөнө') {
          nightArray.push(item);
        } else if (item.timeSplitDescription == 'Бүтэн өдөр') {
          fullDayArray.push(item);
        }
      });
      setDayOfWeek(dayArray);
      setNightOfWeek(nightArray);
      setFullDayOfWeek(fullDayArray);
    }

    space.salePercent.map((item) => {
      if (item.saleSplitCode === 'WEEKLY_SALE') {
        setweekSale(item.salePercent);
      } else setMonthSale(item.salePercent);
    });
    const vehicle = await callGet('/user/vehicle/list');
    setVehiclesData(vehicle);
  };
  const onChangeChooseVehicle = (e) => {
    setSelectedVehicle(e.target.value);
  };
  const onClickPushOrder = ()=>{
    router.push({pathname: '/park/profile/order'});
  };
  const onClickPayment = async () =>{
    if (totalValue > 0 ) {
      if (selectVehicle) {
        if (userRealData) {
          // setisLoading(true);
          const formData = {
            bookingList: dateValues,
            isGift: false,
            parkingSpaceId: parkingSpaceId,
            totalAllDay: fullDayNumber,
            totalAtDay: dayOfNumber,
            totalAtNight: nightOfNumber,
            totalPrice: totalValue,
            userPhoneNumber: String(userPhoneNumber),
            vehicleId: selectVehicle,
          };
          console.log(formData, 'ysssssssssss');
          const res = await callPost('/booking', formData);
          setBookingId(res.bookingId);
          if (res.bookingId !== undefined) {
            console.log(bookingId, 'haana bna');
            router.push({pathname: `/park/profile/order/${res.bookingId}`, query: {page: '1', asWho: 1, history: false}});
          }
        } else {
          showMessage(messageType.FAILED.type, 'Хэрэглэгчийн мэдээлэл олдсонгүй');
        }
      } else {
        showMessage(
          messageType.FAILED.type,
          'Машинаа сонгоно уу ?',
        );
      }
    }
  };
  const timeSubmit = async () => {
    console.log(userPhoneNumber);
    if (totalValue > 0 ) {
      if (selectVehicle) {
      // setisLoading(true);
        const formData = {
          bookingList: dateValues,
          isGift: false,
          parkingSpaceId: parkingSpaceId,
          totalAllDay: fullDayNumber,
          totalAtDay: dayOfNumber,
          totalAtNight: nightOfNumber,
          totalPrice: totalValue,
          userPhoneNumber: String(userPhoneNumber),
          vehicleId: selectVehicle,
        };
        const res = await callPost('/booking', formData);
        setBookingId(res.bookingId);
        if (res.status === 'success') {
          setConfirmAddBookingVisible(true);
          showMessage(
            messageType.SUCCESS.type,
            'Амжилттай. Таны захиалгын хүсэлт амжилттай илгээгдлээ. Хүсэлт баталгаажсаны дараа төлбөрөө төлнө',
          );
        }
      } else {
        showMessage(
          messageType.FAILED.type,
          'Машинаа сонгоно уу ?',
        );
      }
    } else {
      showMessage(messageType.FAILED.type, 'Сул цагаа сонгоно уу?');
    }
  };
  const handleOk = () => {
    setmessageShow(false);
  };

  const handleCancel = () => {
    setmessageShow(false);
  };
  const onClickSubmit = () => {
    const arr=[];
    dayValues.map((item)=>{
      arr.push(item);
    });
    nightValues.map((item)=>{
      arr.push(item);
    });
    fullDayValues.map((item)=>{
      arr.push(item);
    });
    setDateValues(arr);
    setCompleteDayOfNumber(dayOfNumber);
    setCompleteNightOfNumber(nightOfNumber);
    setCompleteFullDayNumber(fullDayNumber);
    setChooseTimeVisible(false);
  };
  const onClosePickTime = () => {
    setChooseTimeVisible(false);
  };
  const onClose = () => {
    setDetailsVisible(false);
  };
  const onclickPick = async () => {
    setChooseTimeVisible(true);
    const calValidateDate = await callGet(
      `/schedule/custom?parkingSpaceId=${id}`,
    );
    setBookedDateList(spaceData.bookedDate);
    setParkingSpaceID(calValidateDate.parkingSpaceId);
  };
  const getSelectedDate1 = (data) => {
    setDayofNumber(data.length);
    if (data.length === 7 || nightOfNumber === 7 ) {
      setTotalValue(data.length * priceForRenter1 +
          nightOfNumber * priceForRenter2 +
          fullDayNumber * priceForRenter3 -
          (data.length * priceForRenter1 +
          nightOfNumber * priceForRenter2 +
          fullDayNumber * priceForRenter3) *
          0.05);
    } else if (data.length === 30 || nightOfNumber === 30 ) {
      setTotalValue(data.length * priceForRenter1 +
          nightOfNumber * priceForRenter2 +
          fullDayNumber * priceForRenter3 -
          (data.length * priceForRenter1 +
          nightOfNumber * priceForRenter2 +
          fullDayNumber * priceForRenter3) *
          0.1 );
    } else {
      setTotalValue( data.length * priceForRenter1 +
          nightOfNumber * priceForRenter2 +
          fullDayNumber * priceForRenter3);
    }
    const array=[];
    data.map((item) => {
      array.push({startDate: moment(item).format('YYYY-MM-DD'), timeSplitDescription: 'DAY'});
    });
    setDayValues(array);
  };
  const getSelectedDate2 = (data) => {
    setNightOfNumber(data.length);
    if (dayOfNumber === 7 || data.length === 7 ) {
      setTotalValue(dayOfNumber * priceForRenter1 +
          data.length * priceForRenter2 +
          fullDayNumber * priceForRenter3 -
          (dayOfNumber * priceForRenter1 +
          data.length * priceForRenter2 +
          fullDayNumber * priceForRenter3) *
          0.05);
    } else if (dayOfNumber === 30 || data.length === 30 ) {
      setTotalValue(dayOfNumber * priceForRenter1 +
          data.length * priceForRenter2 +
          fullDayNumber * priceForRenter3 -
          (dayOfNumber * priceForRenter1 +
          data.length * priceForRenter2 +
          fullDayNumber * priceForRenter3) *
          0.1 );
    } else {
      setTotalValue( dayOfNumber * priceForRenter1 +
          data.length * priceForRenter2 +
          fullDayNumber * priceForRenter3);
    }
    const array=[];
    data.map((item) => {
      array.push({startDate: moment(item).format('YYYY-MM-DD'), timeSplitDescription: 'NIGHT'});
    });
    setNightValues(array);
  };
  const getSelectedDate3 = (data) => {
    setFullDayNumber(data.length);
    if (data.length!==0 ) {
      if (dayOfNumber === 7 || nightOfNumber === 7 ) {
        setTotalValue(dayOfNumber * priceForRenter1 +
          nightOfNumber * priceForRenter2 +
          data.length * priceForRenter3 -
          (dayOfNumber* priceForRenter1 +
          nightOfNumber * priceForRenter2 +
          data.length * priceForRenter3) *
          0.05);
      } if (dayOfNumber === 30 || nightOfNumber === 30 ) {
        setTotalValue(dayOfNumber * priceForRenter1 +
          nightOfNumber * priceForRenter2 +
          data.length * priceForRenter3 -
          (dayOfNumber * priceForRenter1 +
          nightOfNumber * priceForRenter2 +
          data.length * priceForRenter3) *
          0.1 );
      } else {
        setTotalValue(dayOfNumber * priceForRenter1 +
          nightOfNumber * priceForRenter2 +
          fullDayNumber * priceForRenter3);
      }
    }
    const array=[];
    data.map((item) => {
      array.push({startDate: moment(item).format('YYYY-MM-DD'), timeSplitDescription: 'FULL_DAY'});
    });
    setFullDayValues(array);
  };
  const handleClickDayTab = (key) => {
    setSelectedDayTab(key);
  };
  return (
    <div style={{height: '100vh', width: '100%', overflow: 'scroll', scrollBar: 'none'}}>
      {data.map((it) => (
        <Card
          key={it.park.parkingSpaceId}
          className={'ResidenceCardList'}
          style={{
            height: '200px',
            marginTop: '20px',
            borderRadius: '10px',
            background: '#FFFFFF',
          }}
        >
          {it.park.spaceStatus==='AV' ? (
            <div
              style={{
                width: '99px',
                position: 'absolute',
                marginLeft: '16px',
                height: '13px',
                background: 'GREEN',
                borderRadius: '0px 0px 4px 4px',
              }}
            >
              <p
                style={{
                  display: 'flex',
                  fontSize: '8px',
                  marginLeft: '24px',
                }}
              >
                Шууд захиалах
              </p>
            </div>
          ) : (
            <div
              style={{
                width: '99px',
                position: 'absolute',
                marginLeft: '16px',
                height: '13px',
                background: 'yellow',
                borderRadius: '0px 0px 4px 4px',
              }}
            >
              <p
                style={{
                  display: 'flex',
                  fontSize: '8px',
                  marginLeft: '24px',
                }}
              >
                Хүсэлт илгээх
              </p>
            </div>
          )}
          <div style={{marginTop: '19px'}}>
            <Row>
              <Col>
                <Row>
                  <img
                    src="/pexels-photo-3349460 1.png"
                    height="140px"
                    width="209.58px"
                  />
                </Row>
                <Row>
                  <div>
                    {/* <Image src={``} width="20px" height="20px" /> */}
                    {/* Том зургын доод талын зогсоолын үзүүлэлтийн зураг*/}
                    <div
                      style={{
                        display: 'inline-flex',
                        marginTop: '5px',
                        marginLeft: '30px',
                      }}
                    >
                      {it.park && it.park.floorNumber ? (

                        <div style={{marginRight: '5px'}}>
                          <img
                            width={18}
                            height={18}
                            src={IMG_URL + it.park.floorNumber}
                          />
                        </div>
                      ) : null}
                      {it.park && it.park.entranceLock ? (
                        <div style={{marginRight: '5px'}}>
                          <img
                            width={18}
                            height={18}
                            src={IMG_URL + it.park.entranceLock}
                          />
                        </div>
                      ) : null}
                      {it.park && it.park.isNumbering ? (
                        <div style={{marginRight: '5px'}}>
                          <img
                            width={18}
                            height={18}
                            src={`${IMG_URL + it.park.isNumbering}`}
                          />
                        </div>
                      ) : null}
                      {it.park && it.park.capacity ? (
                        <div style={{marginRight: '5px'}}>
                          <img
                            width={18}
                            height={18}
                            src={IMG_URL + it.park.capacity}
                          />
                        </div>
                      ) : null}
                      {it.park && it.park.type ? (
                        <div style={{marginRight: '5px'}}>
                          <img
                            width={18}
                            height={18}
                            src={IMG_URL + it.park.type}
                          />
                        </div>
                      ) : null}
                      {it.park && it.park.returnRoutes ? (
                        <div style={{marginRight: '5px'}}>
                          <img
                            width={18}
                            height={18}
                            src={IMG_URL + it.park.returnRoutes}
                          />
                        </div>
                      ) : null}
                      <div>
                        <DownOutlined/>
                      </div>
                    </div>
                  </div>
                </Row>
              </Col>
              <Col style={{width: '210px', marginLeft: '10px'}}>
                <div
                  style={{
                    position: 'static',
                    width: '232px',
                    height: '24px',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Helvetica',
                      fontStyle: 'normal',
                      fontWeight: 'bold',
                    }}
                  >
                    <b>{it.residence.residenceName}</b>
                  </p>
                  <div>
                    <CheckCircleOutlined
                      style={{
                        color: 'white',
                        backgroundColor: 'green',
                        borderRadius: '7.5px',
                        marginLeft: '1.5px',
                      }}
                      height="15px"
                      width="15px"
                    />
                  </div>
                </div>
                <Row>
                  <Rate
                    style={{width: '80px', height: '16px', order: '1'}}
                    disabled
                    defaultValue={2}
                  />
                </Row>
                <Row>
                  <div style={{display: 'flex'}}>
                    <div
                      style={{
                        height: '16px',
                        width: '16px',
                        marginTop: '10px',
                      }}
                    >
                      <img
                        src="/directions_car_24px.png"
                        height="12px"
                        width="10.67px"
                        style={{marginLeft: '2px'}}
                      />
                    </div>
                    <p
                      style={{
                        width: '40px',
                        height: '16px',
                        marginTop: '12px',
                        fontSize: '12px',
                      }}
                    > 112м</p>
                    <p style={{width: '75px', fontSize: '12px', textAlign: 'center', marginTop: '12px', fontStyle: 'regular'}}>
                      Байршил ID
                    </p>
                    <p
                      style={{
                        width: '43px',
                        fontSize: '12px',
                        marginTop: '12px',
                      }}
                    >
                      {it.residence.locationId}
                    </p>
                  </div>
                  <div style={{display: 'flex'}}>
                    <div
                      style={{
                        marginTop: '10px',
                      }}
                    >
                      <img
                        src="/icons/location_on_24px.png"
                        height="16px"
                        width="16px"
                      />
                    </div>
                    <p
                      style={{
                        width: '226px',
                        height: '32px',
                        fontSize: '12px',
                        fontStyle: 'normal',
                        alignItems: 'center',
                        textAlign: 'justify',
                        marginTop: '10px',
                      }}
                    >
                      {it.residence.address}
                    </p>
                  </div>
                </Row>
                <Row>
                  <Col span={10}>
                    <Button
                      style={{
                        width: '105px',
                        height: '32px',
                        fontSize: '11px',
                        marginTop: '10px',
                        borderRadius: '10px',
                      }}
                      onClick={() => setChooseTimeView(true)}
                    >
                      Сул цаг харах
                    </Button>
                  </Col>
                  <Col span={10} offset={4}>
                    <Button
                      style={{
                        color: 'blue',
                        width: '105px',
                        height: '32px',
                        marginTop: '10px',
                        fontSize: '11px',
                      }}
                      className={'freeTimePick'}
                      onClick={() =>
                        // eslint-disable-next-line new-cap
                        DetailsDrawerOpen(Number(it.park.parkingSpaceId))
                      }
                    >
                      Дэлгэрэнгүй
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Row></Row>
            </Row>
          </div>
        </Card>
      ))}
      {detailVisible && (
        <Drawer
          width="100%"
          closeIcon={<CloseOutlined />}
          placement="right"
          closable={false}
          onClose={onClose}
          visible={detailVisible}
          getContainer={false}
          style={{position: 'absolute'}}
        >
          <div style={{alignItems: 'center'}}>
            <Row style={{height: '20px'}}>
              <Col offset={22} span={2}>
                <CloseOutlined
                  onClick={onClose}
                  style={{position: 'absolute'}}
                />
              </Col>
            </Row>
            <Row>
              <Col style={{height: '24px', display: 'flex'}} span={22}>
                <p
                  style={{
                    fontSize: '20px',
                    color: ' #141A29',
                    textAlign: 'justify',
                  }}
                >
                  <b>{ResidenceItem.residenceName}</b>
                </p>
              </Col>
              <Col span={1}>
                <div style={{height: '15px', width: '15px'}}>
                  <CheckCircleOutlined
                    style={{
                      color: 'white',
                      backgroundColor: 'green',
                      marginLeft: '1.5px',
                    }}
                  />
                </div>
              </Col>
            </Row>
            <Rate
              style={{
                fontSize: '12px',
                lineHeight: '1.2px',
              }}
              defaultValue={3}
            />
            <Row style={{height: '16px', display: 'flex', width: '100%'}}>
              <Col span={22} offset={1}>
                <div style={{display: 'flex'}}>
                  <div
                    style={{
                      height: '16px',
                      width: '16px',
                      marginTop: '10px',
                    }}
                  >
                    <img
                      src="/directions_car_24px.png"
                      height="12px"
                      width="10.67px"
                    />
                  </div>
                  <div
                    style={{
                      width: '40px',
                      height: '16px',
                      marginTop: '12px',
                      marginLeft: '24px',
                      fontSize: '12px',
                    }}
                  >
                    ● 110m
                  </div>
                  <div
                    style={{
                      width: '75px',
                      fontSize: '12px',
                      textAlign: 'center',
                      marginTop: '12px',
                      fontStyle: 'regular',
                    }}
                  >
                    Байршил ID
                  </div>
                  <div
                    style={{
                      width: '43px',
                      fontSize: '12px',
                      marginTop: '12px',
                    }}
                  >
                    {/* {drawerItem.locationId} */}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={22} offset={1}>
                <div style={{display: 'flex', marginTop: '10px'}}>
                  <div
                    style={{
                      height: '16px',
                      width: '16px',
                      marginTop: '8px',
                    }}
                  >
                    <img
                      src="/icons/location_on_24px.png"
                      height="12.98px"
                      width="9.33px"
                    />
                  </div>
                  <div
                    style={{
                      color: '#35446D',
                      fontSize: '12px',
                      marginTop: '10px',
                      width: '376px',
                      height: '32px',
                      marginLeft: '24px',
                    }}
                  >
                    {ResidenceItem.address}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <div
                  className={'DetailsPane'}
                  style={{
                    height: '48px',
                    marginLeft: '25px',
                    marginTop: '10px',
                  }}
                >
                  <Tabs
                    defaultActiveKey="1"
                    onChange={callback}
                    className={'tabPaneType'}
                    style={{width: '100% '}}
                  >
                    <TabPane
                      tab = {
                        <Col span={7}>
                          <div
                            style={{
                              height: '48px',
                              marginLeft: '10%',
                            }}
                          >
                            <p
                              style={{
                                height: '24px',
                                paddingTop: '12px',
                                marginLeft: '20px',
                                fontSize: '14px',
                                color: '#0013D4',
                              }}
                            >
                            Танилцуулга
                            </p>
                          </div>
                        </Col>
                      }
                      key="1"
                    >
                      <Row>
                        <div
                          style={{
                            display: 'flex ',
                            marginLeft: '8%',
                            width: '84%',
                            justifyItems: 'center',
                          }}
                          className={'SpaceIcons'}
                        >
                          <Col
                            span={24}
                            style={{
                              background: 'rgba(222, 226, 233, 0.2)',
                              borderRadius: '24px',
                              padding: '13px 23px',
                              // display: "inline-flex",
                              textAlign: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <div style={{display: 'inline-flex'}}>
                              {spaceData && spaceData.floorNumber ? (
                                <div style={{marginRight: '13px'}}>
                                  <img
                                    width={24}
                                    height={24}
                                    src={IMG_URL + spaceData.floorNumber}
                                  />
                                </div>
                              ) : null}
                              {spaceData && spaceData.entranceLock ? (
                                <div style={{marginRight: '13px'}}>
                                  <img
                                    width={24}
                                    height={24}
                                    src={IMG_URL + spaceData.entranceLock}
                                  />
                                </div>
                              ) : null}
                              {spaceData && spaceData.isNumbering ? (
                                <div style={{marginRight: '13px'}}>
                                  <img
                                    width={24}
                                    height={24}
                                    src={IMG_URL + spaceData.isNumbering}
                                  />
                                </div>
                              ) : null}
                              {spaceData && spaceData.capacity ? (
                                <div style={{marginRight: '13px'}}>
                                  <img
                                    width={24}
                                    height={24}
                                    src={IMG_URL + spaceData.capacity}
                                  />
                                </div>
                              ) : null}
                              {spaceData && spaceData.type ? (
                                <div style={{marginRight: '13px'}}>
                                  <img
                                    width={24}
                                    height={24}
                                    src={IMG_URL + spaceData.type}
                                  />
                                </div>
                              ) : null}
                              {spaceData && spaceData.returnRoutes ? (
                                <div style={{marginRight: '13px'}}>
                                  <img
                                    width={24}
                                    height={24}
                                    src={IMG_URL + spaceData.returnRoutes}
                                  />
                                </div>
                              ) : null}
                              <div>
                                {!parkingUpDownArrow ? (
                                  <DownOutlined
                                    onClick={() => setParkingUpDownArrow(true)}
                                  />
                                ) : (
                                  <UpOutlined
                                    onClick={() => setParkingUpDownArrow(false)}
                                  />
                                )}
                              </div>
                            </div>
                            {parkingUpDownArrow ? (
                              <div>
                                {spaceData && spaceData.floorNumber ? (
                                  <div
                                    style={{
                                      marginRight: '13px',
                                      display: 'flex',
                                    }}
                                  >
                                    <div>
                                      <img
                                        width={24}
                                        height={24}
                                        src={IMG_URL + spaceData.floorNumber}
                                      />
                                    </div>
                                    <div style={{marginLeft: '25px'}}>
                                      <span>{spaceData.floorNumberLabel}</span>
                                    </div>
                                  </div>
                                ) : null}
                                {spaceData && spaceData.entranceLock ? (
                                  <div
                                    style={{
                                      marginRight: '13px',
                                      display: 'flex',
                                    }}
                                  >
                                    <div>
                                      <img
                                        width={24}
                                        height={24}
                                        src={IMG_URL + spaceData.entranceLock}
                                      />
                                    </div>
                                    <div style={{marginLeft: '25px'}}>
                                      <span>{spaceData.entranceLockLabel}</span>
                                    </div>
                                  </div>
                                ) : null}
                                {spaceData && spaceData.isNumbering ? (
                                  <div
                                    style={{
                                      marginRight: '13px',
                                      display: 'flex',
                                    }}
                                  >
                                    <div>
                                      <img
                                        width={24}
                                        height={24}
                                        src={IMG_URL + spaceData.isNumbering}
                                      />
                                    </div>
                                    <div style={{marginLeft: '25px'}}>
                                      <span>{spaceData.isNumberingLabel}</span>
                                    </div>
                                  </div>
                                ) : null}
                                {spaceData && spaceData.capacity ? (
                                  <div
                                    style={{
                                      marginRight: '13px',
                                      display: 'flex',
                                    }}
                                  >
                                    <div>
                                      <img
                                        width={24}
                                        height={24}
                                        src={IMG_URL + spaceData.capacity}
                                      />
                                    </div>
                                    <div style={{marginLeft: '25px'}}>
                                      <span>{spaceData.capacityLabel}</span>
                                    </div>
                                  </div>
                                ) : null}
                                {spaceData && spaceData.type ? (
                                  <div
                                    style={{
                                      marginRight: '13px',
                                      display: 'flex',
                                    }}
                                  >
                                    <div>
                                      <img
                                        width={24}
                                        height={24}
                                        src={IMG_URL + spaceData.type}
                                      />
                                    </div>
                                    <div style={{marginLeft: '25px'}}>
                                      <span>{spaceData.typeLabel}</span>
                                    </div>
                                  </div>
                                ) : null}
                                {spaceData && spaceData.returnRoutes ? (
                                  <div
                                    style={{
                                      marginRight: '13px',
                                      display: 'flex',
                                    }}
                                  >
                                    <div>
                                      <img
                                        width={24}
                                        height={24}
                                        src={IMG_URL + spaceData.returnRoutes}
                                      />
                                    </div>
                                    <div style={{marginLeft: '25px'}}>
                                      <span>{spaceData.returnRoutesLabel}</span>
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            ) : null}
                          </Col>
                        </div>
                      </Row>
                      {/* Зуны болон өвлийн цагийн хуваарь харуулах */}
                      {moment().format('MM-DD') >='10-01' || moment().format('MM-DD') <='03-31' ?
                        <div>
                          <Row style={{
                            height: ' 24px',
                            width: '3100',
                            marginTop: '10px',

                            justifyItems: 'center',
                          }}
                          >
                            <div
                              style={{
                                color: '#35446D',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontFamily: 'Roboto',
                                fontWeight: '700',
                              }}
                            >
                          Өвлийн цагийн хуваарь /10.01-03.31
                            </div>
                          </Row>
                          <Row
                            className={'SpaceIcons'}
                            style={{
                              height: '50px',
                              display: 'flex',
                              marginLeft: '8%',
                              marginTop: '20px',
                              width: '84%',
                              height: '50px',
                              justifyItems: 'center',
                            }}
                          >
                            <Col
                              span={7}
                              style={{
                                height: '50px',
                                alignItems: 'center',
                              }}
                            >
                              <div className={'priceInfoOfOneDay'}>
                                <div
                                  style={{
                                    color: '#141A29',
                                  }}
                                >
                                  <p
                                    style={{
                                      fontFamily: 'Roboto',
                                      fontSize: '14px',
                                      textAlign: 'center',
                                      fontStyle: 'normal',
                                      fontWeight: '700',
                                    }}
                                  >
                                    <p
                                      style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                        fontStyle: 'normal',
                                        fontWeight: '700',
                                      }}
                                    >
                                      {priceForRenterWinter1}
                                    </p>
                                  </p>
                                </div>
                                <div>
                                  <p
                                    style={{
                                      fontStyle: 'normal',
                                      fontSize: '12px',
                                      textAlign: 'center',
                                      color: '#35446D',
                                    }}
                                  >
                                1 Өдөр
                                  </p>
                                </div>
                              </div>
                            </Col>
                            <Divider
                              style={{
                                background: '#0013D4',
                                width: '2px',
                                height: '8.33px',
                                marginTop: '21px',
                              }}
                              type="vertical"
                            />
                            <Col
                              span={7}
                              style={{
                                height: '50px',
                                alignItems: 'center',
                              }}
                            >
                              <div style={{width: '100%'}}>
                                <div style={{color: '#141A29'}}>
                                  <p
                                    style={{
                                      marginLeft: '10%',
                                      width: '80%',
                                      fontFamily: 'Roboto',
                                      fontSize: '14px',
                                      textAlign: 'center',
                                      fontStyle: 'normal',
                                      fontWeight: '700',
                                    }}
                                  >
                                    {priceForRenterWinter2}
                                  </p>
                                </div>
                                <p
                                  style={{
                                    fontStyle: 'normal',
                                    fontSize: '12px',
                                    textAlign: 'center',
                                    height: '16px',
                                    color: '#35446D',
                                  }}
                                >
                              1 Шөнө
                                </p>
                              </div>
                            </Col>
                            <Divider
                              style={{
                                background: '#0013D4',
                                width: '2px',
                                height: '8.33px',
                                marginTop: '21px',
                              }}
                              type="vertical"
                            />
                            <Col span={7}>
                              <div style={{width: '100%'}}>
                                <div style={{color: '#141A29'}}>
                                  <p
                                    style={{
                                      marginLeft: '10%',
                                      width: '80%',
                                      fontFamily: 'Roboto',
                                      fontSize: '14px',
                                      textAlign: 'center',
                                      fontStyle: 'normal',
                                      fontWeight: '700',
                                    }}
                                  >
                                    {priceForRenterWinter3}
                                  </p>
                                </div>
                                <p
                                  style={{
                                    fontStyle: 'normal',
                                    fontSize: '12px',
                                    textAlign: 'center',
                                    height: '16px',
                                    color: '#35446D',
                                  }}
                                >
                              Бүтэн өдөр
                                </p>
                              </div>
                            </Col>
                          </Row>
                        </div>:<div>
                          <Row style={{
                            height: ' 24px',
                            width: '3100',
                            marginTop: '10px',

                            justifyItems: 'center',
                          }}
                          >
                            <div
                              style={{
                                color: '#35446D',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontFamily: 'Roboto',
                                fontWeight: '700',
                              }}
                            >
                          Зун цагийн хуваарь /04.01-09.31
                            </div>
                          </Row>
                          <Row
                            className={'SpaceIcons'}
                            style={{
                              height: '50px',
                              display: 'flex',
                              marginLeft: '8%',
                              marginTop: '20px',
                              width: '84%',
                              height: '50px',
                              justifyItems: 'center',
                            }}
                          >
                            <Col
                              span={7}
                              style={{
                                height: '50px',
                                alignItems: 'center',
                              }}
                            >
                              <div className={'priceInfoOfOneDay'}>
                                <div
                                  style={{
                                    color: '#141A29',
                                  }}
                                >
                                  <p
                                    style={{
                                      fontFamily: 'Roboto',
                                      fontSize: '14px',
                                      textAlign: 'center',
                                      fontStyle: 'normal',
                                      fontWeight: '700',
                                    }}
                                  >
                                    <p
                                      style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                        fontStyle: 'normal',
                                        fontWeight: '700',
                                      }}
                                    >
                                      {priceForRenter1}
                                    </p>
                                  </p>
                                </div>
                                <div>
                                  <p
                                    style={{
                                      fontStyle: 'normal',
                                      fontSize: '12px',
                                      textAlign: 'center',
                                      color: '#35446D',
                                    }}
                                  >
                                1 Өдөр
                                  </p>
                                </div>
                              </div>
                            </Col>
                            <Divider
                              style={{
                                background: '#0013D4',
                                width: '2px',
                                height: '8.33px',
                                marginTop: '21px',
                              }}
                              type="vertical"
                            />
                            <Col
                              span={7}
                              style={{
                                height: '50px',
                                alignItems: 'center',
                              }}
                            >
                              <div style={{width: '100%'}}>
                                <div style={{color: '#141A29'}}>
                                  <p
                                    style={{
                                      marginLeft: '10%',
                                      width: '80%',
                                      fontFamily: 'Roboto',
                                      fontSize: '14px',
                                      textAlign: 'center',
                                      fontStyle: 'normal',
                                      fontWeight: '700',
                                    }}
                                  >
                                    {priceForRenter2}
                                  </p>
                                </div>
                                <p
                                  style={{
                                    fontStyle: 'normal',
                                    fontSize: '12px',
                                    textAlign: 'center',
                                    height: '16px',
                                    color: '#35446D',
                                  }}
                                >
                              1 Шөнө
                                </p>
                              </div>
                            </Col>
                            <Divider
                              style={{
                                background: '#0013D4',
                                width: '2px',
                                height: '8.33px',
                                marginTop: '21px',
                              }}
                              type="vertical"
                            />
                            <Col span={7}>
                              <div style={{width: '100%'}}>
                                <div style={{color: '#141A29'}}>
                                  <p
                                    style={{
                                      marginLeft: '10%',
                                      width: '80%',
                                      fontFamily: 'Roboto',
                                      fontSize: '14px',
                                      textAlign: 'center',
                                      fontStyle: 'normal',
                                      fontWeight: '700',
                                    }}
                                  >
                                    {priceForRenter3}
                                  </p>
                                </div>
                                <p
                                  style={{
                                    fontStyle: 'normal',
                                    fontSize: '12px',
                                    textAlign: 'center',
                                    height: '16px',
                                    color: '#35446D',
                                  }}
                                >
                              Бүтэн өдөр
                                </p>
                              </div>
                            </Col>
                          </Row>
                        </div>}
                      {/* Хөнгөлөлтийн хэсэг*/}
                      <Row>
                        <div
                          style={{
                            width: '84px',
                            height: '24px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontStyle: 'normal',
                            color: '#35446D',
                          }}
                        >
                          Хөнгөлөлт
                        </div>
                      </Row>

                      {spaceData === null ? (
                        <div>0</div>
                      ) : (
                        <div>
                          <Row>
                            <Col span={18} offset={1}>
                              <p
                                style={{
                                  fontSize: '14px',
                                  color: '#35446D',
                                }}
                              >
                                7 өдөр эсвэл 7 шөнө{' '}
                              </p>
                            </Col>
                            <Col span={2} offset={1}>
                              <div>{Number(weekSale)}</div>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={18} offset={1}>
                              <p
                                style={{
                                  fontSize: '14px',
                                  color: '#35446D',
                                }}
                              >
                                30 өдөр эсвэл 30 шөнө
                              </p>
                            </Col>
                            <Col span={2} offset={1}>
                              {monthSale}
                            </Col>
                          </Row>
                        </div>
                      )}
                      <Row style={{marginTop: '20px'}}>
                        <Col span={24}>
                          <div onClick={onclickPick} className={'chooseButton'}>
                            <p
                              style={{
                                alignItems: 'center',
                                width: '116px',
                                color: '#0013D4',
                              }}
                            >
                              Сул цаг сонгох
                            </p>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          fontSize: '14px',
                          color: '#35446D',
                          marginTop: '20px',
                        }}
                      >
                        <b>Тээврийн хэрэгсэл сонгох</b>
                      </Row>
                      <Row >
                        <Radio.Group
                          style={{height: '80px', overflowY: 'scroll '}}
                          buttonStyle="solid"
                          onChange={onChangeChooseVehicle}
                        >
                          {vehicles.map((item) => (
                            <Radio.Button
                              key={item.value}
                              value={item.value}
                              // style={{margin: '5px'}}
                              className={'pickVehicle'}
                            >
                              <div style={{display: 'flex'}}>
                                <div
                                  style={{
                                    height: '24px',
                                    width: '24px',
                                    marginTop: '16px',
                                    marginLeft: '16px',
                                  }}
                                >
                                  <img
                                    src="/directions_car_24px.png"
                                    height="16px"
                                    width="18px"
                                  />
                                </div>
                                <div
                                  style={{
                                    marginLeft: '10px',
                                    height: '40px',
                                    width: '75px',
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: '12px',
                                      height: '16px',
                                    }}
                                  >
                                    {item.label.split(' ')[0]}
                                    {item.label.split(' ')[1]}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: '12px',
                                      height: '16px',
                                      color: '#0013D4',
                                    }}
                                  >
                                    <b>{item.label.split(' ')[2]}</b>
                                  </p>
                                </div>
                              </div>
                            </Radio.Button>
                          ))}

                        </Radio.Group>
                      </Row>
                      <Row style={{marginTop: '10px'}}>
                        <p style={{color: '#35446D', fontSize: '14px'}}>
                          <b>Таны сонгосон захиалга:</b>
                        </p>
                      </Row>
                      <div style={{marginTop: '10px'}}>
                        <Row>
                          <Col style={{fontSize: '12px'}}>Өдөр:</Col>
                          <Col style={{fontSize: '12px'}}>
                            {completeDayOfNumber}
                          </Col>
                        </Row>
                        <Row style={{marginTop: '5px'}}>
                          <Col style={{fontSize: '12px'}}>Шөнө:</Col>
                          <Col style={{fontSize: '12px'}}>
                            {completeNightOfNumber}
                          </Col>
                        </Row>
                        <Row style={{marginTop: '5px'}}>
                          <Col style={{fontSize: '12px'}}>Бүтэн өдөр:</Col>
                          <Col style={{fontSize: '12px'}}>
                            {completeFullDayNumber}
                          </Col>
                        </Row>
                      </div>
                      <Divider />
                      <Row >
                        <Col span={21}>

                          <b>Нийт захиалгын төлбөр</b>

                        </Col>
                        <Col span={3}>
                          {totalValue}
                          ₮
                        </Col>
                      </Row>
                      <Row
                        style={{
                          height: '50px',
                          marginTop: '10px',
                          width: '100%',
                        }}
                        gutter={2}
                      >
                        <Col span={12}>
                          <Button type='primary' onClick={timeSubmit} style={{width: '100%', borderRadius: '10px'}}>Захиалга нэмэх</Button>
                        </Col>
                        <Col span={12}>
                          <Button type='primary' className={'buttonGo'} style={{width: '100%', borderRadius: '10px'}} onClick={()=>onClickPayment(parkingSpaceId, bookingId) }>Төлбөр төлөх</Button>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane
                      tab={
                        <Col span={7}>
                          <div style={{height: '48px'}}>
                            <p
                              style={{

                                height: '24px',
                                paddingTop: '12px',
                                fontSize: '14px',
                                textAlign: 'center',
                                color: '#0013D4',
                              }}
                            >
                            Үнэлгээ
                            </p>
                          </div>
                        </Col>
                      }
                      key="2"
                    >
                      Хэрэглэгчдийн үнэлгээ
                      {
                        review.map((item)=>(
                          <Card key={item.name} style={{background: 'rgba(222, 226, 233, 0.2)', marginTop: '20px', borderRadius: '16px', padding: '0'}}>
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
                                <p style={{color: '#35446D', fontSize: '14px', textAlign: 'justify', marginBottom: '10px'}}>{item.text}</p>
                              </Col>
                            </Row>
                          </Card>
                        ))
                      }
                    </TabPane>
                    <TabPane
                      tab={
                        <div style={{height: '48px'}}>
                          <p
                            style={{
                              height: '24px',
                              textAlign: 'center',
                              paddingTop: '12px',
                              fontSize: '14px',
                              color: '#0013D4',
                            }}
                          >
                            Тусламж
                          </p>
                        </div>
                      }
                      key="3"
                    >
                      <SettingPane/>
                    </TabPane>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </div>
        </Drawer>
      )}
      {chooseTimeVisible && (
        <Drawer
          width="100%"
          closeIcon={<CloseOutlined />}
          placement="right"
          closable={false}
          onClose={onClosePickTime}
          visible={chooseTimeVisible}
          getContainer={false}
          style={{position: 'absolute'}}
        >
          <Row>
            <Col offset={22} span={2}>
              <CloseOutlined
                onClick={onClosePickTime}
                style={{position: 'absolute'}}
              />
            </Col>
          </Row>
          <Row>
            <Col span={2}>
              <ArrowLeftOutlined
                style={{color: 'blue', cursor: 'pointer'}}
                onClick={onClosePickTime}
              />
            </Col>
            <Col offset={4} span={8}>
              <p style={{color: 'blue', fontSize: '20px'}}>
                <b>Сул цаг сонгох</b>
              </p>
            </Col>
          </Row>
          <div
            style={{
              alignItems: 'center',
            }}
          >
            <div style={{marginTop: '30px'}}>
              <Tabs defaultActiveKey="day" onChange={handleClickDayTab} style={{paddingLeft: '20px'}}>
                <TabPane
                  key="day"
                  tab={
                    <div style={{height: '32px'}}>
                      <p
                        style={{
                          height: '24px',
                          width: '100px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontWeight: '700',
                          marginLeft: '10px',
                        }}
                      >
                        Өдөр
                      </p>
                    </div>
                  }
                >
                  <Calendar
                    selectType="multi"
                    selectedDate={selectedDate1}
                    getSelectedDate={getSelectedDate1}
                    bookedDate={bookedDateList}
                    dayOfWeek={dayOfWeek}
                    dayType='Өдөр'
                    // className={'timePickCalendar'}
                  />
                </TabPane>
                <TabPane
                  key="night"
                  tab={
                    <div style={{height: '32px'}}>
                      <p
                        style={{
                          height: '24px',
                          width: '100px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontWeight: '700',
                          marginLeft: '10px',
                        }}
                      >
                        Шөнө
                      </p>
                    </div>
                  }
                >
                  <Calendar
                    selectedDate={selectedDate2}
                    getSelectedDate={getSelectedDate2}
                    className={'timePickCalendar'}
                    dayOfWeek={nightOfWeek}
                    dayType='Шөнө'
                    bookedDate={bookedDateList}
                  />
                </TabPane>
                <TabPane
                  tab={
                    <div style={{height: '32px'}}>
                      <p
                        style={{

                          height: '24px',
                          width: '100px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontWeight: '700',
                          marginLeft: '10px',
                        }}
                      >
                        Бүтэн өдөр
                      </p>
                    </div>
                  }
                  key="fullday"
                >
                  <Calendar
                    bookedDate={bookedDateList}
                    dayType='Бүтэн Өдөр'
                    selectedDate={selectedDate3}
                    getSelectedDate={getSelectedDate3}
                    className={'timePickCalendar'}
                    dayOfWeek={fullDayOfWeek}
                  />
                </TabPane>
              </Tabs>
            </div>
            <Row>
              <div>
                <b>Таны сонгосон захиалга </b>
              </div>
            </Row>
            <Row>
              <Col span={3}>Өдөр</Col>
              <Col span={1}>{dayOfNumber}</Col>
            </Row>
            <Row>
              <Col span={3}>Шөнө</Col>
              <Col span={1}>{nightOfNumber}</Col>
            </Row>
            <Row>
              <Col span={5}>Бүтэн өдөр</Col>
              <Col span={1}>{fullDayNumber}</Col>
            </Row>
            <Divider />
            <Row>
              <Col span={19}>
                <div>
                  <b>Нийт захиалгын төлбөр</b>
                </div>
              </Col>
              <Col span={3}>
                {totalValue}
                ₮
              </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
              <Button
                style={{
                  width: '1000%', height: '50px',
                  borderRadius: '20px',
                }}
                type='primary'
                className={'buttonGo'}
                onClick={onClickSubmit}
              >
              Баталгаажуулах
              </Button>
            </Row>
          </div>
        </Drawer>
      )}
      <Modal
        visible={messageShow}
        title="Мэдээлэл"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Alert message={title} description={message} type={status} showIcon />
      </Modal>
      <Modal visible={conFirmAddBookingVisible} footer={null} onCancel={()=>setConfirmAddBookingVisible(false)}>
        <div>
          <Row>
            <Col span={10} offset={10}>
              <CheckCircleOutlined style={{height: '30px'}} className="confirmIcon"/>
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={8}><div style={{color: 'green', fontSize: '20px'}}>Амжилттай</div></Col>
          </Row>
          <Row style={{marginTop: '20px'}}>
            <Col offset={5}>
              <Button type='primary' onClick={onClickPushOrder}>Төлбөр төлөх хэсэг рүү шилжих</Button>
            </Col>
          </Row>
          <Row style={{marginTop: '10px'}}>
            <Col offset={9}>
              <Button type='primary' onClick={()=>setConfirmAddBookingVisible(false)}>Буцах</Button>
            </Col>
          </Row>
        </div>
      </Modal>
      <Modal visible={chooseTimeView} onCancel={()=>setChooseTimeView(false)} footer={null}>
        <Row>
          <Col offset={1} span={8}>
            <p style={{color: 'blue', fontSize: '20px'}}>
              <b>Сул цаг харах</b>
            </p>
          </Col>
        </Row>
        <div
          style={{
            alignItems: 'center',
          }}
        >
          <div style={{marginTop: '30px'}}>
            <Tabs defaultActiveKey="day" onChange={handleClickDayTab} style={{paddingLeft: '20px'}}>
              <TabPane
                key="day"
                tab={
                  <div style={{height: '32px'}}>
                    <p
                      style={{
                        height: '24px',
                        width: '100px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '700',
                        marginLeft: '10px',
                      }}
                    >
                        Өдөр
                    </p>
                  </div>
                }
              >
                <CalendarView
                  bookedDate={bookedDateList}
                  dayOfWeek={dayOfWeek}
                  dayType='Өдөр'
                  // className={'timePickCalendar'}
                />
              </TabPane>
              <TabPane
                key="night"
                tab={
                  <div style={{height: '32px'}}>
                    <p
                      style={{
                        height: '24px',
                        width: '100px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '700',
                        marginLeft: '10px',
                      }}
                    >
                        Шөнө
                    </p>
                  </div>
                }
              >
                <CalendarView
                  dayOfWeek={nightOfWeek}
                  dayType='Шөнө'
                  bookedDate={bookedDateList}
                />
              </TabPane>
              <TabPane
                tab={
                  <div style={{height: '32px'}}>
                    <p
                      style={{

                        height: '24px',
                        width: '100px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '700',
                        marginLeft: '10px',
                      }}
                    >
                        Бүтэн өдөр
                    </p>
                  </div>
                }
                key="fullday"
              >
                <CalendarView
                  bookedDate={bookedDateList}
                  dayType='Бүтэн Өдөр'
                  dayOfWeek={fullDayOfWeek}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default tofit;
