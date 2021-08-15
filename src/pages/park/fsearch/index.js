import { useContext, useEffect, useState } from "react";
import { callGet, sList } from "@api/api";
import { Card, Col, Row, Button, DatePicker, Input, Select, Modal } from "antd";
import Context from "@context/Context";
import moment from "moment";
import Data from "../../../data/googlrMapData.json";
import {
  SearchOutlined,
  DownOutlined,
  TrademarkOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import { Tabs } from "antd";
import ToFit from "@components/fsearch/toFIt";
import Closest from "@components/fsearch/closest";
import Farthest from "@components/fsearch/farthest";
import GoogleMapReact from "google-map-react";
import { dateTimePickerLocale } from "@constants/constants";
const { TabPane } = Tabs;
const IndexPageMoreInfo = dynamic(
  () => import("@components/IndexPageMoreInfo"),
  { ssr: false }
);
const { RangePicker } = DatePicker;
const { Option } = Select;

const AnyReactComponent = ({ text }) => (
  <div style={{ height: "20px", width: "50px" }} className={`buttonGo`}>
    <p>{text}</p>
  </div>
);
const fsearch = () => {
  const GOOGLE_API = process.env.NEXT_GOOGLE_API;
  const ctx = useContext(Context);
  const [dashboardData, setDashboardData] = useState({});
  const [parkRegModalVisible, setParkRegModalVisible] = useState(true);
  const [seeMore, setSeeMore] = useState(false);
  const [longitude, setLongitude] = useState(106.905746);
  const [latitude, setLatitude] = useState(47.886398);
  const [selectLat, setSelectLate] = useState();
  const [selectLng, setSelectLng] = useState();
  const [startDate, setStartDate] = useState();
  // const [keywordId, setKeywordId] = useState({});
  const [type, setType] = useState({});
  const [endDate, setEndtDate] = useState();
  const [spaceData, setSpacedata] = useState([]);
  const [options, setOptions] = useState([]);
  const dateFormat = "YYYY-MM-DD";
  const [inputData, setInputdata] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };
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
  useEffect(() => {
    // let keywors = data[1].keyword.split(" ");
    // console.log(data);
    // console.log(keywors);
    // const today = moment(new Date()).format("YYYY-MM-DD");
    // setEndtDate(today);
    // getData(startDate, today);
  }, []);
  const handleStartDateChange = (value, dateString) => {
    if (dateString) {
      setStartDate(dateString);
    }
  };
  const handleEndDateChange = (value, dateString) => {
    if (dateString) {
      setEndtDate(dateString);
      getData(dateString[0], dateString[1]);
    }
  };
  const onChangeAddress = async (e) => {
    console.log(e.target.value);
    setInputdata(e.target.value);
    // const listData = await callGet(
    //   `/search/keyword/?syllable=${e.target.value}`
    // );
    filterofSearchData(listData);
    console.log(options);
  };
  const onChangeType = (e) => {
    console.log(e);
    setType(e);
    console.log(startDate, endDate, type);
  };
  const onMapClick = async (e) => {
    console.log(e);
    setSelectLate(e.lat);
    setSelectLng(e.lng);
    const locations = await callGet(
      `/search/location/test?latitude=${e.lat}&longitude=${e.lng}`
    );
    console.log(locations);
    setSpacedata(locations);
  };
  // const onSearchingList = async (e) => {
  //   console.log(e);
  //   const listData = await callGet(`/search/keyword/?syllable=${e}`);
  //   console.log(listData);
  // };
  const onSearch = async () => {
    if (inputData) {
      const data = await callGet(`/search/keyword/?syllable=${inputData}`);
      const cutData = data.slice(0, 20);
      console.log(cutData);
      setSearchedData(cutData);
    } else {
      const data = await callGet(
        `/search/test/input?keywordId=2&endDate=${endDate}&startDate=${startDate}&keywordId=0`
      );
      console.log(data);
    }
  };
  function filterofSearchData(array) {
    array.map((item) => {
      setOptions(...options, item.keyword);
    });
  }
  function onOk(value) {
    console.log("onOk: ", value);
  }
  function callback(key) {
    console.log(key);
  }

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Row style={{ padding: "20px" }}>
        <Col span={9}>
          <Input
            style={{
              height: "50px",
              borderRadius: "15px",
            }}
            // option={options}
            onChange={onChangeAddress}
            // onSearch={onSearchingList}
            placeholder="Хаяг"
            size="large"
            height="70px"
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col
          span={3}
          style={{
            height: "50px",
            borderRadius: "15px",
            marginLeft: "10px",
            border: "1px solid #DCDCDC",
          }}
        >
          <div style={{ marginLeft: "10px", paddingRight: "5px" }}>
            <p style={{ fontSize: "10px" }}>Захиалгын төрөл</p>
            <Select
              style={{ width: "100%" }}
              placeholder="Сонгох"
              onChange={onChangeType}
            >
              <Option value="day">Өдөр</Option>
              <Option value="night">Шөнө</Option>
            </Select>
          </div>
        </Col>
        <Col
          span={3}
          style={{
            height: "50px",
            borderRadius: "15px",
            marginLeft: "10px",
            border: "1px solid #DCDCDC",
          }}
        >
          <div style={{ marginLeft: "10px", paddingRight: "5px" }}>
            <p style={{ fontSize: "10px", color: "gray" }}>
              Эхлэх хугацаа сонгох
            </p>
            <DatePicker
              style={{ width: "100%" }}
              onChange={handleStartDateChange}
              placeholder="Сонгох"
              suffixIcon={
                <div>
                  <DownOutlined />
                </div>
              }
            ></DatePicker>
          </div>
        </Col>
        <Col
          span={3}
          style={{
            height: "50px",
            borderRadius: "15px",
            marginLeft: "10px",
            border: "1px solid #DCDCDC",
          }}
        >
          <div style={{ paddingRight: "5px", marginLeft: "10px" }}>
            <p style={{ fontSize: "10px" }}>Дуусах хугацаа сонгох</p>
            <DatePicker
              style={{ width: "100%" }}
              onChange={handleEndDateChange}
              placeholder="Сонгох"
              suffixIcon={
                <div>
                  <DownOutlined />
                </div>
              }
            ></DatePicker>
          </div>
        </Col>
        <Col
          span={4}
          style={{ marginLeft: "10px" }}
          size="large"
          className={`searchButton`}
        >
          <Button
            htmlType="submit"
            size={"large"}
            type="primary"
            block
            onClick={onSearch}
          >
            Хайх
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <GoogleMapReact
            style={{ height: "828px", width: "892px" }}
            bootstrapURLKeys={{ key: GOOGLE_API }}
            center={{ lat: latitude, lng: longitude }}
            defaultZoom={16}
            onClick={onMapClick}
          >
            {selectLat & selectLng ? (
              <AnyReactComponent lat={selectLat} lng={selectLng} text="20p" />
            ) : null}
            {spaceData.map((item) => (
              <AnyReactComponent
                style={{ backgroundColor: "white" }}
                key={item.residenceBlockId}
                lat={item.latitude}
                lng={item.longitude}
                text={item.residenceName}
              />
            ))}

            {/* {Data.features.map((item) => (
              <Marker
                position={{
                  lat: item.geometry.coordinates[1],
                  lng: item.geometry.coordinates[0],
                }}
                key={item.properties.PARK_ID}
              />
            ))} */}
          </GoogleMapReact>
        </Col>
        <Col span={8}>
          <Card>
            <Tabs
              defaultActiveKey="1"
              onChange={callback}
              className={`OptionPane`}
            >
              <TabPane
                tab={
                  <div
                    style={{
                      width: "167px",
                      height: "48px",
                    }}
                  >
                    <p style={{ height: "24px", paddingLeft: "35px" }}>
                      Тохирох
                    </p>
                  </div>
                }
                key="1"
              >
                <ToFit data={searchedData} lat={latitude} lng={longitude} />
              </TabPane>
              <TabPane
                tab={
                  <div
                    style={{
                      height: "48px",
                      width: "166px",
                    }}
                  >
                    <p style={{ height: "24px" }}> Хамгийн хямд</p>
                  </div>
                }
                disabled
                key="2"
              >
                <Closest />
              </TabPane>
              <TabPane
                tab={
                  <div
                    style={{
                      height: "48px",
                      width: "166px",
                    }}
                  >
                    <p style={{ height: "24px" }}> Хамгийн ойр</p>
                  </div>
                }
                disabled
                key="3"
              >
                <Farthest />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default fsearch;
