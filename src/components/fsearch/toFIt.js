import { Row, Col, Card, Button, DatePicker } from "antd";
import { Rate } from "antd";
import { Drawer, Divider } from "antd";
import { useState, useEffect } from "react";
import { Radio } from "antd";
import Image from "next/image";
import { CloseOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import { Tabs } from "antd";
import { callGet } from "@api/api";
import Calendar from "@components/Calendar/index";
import Item from "antd/lib/list/Item";
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
function onPanelChange(value, mode) {
  console.log(value, mode);
}

const tofit = ({ data }) => {
  const [PickTimevisible, setPickTimeVisible] = useState(false);
  const [detailVisible, setDetailsVisible] = useState(false);
  const [selectItem, setSelected] = useState();
  const [drawerItem, setDrawerItem] = useState({});
  const [dayOfNumber, setDayofNumber] = useState(0);
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
            style={{ borderRadius: "20px", marginTop: "10px" }}
            key={item.id}
          >
            <div style={{ padding: "5px" }}>
              {/* <Button style={{ marginTop: "-20px" }}>Шууд захиалах</Button> */}
              <Row>
                <Col span={12}>
                  <Image
                    src="/pexels-photo-3349460 1.png"
                    height="140px"
                    width="210px"
                  ></Image>
                </Col>
                <Col span={8} offset={1}>
                  <p style={{ fontSize: "15px" }}>
                    <b>
                      {item.keyword.split(" ")[0]}
                      {item.keyword.split(" ")[1]}
                      {item.keyword.split(" ")[2]}
                    </b>
                  </p>
                  <Col>
                    <Rate style={{ fontSize: "10px" }} defaultValue={3.5} />
                  </Col>

                  <Row>
                    <div style={{ display: "flex" }}>
                      <div>
                        <Image
                          src="/directions_car_24px.png"
                          height="12px"
                          width="12px"
                        />
                      </div>
                      <p style={{ fontSize: "12px", paddingTop: "2px" }}>
                        <p style={{ marginLeft: "10px" }}>
                          112м Байршил ID {item.locationId}
                        </p>
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div>
                        <Image
                          src="/icons/location_on_24px.png"
                          height="15px"
                          width="15px"
                        />
                      </div>
                      <Col span={8}>
                        <p
                          style={{
                            fontSize: "12px",
                            width: "150px",
                            textAlign: "justify",
                          }}
                        >
                          {item.keyword}
                        </p>
                      </Col>
                    </div>
                  </Row>
                </Col>
                <Row>
                  <Col span={14}>
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
                  </Col>
                  <Col span={8} offset={2}>
                    <Row>
                      <Col span={10}>
                        <Button
                          onClick={() => showTimePickDrawer(item.id)}
                          className={`freeTimePick`}
                        >
                          Сул цаг харах
                        </Button>
                      </Col>
                      <Col span={4} offset={10}>
                        <Button
                          className={`freeTimePick`}
                          style={{
                            color: "blue",
                          }}
                          onClick={() => DetailsDrawerOpen(item.id)}
                        >
                          Дэлгэрэнгүй
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
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
              <Row>
                <Col offset={22} span={2}>
                  <CloseOutlined
                    onClick={onClose}
                    style={{ position: "absolute" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <p
                    style={{
                      fontSize: "18px",
                      textAlign: "justify",
                    }}
                  >
                    <b>{drawerItem.keyword}</b>
                  </p>
                </Col>
              </Row>
              <Rate
                style={{
                  fontSize: "12px",
                  lineHeight: "1.2px",
                }}
                defaultValue={3}
              />

              <Col span={10}></Col>
              <Row>
                <Col span={1}>
                  <Image
                    src="/directions_car_24px.png"
                    height="15px"
                    width="15px"
                  />
                </Col>
                <Col>
                  <p style={{ fontSize: "12px" }}>● 110 m</p>
                </Col>
                <Col offset={4} span={8}>
                  <p style={{ fontSize: "12px" }}>
                    LocationID : {drawerItem.locationId}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={1}>
                  <Image
                    src="/icons/location_on_24px.png"
                    height="15px"
                    width="15px"
                  />
                </Col>
                <Col
                  span={20}
                  style={{
                    color: "#35446D",
                    fontSize: "12px",
                    marginTop: "10px",
                  }}
                >
                  {drawerItem.keyword}
                </Col>
                <Row style={{ width: "100%", marginTop: "10px" }}>
                  <Tabs
                    defaultActiveKey="1"
                    onChange={callback}
                    style={{ width: "100% " }}
                  >
                    <TabPane tab="Танилцуулга" key="1">
                      <Row>
                        <div
                          style={{
                            display: "flex ",
                            marginLeft: "10%",
                            width: "80%",
                            borderRadius: "20px",
                            backgroundColor: "#dee2e9",
                            height: "50px",
                            justifyItems: "center",
                          }}
                        >
                          <p
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
                            style={{ marginLeft: "20px", marginTop: "15px" }}
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
                          </div>
                        </div>
                      </Row>
                      <Row height=" 24px" style={{ marginTop: "25px" }}>
                        <p>
                          <b style={{ color: "#35446D", fontSize: "14px" }}>
                            Зун цагийн хуваарь /04.01-09.31
                          </b>
                        </p>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "10%",
                          marginTop: "20px",
                          width: "80%",
                          borderRadius: "20px",
                          backgroundColor: "#dee2e9",
                          height: "50px",
                          justifyItems: "center",
                        }}
                      >
                        <Col span={6} offset={2}>
                          <p style={{ color: "#141A29" }}>
                            <b>
                              {selectItem === null ? (
                                selectItem.priceForRenter1
                              ) : (
                                <p>dwawd</p>
                              )}
                            </b>
                          </p>
                          <p>1 Өдөр</p>
                        </Col>
                        <Col span={6} offset={2}>
                          <p style={{ color: "#141A29" }}>
                            <b>
                              {selectItem === null ? (
                                selectItem.priceForRenter2
                              ) : (
                                <p>dwawd</p>
                              )}
                            </b>
                          </p>
                          <p>1 Шөнө</p>
                        </Col>
                        <Col span={6} offset={2}>
                          <p style={{ color: "#141A29" }}>
                            <b>
                              {selectItem === null ? (
                                selectItem.priceForRenter3
                              ) : (
                                <p>dwawd</p>
                              )}
                            </b>
                          </p>
                          <p>Бүтэн өдөр</p>
                        </Col>
                      </Row>
                      <Row height=" 24px" style={{ marginTop: "25px" }}>
                        <p>
                          <b style={{ color: "#35446D", fontSize: "14px" }}>
                            Хөнгөлөлт
                          </b>
                        </p>
                      </Row>

                      {saleDatas === null ? (
                        <div>utga obsoo bnaa brp</div>
                      ) : (
                        <div>
                          <Row>
                            <Col span={12} offset={2}>
                              <p style={{ fontSize: "14px", color: "#35446D" }}>
                                7 өдөр эсвэл 7 шөнө{" "}
                              </p>
                            </Col>
                            <Col span={4} offset={1}>
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
                          </Row>
                        </div>
                      )}
                      <Row>
                        <div
                          onClick={onclickPick}
                          style={{
                            width: "600px",
                            height: "40px",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                          className={`chooseButton`}
                        >
                          <div style={{ justifyItems: "center" }}>
                            <p
                              style={{
                                marginLeft: "40%",
                                width: "40%",
                                marginTop: "10px",
                              }}
                            >
                              Сул цаг сонгох
                            </p>
                          </div>
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
                                style={{ borderRadius: "20px" }}
                              >
                                <div style={{ display: "flex" }}>
                                  <div>
                                    <img
                                      src="/directions_car_24px.png"
                                      height="24px"
                                      width="24px"
                                      style={{ marginTop: "10px" }}
                                    />
                                  </div>
                                  <div style={{ marginLeft: "10px" }}>
                                    <p style={{ fontSize: "12px" }}>
                                      {item.label.split(" ")[0]}
                                      {item.label.split(" ")[1]}
                                    </p>
                                    <p
                                      style={{
                                        fontSize: "12px",
                                        color: "#0013D4",
                                      }}
                                    >
                                      {item.label.split(" ")[2]}
                                    </p>
                                  </div>
                                </div>
                              </Radio.Button>
                            ))}
                          </Radio.Group>
                        </Col>
                      </Row>
                      <Row>
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
                      <Row style={{ height: "50px" }}>
                        <Col span={10}>
                          <Button className={`buttonGooo`}>
                            Захиалга нэмэх
                          </Button>
                        </Col>
                        <Col span={10} offset={4}>
                          <Button className={`buttonGooo`}>Төлбөр төлөх</Button>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tab="Үнэлгээ" key="2">
                      Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Тусламж" key="3">
                      Content of Tab Pane 3
                    </TabPane>
                  </Tabs>
                </Row>
              </Row>
            </Drawer>
          )}
          {chooseTimeVisible && (
            <Drawer
              style={{ height: "100vh" }}
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
              <div style={{ padding: "10%" }}>
                <Tabs defaultActiveKey="1">
                  <TabPane key="1" tab="Өдөр"></TabPane>
                  <TabPane key="2" tab="Шөнө"></TabPane>
                  <TabPane key="3" tab="Бүтэн өдөр"></TabPane>
                </Tabs>
                <Calendar setDayOfNumber={setDayofNumber} />
                <Row>
                  <p>
                    <b>Таны сонгосон захиалга </b>
                  </p>
                </Row>
                <Row>
                  <Col>Өдөр</Col>
                  <Col>2</Col>
                </Row>
                <Row>
                  <Col>Шөнө</Col>
                  <Col></Col>
                </Row>
                <Row>
                  <Col>Бүтэн өдөр</Col>
                  <Col></Col>
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