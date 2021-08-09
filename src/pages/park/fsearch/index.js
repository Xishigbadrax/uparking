import { useContext, useEffect, useState } from "react";
import { callGet, sList } from "@api/api";
import { Card, Col, Row, Button, DatePicker, Input, Select, Modal } from "antd";
import Context from "@context/Context";
import moment from "moment";
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

const Marker = (props) => {
  return (
    <div className="SuperAwesomePin">
      <TrademarkOutlined />
    </div>
  );
};

const fsearch = () => {
  const GOOGLE_API = process.env.NEXT_GOOGLE_API;
  const ctx = useContext(Context);
  const [dashboardData, setDashboardData] = useState({});
  const [parkRegModalVisible, setParkRegModalVisible] = useState(true);
  const [seeMore, setSeeMore] = useState(false);
  const [longitude, setLongitude] = useState(106.91699199253857);
  const [latitude, setLatitude] = useState(47.91899690115193);
  const [startDate, setStartDate] = useState();
  const [address, setAddress] = useState({});
  const [type, setType] = useState({});
  const [endDate, setEndtDate] = useState();
  const [residenceData, setResidenceData] = useState([]);
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
  const onChangeAddress = (e) => {
    console.log(e.target.value);
    setInputdata(e.target.value);
  };
  const onChangeType = (e) => {
    console.log(e);
    setType(e);
    console.log(startDate, endDate, type);
  };
  const onMapClick = () => {};

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
            onChange={onChangeAddress}
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
            style={{ height: "700px", width: "892px" }}
            bootstrapURLKeys={{ key: GOOGLE_API }}
            defaultCenter={{
              lat: latitude,
              lng: longitude,
            }}
            defaultZoom={11}
            onClick={onMapClick}
          >
            <Marker lat={latitude} lng={longitude} />
          </GoogleMapReact>
        </Col>
        <Col span={8}>
          <Card style={{ width: "100%" }}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Тохирох" key="1">
                <ToFit data={searchedData} />
              </TabPane>
              <TabPane tab="Хамгийн хямд" disabled key="2">
                <Closest />
              </TabPane>
              <TabPane tab="Хамгийн ойр" disabled key="3">
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
