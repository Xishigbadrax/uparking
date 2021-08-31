import {Row, Col, Card, Button} from 'antd';
import {Rate} from 'antd';
import {Drawer, Divider} from 'antd';
import {useEffect, useState, useContext} from 'react';
import {Radio, Modal, Alert} from 'antd';
import Image from 'next/image';
import Context from '@context/Context';
// import {Collapse} from 'antd';
const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
// const {Panel} = Collapse;
import {CloseOutlined, ArrowLeftOutlined, CheckCircleOutlined, DownOutlined, UpOutlined} from '@ant-design/icons';
// import {Pagination} from 'antd';
import {Tabs} from 'antd';
import {callGet, callPost} from '@api/api';
import Calendar from '@components/CustomCalendar/index';
import moment from 'moment';

const {TabPane} = Tabs;
const callback = (key) =>{
  console.log(key, 'keyiin hevledee');
};
const tofit = ({data, lat, lng}) => {
  console.log({data, lat, lng});

  // const [PickTimevisible, setPickTimeVisible] = useState(false);
  const [detailVisible, setDetailsVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectItem, setSelected] = useState([]);
  const [ResidenceItem, setResidenceDrawerItem] = useState({});
  const [dayOfNumber, setDayofNumber] = useState(0);
  const [nightOfNumber, setNightOfNumber] = useState(0);
  const [fullDayNumber, setFullDayNumber] = useState(0);
  const [spaceStatus, setSpaceStatus] = useState('');
  const [dayValues, setDayValues]= useState([]);
  const [nightValues, setNightValues]= useState([]);
  const [fullDayValues, setFullDayValues]= useState([]);

  const [completeDayOfNumber, setCompleteDayOfNumber] = useState(0);
  const [completeNightOfNumber, setCompleteNightOfNumber] = useState(0);
  const [completeFullDayNumber, setCompleteFullDayNumber] = useState(0);
  // const [saleDatas, setSaleData] = useState();
  const [vehicles, setVehiclesData] = useState([]);
  const [chooseTimeVisible, setChooseTimeVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedDayTab, setSelectedDayTab] = useState('day');
  const [parkingUpDownArrow, setParkingUpDownArrow] = useState(false);
  const [spaceData, setSpaceData] = useState();
  const [weekSale, setweekSale] = useState();
  const [monthSale, setMonthSale] = useState();
  const [priceForRenter1, setpriceForRenter1] = useState(0);
  const [priceForRenter2, setpriceForRenter2] = useState(0);
  const [priceForRenter3, setpriceForRenter3] = useState(0);
  const [messageShow2, setmessageShow2] = useState(false);
  const [dateValues, setDateValues]=useState();
  const [message, setmessage] = useState('');
  const [status, setstatus] = useState('');
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
  const [parkingSpaceId, setParkingSpaceID] = useState(null);


  // const [fromSelectedDate3, setFromSelectedDate3] = useState([]);
  useEffect(()=>{

  }, []);
  useEffect(async () => {
    if (typeof userdata.firstName != 'undefined') {
      setUserRealData(userdata);
    }
  }, [userdata]);
  console.log(userRealData, 'Realdat');
  const DetailsDrawerOpen = async (id) => {
    setDetailsVisible(true);
    setId(id);

    const priceData = await callGet(`/parkingspace/price?parkingSpaceId=${id}`);
    // eslint-disable-next-line no-unused-vars
    const residenceData = await callGet(
      `/search/input/test?keywordId=${id}&latitude=${lat}&longitude=${lng}`,
    );
    const a = data.find((item) => item.park.parkingSpaceId === id);
    setResidenceDrawerItem(a.residence);
    setSpaceStatus(a.park.spaceStatus);
    setSelected(priceData);
    {
      priceData.priceList.map((item) => {
        if (item.dateString === 'Зуны хуваарь') {
          setpriceForRenter1(item.priceForRenter1);
          setpriceForRenter2(item.priceForRenter2);
          setpriceForRenter3(item.priceForRenter3);
        }
      });
    }
    const sale = await callGet(`/parkingSpace/sale?parkingSpaceId=${id}`);
    console.log(sale);
    const space = await callGet(
      `/search/parkingspace/test?parkingSpaceId=${id}`,
    );
    setSpaceData(space);
    space.salePercent.map((item) => {
      if (item.saleSplitCode === 'WEEKLY_SALE') {
        setweekSale(item.salePercent);
      } else setMonthSale(item.salePercent);
    });

    // setweekSale(weekSale);
    const vehicle = await callGet('/user/vehicle/list');
    setVehiclesData(vehicle);
  };
  const onChangeChooseVehicle = (e) => {
    console.log(e.target.value);
  };

  const timeSubmit = async (item) => {
    if (vehicles) {
      // setisLoading(true);
      const formData = {
        userPhoneNumber: userRealData.phoneNumber,
        // vehicleId: vehicles,
        isGift: false,
        parkingSpaceId: parkingSpaceId,
        // startDateTime: 'startDate',
        // endDateTime: 'endDate',
        // isDay: timeDate.tuneType == 'Өдөр' ? true : false,
        // isNight: timeDate.tuneType == 'Шөнө' ? true : false,
        // isFullday: timeDate.tuneType == 'Бүтэн өдөр' ? true : false,
        spaceStatus: spaceStatus,
        totalAllDay: fullDayNumber,
        totalAtDay: dayOfNumber,
        totalAtNight: nightOfNumber,
        totalPrice: totalValue,
      };
      console.log(formData);
      await callPost('/booking/time', formData).then((res) => {
        console.log(res);
        if (res.status == 'success') {
          if (item == 1) {
            setbookingId(res.bookingId);
            setbookingNumber(res.bookingNumber);
            if (data.isRequested) {
              setmessageShow(true);
              setmessage(
                'Таны захиалгын хүсэлт амжилттай илгээгдлээ. Хүсэлт баталгаажсаны дараа төлбөрөө төлнө',
              );
              settitle('Амжилттай');
              setstatus('success');
            } else {
              setmessageShow(true);
              setmessage(
                'Хүсэлт амжилтгүй',
              );
              settitle('Амжилтгүй');
              setstatus('failed');
            }

            // setmessageShow(true);
            // setmessage('Амжилттай захиалга үүслээ');
            // settitle('Амжилттай');
            // setstatus('success');
          } else {
            setmessageShow2(true);
          }
        } else {
          setmessageShow(true);
          setmessage(res);
          settitle('Анхааруулга');
          setstatus('warning');
        }
        // setisLoading(false);
      });
    } else {
      setmessageShow(true);
      setmessage('Тээврийн хэрэгсэл сонгоно уу ');
      settitle('Анхааруулга');
      setstatus('warning');
    }
  };

  const handleOk = () => {
    setmessageShow(false);
  };

  const handleCancel = () => {
    setmessageShow(false);
  };
  const submit = () => {
    setmessageShow(true);
    setmessage('Сул цаг сонгоно уу ');
    settitle('Анхааруулга');
    setstatus('warning');
  };


  const onClickSubmit = () => {
    console.log();
    console.log(dayValues, nightValues, fullDayValues, 'utdguuud');
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
    console.log(arr, 'ene shvv');
    console.log(dateValues, 'awdhgawidugawiduawdiu');
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
    console.log('Batalgaajsan udruud----->', calValidateDate);
    calValidateDate && setParkingSpaceID(calValidateDate.parkingSpaceId);
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
      array.push({startDate: moment(item).format('YYYY-MM-DD'), timeSplitDescription: 'Өдөр'});
    });
    console.log(array, 'awdawdawdawdawd');
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
      array.push({startDate: moment(item).format('YYYY-MM-DD'), timeSplitDescription: 'Шөнө'});
    });
    console.log(array, 'ШӨнүүд');
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
      array.push({startDate: moment(item).format('YYYY-MM-DD'), timeSplitDescription: 'Бүтэн өдөр'});
    });
    console.log(array, 'ШӨнүүд');
    setFullDayValues(array);
  };

  const handleClickDayTab = (key) => {
    setSelectedDayTab(key);
  };
  return (
    <div style={{height: '828px', width: '100%', overflow: true}}>
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
          <div style={{marginLeft: '10px', marginTop: '19px'}}>
            <Row>
              <Col>
                <Row>
                  <Image
                    preview={false}
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
                      {spaceData && spaceData.floorNumber ? (
                        <div style={{marginRight: '5px'}}>
                          <img
                            preview={false}
                            width={18}
                            height={18}
                            src={IMG_URL + spaceData.floorNumber}
                          />
                        </div>
                      ) : null}
                      {spaceData && spaceData.entranceLock ? (
                        <div style={{marginRight: '5px'}}>
                          <img
                            preview={false}
                            width={18}
                            height={18}
                            src={IMG_URL + spaceData.entranceLock}
                          />
                        </div>
                      ) : null}
                      {spaceData && spaceData.isNumbering ? (
                        <div style={{marginRight: '5px'}}>
                          <img
                            preview={false}
                            width={18}
                            height={18}
                            src={IMG_URL + spaceData.isNumbering}
                          />
                        </div>
                      ) : null}
                      {spaceData && spaceData.capacity ? (
                        <div style={{marginRight: '5px'}}>
                          <img
                            preview={false}
                            width={18}
                            height={18}
                            src={IMG_URL + spaceData.capacity}
                          />
                        </div>
                      ) : null}
                      {spaceData && spaceData.type ? (
                        <div style={{marginRight: '5px'}}>
                          <img
                            preview={false}
                            width={18}
                            height={18}
                            src={IMG_URL + spaceData.type}
                          />
                        </div>
                      ) : null}
                      {spaceData && spaceData.returnRoutes ? (
                        <div style={{marginRight: '5px'}}>
                          <img
                            preview={false}
                            width={18}
                            height={18}
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
                                preview={false}
                                width={18}
                                height={18}
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
                                preview={false}
                                width={18}
                                height={18}
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
                                preview={false}
                                width={18}
                                height={18}
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
                                preview={false}
                                width={18}
                                height={18}
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
                                preview={false}
                                width={18}
                                height={18}
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
                                preview={false}
                                width={18}
                                height={18}
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
                      <Image
                        preview={false}
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
                      <Image
                        preview={false}
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
                      onClick={() => setChooseTimeVisible(true)}
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
                    <Image
                      preview={false}
                      src="/directions_car_24px.png"
                      height="12px"
                      width="10.67px"
                    />
                  </div>
                  <p
                    style={{
                      width: '40px',
                      height: '16px',
                      marginTop: '12px',
                      marginLeft: '24px',
                      fontSize: '12px',
                    }}
                  >
                    ● 110m
                  </p>
                  <p
                    style={{
                      width: '75px',
                      fontSize: '12px',
                      textAlign: 'center',
                      marginTop: '12px',
                      fontStyle: 'regular',
                    }}
                  >
                    Байршил ID
                  </p>
                  <p
                    style={{
                      width: '43px',
                      fontSize: '12px',
                      marginTop: '12px',
                    }}
                  >
                    {/* {drawerItem.locationId} */}
                  </p>
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
                    <Image
                      preview={false}
                      src="/icons/location_on_24px.png"
                      height="12.98px"
                      width="9.33px"
                    />
                  </div>
                  <p
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
                  </p>
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
                                    preview={false}
                                    width={24}
                                    height={24}
                                    src={IMG_URL + spaceData.floorNumber}
                                  />
                                </div>
                              ) : null}
                              {spaceData && spaceData.entranceLock ? (
                                <div style={{marginRight: '13px'}}>
                                  <img
                                    preview={false}
                                    width={24}
                                    height={24}
                                    src={IMG_URL + spaceData.entranceLock}
                                  />
                                </div>
                              ) : null}
                              {spaceData && spaceData.isNumbering ? (
                                <div style={{marginRight: '13px'}}>
                                  <img
                                    preview={false}
                                    width={24}
                                    height={24}
                                    src={IMG_URL + spaceData.isNumbering}
                                  />
                                </div>
                              ) : null}
                              {spaceData && spaceData.capacity ? (
                                <div style={{marginRight: '13px'}}>
                                  <img
                                    preview={false}
                                    width={24}
                                    height={24}
                                    src={IMG_URL + spaceData.capacity}
                                  />
                                </div>
                              ) : null}
                              {spaceData && spaceData.type ? (
                                <div style={{marginRight: '13px'}}>
                                  <img
                                    preview={false}
                                    width={24}
                                    height={24}
                                    src={IMG_URL + spaceData.type}
                                  />
                                </div>
                              ) : null}
                              {spaceData && spaceData.returnRoutes ? (
                                <div style={{marginRight: '13px'}}>
                                  <img
                                    preview={false}
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
                                        preview={false}
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
                                        preview={false}
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
                                        preview={false}
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
                                        preview={false}
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
                                        preview={false}
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
                                        preview={false}
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
                      <Row
                        height=" 24px"
                        style={{
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
                              <p>{Number(weekSale)}</p>
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
                      <Row>
                        <Radio.Group
                          buttonStyle="solid"
                          onChange={onChangeChooseVehicle}
                        >
                          <Col span={11}>
                            {vehicles.map((item) => (
                              <Radio.Button
                                key={item.value}
                                value={item.value}
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
                          </Col>
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
                      <Row>
                        <Col span={21}>
                          <p>
                            <b>Нийт захиалгын төлбөр</b>
                          </p>
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
                        }}
                      >
                        <Col span={12}>
                          <Button type='primary' onClick={totalValue > 0 ? () => timeSubmit(1) : () => submit() } className={'buttonGo'}>Захиалга нэмэх</Button>
                        </Col>
                        <Col span={12}>
                          <Button type='primary' className={'buttonGo'}>Төлбөр төлөх</Button>
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
                      Хэрэглэгчийн үнэлгээ
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
                      Тусламж
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
              <Tabs defaultActiveKey="day" onChange={handleClickDayTab}>
                <TabPane
                  key="day"
                  tab={
                    <div style={{width: '120px', height: '32px'}}>
                      <p
                        style={{
                          width: '78px',
                          height: '24px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontWeight: '700',
                          marginLeft: '20px',
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
                    className={'timePickCalendar'}
                  />
                </TabPane>
                <TabPane
                  key="night"
                  tab={
                    <div style={{width: '150px', height: '32px'}}>
                      <p
                        style={{
                          width: '78px',
                          height: '24px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontWeight: '700',
                          marginLeft: '20px',
                        }}
                      >
                        Шөнө
                      </p>
                    </div>
                  }
                >
                  <Calendar
                    selectType="multi"
                    selectedDate={selectedDate2}
                    getSelectedDate={getSelectedDate2}
                    className={'timePickCalendar'}
                  />
                </TabPane>
                <TabPane
                  tab={
                    <div style={{width: '150px', height: '32px'}}>
                      <p
                        style={{
                          width: '78px',
                          height: '24px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontWeight: '700',
                          marginLeft: '20px',
                        }}
                      >
                        Бүтэн өдөр
                      </p>
                    </div>
                  }
                  key="fullday"
                >
                  <Calendar
                    selectType="multi"
                    selectedDate={selectedDate3}
                    getSelectedDate={getSelectedDate3}
                    className={'timePickCalendar'}
                  />
                </TabPane>
              </Tabs>
            </div>
            <Row>
              <p>
                <b>Таны сонгосон захиалга </b>
              </p>
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
              <Col span={3}>Бүтэн өдөр</Col>
              <Col span={1}>{fullDayNumber}</Col>
            </Row>
            <Divider />
            <Row>
              <Col span={19}>
                <p>
                  <b>Нийт захиалгын төлбөр</b>
                </p>
              </Col>
              <Col span={3}>
                {totalValue}
                ₮
              </Col>
            </Row>
            <Button
              style={{
                width: '80%',
              }}
              className={'buttonGo'}
              onClick={onClickSubmit}
            >
              Баталгаажуулах
            </Button>
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
      <Modal
        visible={messageShow2}
        title="Мэдээлэл"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Alert message={'Амжилттай'} description={'Таны захиалга амжилттай нэмэгдлээ'} type={'success'} showIcon />
      </Modal>
    </div>
  );
};
export default tofit;
