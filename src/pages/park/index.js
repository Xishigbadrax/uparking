import { useContext, useEffect, useState } from "react";
import { callGet, sList } from "@api/api";
import { showMessage } from "../../utils/message";
import {
  Col,
  Row,
  Button,
  DatePicker,
  Input,
  Select,
  Layout,
  Tabs,
  Empty,
  Card,
  Rate,
  Image,
  Drawer,
  AutoComplete,
  Divider,
} from "antd";
import Context from "@context/Context";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { dateTimePickerLocale } from "@constants/constants";
import ListItem from "@components/ListItem";
import Helper from "@utils/helper";
import {
  LeftOutlined,
  DownOutlined,
  UpOutlined,
  CodeSandboxCircleFilled,
} from "@ant-design/icons";
const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
const style = {
  border: "1px solid #DEE2E9",
  borderRadius: "8px",
  padding: "5px 10px",
};

const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const {
  MarkerClusterer,
} = require("react-google-maps/lib/components/addons/MarkerClusterer");

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;
const { Header, Sider, Content } = Layout;

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyD15334amUTZVfPVXv7p989Mew8iMmAoA0&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(clickedMarkers);
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap defaultZoom={13} defaultCenter={props.defaultCenter}>
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map((marker) => (
        <Marker
          key={marker.key}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

const Dashboard = () => {
  const ctx = useContext(Context);
  const [dashboardData, setDashboardData] = useState({});
  const [markers, setMarkers] = useState([]);
  const [inputData, setInputdata] = useState("aa");
  const [searchedData, setSearchedData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndtDate] = useState();
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [parkingSpaceList, setParkingSpaceList] = useState([]);
  const [parkingUpDownArrow, setParkingUpDownArrow] = useState(false);
  const [seemoreUpDownArrow, setSeemoreUpDownArrow] = useState(false);
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 47.91909306508191,
    lng: 106.91761127921768,
  });

  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [visibleDrawerMore, setVisibleDrawerMore] = useState(false);
  const [parkingObject, setParkingObject] = useState({});
  const showDrawer = async (item) => {
    console.log(item, "itemitem");
    setParkingSpaceList(item.parkingSpaceList.content);
    setVisibleDrawer(true);
  };
  const showDrawerMore = async (item) => {
    console.log(item, "item");
    // const res = await callGet(`/booking/id/test?id=${orderId}&asWho=1`);
    const res = await callGet(
      `/parkingspace?parkingSpaceId=${item.parkingSpaceId}`
    );
    if (!res || res === undefined) {
      showMessage(messageType.FAILED.type, defaultMsg.dataError);
      return;
    }
    console.log(res, "resres");
    setParkingObject(res);
    setVisibleDrawerMore(true);
  };

  const onCloseDrawer = () => {
    console.log("haagldaa");
    setVisibleDrawer(false);
  };

  const onCloseDrawerMore = () => {
    setVisibleDrawerMore(false);
  };

  useEffect(() => {
    const today = moment(new Date()).format("YYYY-MM-DD");
    setEndtDate(today);
    getData(startDate, today);
  }, []);
  useEffect(() => {
    setParkingObject(parkingObject);
  }, [parkingObject]);

  const getData = async (start_date, end_date) => {
    console.log("dashboard");
    ctx.setIsLoading(true);
    if (ctx.checkPermission("DASHBOARD_CARD")) {
      // const data = await sList({
      //   code: apiList.dashboardCard, defaultParams: [{ key: "start_date", value: start_date }, { key: "end_date", value: end_date }]
      // });
      const data = [];
      setDashboardData(data?.data[0]);
    }
    ctx.setIsLoading(false);
  };
  const handleDateChange = (value, dateString) => {
    if (dateString) {
      setStartDate(dateString[0]);
      setEndtDate(dateString[1]);
      getData(dateString[0], dateString[1]);
    }
  };

  const onChange = (value, dateString) => {
    console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const callback = (key) => {
    console.log(key);
  };
  const onChangeAddress = (e) => {
    setInputdata(e.target.value);
  };

  const onSearch = async () => {
    if (inputData) {
      const data = await callGet(`/search/keyword?syllable=${inputData}`);
      const cutData = data.slice(0, 20);
      console.log(cutData, "dataaaaaa");
      setSearchedData(cutData);
    } else {
      const data = await callGet(
        `/search/test/input?keywordId=2&endDate=${endDate}&startDate=${startDate}&keywordId=0`
      );
    }
  };

  const onSelectAuto = async (value) => {
    if (value && value != "") {
      const splitedvalue = value.split(" ");
      if (splitedvalue.length > 0) {
        const keywordId = splitedvalue[0];
        const res = await callGet(`/search/input/test?keywordId=${keywordId}`);
        if (!res || res === undefined) {
          showMessage(messageType.FAILED.type, defaultMsg.dataError);
          return;
        } else {
          console.log(res, "resresres22111111");
          const locationarray = [];
          if (res.length > 0) {
            res.forEach((item, key) => {
              locationarray.push({
                latitude: item.latitude,
                longitude: item.longitude,
                key: key,
              });
            });
            setMarkers(locationarray);
            setDefaultCenter({
              lat: locationarray[0].latitude,
              lng: locationarray[0].longitude,
            });
            // console.log(res[0].parkingSpaceList.content)
            setSearchedData(res);
          } else {
            setMarkers([]);
            setDefaultCenter({
              lat: 47.91909306508191,
              lng: 106.91761127921768,
            });
            setSearchedData([]);
          }
          // console.log(res, "reseeeeeeeeeeee");
        }
      }
    }
  };

  const searchResult = (list) =>
    list.map((item) => {
      return {
        value: item.id + " " + item.keyword,
      };
    });
  const onSearchAuto = async (searchText) => {
    if (searchText.length > 0) {
      const data = await callGet(`/search/keyword?syllable=${searchText}`);
      const cutData = data.slice(0, 20);
      console.log(cutData, "resresres111");
      setDataSource(searchText ? searchResult(cutData, searchText) : []);
    } else {
      setDataSource([]);
    }
  };

  return (
    <Layout>
      <Header>
        <Row>
          <Col span={8}>
            <AutoComplete
              dataSource={dataSource}
              style={{ width: "100%" }}
              onSelect={onSelectAuto}
              onSearch={onSearchAuto}
              placeholder="Байршил хайх"
            />
            {/* <Input
              placeholder="Хаяг"
              onChange={onChangeAddress}
              prefix={<SearchOutlined />}
            /> */}
          </Col>
          {/* <Col span={4}>
            <Select defaultValue="day" style={{ width: 120 }}>
              <Option value="day">Өдөр</Option>
              <Option value="night">Шөнө</Option>
            </Select>
          </Col>
          <Col span={8}>
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
              locale={dateTimePickerLocale}
            />
          </Col>
          <Col span={4}>
            <Button htmlType="submit" type="primary" onClick={onSearch} block>
              Хайх
            </Button>
          </Col> */}
        </Row>
      </Header>
      <Layout style={{ background: "#F8FAFC!important" }}>
        <Content>
          <div style={{ height: "100vh", width: "100%" }}>
            <MapWithAMarkerClusterer
              markers={markers}
              defaultCenter={defaultCenter}
            />
          </div>
        </Content>
        <Sider width={550}>
          <Tabs defaultActiveKey="1" className="searchTab" onChange={callback}>
            <TabPane tab="Тохирох" key="1">
              {searchedData && searchedData.length > 0 ? (
                searchedData.map((item) => (
                  <Card className="searchListItem" key={item.residenceBlockId}>
                    <Row>
                      <Col span="12" className="imageSide">
                        <div>
                          <Image
                            src="/pexels-photo-3349460 1.png"
                            width="209.58px"
                            preview={false}
                          ></Image>
                        </div>
                      </Col>
                      <Col span="12" className="descriptionSide">
                        <div className="title">{item.residenceName}</div>

                        <Rate className="rateing" value={3} />

                        <Row>
                          <Col span={10} className="distance">
                            • 110m
                          </Col>
                          <Col span={14} className="id">
                            Байршил ID: {item.residenceBlockCode}
                          </Col>
                        </Row>
                        <Row className="address">
                          <Col
                            span="2"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              preview={false}
                              width="10px"
                              src={"/images/icon/location_on.png"}
                            ></Image>
                          </Col>
                          <Col span="22">{item.address}</Col>
                        </Row>
                        <div>
                          <div className="totalText">Нийт үнэ</div>
                          <div className="totalAmount">-</div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          {/* {item.parkingSpaceList.content.map((element, key) => ( */}
                          <Button type="info" onClick={() => showDrawer(item)}>
                            Дэлгэрэнгүй
                          </Button>
                          {/* ))} */}
                        </div>
                      </Col>
                    </Row>
                  </Card>
                ))
              ) : (
                <Empty description={<span>Өгөгдөл байхгүй</span>} />
              )}
            </TabPane>
            <TabPane tab="Хамгийн хямд" key="2">
              Хамгийн хямд
            </TabPane>
            <TabPane tab="Хамгийн ойр" key="3">
              Хамгийн ойр
            </TabPane>
          </Tabs>
        </Sider>
      </Layout>
      <Drawer
        title="Зогсоолын товч мэдээлэл"
        placement="right"
        width={600}
        onClose={onCloseDrawer}
        visible={visibleDrawer}
      >
        {parkingSpaceList.map((element, key) => (
          <div key={key}>
            <div style={{ display: "flex" }}>
              <div>
                <div>{element.isVerified ? "Баталгаажсан" : ""}</div>

                {element.parkingSpaceGarageNumber ? (
                  <div>
                    parkingSpaceGarageNumber:{element.parkingSpaceGarageNumber}
                  </div>
                ) : null}
                {element.parkingSpaceId ? (
                  <div>parkingSpaceId: {element.parkingSpaceId}</div>
                ) : null}
                {element.parkingSpaceImage ? (
                  <div>Зураг: {element.parkingSpaceImage}</div>
                ) : null}
                {element.price ? <div>Үнэ: {element.price}</div> : null}
                {element.spaceStatus ? (
                  <div>spaceStatus: {element.spaceStatus}</div>
                ) : null}
                {element.totalRating ? (
                  <div>totalRating: {element.totalRating}</div>
                ) : null}
                {element.typeOther ? (
                  <div> typeOther: {element.typeOther}</div>
                ) : null}
                {element.uparkingNumber ? (
                  <div>uparkingNumber: {element.uparkingNumber}</div>
                ) : null}
              </div>
              <div style={{ paddingLeft: "25px" }}>
                {element && element.floorNumber ? (
                  <div style={{ marginRight: "13px", display: "flex" }}>
                    <Image
                      preview={false}
                      width={24}
                      src={IMG_URL + element.floorNumber}
                    />
                    <div style={{ marginLeft: "25px" }}>
                      <span>{element.floorNumberLabel}</span>
                    </div>
                  </div>
                ) : null}
                {element && element.entranceLock ? (
                  <div style={{ marginRight: "13px", display: "flex" }}>
                    <Image
                      preview={false}
                      width={24}
                      src={IMG_URL + element.entranceLock}
                    />
                    <div style={{ marginLeft: "25px" }}>
                      <span>{element.entranceLockLabel}</span>
                    </div>
                  </div>
                ) : null}
                {element && element.isNumbering ? (
                  <div style={{ marginRight: "13px", display: "flex" }}>
                    <Image
                      preview={false}
                      width={24}
                      src={IMG_URL + element.isNumbering}
                    />
                    <div style={{ marginLeft: "25px" }}>
                      <span>{element.isNumberingLabel}</span>
                    </div>
                  </div>
                ) : null}
                {element && element.capacity ? (
                  <div style={{ marginRight: "13px", display: "flex" }}>
                    <Image
                      preview={false}
                      width={24}
                      src={IMG_URL + element.capacity}
                    />
                    <div style={{ marginLeft: "25px" }}>
                      <span>{element.capacityLabel}</span>
                    </div>
                  </div>
                ) : null}
                {element && element.type ? (
                  <div style={{ marginRight: "13px", display: "flex" }}>
                    <Image
                      preview={false}
                      width={24}
                      src={IMG_URL + element.type}
                    />
                    <div style={{ marginLeft: "25px" }}>
                      <span>{element.typeLabel}</span>
                    </div>
                  </div>
                ) : null}
                {element && element.returnRoutes ? (
                  <div style={{ marginRight: "13px", display: "flex" }}>
                    <Image
                      preview={false}
                      width={24}
                      src={IMG_URL + element.returnRoutes}
                    />
                    <div style={{ marginLeft: "25px" }}>
                      <span>{element.returnRoutesLabel}</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <Button type="info" onClick={() => showDrawerMore(element)}>
                Дэлгэрэнгүй
              </Button>
              <Divider />
            </div>
          </div>
        ))}
      </Drawer>

      <Drawer
        title="Зогсоолын дэлгэрэнгүй мэдээлэл"
        placement="right"
        width={600}
        onClose={onCloseDrawerMore}
        visible={visibleDrawerMore}
      >
        <div>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Танилцуулга" key="1">
              {parkingObject ? (
                <div>
                  {console.log("endeeeeeeeeeeeee")}
                  <div>
                    <Row>
                      <Col span={12}>Residence</Col>
                      <Col
                        span={12}
                        style={{
                          color: "#0013D4",
                          textAlign: "right",
                          fontWeight: "bold",
                        }}
                      >
                        {!Helper.isNullOrEmpty(parkingObject.residenceName)
                          ? parkingObject.residenceName
                          : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>Floor number</Col>
                      <Col
                        span={12}
                        style={{
                          color: "#0013D4",
                          textAlign: "right",
                          fontWeight: "bold",
                        }}
                      >
                        {!Helper.isNullOrEmpty(parkingObject.floorNumberLabel)
                          ? parkingObject.floorNumberLabel
                          : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>Garage number</Col>
                      <Col
                        span={12}
                        style={{
                          color: "#0013D4",
                          textAlign: "right",
                          fontWeight: "bold",
                        }}
                      >
                        {!Helper.isNullOrEmpty(
                          parkingObject.parkingSpaceGarageNumber
                        )
                          ? parkingObject.parkingSpaceGarageNumber
                          : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>Uparking number</Col>
                      <Col
                        span={12}
                        style={{
                          color: "#0013D4",
                          textAlign: "right",
                          fontWeight: "bold",
                        }}
                      >
                        {!Helper.isNullOrEmpty(parkingObject.uparkingNumber)
                          ? parkingObject.uparkingNumber
                          : null}
                      </Col>
                    </Row>
                  </div>
                  <Row style={{ padding: "20px 10px" }}>
                    <Col
                      span={24}
                      style={{
                        background: "rgba(222, 226, 233, 0.2)",
                        borderRadius: "24px",
                        padding: "13px 23px",
                        display: "inline-flex",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      {parkingObject && parkingObject.floorNumber ? (
                        <div style={{ marginRight: "13px" }}>
                          <Image
                            preview={false}
                            width={24}
                            src={IMG_URL + parkingObject.floorNumber}
                          />
                        </div>
                      ) : null}
                      {parkingObject && parkingObject.entranceLock ? (
                        <div style={{ marginRight: "13px" }}>
                          <Image
                            preview={false}
                            width={24}
                            src={IMG_URL + parkingObject.entranceLock}
                          />
                        </div>
                      ) : null}
                      {parkingObject && parkingObject.isNumbering ? (
                        <div style={{ marginRight: "13px" }}>
                          <Image
                            preview={false}
                            width={24}
                            src={IMG_URL + parkingObject.isNumbering}
                          />
                        </div>
                      ) : null}
                      {parkingObject && parkingObject.capacity ? (
                        <div style={{ marginRight: "13px" }}>
                          <Image
                            preview={false}
                            width={24}
                            src={IMG_URL + parkingObject.capacity}
                          />
                        </div>
                      ) : null}
                      {parkingObject && parkingObject.type ? (
                        <div style={{ marginRight: "13px" }}>
                          <Image
                            preview={false}
                            width={24}
                            src={IMG_URL + parkingObject.type}
                          />
                        </div>
                      ) : null}
                      {parkingObject && parkingObject.returnRoutes ? (
                        <div style={{ marginRight: "13px" }}>
                          <Image
                            preview={false}
                            width={24}
                            src={IMG_URL + parkingObject.returnRoutes}
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
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      {parkingUpDownArrow ? (
                        <div>
                          {parkingObject && parkingObject.floorNumber ? (
                            <div
                              style={{ marginRight: "13px", display: "flex" }}
                            >
                              <Image
                                preview={false}
                                width={24}
                                src={IMG_URL + parkingObject.floorNumber}
                              />
                              <div style={{ marginLeft: "25px" }}>
                                <span>{parkingObject.floorNumberLabel}</span>
                              </div>
                            </div>
                          ) : null}
                          {parkingObject && parkingObject.entranceLock ? (
                            <div
                              style={{ marginRight: "13px", display: "flex" }}
                            >
                              <Image
                                preview={false}
                                width={24}
                                src={IMG_URL + parkingObject.entranceLock}
                              />
                              <div style={{ marginLeft: "25px" }}>
                                <span>{parkingObject.entranceLockLabel}</span>
                              </div>
                            </div>
                          ) : null}
                          {parkingObject && parkingObject.isNumbering ? (
                            <div
                              style={{ marginRight: "13px", display: "flex" }}
                            >
                              <Image
                                preview={false}
                                width={24}
                                src={IMG_URL + parkingObject.isNumbering}
                              />
                              <div style={{ marginLeft: "25px" }}>
                                <span>{parkingObject.isNumberingLabel}</span>
                              </div>
                            </div>
                          ) : null}
                          {parkingObject && parkingObject.capacity ? (
                            <div
                              style={{ marginRight: "13px", display: "flex" }}
                            >
                              <Image
                                preview={false}
                                width={24}
                                src={IMG_URL + parkingObject.capacity}
                              />
                              <div style={{ marginLeft: "25px" }}>
                                <span>{parkingObject.capacityLabel}</span>
                              </div>
                            </div>
                          ) : null}
                          {parkingObject && parkingObject.type ? (
                            <div
                              style={{ marginRight: "13px", display: "flex" }}
                            >
                              <Image
                                preview={false}
                                width={24}
                                src={IMG_URL + parkingObject.type}
                              />
                              <div style={{ marginLeft: "25px" }}>
                                <span>{parkingObject.typeLabel}</span>
                              </div>
                            </div>
                          ) : null}
                          {parkingObject && parkingObject.returnRoutes ? (
                            <div
                              style={{ marginRight: "13px", display: "flex" }}
                            >
                              <Image
                                preview={false}
                                width={24}
                                src={IMG_URL + parkingObject.returnRoutes}
                              />
                              <div style={{ marginLeft: "25px" }}>
                                <span>{parkingObject.returnRoutesLabel}</span>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <div style={{ margin: "30px 0px" }}>
                    <Button type="default" size={"large"} block>
                      Зогсоолыг харах
                    </Button>
                  </div>
                  <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                      <div style={style}>
                        <div style={{ color: "#0013D4" }}>Эхлэх хугацаа</div>
                        {parkingObject && parkingObject.startDateTime ? (
                          <div>
                            {Helper.removeSec(parkingObject.startDateTime)}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                      <div style={style}>
                        <div style={{ color: "#0013D4" }}>Дуусах хугацаа</div>
                        {parkingObject && parkingObject.endDateTime ? (
                          <div>
                            {Helper.removeSec(parkingObject.endDateTime)}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "30px" }}>
                    <Col
                      span={24}
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        lineHeight: "24px",
                      }}
                    >
                      <div style={{ color: "#0013D4" }}>Нийт захиалга</div>
                      {parkingObject.totalAtDay ? (
                        <div style={{ margin: "10px 0px", display: "flex" }}>
                          <Image
                            preview={false}
                            width={24}
                            src={"/images/icon/brightness_5_24px.png"}
                          ></Image>
                          <div style={{ color: "#35446d", marginLeft: "10px" }}>
                            Өдөр {parkingObject.totalAtDay}
                          </div>
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row style={{ padding: "20px 10px" }}>
                    <Col
                      span={24}
                      style={{
                        background: "rgba(222, 226, 233, 0.2)",
                        borderRadius: "24px",
                        padding: "13px 23px",
                        display: "inline-flex",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "#0013D4",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        Захиалгын дэлгэрэнгүй харах
                      </div>
                      <div style={{ marginLeft: "40px" }}>
                        {!seemoreUpDownArrow ? (
                          <DownOutlined
                            onClick={() => setSeemoreUpDownArrow(true)}
                          />
                        ) : (
                          <UpOutlined
                            onClick={() => setSeemoreUpDownArrow(false)}
                          />
                        )}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      {seemoreUpDownArrow ? (
                        <div>
                          {parkingObject.bookingDetail &&
                          parkingObject.bookingDetail
                            ? parkingObject.bookingDetail.map((book) => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <div>
                                    <div
                                      style={{
                                        color: "#0013D4",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Эхлэх
                                    </div>
                                    <div>
                                      {Helper.removeSec(book.startDate)}
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      alignItems: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Image
                                      preview={false}
                                      width={24}
                                      src={
                                        "/images/icon/arrow_right_alt_24px.png"
                                      }
                                    />
                                  </div>
                                  <div>
                                    <div
                                      style={{
                                        color: "#0013D4",
                                        textAlign: "right",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Дуусах
                                    </div>
                                    <div>{Helper.removeSec(book.endDate)}</div>
                                  </div>
                                </div>
                              ))
                            : null}
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "30px" }}>
                    <Col
                      span={24}
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        lineHeight: "24px",
                      }}
                    >
                      <div style={{ color: "#0013D4" }}>Тээврийн хэрэгсэл</div>
                      {parkingObject.totalAtDay ? (
                        <Row style={{ marginTop: "20px" }}>
                          <Col
                            style={{
                              borderRadius: "8px",
                              border: "solid 1px #0013D4",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ padding: "20px" }}>
                              <Image
                                preview={false}
                                width={24}
                                src={"/images/icon/directions_car.png"}
                              ></Image>
                            </div>
                            <div style={{ paddingRight: "20px" }}>
                              <div style={{ color: "#000000" }}>
                                {parkingObject.vehicleMaker},{" "}
                                {parkingObject.vehicleModel}
                              </div>
                              <div
                                style={{
                                  color: "#0013D4",
                                  fontFamily: "Roboto-Bold",
                                  textTransform: "uppercase",
                                }}
                              >
                                {parkingObject.vehicleNumber}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ) : null}
                    </Col>
                  </Row>
                  {(() => {
                    if (parkingObject.bookingStatus === "CONFIRMED") {
                      return (
                        <div style={{ margin: "30px 0px" }}>
                          <Button
                            type="danger"
                            size={"large"}
                            block
                            onClick={handleClickCancelOrder}
                          >
                            Захиалга цуцлах
                          </Button>
                        </div>
                      );
                    } else if (parkingObject.bookingStatus === "SAVED") {
                      return (
                        <div>
                          <Divider />
                          <Row style={{ marginTop: "30px" }}>
                            <Col
                              span={12}
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                                lineHeight: "24px",
                              }}
                            >
                              <div>Нийт захиалгын төлбөр:</div>
                            </Col>
                            <Col
                              span={12}
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                                lineHeight: "24px",
                                textAlign: "right",
                                fontSize: "20px",
                              }}
                            >
                              {parkingObject.totalPrice
                                ? Helper.formatValueReverse(
                                    parkingObject.totalPrice
                                  )
                                : 0}
                              ₮
                            </Col>
                          </Row>
                          <Row style={{ margin: "30px 0px" }}>
                            <Col span={24}>
                              <Tabs defaultActiveKey="1">
                                <TabPane tab="Хэтэвч" key="1">
                                  <div
                                    style={{
                                      backgroundImage:
                                        "url(/images/wallet-background.png",
                                      width: "100%",
                                      height: "244px",
                                      backgroundRepeat: "no-repeat",
                                      backgroundSize: "cover",
                                    }}
                                  >
                                    <div style={{ padding: "25px" }}>
                                      <Image
                                        src={"/images/logo-white.png"}
                                        width="94px"
                                      />
                                      <div style={{ marginTop: "50px" }}>
                                        <div
                                          style={{
                                            fontSize: "16px",
                                            lineHeight: "16px",
                                            textAlign: "right",
                                            letterSpacing: "0.4px",
                                            color: "#FFFFFF",
                                          }}
                                        >
                                          Нийт дүн:
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "26px",
                                            lineHeight: "28px",
                                            textAlign: "right",
                                            letterSpacing: "0.4px",
                                            color: "#FFFFFF",
                                          }}
                                        >
                                          {parkingObject.totalPrice
                                            ? Helper.formatValueReverse(
                                                parkingObject.totalPrice
                                              )
                                            : 0}
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "16px",
                                            lineHeight: "16px",
                                            textAlign: "right",
                                            letterSpacing: "0.4px",
                                            color: "#FFFFFF",
                                          }}
                                        >
                                          Бонус:
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "26px",
                                            lineHeight: "28px",
                                            textAlign: "right",
                                            letterSpacing: "0.4px",
                                            color: "#FFFFFF",
                                          }}
                                        >
                                          {parkingObject.totalPrice
                                            ? Helper.formatValueReverse(
                                                parkingObject.totalPrice
                                              )
                                            : 0}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <Row style={{ marginTop: "35px" }}>
                                    <Col span={24}>
                                      <Button
                                        type="primary"
                                        size={"large"}
                                        block
                                      >
                                        Төлөх
                                      </Button>
                                    </Col>
                                  </Row>
                                </TabPane>
                                <TabPane tab="Дансаар" key="2">
                                  Дансаар
                                </TabPane>
                                <TabPane tab="Нэхэмжлэх" key="3">
                                  Нэхэмжлэх
                                </TabPane>
                              </Tabs>
                            </Col>
                          </Row>
                        </div>
                      );
                    } else if (parkingObject.bookingStatus === "HISTORY") {
                      return (
                        <div style={{ margin: "30px 0px" }}>
                          <Button type="primary" size={"large"} block>
                            Зогсоолыг үнэлэх
                          </Button>
                        </div>
                      );
                    }
                  })()}
                </div>
              ) : null}
            </TabPane>
            <TabPane tab="Үнэлгээ" key="2">
              Үнэлгээ
            </TabPane>
            <TabPane tab="Тусламж" key="3">
              Тусламж
            </TabPane>
          </Tabs>
        </div>
      </Drawer>
    </Layout>
  );
};

export default Dashboard;
