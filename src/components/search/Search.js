/* eslint-disable react/prop-types */
import {Row, Col, Card, Button, Rate, Image, Drawer, Radio} from 'antd';
import {CloseOutlined, CheckCircleOutlined, DownOutlined, UpOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {callGet} from '@api/api';
import {Tabs} from 'antd';

const callback = (key) =>{
  console.log(key);
};
const {TabPane} = Tabs;
const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

// eslint-disable-next-line no-unused-vars
const isBase64 = async (str) => {
  if (str === '' || str.trim() === '') {
    return false;
  }
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
};
// eslint-disable-next-line react/prop-types
const Search = ({data, startDate, endDate, tunetype})=>{
  console.log(startDate, endDate);

  // console.log(Number(Number(endDate)-Number(startDate)));
  const [spaceData, setSpaceData] = useState();
  const [timeSplit, settimeSplit] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [parkingUpDownArrow, setParkingUpDownArrow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [totalAtDay, setTotalAtDay] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [totalAtNight, setTotalAtNight]=useState(0);
  // eslint-disable-next-line no-unused-vars
  const [totalAllDay, setTotalAllDay] = useState(0);
  const [vehicles, setVehiclesData]= useState([]);
  const [residenceDrawerItem, setResidenceDrawerItem] = useState(false);
  const onChangeChooseVehicle = (e) => {
    console.log(e.target.value);
  };
  useEffect(async ()=>{
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (tunetype === 'Өдөр') {
      setTotalAtDay(Number(diffDays));
    } else if (tunetype === 'Шөнө') {
      setTotalAtNight(Number(diffDays));
    } else {
      setTotalAllDay(Number(diffDays));
    }
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

  const onClose = (e)=>{
    setDetailsVisible(false);
  };
  return (
    <div>
      <div>
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
            {it.park.spaceStatus === 'AV'? (
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
                    <Col>
                      <div style={{fontSize: '12px'}}>Нийт үнэ</div>
                      <div><b>{it.park.price !==null ? <p>{it.park.price}</p>:<p>0₮</p>}</b></div>
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
                          DetailsDrawerOpen(Number(it.park.parkingSpaceId))
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
        ))}
      </div>
      <div style={{height: '828px'}}>
        {detailsVisible &&
        <Drawer
          placement="right"
          width='100%'
          closable={false}
          visible={detailsVisible}
          closeIcon={<CloseOutlined />}
          getContainer={false}
          style={{position: 'absolute'}}
        >
          <div>
            <Row style={{height: '20px'}}>
              <Col span={20} style={{display: 'inline-flex'}}><p style={{color: '#141A29', fontSize: '20px'}}><b>{residenceDrawerItem.residenceName}</b></p>
                <div style={{marginLeft: '10px'}}><div style={{height: '15px', width: '15px'}}>
                  <CheckCircleOutlined
                    style={{
                      color: 'white',
                      backgroundColor: 'green',
                      borderRadius: '10px',
                      marginLeft: '1.5px',
                    }}
                  />
                </div></div></Col>

              <Col span={1}></Col>
              <Col span={2}>
                <CloseOutlined
                  onClick={onClose}
                  style={{position: 'absolute'}}
                />
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
                      marginLeft: '50px',
                      textAlign: 'center',
                      marginTop: '12px',
                      fontStyle: 'regular',
                      color: '#7D8FC0',
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
                    {residenceDrawerItem.residenceBlockCode}
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
                      src="/icons/location_on_24px.png"
                      height="12.98px"
                      width="15.33px"
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
                    {residenceDrawerItem.address}
                  </p>
                </div>
              </Col>
            </Row>
            {/* tabPane in taniltsuulga , unelgee and tuslamkj*/}
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
                    style={{width: '100% '}}
                  >
                    <TabPane
                      tab={
                        <div
                          style={{
                            height: '48px',

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
                      <Row style={{marginTop: '20px'}} offset={2}>
                        <p style={{fontSize: '14px', fontWeight: '700', color: '#35446D'}}>Өдөр (09:00-19:00)</p>
                      </Row>
                      <Row style={{marginTop: '20px'}}>
                        <Col span={8}>
                          <div style={{fontSize: '12px', fontWeight: '400', width: '86px', height: '16px', color: '#0013D4'}}>Эхлэх хугацаа</div>
                          <div><b>{startDate},{(tunetype === 'Өдөр'&& timeSplit.dayStart)||(tunetype ==='Шөнө'&& timeSplit.nightStart)}</b></div>
                        </Col>
                        <Col span={8} offset={6}>
                          <div style={{fontSize: '12px', fontWeight: '400', width: '86px', height: '16px', color: '#0013D4'}}>Дуусах хугацаа</div>
                          <div><b>{endDate},{(tunetype === 'Өдөр'&& timeSplit.dayEnd )||(tunetype==='Шөнө'&& timeSplit.nightEnd)}</b></div></Col>
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
                      <Row>
                        <Col span={22}>
                          <p>
                            <b>Нийт захиалгын төлбөр</b>
                          </p>
                        </Col>
                        <Col span={2}>
                          {residenceDrawerItem.price}
                          ₮
                        </Col>
                      </Row>
                      <Row
                        gutter={16}
                        style={{
                          height: '50px',
                          marginTop: '10px',
                        }}
                      >
                        <Col span={12} >
                          <Button type='primary' style={{borderRadius: '10px', width: '100%'}} >Захиалга нэмэх</Button>
                        </Col>
                        <Col span={12} >
                          <Button type='primary' style={{borderRadius: '10px', width: '100%'}}>Төлбөр төлөх</Button>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane
                      tab={
                        <div style={{width: '33%', height: '48px'}}>
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
                      }
                      key="2"
                    >
                      Хэрэглэгчийн үнэлгээ
                    </TabPane>
                    <TabPane
                      tab={
                        <div style={{width: '33%', height: '48px'}}>
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
        </Drawer>}
      </div>
    </div>
  );
};
export default Search;
