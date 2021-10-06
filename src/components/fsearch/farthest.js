/* eslint-disable no-unused-vars */
import {Row, Col, Card, Button} from 'antd';
import {Rate} from 'antd';
import {Drawer, Divider} from 'antd';
import {useState, useEffect} from 'react';
import {Radio} from 'antd';
import Image from 'next/image';
import {
  CloseOutlined,
  ArrowLeftOutlined,
  DownOutlined,
  UpOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import {Tabs} from 'antd';
import {callGet} from '@api/api';
import Calendar from '@components/CustomCalendar/index';

const {TabPane} = Tabs;
const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
const callback = (key) => {
  console.log(key);
};

const farthest = ({data}) => {
  console.log(data, 'hamgiin oir ymdaaaa');
  const [detailVisible, setDetailsVisible] = useState(false);
  const [selectItem, setSelected] = useState();
  const [drawerItem, setDrawerItem] = useState({});
  const [dayOfNumber, setDayofNumber] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [nightOfNumber, setNightOfNumber] = useState(0);
  const [fullDayNumber, setFullDayNumber] = useState(0);
  const [saleDatas, setSaleData] = useState();
  const [vehicles, setVehiclesData] = useState([]);
  const [chooseTimeVisible, setChooseTimeVisible] = useState(false);
  const [selectedDayTab, setSelectedDayTab] = useState('day');

  const [spaceData, setSpaceData] = useState();
  const [timeSplit, settimeSplit] = useState(null);
  const [parkingUpDownArrow, setParkingUpDownArrow] = useState(false);
  const [residenceDrawerItem, setResidenceDrawerItem] = useState(false);

  useEffect(async ()=>{
    const time = await callGet('/config/timesplit');
    settimeSplit(time);
    console.log(time, '<-------------------------------');
  }, []);
  const DetailsDrawerOpen = async (id) => {
    console.log(id);
    setDetailsVisible(true);

    // eslint-disable-next-line react/prop-types
    const a = data.find((item) => item.park.parkingSpaceId === id);
    setResidenceDrawerItem(a.residence);
    const space = await callGet(
      `/search/parkingspace/test?parkingSpaceId=${id}`,
    );
    setSpaceData(space);
    const vehicle = await callGet('/user/vehicle/list');
    setVehiclesData(vehicle);
    // console.log(spaceData, '<------------------spaceData ');
  };
  const showTimePickDrawer = async (id) => {
    // setSelected(id);
    // setPickTimeVisible(true);
    // const selectDataa = data.find((item) => item.id == id);
    // console.log(selectDataa);
    // setDrawerItem(selectDataa);
    // const spaceData = await callGet(`parkingspace/price?parkingSpaceId =${id}`);
    // console.log(spaceData);
  };
  const onChangeChooseVehicle = (e) => {
    console.log(e.target.value);
  };
  const onClosePickTime = () => {
    setChooseTimeVisible(false);
  };
  const onClose = () => {
    setDetailsVisible(false);
  };
  const onclickPick = () => {
    setChooseTimeVisible(true);
  };
  const onChange = () => {};

  const getSelectedDate = async (data) => {
    console.log(data, 'dataaaaaaaa');
    const alength = data.length;
    await setDayofNumber(alength);
    // console.log(selectedDayTab, "selectedDayTab");
    // console.log(data, "selected data");
  };

  const handleClickDayTab = (key) => {
    setSelectedDayTab(key);
  };
  return (
    <div style={{height: '828px', width: '100%', overflow: false}}>
      {data.map((item) => (
        <div key={item.id}>
          <Card
            key={item.park.parkingSpaceId}
            className={'ResidenceCardList'}
            style={{
              height: '200px',
              marginTop: '20px',
              borderRadius: '10px',
              background: '#FFFFFF',
            }}
          >
            {item.park.spaceStatus === 'AV'? (
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
                      height: '20px',
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
                      <b>{item.residence.residenceName}</b>
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
                      style={{width: '80px', height: '14px', order: '1'}}
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
                          src="/directions_car_24px.png"
                          height="12px"
                          width="10.67px"
                          style={{marginLeft: '2px'}}
                        />
                      </div>
                      <div
                        style={{
                          width: '40px',
                          height: '16px',
                          marginTop: '12px',
                          fontSize: '12px',
                        }}
                      > 112м</div>
                      <div style={{width: '75px', fontSize: '12px', textAlign: 'center', marginTop: '12px', fontStyle: 'regular'}}>
                    Байршил ID
                      </div>
                      <div
                        style={{
                          width: '43px',
                          fontSize: '12px',
                          marginTop: '12px',
                        }}
                      >
                        {item.residence.locationId}
                      </div>
                    </div>
                    <div style={{display: 'flex'}}>
                      <div
                        style={{
                          marginTop: '10px',
                        }}
                      >
                        <Image
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
                        {item.residence.address}
                      </p>
                    </div>
                  </Row>
                  <Row>
                    <Col>
                      <div style={{fontSize: '12px'}}>Нийт үнэ</div>
                      <div><b>{item.park.price !==null?<p> {item.park.price} ₮</p> :<p>0 ₮</p>}</b></div>
                    </Col>
                    <Col span={10} offset={4}>
                      <Button
                        style={{
                          color: 'blue',
                          width: '105px',
                          marginTop: '50px',
                          height: '32px',
                          marginTop: '10px',
                          fontSize: '11px',
                        }}
                        className={'freeTimePick'}
                        onClick={() =>
                        // eslint-disable-next-line new-cap
                          DetailsDrawerOpen(Number(item.park.parkingSpaceId))
                        }
                      >
                    Дэлгэрэнгүй
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Card>
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

            </Drawer>
          )}
        </div>
      ))}
      {/* <Pagination onChange={onChange} total={50} /> */}
    </div>
  );
};
export default farthest;
