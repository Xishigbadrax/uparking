import { Row, Col, Card, Button, DatePicker } from "antd";
import { Rate } from "antd";
import { Drawer, Divider } from "antd";
import { useState, useEffect } from "react";
import { Radio } from "antd";
import Image from "next/image";
import {
  CloseOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Pagination } from "antd";
import { Tabs } from "antd";
import { callGet } from "@api/api";
import Calendar from "@components/CustomCalendar/index";
import Item from "antd/lib/list/Item";
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
function onPanelChange(value, mode) {
  console.log(value, mode);
}

const tofit = ({ data, lat, lng }) => {
  const [PickTimevisible, setPickTimeVisible] = useState(false);
  const [detailVisible, setDetailsVisible] = useState(false);
  const [selectItem, setSelected] = useState();
  const [drawerItem, setDrawerItem] = useState({});
  const [dayOfNumber, setDayofNumber] = useState(0);
  const [nightOfNumber, setNightOfNumber] = useState(0);
  const [fullDayNumber, setFullDayNumber] = useState(0);
  const [saleDatas, setSaleData] = useState();
  const [vehicles, setVehiclesData] = useState([]);
  const [chooseTimeVisible, setChooseTimeVisible] = useState(false);

  const DetailsDrawerOpen = async (id) => {
    setDetailsVisible(true);
    const selectDataa = data.find((item) => item.id == id);
    console.log(selectDataa);
    setDrawerItem(selectDataa);
    const a = await callGet(`/search/parkingspace/list/test`);
    const priceData = await callGet(`/parkingspace/price?parkingSpaceId=${id}`);
    console.log("lat----------->", lat);
    const residenceData = await callGet(
      `/search/input/test?keywordId=${id}&latitude=${47.8781761962291}&longitude=${106.91208177535673}`
    );
    console.log(residenceData);
    setSelected(priceData);
    console.log(priceData);
    const saleData = await callGet(`/parkingspace/sale?parkingSpaceId=${id}`);
    console.log(saleData);
    setSaleData(saleData);
    const vehicle = await callGet(`/user/vehicle/list`);
    setVehiclesData(vehicle);
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

  return (
    <div style={{ overflow: "auto", height: "828px" }}>
      {data.map((item) => (
        <div key={item.id}>
          <Card
            className={`ResidenceCardList`}
            style={{
              height: "200px",
              width: "500px",
              marginTop: "20px",
              borderRadius: "16px",
              background: "#FFFFFF",
            }}
            key={item.id}
          >
            {" "}
            {!item.hourlySearch ? (
              <div
                style={{
                  width: "99px",
                  position: "absolute",
                  marginLeft: "16px",
                  height: "13px",
                  background: "GREEN",
                  borderRadius: "0px 0px 4px 4px",
                }}
              >
                <p
                  style={{
                    display: "flex",
                    fontSize: "8px",
                    marginLeft: "24px",
                  }}
                >
                  Шууд захиалах
                </p>
              </div>
            ) : (
              <div></div>
            )}
            <div style={{ marginLeft: "16px", marginTop: "19px" }}>
              <Row>
                <Col>
                  <Row>
                    <Image
                      src="/pexels-photo-3349460 1.png"
                      height="140px"
                      width="209.58px"
                    ></Image>
                  </Row>
                  <Row>
                    <div style={{ display: "flex " }}>
                      <p style={{ fontSize: "15px", marginLeft: "20px" }}>
                        <b>B1</b>
                      </p>
                      <Image
                        src="/icons/1) Checkbox.png"
                        width="20px"
                        height="20px"
                        style={{ marginLeft: "10px" }}
                      />
                      <Image
                        src="/icons/temdegleegui.png"
                        width="20px"
                        height="10px"
                        style={{ paddingLeft: "10px" }}
                      />
                      <Image
                        src="/icons/haadag.png"
                        width="20px"
                        height="20px"
                      />
                      <Image
                        src="/icons/Small SUV.png"
                        width="20px"
                        height="20px"
                        style={{ paddingLeft: "10px" }}
                      />
                      <Image
                        src="/icons/Up.png"
                        width="20px"
                        height="20px"
                        style={{ paddingLeft: "10px" }}
                      />
                      <Image
                        src="/icons/haadag.png"
                        width="20px"
                        height="20px"
                        style={{ paddingLeft: "10px" }}
                      />
                      <Image
                        src="/keyboard_arrow_down_24px.png"
                        width="20px"
                        height="20px"
                        style={{ paddingLeft: "10px" }}
                      />
                    </div>
                  </Row>
                </Col>
                <Col style={{ width: "210px", marginLeft: "10px" }}>
                  <div
                    style={{
                      position: "static",
                      width: "232px",
                      height: "24px",
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Helvetica",
                        fontStyle: "normal",
                        fontWeight: "bold",
                      }}
                    >
                      <b>
                        {item.keyword.split(" ")[0]}
                        {item.keyword.split(" ")[1]}
                        {item.keyword.split(" ")[2]}
                      </b>
                    </p>
                    <div>
                      <CheckCircleOutlined
                        style={{
                          color: "white",
                          backgroundColor: "green",
                          borderRadius: "7.5px",
                          marginLeft: "1.5px",
                        }}
                        height="15px"
                        width="15px"
                      />
                    </div>
                  </div>
                  <Row>
                    <Rate
                      style={{ width: "80px", height: "16px", order: "1" }}
                      disabled
                      defaultValue={2}
                    />
                  </Row>
                  <Row>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          height: "16px",
                          width: "16px",
                          marginTop: "10px",
                        }}
                      >
                        <Image
                          src="/directions_car_24px.png"
                          height="12px"
                          width="10.67px"
                          style={{ marginLeft: "2px" }}
                        />
                      </div>
                      <p
                        style={{
                          width: "40px",
                          height: "16px",
                          marginTop: "12px",
                          fontSize: "12px",
                        }}
                      >
                        112м
                      </p>
                      <p
                        style={{
                          width: "75px",
                          fontSize: "12px",
                          textAlign: "center",
                          marginTop: "12px",
                          fontStyle: "regular",
                        }}
                      >
                        Байршил ID
                      </p>
                      <p
                        style={{
                          width: "43px",
                          fontSize: "12px",
                          marginTop: "12px",
                        }}
                      >
                        {item.locationId}
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          marginTop: "10px",
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
                          width: "226px",
                          height: "32px",
                          fontSize: "12px",
                          fontStyle: "normal",
                          alignItems: "center",
                          textAlign: "justify",
                          marginTop: "10px",
                        }}
                      >
                        {item.keyword}
                      </p>
                    </div>
                  </Row>
                  <Row>
                    <Button
                      style={{
                        width: "105px",
                        height: "32px",
                        fontSize: "11px",
                        marginTop: "10px",
                      }}
                      onClick={() => showTimePickDrawer(item.id)}
                    >
                      Сул цаг харах
                    </Button>
                    <Button
                      style={{
                        color: "blue",
                        width: "105px",
                        height: "32px",
                        marginTop: "10px",

                        fontSize: "11px",
                      }}
                      className={`freeTimePick`}
                      onClick={() => DetailsDrawerOpen(item.id)}
                    >
                      Дэлгэрэнгүй
                    </Button>
                  </Row>
                </Col>
                <Row></Row>
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
              style={{ position: "absolute" }}
            >
              <div style={{ alignItems: "center" }}>
                <Row>
                  <Col offset={22} span={2}>
                    <CloseOutlined
                      onClick={onClose}
                      style={{ position: "absolute" }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    style={{ width: "232px", height: "24px", display: "flex" }}
                  >
                    <p
                      style={{
                        width: "210px",
                        fontSize: "20px",
                        color: " #141A29",
                        textAlign: "justify",
                      }}
                    >
                      <b>
                        {drawerItem.keyword.split(" ")[0]}
                        {drawerItem.keyword.split(" ")[1]}
                        {drawerItem.keyword.split(" ")[2]}
                      </b>
                    </p>
                    <div style={{ height: "15px", width: "15px" }}>
                      <CheckCircleOutlined
                        style={{
                          color: "white",
                          backgroundColor: "green",
                          borderRadius: "7px",
                          marginLeft: "1.5px",
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Rate
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.2px",
                  }}
                  defaultValue={3}
                />
                <Row
                  style={{ width: "210px", height: "16px", display: "flex" }}
                >
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        height: "16px",
                        width: "16px",
                        marginTop: "10px",
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
                        width: "40px",
                        height: "16px",
                        marginTop: "12px",
                        marginLeft: "24px",
                        fontSize: "12px",
                      }}
                    >
                      ● 110m
                    </p>
                    <p
                      style={{
                        width: "75px",
                        fontSize: "12px",
                        textAlign: "center",
                        marginTop: "12px",
                        fontStyle: "regular",
                      }}
                    >
                      Байршил ID
                    </p>
                    <p
                      style={{
                        width: "43px",
                        fontSize: "12px",
                        marginTop: "12px",
                      }}
                    >
                      {drawerItem.locationId}
                    </p>
                  </div>
                </Row>
                <Row>
                  <div style={{ display: "flex", marginTop: "10px" }}>
                    <div
                      style={{
                        height: "16px",
                        width: "16px",
                        marginTop: "8px",
                      }}
                    >
                      <Image
                        src="/icons/location_on_24px.png"
                        height="12.98px"
                        width="9.33px"
                      />
                    </div>
                    <p
                      style={{
                        color: "#35446D",
                        fontSize: "12px",
                        marginTop: "10px",
                        width: "376px",
                        height: "32px",
                        marginLeft: "24px",
                      }}
                    >
                      {drawerItem.keyword}
                    </p>
                  </div>
                </Row>
                <Row>
                  <div
                    className={`DetailsPane`}
                    style={{
                      width: "450px",
                      height: "48px",
                      marginLeft: "25px",
                      marginTop: "10px",
                    }}
                  >
                    <Tabs
                      defaultActiveKey="1"
                      onChange={callback}
                      // style={{ width: "100% " }}
                    >
                      <TabPane
                        tab={
                          <div style={{ width: "130px", height: "48px" }}>
                            <p
                              style={{
                                width: "110px",
                                height: "24px",
                                paddingTop: "12px",
                                marginLeft: "20px",
                                fontSize: "14px",
                                color: "#0013D4",
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
                              display: "flex ",
                              marginLeft: "27px",
                              width: "366px",
                              height: "50px",
                              justifyItems: "center",
                            }}
                            className={`SpaceIcons`}
                          >
                            {/* <p
                              style={{
                                fontSize: "20px",
                                marginLeft: "20px",
                                padding: "10px",
                              }}
                            >
                              <b>B1</b>
                            </p>
                            <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                              <Image
                                src="/icons/1) Checkbox.png"
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div
                              style{{ marginLeft: "20px", marginTop: "15px" }}
                            >
                              <Image
                                src="/icons/temdegleegui.png"
                                width="40px"
                                height="20px"
                              />
                            </div>
                            <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                              <Image
                                src="/icons/haadag.png"
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                              <Image
                                src="/icons/Small SUV.png"
                                width="40px"
                                height="40px"
                              />
                            </div>
                            <div
                              style={{ marginLeft: "20px", marginTop: "15px" }}
                            >
                              <Image
                                src="/icons/Up.png"
                                width="40px"
                                height="20px"
                              />
                            </div>
                            <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                              <Image
                                src="/keyboard_arrow_down_24px.png"
                                width="40px"
                                height="40px"
                              />
                            </div> */}
                          </div>
                        </Row>
                        <Row
                          height=" 24px"
                          style={{
                            width: "392.4px",
                            marginTop: "10px",

                            justifyItems: "center",
                          }}
                        >
                          <div
                            style={{
                              color: "#35446D",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontFamily: "Roboto",
                              fontWeight: "700",
                            }}
                          >
                            Зун цагийн хуваарь /04.01-09.31
                          </div>
                        </Row>
                        <Row>
                          <div
                            className={`SpaceIcons`}
                            style={{
                              height: "50px",
                              display: "flex",
                              marginLeft: "27px",
                              marginTop: "20px",
                              width: " 366px",
                              height: "50px",
                              justifyItems: "center",
                            }}
                          >
                            <Col
                              style={{
                                height: "50px",
                                width: "122px",
                                alignItems: "center",
                              }}
                            >
                              <div className={`priceInfoOfOneDay`}>
                                <div
                                  style={{
                                    color: "#141A29",
                                  }}
                                >
                                  {selectItem === null ? (
                                    <p
                                      style={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        textAlign: "center",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                      }}
                                    >
                                      {selectItem.priceForRenter1}
                                    </p>
                                  ) : (
                                    <p
                                      style={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        textAlign: "center",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                      }}
                                    >
                                      awdaw
                                    </p>
                                  )}
                                </div>
                                <p
                                  style={{
                                    fontStyle: "normal",
                                    fontSize: "12px",
                                    textAlign: "center",
                                    color: "#35446D",
                                  }}
                                >
                                  1 Өдөр
                                </p>
                              </div>
                            </Col>
                            <Divider
                              style={{
                                background: "#0013D4",
                                width: "2px",
                                height: "8.33px",
                                marginTop: "21px",
                              }}
                              type="vertical"
                            />
                            <Col
                              style={{
                                width: "122px",
                                height: "50px",
                                alignItems: "center",
                              }}
                            >
                              <div className={`priceInfoOfOneNight`}>
                                <div style={{ color: "#141A29" }}>
                                  {selectItem === null ? (
                                    <p
                                      style={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        textAlign: "center",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                      }}
                                    >
                                      {selectItem.priceForRenter2}
                                    </p>
                                  ) : (
                                    <p
                                      style={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        textAlign: "center",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                      }}
                                    >
                                      dwawd
                                    </p>
                                  )}
                                </div>
                                <p
                                  style={{
                                    fontStyle: "normal",
                                    fontSize: "12px",
                                    textAlign: "center",
                                    height: "16px",
                                    color: "#35446D",
                                  }}
                                >
                                  1 Шөнө
                                </p>
                              </div>
                            </Col>
                            <Divider
                              style={{
                                background: "#0013D4",
                                width: "2px",
                                height: "8.33px",
                                marginTop: "21px",
                              }}
                              type="vertical"
                            />
                            <Col>
                              <div className={`priceInfoOfFullDay`}>
                                <div style={{ color: "#141A29" }}>
                                  {selectItem === null ? (
                                    <p
                                      style={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        textAlign: "center",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                      }}
                                    >
                                      {selectItem.priceForRenter3}
                                    </p>
                                  ) : (
                                    <p
                                      style={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        textAlign: "center",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                      }}
                                    >
                                      dwawd
                                    </p>
                                  )}
                                </div>
                                <p
                                  style={{
                                    fontStyle: "normal",
                                    fontSize: "12px",
                                    textAlign: "center",

                                    height: "16px",
                                    color: "#35446D",
                                  }}
                                >
                                  Бүтэн өдөр
                                </p>
                              </div>
                            </Col>
                          </div>
                        </Row>
                        {/*Хөнгөлөлтийн хэсэг*/}
                        <Row>
                          <div
                            style={{
                              width: "392.4px",
                              height: "80px",
                              marginTop: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "84px",
                                height: "24px",
                                fontSize: "14px",
                                fontWeight: "bold",
                                fontStyle: "normal",
                                color: "#35446D",
                              }}
                            >
                              Хөнгөлөлт
                            </div>
                            {/* <Row>
                            <Col span={12} offset={2}>
                              <p style={{ fontSize: "14px", color: "#35446D" }}>
                                7 өдөр эсвэл 7 шөнө{" "}
                              </p>
                            </Col>
                            <Col span={2} offset={8}>
                              aa--{saleDatas}
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12} offset={2}>
                              <p style={{ fontSize: "14px", color: "#35446D" }}>
                                30 өдөр эсвэл 30 шөнө
                              </p>
                            </Col>
                            <Col span={4} offset={1}>
                              <p>aa--{saleDatas}</p>
                            </Col>
                          </Row> */}
                            {saleDatas === null ? (
                              <div>utga obsoo bnaa brp</div>
                            ) : (
                              <div>
                                <Row>
                                  <Col span={12} offset={2}>
                                    <p
                                      style={{
                                        fontSize: "14px",
                                        color: "#35446D",
                                      }}
                                    >
                                      7 өдөр эсвэл 7 шөнө{" "}
                                    </p>
                                  </Col>
                                  <Col span={2} offset={8}>
                                    aa--{saleDatas}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={12} offset={2}>
                                    <p
                                      style={{
                                        fontSize: "14px",
                                        color: "#35446D",
                                      }}
                                    >
                                      30 өдөр эсвэл 30 шөнө
                                    </p>
                                  </Col>
                                  <Col span={2} offset={8}>
                                    <p>aa--{saleDatas}</p>
                                  </Col>
                                </Row>
                              </div>
                            )}
                          </div>
                        </Row>
                        <Row>
                          <div onClick={onclickPick} className={`chooseButton`}>
                            <p
                              style={{
                                alignItems: "center",
                                width: "116px",
                                color: "#0013D4",
                              }}
                            >
                              Сул цаг сонгох
                            </p>
                          </div>
                        </Row>

                        <Row
                          style={{
                            fontSize: "14px",
                            color: "#35446D",
                            marginTop: "20px",
                          }}
                        >
                          <b>Тээврийн хэрэгсэл сонгох</b>
                        </Row>
                        <Row>
                          <Col>
                            <Radio.Group
                              buttonStyle="solid"
                              onChange={onChangeChooseVehicle}
                            >
                              {vehicles.map((item) => (
                                <Radio.Button
                                  key={item.value}
                                  value={item.value}
                                  className={`pickVehicle`}
                                >
                                  <div
                                    style={{ display: "flex" }}
                                    // className={`pickVehicle`}
                                  >
                                    <div
                                      style={{
                                        height: "24px",
                                        width: "24px",
                                        marginTop: "16px",
                                        marginLeft: "16px",
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
                                        marginLeft: "10px",
                                        height: "40px",
                                        width: "75px",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          height: "16px",
                                        }}
                                      >
                                        {item.label.split(" ")[0]}
                                        {item.label.split(" ")[1]}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          height: "16px",
                                          color: "#0013D4",
                                        }}
                                      >
                                        <b>{item.label.split(" ")[2]}</b>
                                      </p>
                                    </div>
                                  </div>
                                </Radio.Button>
                              ))}
                            </Radio.Group>
                          </Col>
                        </Row>
                        <Row style={{ marginTop: "10px" }}>
                          <p style={{ color: "#35446D", fontSize: "14px" }}>
                            <b>Таны сонгосон захиалга:</b>
                          </p>
                        </Row>
                        <div style={{ marginTop: "10px" }}>
                          <Row>
                            <Col style={{ fontSize: "12px" }}>Өдөр:</Col>
                            <Col style={{ fontSize: "12px" }}>2</Col>
                          </Row>
                          <Row>
                            <Col style={{ fontSize: "12px" }}>Шөнө:</Col>
                            <Col style={{ fontSize: "12px" }}>2</Col>
                          </Row>
                          <Row>
                            <Col style={{ fontSize: "12px" }}>Бүтэн өдөр:</Col>
                            <Col style={{ fontSize: "12px" }}>0</Col>
                          </Row>
                        </div>
                        <Divider />
                        <Row>
                          <Col span={20}>
                            <p>
                              <b>Нийт захиалгын төлбөр</b>
                            </p>
                          </Col>
                          <Col span={2}>0₮</Col>
                        </Row>
                        <Row
                          style={{
                            height: "50px",
                            marginTop: "10px",
                            width: "392px",
                          }}
                        >
                          <Col span={11}>
                            <Button className={`buttonGooo`}>
                              Захиалга нэмэх
                            </Button>
                          </Col>
                          <Col span={11} offset={2}>
                            <Button className={`buttonGooo`}>
                              Төлбөр төлөх
                            </Button>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane
                        tab={
                          <div style={{ width: "130px", height: "48px" }}>
                            <p
                              style={{
                                width: "140px",
                                height: "24px",
                                paddingTop: "12px",
                                fontSize: "14px",
                                textAlign: "center",
                                color: "#0013D4",
                              }}
                            >
                              Үнэлгээ
                            </p>
                          </div>
                        }
                        key="2"
                      >
                        Content of Tab Pane 2
                      </TabPane>
                      <TabPane
                        tab={
                          <div style={{ width: "130px", height: "48px" }}>
                            {" "}
                            <p
                              style={{
                                width: "140px",
                                height: "24px",
                                textAlign: "center",
                                paddingTop: "12px",
                                fontSize: "14px",
                                color: "#0013D4",
                              }}
                            >
                              Тусламж
                            </p>
                          </div>
                        }
                        key="3"
                      >
                        Content of Tab Pane 3
                      </TabPane>
                    </Tabs>
                  </div>
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
              style={{ position: "absolute" }}
            >
              <Row>
                <Col offset={22} span={2}>
                  <CloseOutlined
                    onClick={onClosePickTime}
                    style={{ position: "absolute" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={2}>
                  <ArrowLeftOutlined
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={onClosePickTime}
                  />
                </Col>
                <Col offset={4} span={8}>
                  <p style={{ color: "blue", fontSize: "20px" }}>
                    <b>Сул цаг сонгох</b>
                  </p>
                </Col>
              </Row>
              <div
                style={{
                  alignItems: "center",
                }}
              >
                <div style={{ marginTop: "30px" }}>
                  <Tabs defaultActiveKey="1">
                    <TabPane
                      key="1"
                      tab={
                        <div style={{ width: "120px", height: "32px" }}>
                          <p
                            style={{
                              width: "78px",
                              height: "24px",
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "700",
                              marginLeft: "20px",
                            }}
                          >
                            Өдөр
                          </p>
                        </div>
                      }
                    >
                      <Calendar
                        className={`timePickCalendar`}
                      />
                    </TabPane>
                    <TabPane
                      key="2"
                      tab={
                        <div style={{ width: "150px", height: "32px" }}>
                          <p
                            style={{
                              width: "78px",
                              height: "24px",
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "700",
                              marginLeft: "20px",
                            }}
                          >
                            Шөнө
                          </p>
                        </div>
                      }
                    >
                      <Calendar
                        className={`timePickCalendar`}
                      />
                    </TabPane>
                    <TabPane
                      tab={
                        <div style={{ width: "150px", height: "32px" }}>
                          <p
                            style={{
                              width: "78px",
                              height: "24px",
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: "700",
                              marginLeft: "20px",
                            }}
                          >
                            Бүтэн өдөр
                          </p>
                        </div>
                      }
                      key="3"
                    >
                      <Calendar
                        className={`timePickCalendar`}
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
                  <Col span={20}>
                    <p>
                      <b>Нийт захиалгын төлбөр</b>
                    </p>
                  </Col>
                  <Col span={2}>0₮</Col>
                </Row>
                <Button
                  style={{
                    width: "80%",
                  }}
                  className={`buttonGo`}
                >
                  Баталгаажуулах
                </Button>
              </div>
            </Drawer>
          )}
        </div>
      ))}
      {/* <Pagination onChange={onChange} total={50} /> */}
    </div>
  );
};
export default tofit;
