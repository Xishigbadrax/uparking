import { useContext, useEffect, useState } from "react";
import { callGet, sList } from "@api/api";
import { Card, Col, Row, Button, DatePicker, Input, Select, Modal } from "antd";
import Context from "@context/Context";
import moment from "moment";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
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
const fsearch = () => {
  const GOOGLE_API = process.env.NEXT_GOOGLE_API;
  const ctx = useContext(Context);
  const [dashboardData, setDashboardData] = useState({});
  const [parkRegModalVisible, setParkRegModalVisible] = useState(true);
  const [seeMore, setSeeMore] = useState(false);
  const [startDate, setStartDate] = useState("2019-05-01");
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
  const handleDateChange = (value, dateString) => {
    if (dateString) {
      setStartDate(dateString[0]);
      setEndtDate(dateString[1]);
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
  };

  function onChange(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  }
  const onSearch = async () => {
    const data = await callGet(
      `/search/keyword/?syllable=${inputData}&limit=20&page=2`
    );
    const cutData = data.slice(0, 20);
    console.log(cutData);
    setSearchedData(cutData);
  };
  function onOk(value) {
    console.log("onOk: ", value);
  }
  function callback(key) {
    console.log(key);
  }

  console.log("what happened-->", searchedData);
  return (
    <div style={{ height: "100vh" }}>
      <Row style={{ padding: "20px" }}>
        <Col span={7}>
          <Input
            onChange={onChangeAddress}
            placeholder="Хаяг"
            size="large"
            height="60px"
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col
          span={3.5}
          style={{
            height: "50px",
            borderRadius: "15px",
            border: "1px solid gray",
          }}
          offset={1}
        >
          <div style={{ marginLeft: "10px", paddingRight: "5px" }}>
            <p style={{ fontSize: "10px" }}>Захиалгын төрөл</p>
            <Select
              style={{ width: 120 }}
              placeholder="Сонгох"
              onChange={onChangeType}
            >
              <Option value="day">Өдөр</Option>
              <Option value="night">Шөнө</Option>
            </Select>
          </div>
        </Col>
        <Col
          span={3.5}
          offset={1}
          style={{
            height: "50px",
            borderRadius: "15px",
            border: "1px solid gray",
          }}
        >
          <div style={{ marginLeft: "10px", paddingRight: "5px" }}>
            <p style={{ fontSize: "10px", color: "gray" }}>
              Эхлэх хугацаа сонгох
            </p>
            <DatePicker
              style={{ width: "185px" }}
              onChange={onChange}
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
          offset={1}
          span={3.5}
          style={{
            height: "50px",
            borderRadius: "15px",
            border: "1px solid gray",
          }}
        >
          <div style={{ paddingRight: "5px", marginLeft: "10px" }}>
            <p style={{ fontSize: "10px" }}>Дуусах хугацаа сонгох</p>
            <DatePicker
              style={{ width: "185px" }}
              onChange={onChange}
              placeholder="Сонгох"
              suffixIcon={
                <div>
                  <DownOutlined />
                </div>
              }
            ></DatePicker>
          </div>
        </Col>
        <Col span={4} offset={1}>
          <Button htmlType="submit" type="primary" block onClick={onSearch}>
            Хайх
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={17}>
          <GoogleMapReact
            style={{ height: "100vh" }}
            bootstrapURLKeys={{ key: GOOGLE_API }}
            defaultCenter={{
              lat: 47.91899690115193,
              lng: 106.91699199253857,
            }}
            defaultZoom={11}
          ></GoogleMapReact>
        </Col>
        <Col span={7} offset={0.5}>
          <Card title="Card title">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Тохирох" key="1">
                <ToFit data={searchedData} />
              </TabPane>
              <TabPane tab="Хамгийн хямд" key="2">
                <Closest />
              </TabPane>
              <TabPane tab="Хамгийн ойр" key="3">
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
